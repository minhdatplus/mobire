"use client";

import { useStore } from '@/lib/store';

export function History() {
  const history = useStore((state) => state.history);

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Request History</h2>
      <div className="space-y-2">
        {history.map((request) => (
          <div key={request.id} className="border rounded p-4">
            <div className="flex justify-between items-center mb-2">
              <span className="font-semibold">{request.method}</span>
              <span className="text-sm text-muted-foreground">
                {new Date(request.createdAt).toLocaleString()}
              </span>
            </div>
            <p className="text-sm truncate">{request.url}</p>
          </div>
        ))}
      </div>
    </div>
  );
}