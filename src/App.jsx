import { useEffect, useMemo, useRef, useState } from "react";
import { track } from "@vercel/analytics";
import { Check, Moon, Recycle, Search, Sun, X } from "lucide-react";
import { CATEGORIES, ITEMS, searchItems } from "./data/items.js";
import { useDarkMode } from "./useDarkMode.js";

const SITE_TITLE = "Can I Recycle It? — Know before you throw";

// Deep-link: /item/<id> opens that item directly and is shareable.
function itemFromPath() {
  const m = window.location.pathname.match(/^\/item\/([a-z0-9-]+)\/?$/);
  return m ? (ITEMS.find((i) => i.id === m[1]) ?? null) : null;
}

function Badge({ recyclable }) {
  return recyclable ? (
    <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/10 px-3 py-1 text-sm font-semibold text-emerald-700 ring-1 ring-emerald-500/30 dark:text-emerald-400">
      <Check size={15} strokeWidth={3} aria-hidden="true" />
      Recyclable
    </span>
  ) : (
    <span className="inline-flex items-center gap-1.5 rounded-full bg-zinc-500/10 px-3 py-1 text-sm font-semibold text-zinc-600 ring-1 ring-zinc-500/25 dark:text-zinc-300">
      <X size={15} strokeWidth={3} aria-hidden="true" />
      Not recyclable
    </span>
  );
}

function ResultCard({ item, onClear }) {
  const cat = CATEGORIES[item.category];
  const Icon = item.icon;
  return (
    <article
      key={item.id}
      className={`anim-rise relative mx-auto mt-10 w-full max-w-xl rounded-2xl border border-zinc-900/10 p-8 text-left shadow-[0_8px_40px_-16px_rgba(0,0,0,0.15)] sm:p-10 dark:border-white/10 dark:shadow-[0_8px_40px_-16px_rgba(0,0,0,0.6)] ${cat.tint}`}
    >
      <button
        type="button"
        onClick={onClear}
        aria-label="Dismiss result"
        className="absolute top-4 right-4 flex h-9 w-9 cursor-pointer items-center justify-center rounded-full text-zinc-400 transition-colors duration-200 hover:bg-zinc-500/10 hover:text-zinc-700 focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:outline-none dark:hover:text-zinc-200"
      >
        <X size={18} aria-hidden="true" />
      </button>

      <div className="flex flex-col items-start gap-6 sm:flex-row sm:items-center">
        <div
          className={`flex h-20 w-20 shrink-0 items-center justify-center rounded-2xl ${cat.tile}`}
        >
          <Icon size={40} strokeWidth={1.5} className={cat.iconTint} aria-hidden="true" />
        </div>
        <div className="min-w-0">
          <p className="text-xs font-semibold tracking-[0.14em] text-zinc-500 uppercase dark:text-zinc-400">
            {cat.label}
          </p>
          <h2 className="mt-1 text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
            {item.name}
          </h2>
          <div className="mt-3">
            <Badge recyclable={item.recyclable} />
          </div>
        </div>
      </div>

      <p className="mt-6 border-t border-zinc-900/8 pt-6 text-base leading-relaxed text-zinc-600 dark:border-white/8 dark:text-zinc-300">
        {item.instruction}
      </p>
    </article>
  );
}

