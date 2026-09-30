"use client";

import { useEffect, useState } from "react";
import { Plus, Trash2, ListTodo, Loader2 } from "lucide-react";
import { api } from "@/lib/api";
import type { components } from "@/lib/types/api";

type Item = components["schemas"]["ItemRead"];

export function ItemsManager() {
  const [items, setItems] = useState<Item[]>([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    async function loadItems() {
      try {
        const { data, error: apiError } = await api.GET("/api/v1/items");
        if (!isMounted) return;
        if (apiError) {
          setError("Failed to load items from server");
        } else if (data) {
          setItems(data);
        }
      } catch (err) {
        if (isMounted) {
          setError(
            err instanceof Error ? err.message : "Error connecting to backend",
          );
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }

    loadItems();
    return () => {
      isMounted = false;
    };
  }, []);

  const handleCreateItem = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    setSubmitting(true);
    setError(null);
    try {
      const { data, error: apiError } = await api.POST("/api/v1/items", {
        body: {
          title: title.trim(),
          description: description.trim() || null,
        },
      });

      if (apiError) {
        setError("Failed to create item");
      } else if (data) {
        setItems((prev) => [data, ...prev]);
        setTitle("");
        setDescription("");
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to create item");
    } finally {
      setSubmitting(false);
    }
  };

  const handleDeleteItem = async (id: number) => {
    try {
      const { error: apiError } = await api.DELETE("/api/v1/items/{item_id}", {
        params: {
          path: { item_id: id },
        },
      });

      if (apiError) {
        setError("Failed to delete item");
      } else {
        setItems((prev) => prev.filter((item) => item.id !== id));
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to delete item");
    }
  };

  return (
    <div className="rounded-xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-950">
      <div className="flex items-center gap-2 pb-4 border-b border-zinc-100 dark:border-zinc-800">
        <ListTodo className="h-5 w-5 text-indigo-500" />
        <div>
          <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">
            CRUD Demonstration (Items)
          </h2>
          <p className="text-xs text-zinc-500 dark:text-zinc-400">
            End-to-end data flow: React Client → openapi-fetch → FastAPI →
            SQLModel → PostgreSQL
          </p>
        </div>
      </div>

      {/* Creation Form */}
      <form
        onSubmit={handleCreateItem}
        className="mt-4 flex flex-col sm:flex-row gap-2"
      >
        <input
          type="text"
          placeholder="Item title (e.g. Build authentication)"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          className="flex-1 rounded-lg border border-zinc-200 bg-zinc-50 px-3.5 py-2 text-sm text-zinc-900 placeholder:text-zinc-400 focus:border-zinc-900 focus:outline-none dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-100 dark:focus:border-zinc-100"
        />
        <input
          type="text"
          placeholder="Description (optional)"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="flex-1 rounded-lg border border-zinc-200 bg-zinc-50 px-3.5 py-2 text-sm text-zinc-900 placeholder:text-zinc-400 focus:border-zinc-900 focus:outline-none dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-100 dark:focus:border-zinc-100"
        />
        <button
          type="submit"
          disabled={submitting || !title.trim()}
          className="flex items-center justify-center gap-1.5 rounded-lg bg-zinc-900 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-zinc-800 disabled:opacity-50 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-200"
        >
          {submitting ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <Plus className="h-4 w-4" />
          )}
          Add
        </button>
      </form>

      {error && (
        <div className="mt-3 rounded-md bg-rose-50 p-2.5 text-xs text-rose-700 dark:bg-rose-950/50 dark:text-rose-300">
          {error}
        </div>
      )}

      {/* Items List */}
      <div className="mt-6 space-y-2">
        {loading ? (
          <div className="flex items-center justify-center py-8 text-zinc-400">
            <Loader2 className="h-5 w-5 animate-spin mr-2" /> Loading items...
          </div>
        ) : items.length === 0 ? (
          <div className="py-8 text-center text-sm text-zinc-500 dark:text-zinc-400 border border-dashed border-zinc-200 rounded-lg dark:border-zinc-800">
            No items in database. Add an item above or run{" "}
            <code className="bg-zinc-100 px-1 py-0.5 rounded text-xs dark:bg-zinc-800">
              make db-seed
            </code>
            .
          </div>
        ) : (
          items.map((item) => (
            <div
              key={item.id}
              className="flex items-center justify-between rounded-lg border border-zinc-100 bg-zinc-50 p-3.5 transition-colors hover:border-zinc-200 dark:border-zinc-800/80 dark:bg-zinc-900/60 dark:hover:border-zinc-700"
            >
              <div>
                <div className="text-sm font-medium text-zinc-900 dark:text-zinc-100">
                  {item.title}
                </div>
                {item.description && (
                  <div className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">
                    {item.description}
                  </div>
                )}
                <div className="text-[10px] text-zinc-400 dark:text-zinc-500 mt-1">
                  ID: #{item.id} · Created{" "}
                  {new Date(item.created_at).toLocaleTimeString()}
                </div>
              </div>
              <button
                onClick={() => handleDeleteItem(item.id)}
                className="p-1.5 text-zinc-400 hover:text-rose-600 dark:hover:text-rose-400 transition-colors rounded-md hover:bg-zinc-200/50 dark:hover:bg-zinc-800"
                aria-label={`Delete item ${item.title}`}
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
