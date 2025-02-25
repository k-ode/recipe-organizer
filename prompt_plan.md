# Prompt 1: Initialize Next.js, TypeScript, TailwindCSS

Please generate a shell script that:
1. Creates a new Next.js application with TypeScript using "create-next-app".
2. Installs and configures TailwindCSS for styling.
3. Creates a basic "page.tsx" with a minimal Tailwind layout to confirm everything is working.
Make sure there are comments explaining each step and how to run the project afterwards.

# Prompt 2: Configure Drizzle & PostgreSQL

We now have a Next.js + Tailwind project. We want to:

1. Install Drizzle ORM and PostgreSQL dependency.
2. Create a `db/connection.ts` that initializes Drizzle with a Postgres connection, pulling the connection string from environment variables.
3. Create a `db/schema.ts` with a `recipes` table that has:
   - id (primary key, serial),
   - title (string),
   - url (string),
   - labels (text array),
   - date_added (timestamp with time zone).
4. Generate a migration script and run it.

Include example environment variables in a `.env.example` file (like `DATABASE_URL`). Provide instructions on how to run the migration.

# Prompt 3: Create Server Actions for CRUD

We have a Drizzle setup with a `recipes` table. Now, let's create server actions in Next.js. Specifically, we want a file `server/actions/recipes.ts` with the following exported functions:

1. `createRecipe(title: string, url: string, labels: string[]): Promise<Recipe>`
2. `getRecipes(): Promise<Recipe[]>`
3. `getRecipeById(id: number): Promise<Recipe | null>`
4. `updateRecipe(id: number, title?: string, url?: string, labels?: string[]): Promise<Recipe | null>`
5. `deleteRecipe(id: number): Promise<boolean>`

Return type `Recipe` should match the table columns. Use Drizzle to perform the queries. Show how we might test them temporarily, for example with a test route in `app/api/test/route.ts`.

# Prompt 4: Front-End: Add & List Recipes

Now let's create front-end components in Next.js to add and list recipes:

1. In `app/page.tsx`, create a `RecipeList` component that fetches and displays all recipes. 
2. Create a `RecipeForm` component that has fields (title, url, labels) and a submit button to call `createRecipe`.
3. After a new recipe is created, the list should re-fetch or update automatically.
4. Show how to integrate `RecipeForm` and `RecipeList` in `page.tsx`.

Ensure we're following React best practices with server actions or client components as needed. Provide complete files for `app/page.tsx` and any additional files.

# Prompt 5: Edit & Label Management

Now we want to implement editing a recipe, including label management:

1. Create a new page at `app/recipe/[id]/page.tsx` that:
   - Fetches the recipe by ID using `getRecipeById`.
   - Shows an edit form with pre-filled fields (title, url, labels).
2. On submit, calls `updateRecipe` to persist changes.
3. Ensure we can add and remove labels (like a small UI control).
4. Provide TypeScript definitions and show how we navigate to `/recipe/[id]` from the main page.

Please generate the complete code for `app/recipe/[id]/page.tsx` and any utility component needed (like a label editor).

# Prompt 6: Search & Sort

We now want to add search and sorting functionality:

1. Add a search bar to `page.tsx` that filters recipes by title or label (case-insensitive, partial matches).
2. Add sort controls (by date and by label, ascending or descending).
3. Decide if search/sort are done client-side or via a server action (explain which approach you're taking and why).
4. Generate the updated `page.tsx` code, explaining how state or server actions handle the results.

We already have a list of recipes and a create form, so update that existing code rather than rewriting from scratch.

# Prompt 7: Share Links

We want each recipe to have a shareable URL that doesn't require authentication to edit:

1. Add a `slug` column to the `recipes` table (unique, not null).
2. Update creation logic to generate a unique slug (for example, `nanoid` or some slug library).
3. Display a "Share" button that copies the link `/recipe/[slug]`.
4. Create a new page `app/recipe/[slug]/page.tsx` that loads a recipe via `slug` and shows the same edit form.

Include a database migration for the slug column. Show how you ensure uniqueness. Provide the updated code.

# Prompt 8: Styling & Final Polish

Finally, let's apply TailwindCSS and add inline error messages in Swedish:

1. Update all existing pages (`app/page.tsx`, `app/recipe/[slug]/page.tsx`) to have playful Tailwind styling.
2. For error handling (e.g., if an update fails), display inline error messages in Swedish. For example, "Ett fel uppstod vid uppdatering."
3. Ensure all field labels, placeholders, and button text are in Swedish.
4. Generate the final code for all updated files, with a brief explanation of the design approach.
