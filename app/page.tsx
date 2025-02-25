import { RecipeList } from "@/app/recipe-list";
import { RecipeForm } from "@/components/recipe-form";
import { RecipeSearch } from "@/components/recipe-search";
import { Suspense } from "react";

type Props = {
  searchParams: Promise<{
    q?: string;
    sort?: "date" | "label";
    order?: "asc" | "desc";
  }>;
};

export default async function Home(props: Props) {
  const searchParams = await props.searchParams;
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
      <main className="max-w-4xl mx-auto p-8">
        <h1 className="text-4xl font-bold mb-12 text-gray-800 text-center">
          🍽️ Mina Favoritrecept
        </h1>

        <div className="bg-white rounded-xl p-6 mb-8 shadow-md">
          <h2 className="text-2xl font-semibold mb-6 text-gray-800">
            Lägg till nytt recept
          </h2>
          <RecipeForm />
        </div>

        <div className="bg-white rounded-xl p-6 shadow-md">
          <h2 className="text-2xl font-semibold mb-6 text-gray-800">
            Sparade recept
          </h2>
          <RecipeSearch />
          <Suspense
            fallback={
              <div className="text-gray-600 text-center py-8 animate-pulse">
                Laddar recept...
              </div>
            }
          >
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
