import type { CollectionConfig } from "payload";

export const Users: CollectionConfig = {
  slug: "users",
  auth: true,
  admin: {
    useAsTitle: "email",
    description: "Manage platform users",
  },
  fields: [
    { name: "firstName", type: "text", required: true },
    { name: "lastName", type: "text" },
    { name: "avatar", type: "text" },
    {
      name: "role",
      type: "select",
      required: true,
      defaultValue: "USER",
      options: [
        { label: "User", value: "USER" },
        { label: "Creator", value: "CREATOR" },
        { label: "Editor", value: "EDITOR" },
        { label: "Admin", value: "ADMIN" },
        { label: "Super Admin", value: "SUPER_ADMIN" },
      ],
      admin: { position: "sidebar" },
    },
    {
      name: "language",
      type: "select",
      defaultValue: "en",
      options: [
        { label: "English", value: "en" },
        { label: "Kinyarwanda", value: "rw" },
        { label: "French", value: "fr" },
      ],
      admin: { position: "sidebar" },
    },
  ],
};
