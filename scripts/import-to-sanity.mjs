import { createClient } from "@sanity/client";
import { readFileSync } from "fs";

const client = createClient({
  projectId: "eimnd7jx",
  dataset: "production",
  apiVersion: "2024-01-01",
  token: process.env.SANITY_TOKEN,
  useCdn: false,
});

const posts = JSON.parse(
  readFileSync(new URL("../src/data/posts.json", import.meta.url), "utf8")
);

// Step 1: Collect all unique categories and create them
const allCategories = [...new Set(posts.flatMap((p) => p.categories))].sort();
console.log(`Creating ${allCategories.length} categories...`);

const categoryMap = {};
for (const cat of allCategories) {
  const slug = cat
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
  const id = `category-${slug}`;
  categoryMap[cat] = id;

  await client.createOrReplace({
    _id: id,
    _type: "category",
    title: cat,
    slug: { _type: "slug", current: slug },
  });
}
console.log(`  Done.`);

// Step 2: Import posts in batches
const BATCH_SIZE = 50;
const total = posts.length;
console.log(`\nImporting ${total} posts in batches of ${BATCH_SIZE}...`);

for (let i = 0; i < total; i += BATCH_SIZE) {
  const batch = posts.slice(i, i + BATCH_SIZE);
  const transaction = client.transaction();

  for (const post of batch) {
    // Sanity IDs only allow [a-zA-Z0-9._-]
    const safeId = post.slug
      .replace(/%[0-9a-fA-F]{2}/g, "")
      .replace(/[^a-zA-Z0-9._-]/g, "-")
      .replace(/-+/g, "-")
      .replace(/^-|-$/g, "");
    const doc = {
      _id: `post-${safeId}`,
      _type: "post",
      title: post.title,
      slug: { _type: "slug", current: post.slug },
      publishedAt: new Date(post.date).toISOString(),
      content: post.content,
      tags: post.tags || [],
      source: post.source || "wordpress",
      categories: (post.categories || []).map((cat) => ({
        _type: "reference",
        _ref: categoryMap[cat],
        _key: categoryMap[cat],
      })),
    };
    if (post.subtitle) doc.subtitle = post.subtitle;

    transaction.createOrReplace(doc);
  }

  await transaction.commit();
  console.log(`  ${Math.min(i + BATCH_SIZE, total)} / ${total}`);
}

console.log(`\nDone! ${total} posts and ${allCategories.length} categories imported.`);
