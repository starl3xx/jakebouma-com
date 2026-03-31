import { client } from "@/sanity/client";

export interface Post {
  id: string;
  title: string;
  subtitle?: string | null;
  slug: string;
  date: string;
  year: string;
  month: string;
  content: string;
  categories: string[];
  tags: string[];
  source?: string;
}

const postFields = `
  "id": _id,
  title,
  subtitle,
  "slug": slug.current,
  "date": publishedAt,
  "year": string::split(publishedAt, "-")[0],
  "month": string::split(publishedAt, "-")[1],
  content,
  "categories": categories[]->title,
  tags,
  source
`;

export async function getAllPosts(): Promise<Post[]> {
  return client.fetch(
    `*[_type == "post"] | order(publishedAt desc) { ${postFields} }`
  );
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
  return client.fetch(
    `*[_type == "post" && slug.current == $slug][0] { ${postFields} }`,
    { slug }
  );
}

export async function getAllCategories(): Promise<string[]> {
  return client.fetch(
    `*[_type == "category"] | order(title asc) { "name": title }.name`
  );
}

export async function getAllYears(): Promise<string[]> {
  const years: string[] = await client.fetch(
    `array::unique(*[_type == "post"].publishedAt)`
  );
  return [...new Set(years.map((d) => d.slice(0, 4)))].sort().reverse();
}

export async function getAllSlugs(): Promise<string[]> {
  return client.fetch(`*[_type == "post"].slug.current`);
}

export function formatDate(dateStr: string): string {
  const d = new Date(dateStr);
  return d.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}
