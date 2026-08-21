import type { CollectionConfig } from "payload";

export const Books: CollectionConfig = {
  slug: "books",
  admin: {
    useAsTitle: "title",
    description: "Manage books for MurwaPro digital library",
  },
  fields: [
    { name: "title", type: "text", required: true },
    { name: "slug", type: "text", required: true, unique: true, admin: { position: "sidebar" } },
    { name: "author", type: "text", required: true },
    { name: "authorBio", type: "textarea" },
    { name: "cover", type: "text", required: true, admin: { description: "URL to cover image" } },
    { name: "description", type: "textarea", required: true },
    { name: "genre", type: "text", required: true },
    { name: "language", type: "text", required: true, defaultValue: "English" },
    {
      type: "row",
      fields: [
        { name: "year", type: "number", required: true },
        { name: "pages", type: "number", required: true },
        { name: "rating", type: "number", min: 0, max: 5, defaultValue: 0 },
      ],
    },
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
    {
      type: "group",
      name: "flags",
      fields: [
        { name: "featured", type: "checkbox", defaultValue: false },
        { name: "isNew", type: "checkbox", defaultValue: false },
        { name: "isRwandan", type: "checkbox", defaultValue: false },
        { name: "isAfrican", type: "checkbox", defaultValue: false },
      ],
      admin: { position: "sidebar" },
    },
    { name: "fileUrl", type: "text", admin: { description: "URL to the book file (PDF, EPUB)" } },
    { name: "published", type: "checkbox", defaultValue: false, admin: { position: "sidebar" } },
  ],
};
