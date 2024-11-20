"use client";

import { useState } from 'react';
import { useStore } from '@/lib/store';

export function Collections() {
  const [newCollectionName, setNewCollectionName] = useState('');
  const { collections, addCollection } = useStore();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newCollectionName.trim()) {
      addCollection(newCollectionName.trim());
      setNewCollectionName('');
    }
  };

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Collections</h2>
      
      <form onSubmit={handleSubmit} className="flex gap-2">
        <input
          type="text"
          value={newCollectionName}
          onChange={(e) => setNewCollectionName(e.target.value)}
          placeholder="New Collection Name"
          className="flex-1 border rounded p-2"
        />
        <button
          type="submit"
          className="bg-primary text-primary-foreground px-4 py-2 rounded"
        >
          Add Collection
        </button>
      </form>

      <div className="space-y-4">
        {collections.map((collection) => (
          <div key={collection.id} className="border rounded p-4">
            <h3 className="font-semibold mb-2">{collection.name}</h3>
            <div className="text-sm text-muted-foreground">
              {collection.requests.length} requests
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}