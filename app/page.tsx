import { RecipeList } from "@/components/recipe-list";
import { RecipeForm } from "@/components/recipe-form";
import { RecipeSearch } from "@/components/recipe-search";
import { Suspense } from "react";
import { getFilteredRecipes } from "@/lib/actions/recipes";

type Props = {
  searchParams: { 
    q?: string;
    sort?: 'date' | 'label';
    order?: 'asc' | 'desc';
  };
};

export default function Home({ searchParams }: Props) {
  return (
    <div className="min-h-screen p-8 bg-gray-900">
      <main className="max-w-4xl mx-auto p-4">
        <h1 className="text-2xl font-bold mb-8">Mina Recept</h1>

        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Lägg till nytt recept</h2>
          <RecipeForm />
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-4">Sparade recept</h2>
          <RecipeSearch />
          <Suspense fallback={<div>Laddar recept...</div>}>
            <RecipeList 
              search={searchParams.q}
              sortBy={searchParams.sort}
              order={searchParams.order}
            />
          </Suspense>
        </div>
      </main>
    </div>
  );
}
