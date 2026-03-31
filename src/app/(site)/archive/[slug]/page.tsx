import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { getAllSlugs, getPostBySlug, formatDate } from "@/lib/posts";
import PostContent from "@/components/PostContent";

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
  return {
    title: post.title,
    description: `Originally published on JakeBouma.com on ${formatDate(post.date)}`,
  };
}

export default async function PostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) notFound();

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
        <div className="flex flex-wrap items-center gap-3 font-sans text-xs text-ink-faint tracking-wide">
          <time dateTime={post.date}>{formatDate(post.date)}</time>
          {post.source === "substack" && (
            <span className="border border-rule rounded px-2 py-0.5">
              Neon Parentheses
            </span>
          )}
          {post.source === "medium" && (
            <span className="border border-rule rounded px-2 py-0.5">
              Medium
            </span>
          )}
          {post.categories?.length > 0 && (
            <div className="flex gap-2">
              {post.categories.map((cat) => (
                <span
                  key={cat}
                  className="border border-rule rounded px-2 py-0.5"
                >
                  {cat}
                </span>
              ))}
            </div>
          )}
        </div>
      </header>

      <hr className="border-rule mb-10" />

      {/* Content */}
      <PostContent html={post.content} />

      {/* Tags */}
      {post.tags?.length > 0 && (
        <div className="mt-14 pt-8 border-t border-rule-light">
          <div className="flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="font-sans text-xs text-ink-faint bg-cream-dark rounded px-3 py-1"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      )}
    </article>
  );
}
