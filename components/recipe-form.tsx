'use client';

import { createRecipe } from '@/lib/actions/recipes';
import { useState } from 'react';

export function RecipeForm() {
  const [title, setTitle] = useState('');
  const [url, setUrl] = useState('');
  const [labels, setLabels] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const labelArray = labels.split(',').map(l => l.trim()).filter(l => l !== '');
    
    try {
      await createRecipe(title, url, labelArray);
      setTitle('');
      setUrl('');
      setLabels('');
    } catch (error) {
      console.error('Failed to create recipe:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="title" className="block">Titel</label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          className="w-full border p-2 rounded"
        />
      </div>

      <div>
        <label htmlFor="url" className="block">URL</label>
        <input
          type="url"
          id="url"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          required
          className="w-full border p-2 rounded"
        />
      </div>

      <div>
        <label htmlFor="labels" className="block">Etiketter (kommaseparerade)</label>
        <input
          type="text"
          id="labels"
          value={labels}
          onChange={(e) => setLabels(e.target.value)}
          className="w-full border p-2 rounded"
          placeholder="t.ex. middag, vegetariskt, snabbt"
        />
      </div>

      <button 
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        Lägg till recept
      </button>
    </form>
  );
}
