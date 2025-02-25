# TODO: Recipe Organizer Web Application

This document serves as a comprehensive checklist to guide you step-by-step through the project, from initial setup to final polish. Check off each task as you complete it.

---

## Chunk 1: Project Setup

- [x] **Create Next.js App**
  - [x] Run `npx create-next-app@latest --typescript` to bootstrap the project.
  - [x] Verify the newly created project can run with `npm run dev` or `yarn dev`.

- [x] **Add TailwindCSS**
  - [x] Install Tailwind: `npm install -D tailwindcss postcss autoprefixer`
  - [x] Initialize Tailwind: `npx tailwindcss init -p`
  - [x] Configure `tailwind.config.js` to look at your project files.
  - [x] Import Tailwind styles in `globals.css`.
  - [x] Confirm Tailwind classes work (e.g., add a simple class in a page component).

- [x] **Project Verification**
  - [x] Open the local development URL and confirm the basic Next.js page loads.
  - [x] Confirm you can see Tailwind styling.

---

## Chunk 2: Database & Drizzle ORM

- [x] **Install Drizzle + PostgreSQL**
  - [x] `npm install drizzle-orm pg`
  - [x] Set up `.env` or `.env.local` with your `DATABASE_URL`.

- [x] **Drizzle Configuration**
  - [x] Create a file (e.g., `db/connection.ts`) to initialize Drizzle with Postgres.
  - [x] Ensure it reads the connection string from environment variables.

- [X] **Define Schema**
  - [X] In `db/schema.ts`, define a `recipes` table with:
    - `id` (serial primary key)
    - `title` (string)
    - `url` (string)
    - `labels` (text array)
    - `date_added` (timestamp)
  - [X] Export the schema objects (e.g. `recipes`).

- [X] **Migrations**
  - [X] Use Drizzle Kit (or your chosen migration tool) to generate a migration script.
  - [X] Run the migration to create the table in the database.
  - [X] Verify the table creation in your DB (e.g., via `psql` or a DB client).

---

## Chunk 3: Server Actions (CRUD)

- [x] **Set Up Directory**
  - [x] Create `server/actions/recipes.ts` (or a similar naming convention).

- [x] **Implement Create Action**
  - [x] Write a `createRecipe` function that inserts a new record into the `recipes` table.
  - [x] Return the newly created recipe object.

- [x] **Implement Read Actions**
  - [x] `getRecipes`: Fetch all recipes from the DB.
  - [x] `getRecipeById`: Fetch a single recipe by its `id`.

- [x] **Implement Update Action**
  - [x] `updateRecipe`: Given an `id`, update provided fields (`title`, `url`, `labels`).

- [x] **Implement Delete Action**
  - [x] `deleteRecipe`: Delete a recipe by `id`.

- [x] **Test in a Route**
  - [x] Create a temporary test route (e.g., `app/api/test/route.ts`) to confirm these actions work.
  - [x] Make sample API calls (e.g., using Postman or fetch) to verify functionality.

---

## Chunk 4: Front-End: Add & List Recipes

- [x] **Create `RecipeList` Component**
  - [x] Renders a list of existing recipes.
  - [x] Displays relevant recipe info (title, URL, labels, etc.).

- [x] **Create `RecipeForm` Component**
  - [x] Inputs: `title`, `url`, `labels` (simple comma-separated or a small labels UI).
  - [x] On submit, calls `createRecipe`.

- [x] **Integrate in Main Page (`app/page.tsx`)**
  - [x] Import and render both `RecipeList` and `RecipeForm`.
  - [x] Confirm that after submission, the list updates to show the new recipe (re-fetch or mutate client state).

- [x] **Visual Check**
  - [x] Load the page, add a new recipe, ensure it appears in the list.

---

## Chunk 5: Editing & Label Management

- [x] **Create Edit Page**
  - [x] In `app/recipe/[id]/page.tsx`, fetch the recipe by ID (`getRecipeById`).
  - [x] Prefill the form with the existing recipe data.

- [x] **Label Editing**
  - [x] Allow adding labels (typing a new label).
  - [x] Allow removing labels (e.g., via a small "x" button next to each label).
  - [x] Ensure they update via the `updateRecipe` action.

- [ ] **Navigation**
  - [ ] From the main page's recipe list, create a link/button to `/recipe/[id]`.
  - [ ] Confirm you can navigate, edit the recipe, and changes persist to the DB.

---

## Chunk 6: Search & Sort

- [x] **Search Implementation**
  - [x] Add a search bar to `app/page.tsx`.
  - [x] Decide on client-side filtering (fetch all, filter in-memory) or server-side:
    - [x] If client-side, maintain local state and filter array data.
    - [x] If server-side, pass search terms to a server action to fetch filtered results.
  - [x] Ensure partial matches and case-insensitive logic.

- [x] **Sorting**
  - [x] Provide controls for sorting by:
    - [x] Date (asc/desc)
    - [x] Label (asc/desc)
  - [x] Update the recipe list accordingly.

- [x] **Validation**
  - [x] Confirm searching by partial label or title works.
  - [x] Confirm sorting changes the order appropriately.

---

## Chunk 7: Share Links

- [ ] **Add `slug` Column**
  - [ ] Update `recipes` schema to include `slug` (unique, not null).
  - [ ] Generate a new migration, run it.

- [ ] **Generate Slugs**
  - [ ] Use a library like `nanoid` (or a custom function) in `createRecipe` to set `slug`.
  - [ ] Ensure uniqueness (either by library or checking DB collisions).

- [ ] **Shareable Route**
  - [ ] Create `app/recipe/[slug]/page.tsx`.
  - [ ] Fetch recipe by slug, not by ID.
  - [ ] Show same editing form as the ID route.

- [ ] **Test**
  - [ ] Confirm that sharing `/recipe/[slug]` works the same as `[id]` route for reading and editing.

---

## Chunk 8: Styling & Final Polish

- [ ] **Apply TailwindCSS**
  - [ ] Use a playful aesthetic (e.g., bright colors, rounded corners, etc.).
  - [ ] Refine the layout in `page.tsx`, `RecipeForm`, `RecipeList`, and so forth.

- [ ] **Inline Error Messages**
  - [ ] For create/update failures, show an error message (in Swedish).
  - [ ] For required fields (title, URL), show inline validation errors.

- [ ] **Swedish Localization**
  - [ ] Replace all placeholders in the UI with Swedish labels (e.g., "Titel", "Lägg till recept", etc.).
  - [ ] Error messages (e.g., "Ett fel uppstod vid uppdatering.").

- [ ] **Final Verification**
  - [ ] Navigate through the entire app (create, edit, search, share).
  - [ ] Confirm no broken links, no console errors.
  - [ ] Confirm the database reflects your changes.
  - [ ] Celebrate!

---
