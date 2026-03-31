import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import { getSourceBySlug, getAllSources } from "@/data/sources";
import { client } from "@/sanity/client";
import { formatDate } from "@/lib/posts";

export function generateStaticParams() {
  return getAllSources().map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const source = getSourceBySlug(slug);
  if (!source) return {};
  return {
    title: `${source.name} — Jake Bouma`,
    description: source.description,
  };
}

export default async function SourcePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const source = getSourceBySlug(slug);

  if (!source) notFound();

  const posts = await client.fetch(
    `*[_type == "post" && source == $source] | order(publishedAt asc) {
      "id": _id, title, "slug": slug.current, "date": publishedAt
    }`,
    { source: source.key }
  );

  return (
    <article className="max-w-3xl mx-auto px-6 pt-20 pb-20">
      <Link
        href="/archive"
        className="font-sans text-xs tracking-wide text-ink-faint hover:text-accent transition-colors mb-10 inline-block"
      >
        &larr; Back to archive
      </Link>

      <header className="mb-12">
        <p className="font-sans text-xs tracking-[0.2em] uppercase text-ink-faint mb-4">
          Originally published on
        </p>
        <h1 className="text-3xl md:text-4xl font-normal tracking-tight text-ink leading-tight mb-3">
          {source.name}
        </h1>
        <p className="font-sans text-sm text-ink-muted mb-6">{source.years}</p>
        <p className="text-ink-light leading-relaxed max-w-2xl">
          {source.description}
        </p>
      </header>

      {/* Original URL */}
      <div className="mb-10 flex flex-wrap gap-4 font-sans text-xs">
        {source.archiveUrl && (
          <a
            href={source.archiveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-accent hover:text-accent-hover transition-colors"
          >
            {source.archiveUrl.includes("web.archive.org")
              ? "View on Wayback Machine"
              : "Visit original site"}
            <span className="text-[10px]">&#8599;</span>
          </a>
        )}
        {source.url !== source.archiveUrl && (
          <span className="text-ink-faint">
            Originally at{" "}
            <span className="font-mono text-[11px]">{source.url}</span>
          </span>
        )}
      </div>

      {/* Screenshot */}
      {source.screenshot && (
        <div className="mb-12">
          <div className="border border-rule rounded-sm overflow-hidden shadow-sm">
            <Image
              src={source.screenshot}
              alt={`Screenshot of ${source.name}`}
              width={800}
              height={500}
              className="w-full h-auto"
            />
          </div>
          <p className="font-sans text-xs text-ink-faint mt-2 italic">
            {source.name}, circa {source.years}
          </p>
        </div>
      )}

      <hr className="border-rule mb-10" />

      {/* Post list */}
      <div className="mb-6">
        <h2 className="font-sans text-xs tracking-[0.2em] uppercase text-ink-faint mb-6">
          {posts.length} post{posts.length !== 1 ? "s" : ""} from {source.shortName}
        </h2>
      </div>

      <div className="space-y-0">
        {posts.map(
          (post: { id: string; title: string; slug: string; date: string }) => (
            <Link
              key={post.id}
              href={`/archive/${post.slug}`}
              className="group flex flex-col md:flex-row md:items-baseline gap-1 md:gap-8 py-3 border-b border-rule-light hover:bg-cream-dark/50 -mx-4 px-4 transition-colors"
            >
              <span className="font-sans text-xs tracking-wide text-ink-faint shrink-0 w-28">
                {formatDate(post.date)}
              </span>
              <h3 className="text-ink group-hover:text-accent transition-colors">
                {post.title}
              </h3>
            </Link>
          )
        )}
      </div>
    </article>
  );
}
