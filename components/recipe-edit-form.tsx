"use client";

import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import type { Recipe } from "@/lib/actions/recipes";

type EditRecipeFormProps = {
  recipe: Recipe;
  onSubmit: (recipe: Partial<Recipe> & { id: number }) => Promise<void>;
};

export function EditRecipeForm({ recipe, onSubmit }: EditRecipeFormProps) {
  const router = useRouter();
  const [title, setTitle] = useState(recipe.title);
  const [url, setUrl] = useState(recipe.url);
  const [labels, setLabels] = useState<string[]>(recipe.labels ?? []);
  const [newLabel, setNewLabel] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      await onSubmit({
        id: recipe.id,
        title,
        url,
        labels,
      });
      router.push("/");
      router.refresh();
    } catch (err) {
      setError("Ett fel uppstod vid uppdatering av receptet");
    }
  };

  const addLabel = () => {
    if (newLabel.trim() && !labels.includes(newLabel.trim())) {
      setLabels([...labels, newLabel.trim()]);
      setNewLabel("");
    }
  };

  const removeLabel = (labelToRemove: string) => {
    setLabels(labels.filter((label) => label !== labelToRemove));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700">Titel</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">URL</label>
        <input
          type="url"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Etiketter
        </label>
        <div className="flex gap-2 flex-wrap mt-2">
          {labels.map((label) => (
            <span
              key={label}
              className="bg-blue-100 px-2 py-1 rounded-md flex items-center"
            >
              {label}
              <button
                type="button"
                onClick={() => removeLabel(label)}
                className="ml-2 text-red-500"
              >
                ×
              </button>
            </span>
          ))}
        </div>
        <div className="flex mt-2">
          <input
            type="text"
            value={newLabel}
            onChange={(e) => setNewLabel(e.target.value)}
            className="flex-1 rounded-l-md border border-gray-300 px-3 py-2"
            placeholder="Lägg till etikett"
          />
          <button
            type="button"
            onClick={addLabel}
            className="bg-blue-500 text-white px-4 py-2 rounded-r-md"
          >
            +
          </button>
        </div>
      </div>

      {error && <p className="text-red-500">{error}</p>}

      <button
        type="submit"
        className="bg-green-500 text-white px-4 py-2 rounded-md"
      >
        Spara ändringar
      </button>
    </form>
  );
}
