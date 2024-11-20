import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface Request {
  id: string;
  method: string;
  url: string;
  headers: Record<string, string>;
  body?: string;
  createdAt: string;
}

export interface Collection {
  id: string;
  name: string;
  requests: Request[];
  createdAt: string;
  updatedAt: string;
}

interface AppState {
  collections: Collection[];
  history: Request[];
  theme: 'light' | 'dark';
  addCollection: (name: string) => void;
  addRequest: (collectionId: string, request: Omit<Request, 'id' | 'createdAt'>) => void;
  addToHistory: (request: Omit<Request, 'id' | 'createdAt'>) => void;
  setTheme: (theme: 'light' | 'dark') => void;
}

export const useStore = create<AppState>()(
  persist(
    (set) => ({
      collections: [],
      history: [],
      theme: 'light',
      addCollection: (name) =>
        set((state) => ({
          collections: [
            ...state.collections,
            {
              id: crypto.randomUUID(),
              name,
              requests: [],
              createdAt: new Date().toISOString(),
              updatedAt: new Date().toISOString(),
            },
          ],
        })),
      addRequest: (collectionId, request) =>
        set((state) => ({
          collections: state.collections.map((collection) =>
            collection.id === collectionId
              ? {
                  ...collection,
                  requests: [
                    ...collection.requests,
                    {
                      ...request,
                      id: crypto.randomUUID(),
                      createdAt: new Date().toISOString(),
                    },
                  ],
                  updatedAt: new Date().toISOString(),
                }
              : collection
          ),
        })),
      addToHistory: (request) =>
        set((state) => ({
          history: [
            {
              ...request,
              id: crypto.randomUUID(),
              createdAt: new Date().toISOString(),
            },
            ...state.history.slice(0, 99),
          ],
        })),
      setTheme: (theme) => set({ theme }),
    }),
    {
      name: 'rest-client-storage',
    }
  )
);