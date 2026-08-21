import type { CollectionConfig } from "payload";

export const Inganzo: CollectionConfig = {
  slug: "inganzo",
  admin: {
    useAsTitle: "title",
    description: "Manage inganzo — Rwandan and African literary works",
  },
  fields: [
    { name: "title", type: "text", required: true },
    { name: "slug", type: "text", required: true, unique: true, admin: { position: "sidebar" } },
    { name: "author", type: "text", required: true },
    { name: "authorBio", type: "textarea" },
    {
      name: "type",
      type: "select",
      required: true,
      options: [
        { label: "Ibisigo", value: "IBISIGO" },
        { label: "Imivugo", value: "IMIVUGO" },
        { label: "Poem", value: "POEM" },
        { label: "Short Story", value: "SHORT_STORY" },
        { label: "Literature", value: "LITERATURE" },
        { label: "Traditional", value: "TRADITIONAL" },
        { label: "Modern", value: "MODERN" },
      ],
      admin: { position: "sidebar" },
    },
    { name: "language", type: "text", required: true, defaultValue: "Kinyarwanda" },
    { name: "date", type: "date", required: true },
    { name: "excerpt", type: "textarea", admin: { description: "Short preview text" } },
    { name: "content", type: "textarea", required: true, admin: { description: "Full literary text" } },
    {
      name: "access",
      type: "select",
      required: true,
      defaultValue: "FREE",
      options: [
        { label: "Free", value: "FREE" },
        { label: "Premium", value: "PREMIUM" },
      ],
      admin: { position: "sidebar" },
    },
    { name: "published", type: "checkbox", defaultValue: false, admin: { position: "sidebar" } },
  ],
};
