import { pgTable, serial, varchar, timestamp, text } from "drizzle-orm/pg-core";

export const recipes = pgTable("recipes", {
  id: serial("id").primaryKey(),
  title: varchar("title", { length: 255 }).notNull(),
  url: varchar("url", { length: 1024 }).notNull(),
  labels: text("labels").array(),
  dateAdded: timestamp("date_added", { withTimezone: true })
    .defaultNow()
    .notNull(),
  slug: varchar("slug", { length: 21 }).notNull().unique(),
});
