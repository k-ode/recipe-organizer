"use client";

import { createRecipe } from "@/lib/actions/recipes";
import { useState } from "react";

export function RecipeForm() {
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  const [labels, setLabels] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsSubmitting(true);

    if (!title.trim() || !url.trim()) {
      setError("Titel och URL måste fyllas i");
      setIsSubmitting(false);
      return;
    }

    const labelArray = labels
      .split(",")
      .map((l) => l.trim())
      .filter((l) => l !== "");

    try {
      await createRecipe(title, url, labelArray);
      setTitle("");
      setUrl("");
      setLabels("");
    } catch (error) {
      setError("Ett fel uppstod när receptet skulle sparas");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">
          {error}
        </div>
      )}

      <div className="space-y-2">
        <label htmlFor="title" className="block text-gray-700 text-sm">
          Titel
        </label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          className="w-full bg-gray-50 border border-gray-300 text-gray-900 p-3 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none placeholder-gray-500"
          placeholder="T.ex. Pasta al limone"
        />
      </div>

      <div className="space-y-2">
        <label htmlFor="url" className="block text-gray-700 text-sm">
          URL
        </label>
        <input
          type="url"
          id="url"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          required
          className="w-full bg-gray-50 border border-gray-300 text-gray-900 p-3 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none placeholder-gray-500"
          placeholder="https://example.com/recept"
        />
      </div>

      <div className="space-y-2">
        <label htmlFor="labels" className="block text-gray-700 text-sm">
          Etiketter
        </label>
        <input
          type="text"
          id="labels"
          value={labels}
          onChange={(e) => setLabels(e.target.value)}
          className="w-full bg-gray-50 border border-gray-300 text-gray-900 p-3 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
          placeholder="potatis, pasta, ris"
        />
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className={`w-full bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg font-medium
          transform transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]
          disabled:opacity-50 disabled:cursor-not-allowed ${
            isSubmitting ? "animate-pulse" : ""
          }`}
      >
        {isSubmitting ? "Sparar..." : "Lägg till recept"}
      </button>
    </form>
  );
}
