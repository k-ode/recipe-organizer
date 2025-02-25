"use server";

import { revalidatePath } from "next/cache";
import { eq, or, sql, asc, desc } from "drizzle-orm";
import { db } from "@/lib/db/drizzle";
import { recipes } from "@/lib/db/schema";
import { nanoid } from "nanoid";

export type Recipe = typeof recipes.$inferSelect;

export type SortField = "date" | "label";
export type SortOrder = "asc" | "desc";

export async function createRecipe(
  title: string,
  url: string,
  labels: string[]
): Promise<Recipe> {
  const slug = nanoid(); // Generates a unique 21-character string

  const [newRecipe] = await db
    .insert(recipes)
    .values({
      title,
      url,
      labels,
      dateAdded: new Date(),
      slug,
    })
    .returning();

  revalidatePath("/");

  return newRecipe;
}

export async function getRecipes(): Promise<Recipe[]> {
  return await db.query.recipes.findMany();
}

export async function getRecipeById(id: number): Promise<Recipe | null> {
  const recipe = await db.query.recipes.findFirst({
    where: eq(recipes.id, id),
  });

  return recipe ?? null;
}

export async function getRecipeBySlug(slug: string): Promise<Recipe | null> {
  const recipe = await db.query.recipes.findFirst({
    where: eq(recipes.slug, slug),
  });

  return recipe ?? null;
}

export async function getFilteredRecipes(
  search?: string,
  sortBy: SortField = "date",
  order: SortOrder = "desc"
): Promise<Recipe[]> {
  return await db.query.recipes.findMany({
    where: search
      ? or(
          sql`LOWER(${recipes.title}) LIKE ${`%${search.toLowerCase()}%`}`,
          sql`EXISTS (
            SELECT 1 FROM unnest(${recipes.labels}) label
            WHERE LOWER(label) LIKE ${`%${search.toLowerCase()}%`}
          )`
        )
      : undefined,
    orderBy:
      sortBy === "date"
        ? order === "asc"
          ? asc(recipes.dateAdded)
          : desc(recipes.dateAdded)
        : order === "asc"
        ? asc(recipes.title)
        : desc(recipes.title),
  });
}

export async function updateRecipe(
  id: number,
  title?: string,
  url?: string,
  labels?: string[]
): Promise<Recipe | null> {
  const updates: Partial<Recipe> = {};
  if (title !== undefined) updates.title = title;
  if (url !== undefined) updates.url = url;
  if (labels !== undefined) updates.labels = labels;

  const [updated] = await db
    .update(recipes)
    .set(updates)
    .where(eq(recipes.id, id))
    .returning();

  revalidatePath("/");

  return updated ?? null;
}

export async function deleteRecipe(id: number): Promise<boolean> {
  const [deleted] = await db
    .delete(recipes)
    .where(eq(recipes.id, id))
    .returning();

  revalidatePath("/");

  return deleted !== undefined;
}
