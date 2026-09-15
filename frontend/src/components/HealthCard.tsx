"use client";

import { useEffect, useState, useCallback } from "react";
import { Activity, Database, CheckCircle2, AlertCircle, RefreshCw } from "lucide-react";
import { api } from "@/lib/api";

interface HealthState {
  status: string;
  database: string;
  environment: string;
}

export function HealthCard() {
  const [health, setHealth] = useState<HealthState | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchHealth = useCallback(async () => {
    setError(null);
    try {
      const { data, error: apiError } = await api.GET("/api/v1/health");
      if (apiError) {
        setError("API returned an error response");
      } else if (data) {
        setHealth(data);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to connect to backend");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    let isMounted = true;

    async function load() {
      try {
        const { data, error: apiError } = await api.GET("/api/v1/health");
        if (!isMounted) return;
        if (apiError) {
          setError("API returned an error response");
        } else if (data) {
          setHealth(data);
        }
      } catch (err) {
        if (isMounted) {
          setError(err instanceof Error ? err.message : "Failed to connect to backend");
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }

    load();
    return () => {
      isMounted = false;
    };
  }, []);

  const handleRefresh = async () => {
    setLoading(true);
    await fetchHealth();
  };

  const isHealthy = health?.status === "ok" && health?.database === "connected";

  return (
    <div className="rounded-xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-950">
      <div className="flex items-center justify-between pb-4 border-b border-zinc-100 dark:border-zinc-800">
        <div className="flex items-center gap-2">
          <Activity className="h-5 w-5 text-emerald-500" />
          <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">
            System Connectivity
          </h2>
        </div>
        <button
          onClick={handleRefresh}
          disabled={loading}
          className="flex items-center gap-1.5 text-xs font-medium text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-50 transition-colors disabled:opacity-50"
          aria-label="Refresh health status"
        >
          <RefreshCw className={`h-3.5 w-3.5 ${loading ? "animate-spin" : ""}`} />
          Refresh
        </button>
      </div>

      <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Backend Status */}
        <div className="flex items-start gap-3 rounded-lg bg-zinc-50 p-3.5 dark:bg-zinc-900">
          {loading ? (
            <div className="h-4 w-4 animate-spin rounded-full border-2 border-zinc-400 border-t-transparent mt-0.5" />
          ) : error || !health ? (
            <AlertCircle className="h-5 w-5 text-rose-500 shrink-0 mt-0.5" />
          ) : (
            <CheckCircle2 className="h-5 w-5 text-emerald-500 shrink-0 mt-0.5" />
          )}
          <div>
            <div className="text-xs font-medium text-zinc-500 dark:text-zinc-400">
              FastAPI Backend
            </div>
            <div className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
              {loading
                ? "Checking..."
                : error
                ? "Offline"
                : health?.status.toUpperCase() ?? "OFFLINE"}
            </div>
          </div>
        </div>

        {/* Database Status */}
        <div className="flex items-start gap-3 rounded-lg bg-zinc-50 p-3.5 dark:bg-zinc-900">
          <Database className="h-5 w-5 text-blue-500 shrink-0 mt-0.5" />
          <div>
            <div className="text-xs font-medium text-zinc-500 dark:text-zinc-400">
              PostgreSQL 17
            </div>
            <div className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
              {loading
                ? "Checking..."
                : error
                ? "Unavailable"
                : health?.database}
            </div>
          </div>
        </div>
      </div>

      {error && (
        <div className="mt-3 rounded-md bg-rose-50 p-2.5 text-xs text-rose-700 dark:bg-rose-950/50 dark:text-rose-300">
          {error} — ensure backend is running (`make dev` or `cd backend && uv run uvicorn app.main:app`)
        </div>
      )}

      {isHealthy && (
        <div className="mt-3 text-xs text-emerald-600 dark:text-emerald-400 flex items-center gap-1.5">
          <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
          End-to-end full-stack contract active ({health.environment} environment)
        </div>
      )}
    </div>
  );
}
