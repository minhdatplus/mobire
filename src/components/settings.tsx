"use client";

import { useTheme } from './theme-provider';
import { useStore } from '@/lib/store';

export function Settings() {
  const { theme, setTheme } = useTheme();
  const collections = useStore((state) => state.collections);
  const history = useStore((state) => state.history);

  const handleExport = () => {
    const data = {
      collections,
      history,
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], {
      type: 'application/json',
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'rest-client-data.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold mb-4">Settings</h2>
        
        <div className="space-y-4">
          <div>
            <h3 className="font-medium mb-2">Theme</h3>
            <select
              value={theme}
              onChange={(e) => setTheme(e.target.value as 'light' | 'dark' | 'system')}
              className="border rounded p-2"
            >
              <option value="light">Light</option>
              <option value="dark">Dark</option>
              <option value="system">System</option>
            </select>
          </div>

          <div>
            <h3 className="font-medium mb-2">Data Management</h3>
            <button
              onClick={handleExport}
              className="bg-primary text-primary-foreground px-4 py-2 rounded"
            >
              Export Data
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}