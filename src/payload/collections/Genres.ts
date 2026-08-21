import type { CollectionConfig } from "payload";

export const Genres: CollectionConfig = {
  slug: "genres",
  admin: {
    useAsTitle: "name",
    description: "Content genres and categories",
  },
  fields: [
    { name: "name", type: "text", required: true, unique: true },
  ],
};
