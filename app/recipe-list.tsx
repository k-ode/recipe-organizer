import {
  getFilteredRecipes,
  type SortField,
  type SortOrder,
} from "@/lib/actions/recipes";
import Link from "next/link";

type Props = {
  search?: string;
  sortBy?: SortField;
  order?: SortOrder;
};

export async function RecipeList({
  search,
  sortBy = "date",
  order = "desc",
}: Props) {
  const recipes = await getFilteredRecipes(search, sortBy, order);

  if (recipes.length === 0) {
    return <p className="text-gray-500 italic">Inga recept hittades...</p>;
  }

  return (
    <div className="space-y-4">
      {recipes.map((recipe) => (
        <div
          key={recipe.id}
          className="border p-4 rounded-lg flex justify-between items-start"
        >
          <div>
            <h2 className="font-bold">{recipe.title}</h2>
            <a
              href={recipe.url}
              className="text-blue-500 hover:underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              {recipe.url}
            </a>
            <div className="mt-2 flex gap-2">
              {recipe.labels?.map((label) => (
                <span
                  key={label}
                  className="bg-gray-100 px-2 py-1 rounded-full text-sm"
                >
                  {label}
                </span>
              ))}
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <Link
              href={`/recipe/${recipe.slug}`}
              className="bg-blue-200 hover:bg-gray-200 px-4 py-2 rounded-md text-sm font-medium transition-colors"
            >
              Redigera
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
}
