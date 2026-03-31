import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { getAllSlugs, getPostBySlug, formatDate } from "@/lib/posts";
import PostContent from "@/components/PostContent";
import { getSource } from "@/data/sources";

export async function generateStaticParams() {
  const slugs = await getAllSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) return {};
  const metadata: Metadata = {
    title: post.title,
    description: `Originally published on JakeBouma.com on ${formatDate(post.date)}`,
  };
  if (post.featuredImage) {
    metadata.openGraph = { images: [post.featuredImage] };
  }
  return metadata;
}

export default async function PostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) notFound();

  const source = getSource(post.source || "wordpress");

  return (
    <article className="max-w-3xl mx-auto px-6 pt-20 pb-20">
      {/* Back link */}
      <Link
        href="/archive"
        className="font-sans text-xs tracking-wide text-ink-faint hover:text-accent transition-colors mb-10 inline-block"
      >
        &larr; Back to archive
      </Link>

      {/* Header */}
      <header className="mb-12">
        <h1 className="text-3xl md:text-4xl font-normal tracking-tight text-ink leading-tight mb-4">
          {post.title}
        </h1>
        {post.subtitle && (
          <p className="text-lg text-ink-muted italic mb-4">{post.subtitle}</p>
        )}
        <div className="flex flex-wrap items-center gap-3 font-sans text-xs tracking-wide">
          <time className="text-ink-faint" dateTime={post.date}>{formatDate(post.date)}</time>
          {source && (
            <>
              <span className="text-ink-faint">✦</span>
              <span className="text-ink-faint italic">originally published via</span>
              <Link
                href={`/sources/${source.slug}`}
                className="source-badge rounded px-2.5 py-0.5 transition-opacity hover:opacity-80"
                data-source={post.source || "wordpress"}
              >
                {source.shortName}
              </Link>
            </>
          )}
        </div>
      </header>

      {/* Featured Image */}
      {post.featuredImage && (
        <div className="mb-10">
          <img
            src={post.featuredImage}
            alt=""
            className="w-full rounded"
          />
        </div>
      )}

      <hr className="border-rule mb-10" />

      {/* Content */}
      <PostContent html={post.content} />

      {/* Tags */}
      {post.tags?.length > 0 && (
        <div className="mt-14 pt-8 border-t border-rule-light">
          <div className="flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <Link
                key={tag}
                href={`/archive?tag=${encodeURIComponent(tag)}`}
                className="font-sans text-xs text-ink-faint bg-cream-dark rounded px-3 py-1 hover:bg-rule-light hover:text-ink transition-colors"
              >
                {tag}
              </Link>
            ))}
          </div>
        </div>
      )}
    </article>
  );
}