export default function App() {
  const [dark, setDark] = useDarkMode();
  const [query, setQuery] = useState("");
  const [focused, setFocused] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  const [selected, setSelected] = useState(itemFromPath);
  const inputRef = useRef(null);

  const results = useMemo(() => searchItems(query), [query]);
  const open = focused && query.length > 0;

  useEffect(() => setActiveIndex(results.length ? 0 : -1), [query, results.length]);

  // Missed-search log: settled queries with no match reveal which items to add
  // next. Logged locally (fallback) and as a Vercel Analytics event (aggregated).
  useEffect(() => {
    if (query.trim().length < 3 || results.length > 0) return;
    const t = setTimeout(() => {
      const q = query.trim().toLowerCase();
      try {
        const key = "cir-missed-searches";
        const log = JSON.parse(localStorage.getItem(key) ?? "{}");
        log[q] = (log[q] ?? 0) + 1;
        const trimmed = Object.fromEntries(Object.entries(log).slice(-200));
        localStorage.setItem(key, JSON.stringify(trimmed));
      } catch {
        // storage unavailable (private mode) — logging is best-effort
      }
      track("missed_search", { query: q });
    }, 900);
    return () => clearTimeout(t);
  }, [query, results.length]);

  // Sync URL + document title with the selected item (shareable deep-links).
  useEffect(() => {
    const path = selected ? `/item/${selected.id}` : "/";
    if (window.location.pathname !== path) {
      window.history.pushState({ id: selected?.id ?? null }, "", path);
    }
    document.title = selected ? `${selected.name} — Can I Recycle It?` : SITE_TITLE;
  }, [selected]);

  // Back/forward navigation restores the matching item.
  useEffect(() => {
    const onPop = () => setSelected(itemFromPath());
    window.addEventListener("popstate", onPop);
    return () => window.removeEventListener("popstate", onPop);
  }, []);

  const pick = (item) => {
    setSelected(item);
    setQuery("");
    inputRef.current?.blur();
  };

  const onKeyDown = (e) => {
    if (!open) {
      if (e.key === "Escape") inputRef.current?.blur();
      return;
    }
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveIndex((i) => (i + 1) % results.length);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIndex((i) => (i - 1 + results.length) % results.length);
    } else if (e.key === "Enter") {
      e.preventDefault();
      const target = results[activeIndex] ?? results[0];
      if (target) pick(target);
    } else if (e.key === "Escape") {
      setQuery("");
      inputRef.current?.blur();
    }
  };

  const popular = ["Pizza Box", "Batteries", "Plastic Bag", "Glass Bottle"];

  return (
    <div className="relative flex min-h-dvh flex-col overflow-hidden bg-zinc-50 text-zinc-900 selection:bg-emerald-500/20 dark:bg-zinc-950 dark:text-zinc-50">
      {/* Ambient backdrop: one quiet emerald bloom on an otherwise mono canvas */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-[-20rem] h-[36rem] bg-[radial-gradient(ellipse_at_center,rgba(16,185,129,0.08),transparent_65%)]"
      />

      {/* Focal blur: everything behind the search softens while it has focus */}
      <div
        aria-hidden="true"
        onMouseDown={() => inputRef.current?.blur()}
        className={`fixed inset-0 z-10 bg-zinc-50/40 backdrop-blur-[3px] transition-opacity duration-300 dark:bg-zinc-950/40 ${
          focused ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
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

      <main className="relative mx-auto flex w-full max-w-3xl flex-1 flex-col items-center px-6 pt-[10vh] pb-24 text-center">
        <h1 className="text-4xl font-extrabold tracking-[-0.04em] text-balance sm:text-6xl">
          Know before
          <br />
          you throw.
        </h1>
        <p className="mt-5 max-w-md text-base text-zinc-500 sm:text-lg dark:text-zinc-400">
          Search any household item and get an instant answer on where it belongs.
        </p>

        {/* Search — the single focal point of the page */}
        <div className="relative z-20 mt-10 w-full max-w-xl">
          <div
            className={`flex items-center gap-3 rounded-2xl border bg-white/70 px-5 backdrop-blur-xl transition-shadow duration-300 dark:bg-zinc-900/60 ${
              focused
                ? "border-emerald-500/50 shadow-[0_0_0_1px_rgba(16,185,129,0.25),0_0_56px_-12px_rgba(16,185,129,0.5)]"
                : "border-zinc-200/80 shadow-[0_4px_24px_-8px_rgba(0,0,0,0.08)] dark:border-white/10 dark:shadow-[0_4px_24px_-8px_rgba(0,0,0,0.5)]"
            }`}
          >
            <Search
              size={20}
              aria-hidden="true"
              className={`shrink-0 transition-colors duration-300 ${
                focused ? "text-emerald-500" : "text-zinc-400"
              }`}
            />
            <input
              ref={inputRef}
              role="combobox"
              aria-expanded={open}
              aria-controls="search-results"
              aria-activedescendant={
                open && activeIndex >= 0 ? `option-${results[activeIndex]?.id}` : undefined
              }
              aria-label="Search an item"
              type="text"
              inputMode="search"
              autoComplete="off"
              spellCheck="false"
              placeholder="Try “pizza box” or “batteries”…"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onFocus={() => setFocused(true)}
              onBlur={() => setFocused(false)}
              onKeyDown={onKeyDown}
              className="h-14 w-full bg-transparent text-base outline-none placeholder:text-zinc-400 sm:h-16 sm:text-lg dark:placeholder:text-zinc-500"
            />
            {query && (
              <button
                type="button"
                aria-label="Clear search"
                onMouseDown={(e) => e.preventDefault()}
                onClick={() => {
                  setQuery("");
                  inputRef.current?.focus();
                }}
                className="flex h-8 w-8 shrink-0 cursor-pointer items-center justify-center rounded-full text-zinc-400 transition-colors duration-200 hover:bg-zinc-500/10 hover:text-zinc-700 dark:hover:text-zinc-200"
              >
                <X size={16} aria-hidden="true" />
              </button>
            )}
          </div>

          {open && (
            <ul
              id="search-results"
              role="listbox"
              aria-label="Search results"
              className="anim-drop absolute inset-x-0 top-full mt-3 overflow-hidden rounded-2xl border border-zinc-200/80 bg-white/90 shadow-[0_16px_56px_-16px_rgba(0,0,0,0.25)] backdrop-blur-xl dark:border-white/10 dark:bg-zinc-900/90"
            >
              {results.length === 0 && (
                <li className="px-5 py-6 text-sm text-zinc-500 dark:text-zinc-400">
                  Nothing matches “{query}” yet.
                </li>
              )}
              {results.map((item, i) => {
                const cat = CATEGORIES[item.category];
                const Icon = item.icon;
                return (
                  <li
                    key={item.id}
                    id={`option-${item.id}`}
                    role="option"
                    aria-selected={i === activeIndex}
                    onMouseDown={(e) => e.preventDefault()}
                    onMouseEnter={() => setActiveIndex(i)}
                    onClick={() => pick(item)}
                    className={`flex cursor-pointer items-center gap-4 px-4 py-3 text-left transition-colors duration-150 ${
                      i === activeIndex ? "bg-zinc-900/5 dark:bg-white/8" : ""
                    }`}
                  >
                    <span
                      className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${cat.tile}`}
                    >
                      <Icon size={20} strokeWidth={1.75} className={cat.iconTint} aria-hidden="true" />
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block truncate text-sm font-semibold">{item.name}</span>
                      <span className="block text-xs text-zinc-500 dark:text-zinc-400">
                        {cat.label}
                      </span>
                    </span>
                    <span
                      aria-hidden="true"
                      className={`h-2 w-2 shrink-0 rounded-full ${
                        item.recyclable ? "bg-emerald-500" : "bg-zinc-400 dark:bg-zinc-600"
                      }`}
                    />
                    <span className="sr-only">
                      {item.recyclable ? "Recyclable" : "Not recyclable"}
                    </span>
                  </li>
                );
              })}
            </ul>
          )}
        </div>

        {!selected && (
          <div className="mt-8 flex flex-wrap items-center justify-center gap-2">
            <span className="text-xs font-medium tracking-wide text-zinc-500 uppercase dark:text-zinc-400">
              Popular
            </span>
            {popular.map((name) => {
              const item = ITEMS.find((i) => i.name === name);
              return (
                <button
                  key={name}
                  type="button"
                  onClick={() => item && setSelected(item)}
                  className="cursor-pointer rounded-full border border-zinc-200 px-4 py-1.5 text-sm text-zinc-600 transition-all duration-200 hover:border-zinc-400 hover:text-zinc-900 active:scale-95 focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:outline-none dark:border-white/10 dark:text-zinc-300 dark:hover:border-white/30 dark:hover:text-zinc-50"
                >
                  {name}
                </button>
              );
            })}
          </div>
        )}

        {selected && <ResultCard item={selected} onClear={() => setSelected(null)} />}
      </main>

      <footer className="relative px-6 py-6 text-center text-xs text-zinc-500">
        <a
          href="/most-misjudged"
          className="font-medium text-zinc-600 underline-offset-2 hover:underline dark:text-zinc-300"
        >
          The most misjudged recyclables
        </a>
        <span className="mx-2" aria-hidden="true">·</span>
        {ITEMS.length} items indexed · Guidance varies by municipality
      </footer>
    </div>
  );
}
