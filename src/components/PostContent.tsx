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

function processContent(html: string): string {
  let result = html;

  // Convert bare tweet URLs (on their own line) into blockquote embeds
  result = result.replace(
    /(?:<p>)?\s*(https?:\/\/(?:twitter\.com|x\.com)\/(\w+)\/status\/(\d+))\s*(?:<\/p>)?/g,
    (_match, url, _user, _id) =>
      `<blockquote class="twitter-tweet"><a href="${url}">${url}</a></blockquote>`
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
