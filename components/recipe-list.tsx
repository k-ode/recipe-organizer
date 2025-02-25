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

  const copyShareLink = async (slug: string) => {
    const url = `${window.location.origin}/recipe/${slug}`;
    await navigator.clipboard.writeText(url);
  };

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
          <Link
            href={`/recipe/${recipe.id}`}
            className="bg-gray-100 hover:bg-gray-200 px-4 py-2 rounded-md text-sm font-medium transition-colors"
          >
            Redigera
          </Link>
          <button
            onClick={() => copyShareLink(recipe.slug)}
            className="bg-blue-100 hover:bg-blue-200 px-4 py-2 rounded-md text-sm font-medium transition-colors"
          >
            Kopiera delningslänk
          </button>
        </div>
      ))}
    </div>
  );
}
