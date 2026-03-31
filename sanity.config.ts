import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { schemaTypes } from "./src/sanity/schemas";

export default defineConfig({
  name: "jakebouma",
  title: "JakeBouma.com",
  projectId: "eimnd7jx",
  dataset: "production",
  basePath: "/studio",
  plugins: [structureTool()],
  schema: {
    types: schemaTypes,
  },
});
