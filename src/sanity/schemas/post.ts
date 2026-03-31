import { defineField, defineType } from "sanity";

export default defineType({
  name: "post",
  title: "Post",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "subtitle",
      title: "Subtitle",
      type: "string",
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "title", maxLength: 96 },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "publishedAt",
      title: "Published At",
      type: "datetime",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "content",
      title: "Content",
      type: "text",
      description: "HTML content of the post",
    }),
    defineField({
      name: "categories",
      title: "Categories",
      type: "array",
      of: [{ type: "reference", to: [{ type: "category" }] }],
    }),
    defineField({
      name: "tags",
      title: "Tags",
      type: "array",
      of: [{ type: "string" }],
      options: { layout: "tags" },
    }),
    defineField({
      name: "featuredImage",
      title: "Featured Image",
      type: "string",
      description: "Path to the featured/header image (e.g. /images/2012books.jpg)",
    }),
    defineField({
      name: "source",
      title: "Source",
      type: "string",
      options: {
        list: [
          { title: "JakeBouma.com (WordPress)", value: "wordpress" },
          { title: "Neon Parentheses (Substack)", value: "substack" },
          { title: "Medium", value: "medium" },
          { title: "Original", value: "original" },
          { title: "Luther College Blog", value: "luther" },
          { title: "Blogspot", value: "blogspot" },
        ],
      },
    }),
  ],
  orderings: [
    {
      title: "Published Date, New",
      name: "publishedAtDesc",
      by: [{ field: "publishedAt", direction: "desc" }],
    },
  ],
  preview: {
    select: {
      title: "title",
      date: "publishedAt",
      source: "source",
    },
    prepare({ title, date, source }) {
      return {
        title,
        subtitle: `${date ? new Date(date).toLocaleDateString() : "No date"} · ${source || "unknown"}`,
      };
    },
  },
});
