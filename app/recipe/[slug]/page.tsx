import { EditRecipeForm } from "@/components/recipe-edit-form";
import {
  getRecipeBySlug,
  updateRecipe,
  type Recipe,
} from "@/lib/actions/recipes";
import { notFound } from "next/navigation";

type Props = {
  params: Promise<{
    slug: string;
  }>;
};

export default async function SharedRecipePage(props: Props) {
  const params = await props.params;
  const recipe = await getRecipeBySlug(params.slug);

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
