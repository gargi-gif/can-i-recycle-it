import { useEffect } from "react";
import { ArrowRight, Check, Moon, Recycle, Sun, X } from "lucide-react";
import { CATEGORIES, ITEMS } from "./data/items.js";
import { MISJUDGED } from "./data/misjudged.js";
import { useDarkMode } from "./useDarkMode.js";

const byId = Object.fromEntries(ITEMS.map((i) => [i.id, i]));

function MiniBadge({ recyclable }) {
  return recyclable ? (
    <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/10 px-2.5 py-0.5 text-xs font-semibold text-emerald-700 ring-1 ring-emerald-500/30 dark:text-emerald-400">
      <Check size={12} strokeWidth={3} aria-hidden="true" />
      Recyclable
    </span>
  ) : (
    <span className="inline-flex items-center gap-1 rounded-full bg-zinc-500/10 px-2.5 py-0.5 text-xs font-semibold text-zinc-600 ring-1 ring-zinc-500/25 dark:text-zinc-300">
      <X size={12} strokeWidth={3} aria-hidden="true" />
      Not recyclable
    </span>
  );
}

export default function GuidePage() {
  const [dark, setDark] = useDarkMode();

  useEffect(() => {
    document.title = "The Most Misjudged Recyclables — Can I Recycle It?";
  }, []);

  return (
    <div className="min-h-dvh bg-zinc-50 text-zinc-900 selection:bg-emerald-500/20 dark:bg-zinc-950 dark:text-zinc-50">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-[-20rem] h-[36rem] bg-[radial-gradient(ellipse_at_center,rgba(16,185,129,0.08),transparent_65%)]"
      />

      <header className="relative flex items-center justify-between px-6 py-5 sm:px-10">
        <a href="/" className="flex items-center gap-2.5 font-bold tracking-tight">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-zinc-900 text-zinc-50 dark:bg-zinc-50 dark:text-zinc-900">
            <Recycle size={17} strokeWidth={2.25} aria-hidden="true" />
          </span>
          Can I Recycle It?
        </a>
        <button
          type="button"
          onClick={() => setDark((d) => !d)}
          aria-label={dark ? "Switch to light mode" : "Switch to dark mode"}
          className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full text-zinc-500 transition-colors duration-200 hover:bg-zinc-900/5 hover:text-zinc-900 focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:outline-none dark:text-zinc-400 dark:hover:bg-white/10 dark:hover:text-zinc-50"
        >
          {dark ? <Sun size={19} aria-hidden="true" /> : <Moon size={19} aria-hidden="true" />}
        </button>
      </header>

      <main className="relative mx-auto max-w-3xl px-6 pt-8 pb-24 sm:pt-14">
        <h1 className="text-4xl font-extrabold tracking-[-0.04em] text-balance sm:text-5xl">
          The most misjudged recyclables
        </h1>
        <p className="mt-4 max-w-xl text-base text-zinc-500 sm:text-lg dark:text-zinc-400">
          Twelve everyday items almost everyone bins wrong — and what the latest
          guidance actually says. Every verdict is sourced.
        </p>

        <ol className="mt-12 space-y-5">
          {MISJUDGED.map((entry, i) => {
            const item = byId[entry.id];
            if (!item) return null;
            const cat = CATEGORIES[item.category];
            const Icon = item.icon;
            return (
              <li
                key={entry.id}
                className={`rounded-2xl border border-zinc-900/10 p-5 sm:p-6 dark:border-white/10 ${cat.tint}`}
              >
                <div className="flex items-start gap-4">
                  <span
                    className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl ${cat.tile}`}
                  >
                    <Icon size={24} strokeWidth={1.75} className={cat.iconTint} aria-hidden="true" />
                  </span>
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                      <span className="text-xs font-semibold tracking-[0.12em] text-zinc-500 uppercase tabular-nums dark:text-zinc-400">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <h2 className="text-lg font-bold tracking-tight">{item.name}</h2>
                      <MiniBadge recyclable={item.recyclable} />
                    </div>
                    <p className="mt-2 text-sm text-zinc-500 dark:text-zinc-400">
                      <span className="font-medium">Myth:</span> {entry.myth}
                    </p>
                    <p className="mt-1 text-sm leading-relaxed text-zinc-700 dark:text-zinc-200">
                      {entry.truth}
                    </p>
                    <a
                      href={`/item/${item.id}`}
                      className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-emerald-700 transition-colors hover:text-emerald-600 focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:outline-none dark:text-emerald-400"
                    >
                      How to dispose of it
                      <ArrowRight size={15} aria-hidden="true" />
                    </a>
                  </div>
                </div>
              </li>
            );
          })}
        </ol>

        <div className="mt-14 rounded-2xl border border-zinc-200 bg-white/60 p-8 text-center backdrop-blur-sm dark:border-white/10 dark:bg-zinc-900/50">
          <p className="text-lg font-bold tracking-tight">Not on the list?</p>
          <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
            Search any of 227 household items for an instant answer.
          </p>
          <a
            href="/"
            className="mt-5 inline-flex items-center gap-2 rounded-full bg-zinc-900 px-5 py-2.5 text-sm font-semibold text-zinc-50 transition-transform hover:scale-[1.02] active:scale-95 dark:bg-zinc-50 dark:text-zinc-900"
          >
            <Recycle size={16} strokeWidth={2.25} aria-hidden="true" />
            Check an item
          </a>
        </div>
      </main>
    </div>
  );
}
