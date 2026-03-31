"use client";

import { useEffect, useRef } from "react";

declare global {
  interface Window {
    twttr?: {
      widgets: {
        load: (el?: HTMLElement) => void;
      };
    };
  }
}

function wpautop(text: string): string {
  // Replicate WordPress's wpautop: convert double newlines to <p> tags
  // Apply to content that has double newlines, even if some <p> tags exist
  if (!text.includes("\n\n")) return text;

  let result = text.replace(/\r\n/g, "\n").replace(/\r/g, "\n");
  // Normalize 3+ newlines to double
  result = result.replace(/\n{3,}/g, "\n\n");
  // Split on double newlines and wrap each block in <p> if not already wrapped
  const blocks = result.split(/\n\n/).filter((b) => b.trim());
  return blocks
    .map((block) => {
      const trimmed = block.trim();
      // Don't wrap block-level elements or content already in tags
      if (/^<(?:p|div|blockquote|h[1-6]|ul|ol|li|table|hr|pre|figure|script)/i.test(trimmed)) {
        return trimmed;
      }
      // Convert single newlines within a block to <br>
      return `<p>${trimmed.replace(/\n/g, "<br>\n")}</p>`;
    })
    .join("\n\n");
}

function convertFlashEmbeds(html: string): string {
  let result = html;

  // YouTube: extract video ID from Flash embed URL and convert to iframe
  result = result.replace(
    /<object[^>]*>[\s\S]*?(?:youtube\.com\/v\/|youtube\.com\/embed\/)([a-zA-Z0-9_-]+)[\s\S]*?<\/object>/gi,
    (_match, id) =>
      `<div style="position:relative;padding-bottom:56.25%;height:0;overflow:hidden"><iframe src="https://www.youtube.com/embed/${id}" style="position:absolute;top:0;left:0;width:100%;height:100%" frameborder="0" allowfullscreen></iframe></div>`
  );

  // Vimeo: extract clip ID from Flash embed URL
  result = result.replace(
    /<object[^>]*>[\s\S]*?(?:vimeo\.com\/moogaloop\.swf\?clip_id=)(\d+)[\s\S]*?<\/object>/gi,
    (_match, id) =>
      `<div style="position:relative;padding-bottom:56.25%;height:0;overflow:hidden"><iframe src="https://player.vimeo.com/video/${id}" style="position:absolute;top:0;left:0;width:100%;height:100%" frameborder="0" allowfullscreen></iframe></div>`
  );

  // Flickr slideshow: extract set ID and convert to link
  result = result.replace(
    /<object[^>]*>[\s\S]*?flickr\.com[\s\S]*?set_id=(\d+)[\s\S]*?<\/object>/gi,
    (_match, setId) =>
      `<div style="border:1px solid #d9d3ca;border-radius:8px;padding:1.5rem;text-align:center;margin:1.5rem 0;background:#faf8f5"><p style="margin:0 0 0.5rem;font-size:0.9em;color:#999">📷 Flickr Slideshow</p><a href="https://www.flickr.com/photos/jakebouma/sets/${setId}" target="_blank" rel="noopener" style="font-weight:600">View photo set on Flickr &rarr;</a></div>`
  );

  // SoundCloud: extract URL from Flash embed
  result = result.replace(
    /<object[^>]*>[\s\S]*?player\.soundcloud\.com[\s\S]*?url=(https?[^&"]+)[\s\S]*?<\/object>/gi,
    (_match, url) => {
      const decoded = decodeURIComponent(url);
      return `<iframe width="100%" height="166" scrolling="no" frameborder="no" src="https://w.soundcloud.com/player/?url=${encodeURIComponent(decoded)}&color=%23ff5500&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true"></iframe>`;
    }
  );

  // Any remaining <object>/<embed> Flash content: remove gracefully with a note
  result = result.replace(
    /<object[^>]*>[\s\S]*?<\/object>/gi,
    '<p style="color:#999;font-style:italic;font-size:0.85em">[Embedded content no longer available]</p>'
  );

  // Standalone <embed> tags (without wrapping <object>)
  result = result.replace(
    /<embed[^>]*\/?>/gi,
    ''
  );

  return result;
}

function processContent(html: string): string {
  // Apply wpautop first to convert raw newlines to paragraphs
  let result = wpautop(html);

  // Convert Flash embeds to modern equivalents
  result = convertFlashEmbeds(result);

  // Fix bare <li> inside <blockquote> (missing <ul> wrapper — old tweet embeds)
  result = result.replace(
    /<blockquote>([\s\S]*?)<\/blockquote>/gi,
    (_match, inner) => {
      if (/<li[\s>]/i.test(inner) && !/<ul[\s>]/i.test(inner)) {
        return `<blockquote><ul>${inner}</ul></blockquote>`;
      }
      return _match;
    }
  );

  // Convert bare tweet URLs (on their own line, not inside an <a> tag) into embeds
  // Match URLs in their own <p>, or surrounded by newlines (WordPress stores as plain text)
  result = result.replace(
    /(?:<p>\s*)?((?:^|\n)\s*)(https?:\/\/(?:twitter\.com|x\.com)\/(\w+)\/status\/(\d+))\s*(?:<\/p>|\n)/gm,
    (_match, _pre, url) => {
      return `<blockquote class="twitter-tweet"><a href="${url}">${url}</a></blockquote>`;
    }
  );

  // Convert WordPress inline-styled divs used as section headers into h3
  result = result.replace(
    /<div[^>]*style="[^"]*font-size:\s*1[4-8]px[^"]*font-weight:\s*bold[^"]*"[^>]*>([\s\S]*?)<\/div>/gi,
    '<h3>$1</h3>'
  );
  result = result.replace(
    /<div[^>]*style="[^"]*font-weight:\s*bold[^"]*font-size:\s*1[4-8]px[^"]*"[^>]*>([\s\S]*?)<\/div>/gi,
    '<h3>$1</h3>'
  );

  // Convert in-text footnote anchors to superscript
  result = result.replace(
    /<a[^>]*class="footnote-anchor"[^>]*id="(footnote-anchor-\d+)"[^>]*href="(#footnote-\d+)"[^>]*>(\d+)<\/a>/g,
    '<sup><a id="$1" href="$2" style="font-size:0.75em;text-decoration:none;color:#3d6b7a;font-weight:600">$3</a></sup>'
  );

  // Convert bottom footnote divs to compact format
  result = result.replace(
    /<div class="footnote"[^>]*>\s*<a[^>]*id="(footnote-\d+)"[^>]*href="(#footnote-anchor-\d+)"[^>]*>\d+<\/a>\s*<div class="footnote-content">([\s\S]*?)<\/div>\s*<\/div>/g,
    (_match, id, backHref, content) => {
      const num = id.replace("footnote-", "");
      const inlineContent = content
        .replace(/^\s*<p>([\s\S]*)<\/p>\s*$/, "$1")
        .trim();
      return `<p style="font-size:0.85em;color:#6b6b6b;margin-top:0.25rem;margin-bottom:0.25rem"><sup><a id="${id}" href="${backHref}" style="font-size:0.75em;text-decoration:none;color:#3d6b7a;font-weight:600">${num}</a></sup> ${inlineContent}</p>`;
    }
  );

  // Convert WordPress <footnote> plugin tags into superscript refs + endnotes
  const footnoteRegex = /<footnote>([\s\S]*?)<\/footnote>/gi;
  const footnotes: string[] = [];
  result = result.replace(footnoteRegex, (_match, content) => {
    footnotes.push(content.trim());
    const n = footnotes.length;
    return `<sup><a href="#wp-fn-${n}" id="wp-fn-ref-${n}" style="font-size:0.75em;text-decoration:none;color:#3d6b7a;font-weight:600">${n}</a></sup>`;
  });

  if (footnotes.length > 0) {
    result += '<hr style="margin-top:2.5rem;border-color:#d9d3ca">';
    result += '<div style="font-size:0.85em;color:#6b6b6b">';
    footnotes.forEach((fn, i) => {
      const n = i + 1;
      result += `<p style="margin:0.25rem 0"><sup><a id="wp-fn-${n}" href="#wp-fn-ref-${n}" style="font-size:0.75em;text-decoration:none;color:#3d6b7a;font-weight:600">${n}</a></sup> ${fn}</p>`;
    });
    result += '</div>';
  }

  return result;
}

