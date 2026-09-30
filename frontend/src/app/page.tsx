import { HealthCard } from "@/components/HealthCard";
import { ItemsManager } from "@/components/ItemsManager";
import { Bot, Terminal, FileCode2, Sparkles } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-zinc-50 text-zinc-900 dark:bg-black dark:text-zinc-50">
      <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8 space-y-8">
        {/* Header */}
        <header className="space-y-3">
          <div className="inline-flex items-center gap-2 rounded-full border border-indigo-200 bg-indigo-50/50 px-3 py-1 text-xs font-medium text-indigo-700 dark:border-indigo-900/50 dark:bg-indigo-950/40 dark:text-indigo-300">
            <Sparkles className="h-3.5 w-3.5" />
            Production Agentic Full-Stack Template
          </div>
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Next.js 16 + FastAPI
          </h1>
          <p className="text-sm sm:text-base text-zinc-600 dark:text-zinc-400 max-w-2xl">
            Engineered for high-autonomy AI coding agents and developers:
            single-source SQLModel data layer, automated OpenAPI TypeScript
            generation, and deterministic verification workflows.
          </p>
        </header>

        {/* Quick Agent Cheatsheet */}
        <div className="rounded-xl border border-zinc-200 bg-white p-4 shadow-sm dark:border-zinc-800 dark:bg-zinc-950">
          <div className="flex items-center gap-2 pb-2 text-xs font-semibold text-zinc-500 uppercase tracking-wider dark:text-zinc-400">
            <Terminal className="h-4 w-4" /> Agent & Developer Commands (Run
            from root)
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2 text-xs font-mono">
            <div className="rounded bg-zinc-100 p-2 dark:bg-zinc-900">
              <span className="text-indigo-600 dark:text-indigo-400 font-bold">
                make check
              </span>
              <div className="text-[11px] text-zinc-500 dark:text-zinc-400 font-sans mt-0.5">
                Full lint, typecheck & tests
              </div>
            </div>
            <div className="rounded bg-zinc-100 p-2 dark:bg-zinc-900">
              <span className="text-indigo-600 dark:text-indigo-400 font-bold">
                make codegen
              </span>
              <div className="text-[11px] text-zinc-500 dark:text-zinc-400 font-sans mt-0.5">
                Sync OpenAPI → TypeScript
              </div>
            </div>
            <div className="rounded bg-zinc-100 p-2 dark:bg-zinc-900">
              <span className="text-indigo-600 dark:text-indigo-400 font-bold">
                make test
              </span>
              <div className="text-[11px] text-zinc-500 dark:text-zinc-400 font-sans mt-0.5">
                Run pytest & vitest
              </div>
            </div>
            <div className="rounded bg-zinc-100 p-2 dark:bg-zinc-900">
              <span className="text-indigo-600 dark:text-indigo-400 font-bold">
                make dev
              </span>
              <div className="text-[11px] text-zinc-500 dark:text-zinc-400 font-sans mt-0.5">
                Start Docker services
              </div>
            </div>
          </div>
        </div>

        {/* Main Grid: Health & CRUD */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-1">
          <HealthCard />
          <ItemsManager />
        </div>

        {/* Footer / Documentation Links */}
        <footer className="pt-6 border-t border-zinc-200 dark:border-zinc-800 flex flex-col sm:flex-row items-center justify-between text-xs text-zinc-500 dark:text-zinc-400 gap-4">
          <div className="flex items-center gap-2">
            <Bot className="h-4 w-4 text-zinc-400" />
            Agent instructions active in{" "}
            <code className="font-mono text-zinc-700 dark:text-zinc-300">
              AGENTS.md
            </code>
          </div>
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1">
              <FileCode2 className="h-3.5 w-3.5" /> docs/architecture
            </span>
            <span>·</span>
            <span>.agents/skills</span>
          </div>
        </footer>
      </div>
    </div>
  );
}
