import { buildConfig } from "payload";
import { postgresAdapter } from "@payloadcms/db-postgres";
import { lexicalEditor } from "@payloadcms/richtext-lexical";
import { collections } from "./payload/collections";

export default buildConfig({
  admin: {
    user: "users",
    meta: {
      titleSuffix: " | MurwaPro Admin",
      description: "MurwaPro Content Management System",
    },
  },
  collections,
  editor: lexicalEditor(),
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URL || "",
    },
  }),
  secret: process.env.PAYLOAD_SECRET || process.env.NEXTAUTH_SECRET || "murwapro-payload-secret",
  typescript: {
    outputFile: "src/payload-types.ts",
  },
});
