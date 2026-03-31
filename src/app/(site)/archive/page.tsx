"use client";

import Link from "next/link";
import { useState, useMemo, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { formatDate } from "@/lib/posts";
import type { Post } from "@/lib/posts";
import { client } from "@/sanity/client";

function ArchiveContent() {
  const searchParams = useSearchParams();
  const [posts, setPosts] = useState<Post[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [years, setYears] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedYear, setSelectedYear] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [search, setSearch] = useState("");

  useEffect(() => {
    async function load() {
      const [postsData, catsData] = await Promise.all([
        client.fetch(
          `*[_type == "post"] | order(publishedAt desc) {
            "id": _id, title, subtitle, "slug": slug.current,
            "date": publishedAt,
            "year": string::split(publishedAt, "-")[0],
            "month": string::split(publishedAt, "-")[1],
            content, "categories": categories[]->title, tags, source
          }`
        ),
        client.fetch(
          `*[_type == "category"] | order(title asc) { "name": title }.name`
        ),
      ]);
      setPosts(postsData);
      setCategories(catsData);
      setYears(
        [...new Set(postsData.map((p: Post) => p.year) as string[])]
          .sort()
          .reverse()
      );
      setLoading(false);
    }
    load();
  }, []);

  useEffect(() => {
    const cat = searchParams.get("category");
    const year = searchParams.get("year");
    const tag = searchParams.get("tag");
    if (cat) setSelectedCategory(cat);
    if (year) setSelectedYear(year);
    if (tag) setSelectedTag(tag);
  }, [searchParams]);

  const filtered = useMemo(() => {
    let result = posts;
    if (selectedYear) result = result.filter((p) => p.year === selectedYear);
    if (selectedCategory)
      result = result.filter((p) => p.categories?.includes(selectedCategory));
    if (selectedTag)
      result = result.filter((p) => p.tags?.includes(selectedTag));
    if (search) {
      const q = search.toLowerCase();
      result = result.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.categories?.some((c) => c.toLowerCase().includes(q)) ||
          p.tags?.some((t) => t.toLowerCase().includes(q))
      );
    }
    return result;
  }, [posts, selectedYear, selectedCategory, selectedTag, search]);

  const clearFilters = () => {
    setSelectedYear(null);
    setSelectedCategory(null);
    setSelectedTag(null);
    setSearch("");
  };

  const hasFilters = selectedYear || selectedCategory || selectedTag || search;

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto px-6 pt-20 pb-20">
        <p className="font-sans text-xs tracking-[0.2em] uppercase text-ink-faint mb-6">
          Archive
        </p>
        <h1 className="text-3xl md:text-4xl font-normal tracking-tight text-ink mb-4">
          Blog Archive
        </h1>
        <p className="text-ink-faint italic">Loading posts&hellip;</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-6 pt-20 pb-20">
      <p className="font-sans text-xs tracking-[0.2em] uppercase text-ink-faint mb-6">
        Archive
      </p>
      <h1 className="text-3xl md:text-4xl font-normal tracking-tight text-ink mb-4">
        Blog Archive
      </h1>
      <p className="text-ink-muted mb-12 max-w-xl leading-relaxed">
        {posts.length} posts spanning 2004&ndash;2021. Theology, culture,
        technology, books, music, and life.
      </p>

      {/* Search */}
      <div className="mb-6">
        <input
          type="text"
          placeholder="Search posts..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="font-sans w-full md:w-80 px-4 py-2.5 border border-rule rounded text-sm text-ink bg-cream placeholder:text-ink-faint focus:outline-none focus:border-accent transition-colors"
        />
      </div>

      {/* Filters */}
      <div className="mb-8 space-y-3">
        <div className="flex flex-wrap gap-1.5">
          {years.map((year) => (
            <button
              key={year}
              onClick={() =>
                setSelectedYear(selectedYear === year ? null : year)
              }
              className={`font-sans px-3 py-1.5 text-xs tracking-wide rounded transition-colors ${
                selectedYear === year
                  ? "bg-accent text-cream"
                  : "bg-cream-dark text-ink-muted hover:text-ink"
              }`}
            >
              {year}
            </button>
          ))}
        </div>

        <div className="flex flex-wrap gap-1.5">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() =>
                setSelectedCategory(selectedCategory === cat ? null : cat)
              }
              className={`font-sans px-3 py-1.5 text-xs rounded transition-colors ${
                selectedCategory === cat
                  ? "bg-accent text-cream"
                  : "bg-cream-dark text-ink-muted hover:text-ink"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {selectedTag && (
          <div className="flex items-center gap-2">
            <span className="font-sans text-xs text-ink-muted">Tag:</span>
            <span className="font-sans text-xs bg-accent text-cream rounded px-3 py-1.5">
              {selectedTag}
            </span>
            <button
              onClick={() => setSelectedTag(null)}
              className="font-sans text-xs text-ink-faint hover:text-ink"
            >
              &times;
            </button>
          </div>
        )}

        {hasFilters && (
          <button
            onClick={clearFilters}
            className="font-sans text-xs text-accent hover:underline"
          >
            Clear filters
          </button>
        )}
      </div>

      {/* Results count */}
      <p className="font-sans text-xs text-ink-faint mb-6 tracking-wide">
        {filtered.length === posts.length
          ? `${posts.length} posts`
          : `${filtered.length} of ${posts.length} posts`}
      </p>

      {/* Post list */}
      <div className="space-y-0">
        {filtered.map((post) => (
          <Link
            key={post.id}
            href={`/archive/${post.slug}`}
            className="group flex flex-col md:flex-row md:items-baseline gap-1 md:gap-8 py-4 border-b border-rule-light hover:bg-cream-dark/50 -mx-4 px-4 transition-colors"
          >
            <span className="font-sans text-xs tracking-wide text-ink-faint shrink-0 w-28">
              {formatDate(post.date).split(",")[0]}
              <span className="text-ink-faint/50">, {post.year}</span>
            </span>
            <div className="flex-1 min-w-0">
              <h3 className="text-ink group-hover:text-accent transition-colors truncate">
                {post.title}
              </h3>
              {post.categories?.length > 0 && (
                <div className="flex gap-2 mt-0.5">
                  {post.categories.slice(0, 3).map((cat) => (
                    <span
                      key={cat}
                      className="font-sans text-[10px] tracking-wide text-ink-faint"
                    >
                      {cat}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </Link>
        ))}
      </div>

      {filtered.length === 0 && (
        <p className="text-ink-faint text-center py-16 italic">
          No posts match your filters.
        </p>
      )}
    </div>
  );
}

export default function Archive() {
  return (
    <Suspense>
      <ArchiveContent />
    </Suspense>
  );
}
