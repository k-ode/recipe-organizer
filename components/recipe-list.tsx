import { getFilteredRecipes } from '@/lib/actions/recipes';
import type { SortField, SortOrder } from '@/lib/actions/recipes';

type Props = {
  search?: string;
  sortBy?: SortField;
  order?: SortOrder;
};

export async function RecipeList({ search, sortBy = 'date', order = 'desc' }: Props) {
  const recipes = await getFilteredRecipes(search, sortBy, order);

  if (recipes.length === 0) {
    return <p className="text-gray-500 italic">Inga recept hittades...</p>;
  }

  return (
    <div className="space-y-4">
      {recipes.map((recipe) => (
        <div key={recipe.id} className="border p-4 rounded-lg">
          <h2 className="font-bold">{recipe.title}</h2>
          <a href={recipe.url} className="text-blue-500 hover:underline" target="_blank" rel="noopener noreferrer">
            {recipe.url}
          </a>
          <div className="mt-2 flex gap-2">
            {recipe.labels?.map((label) => (
              <span key={label} className="bg-gray-100 px-2 py-1 rounded-full text-sm">
                {label}
              </span>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