export default function PostContent({ html }: { html: string }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;

    if (ref.current.querySelector(".twitter-tweet")) {
      if (window.twttr) {
        window.twttr.widgets.load(ref.current);
      } else {
        const script = document.createElement("script");
        script.src = "https://platform.twitter.com/widgets.js";
        script.async = true;
        document.body.appendChild(script);
      }
    }
  }, [html]);

  return (
    <div
      ref={ref}
      className="prose prose-lg max-w-none
        prose-headings:font-serif prose-headings:font-normal prose-headings:tracking-tight prose-headings:text-ink
        prose-p:text-ink-light prose-p:leading-[1.85]
        prose-a:text-accent prose-a:underline prose-a:decoration-rule prose-a:underline-offset-3 prose-a:decoration-1 hover:prose-a:decoration-accent
        prose-img:rounded
        prose-blockquote:border-accent/30 prose-blockquote:text-ink-muted prose-blockquote:not-italic
        prose-li:text-ink-light prose-li:leading-[1.85]
        prose-strong:text-ink prose-strong:font-semibold
        prose-em:text-ink-light
        prose-hr:border-rule"
      style={{
        fontFamily:
          '"Iowan Old Style", "Palatino Linotype", Palatino, Georgia, serif',
      }}
      dangerouslySetInnerHTML={{ __html: processContent(html) }}
    />
  );
}
