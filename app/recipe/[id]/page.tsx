import { EditRecipeForm } from "@/components/recipe-edit-form";
import {
  getRecipeById,
  updateRecipe,
  type Recipe,
} from "@/lib/actions/recipes";
import { notFound } from "next/navigation";

type Props = {
  params: {
    id: string;
  };
};

export default async function EditRecipePage({ params }: Props) {
  const recipe = await getRecipeById(parseInt(params.id));

  if (!recipe) {
    notFound();
  }

  const handleUpdate = async (
    updatedRecipe: Partial<Recipe> & { id: number }
  ) => {
    "use server";
    await updateRecipe(
      updatedRecipe.id,
      updatedRecipe.title,
      updatedRecipe.url,
      updatedRecipe.labels ?? []
    );
  };

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Redigera recept</h1>
      <EditRecipeForm recipe={recipe} onSubmit={handleUpdate} />
    </div>
  );
}
