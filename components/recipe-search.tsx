'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useCallback } from 'react';
import type { SortField, SortOrder } from '@/lib/actions/recipes';

export function RecipeSearch() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const updateQuery = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      if (value) {
        params.set(name, value);
      } else {
        params.delete(name);
      }
      router.replace(`/?${params.toString()}`);
    },
    [router, searchParams]
  );

  return (
    <div className="space-y-4 mb-8">
      <div>
        <label htmlFor="search" className="block mb-2">Sök recept</label>
        <input
          type="search"
          id="search"
          className="w-full border p-2 rounded"
          placeholder="Sök på titel eller etikett..."
          defaultValue={searchParams.get('q') ?? ''}
          onChange={(e) => updateQuery('q', e.target.value)}
        />
      </div>

      <div className="flex gap-4">
        <div>
          <label htmlFor="sort" className="block mb-2">Sortera efter</label>
          <select
            id="sort"
            className="border p-2 rounded"
            defaultValue={searchParams.get('sort') ?? 'date'}
            onChange={(e) => updateQuery('sort', e.target.value)}
          >
            <option value="date">Datum</option>
            <option value="label">Etikett</option>
          </select>
        </div>

        <div>
          <label htmlFor="order" className="block mb-2">Ordning</label>
          <select
            id="order"
            className="border p-2 rounded"
            defaultValue={searchParams.get('order') ?? 'desc'}
            onChange={(e) => updateQuery('order', e.target.value)}
          >
            <option value="desc">Fallande</option>
            <option value="asc">Stigande</option>
          </select>
        </div>
      </div>
    </div>
  );
}
