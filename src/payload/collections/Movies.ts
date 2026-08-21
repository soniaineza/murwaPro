import type { CollectionConfig } from "payload";

export const Movies: CollectionConfig = {
  slug: "movies",
  admin: {
    useAsTitle: "title",
    description: "Manage movies and films for MurwaPro",
  },
  fields: [
    {
      name: "title",
      type: "text",
      required: true,
    },
    {
      name: "slug",
      type: "text",
      required: true,
      unique: true,
      admin: {
        position: "sidebar",
      },
    },
    {
      name: "tagline",
      type: "text",
    },
    {
      name: "description",
      type: "textarea",
      required: true,
    },
    {
      name: "poster",
      type: "text",
      required: true,
      admin: {
        description: "URL or path to the poster image",
      },
    },
    {
      name: "backdrop",
      type: "text",
      required: true,
      admin: {
        description: "URL or path to the backdrop image",
      },
    },
    {
      name: "trailerUrl",
      type: "text",
      admin: {
        description: "URL to the trailer video",
      },
    },
    {
      name: "videoUrl",
      type: "text",
      admin: {
        description: "URL to the movie video file",
      },
    },
    {
      type: "row",
      fields: [
        { name: "year", type: "number", required: true, min: 1900, max: 2100 },
        { name: "duration", type: "number", required: true, admin: { description: "Duration in minutes" } },
        { name: "rating", type: "number", min: 0, max: 10, defaultValue: 0 },
      ],
    },
    {
      type: "row",
      fields: [
        { name: "language", type: "text", required: true, defaultValue: "Kinyarwanda" },
        { name: "country", type: "text", required: true, defaultValue: "Rwanda" },
        { name: "ageRating", type: "text" },
      ],
    },
    {
      name: "director",
      type: "text",
    },
    {
      name: "cast",
      type: "array",
      fields: [{ name: "name", type: "text", required: true }],
    },
    {
      name: "creator",
      type: "text",
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
        { name: "trending", type: "checkbox", defaultValue: false },
        { name: "isNew", type: "checkbox", defaultValue: false },
        { name: "isRwandan", type: "checkbox", defaultValue: false },
        { name: "isAfrican", type: "checkbox", defaultValue: false },
        { name: "freeToWatch", type: "checkbox", defaultValue: false },
      ],
      admin: { position: "sidebar" },
    },
    {
      name: "genres",
      type: "relationship",
      relationTo: "genres",
      hasMany: true,
    },
    {
      name: "published",
      type: "checkbox",
      defaultValue: false,
      admin: { position: "sidebar" },
    },
  ],
};
