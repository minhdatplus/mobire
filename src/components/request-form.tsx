"use client";

import { useState } from 'react';
import axios from 'axios';
import { useStore } from '@/lib/store';

const HTTP_METHODS = ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'HEAD', 'OPTIONS'];

export function RequestForm() {
  const [method, setMethod] = useState('GET');
  const [url, setUrl] = useState('');
  const [headers, setHeaders] = useState<Record<string, string>>({});
  const [body, setBody] = useState('');
  const [response, setResponse] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const addToHistory = useStore((state) => state.addToHistory);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const startTime = Date.now();
      const res = await axios({
        method,
        url,
        headers,
        data: body ? JSON.parse(body) : undefined,
      });
      const endTime = Date.now();

      const responseData = {
        status: res.status,
        data: res.data,
        time: endTime - startTime,
        headers: res.headers,
      };

      setResponse(responseData);
      addToHistory({ method, url, headers, body });
    } catch (error: any) {
      setResponse({
        error: true,
        message: error.message,
        status: error.response?.status,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex gap-2">
          <select
            value={method}
            onChange={(e) => setMethod(e.target.value)}
            className="border rounded p-2"
          >
            {HTTP_METHODS.map((m) => (
              <option key={m} value={m}>
                {m}
              </option>
            ))}
          </select>
          <input
            type="url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="Enter URL"
            className="flex-1 border rounded p-2"
            required
          />
        </div>

        <div>
          <h3 className="font-semibold mb-2">Headers</h3>
          <textarea
            value={JSON.stringify(headers, null, 2)}
            onChange={(e) => {
              try {
                setHeaders(JSON.parse(e.target.value));
              } catch {}
            }}
            placeholder="Enter headers as JSON"
            className="w-full h-32 border rounded p-2 font-mono"
          />
        </div>

        <div>
          <h3 className="font-semibold mb-2">Body</h3>
          <textarea
            value={body}
            onChange={(e) => setBody(e.target.value)}
            placeholder="Enter request body as JSON"
            className="w-full h-32 border rounded p-2 font-mono"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="bg-primary text-primary-foreground px-4 py-2 rounded"
        >
          {loading ? 'Sending...' : 'Send Request'}
        </button>
      </form>

      {response && (
        <div className="mt-8">
          <h3 className="font-semibold mb-2">Response</h3>
          <div className="border rounded p-4">
            <div className="flex gap-4 mb-4">
              <span className="font-semibold">Status: {response.status}</span>
              {response.time && (
                <span className="font-semibold">Time: {response.time}ms</span>
              )}
            </div>
            <pre className="bg-muted p-4 rounded overflow-auto">
              {JSON.stringify(response.data || response.message, null, 2)}
            </pre>
          </div>
        </div>
      )}
    </div>
  );
}