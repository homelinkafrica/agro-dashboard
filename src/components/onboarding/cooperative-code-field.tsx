"use client";

import { useState, useTransition } from "react";
import { Search } from "lucide-react";
import { searchCooperativesAction } from "@/lib/onboarding/actions";
import type { CooperativeMatch } from "@/lib/onboarding/types";
import { FieldError } from "./field-error";

/**
 * Cooperative join-code input with a "search by name or district" fallback that
 * expands inline — the user never leaves the signup screen to look it up.
 */
export function CooperativeCodeField({
  defaultValue = "",
  errors,
  note,
}: {
  defaultValue?: string;
  errors?: string[];
  note?: string;
}) {
  const [code, setCode] = useState(defaultValue);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [matches, setMatches] = useState<CooperativeMatch[] | null>(null);
  const [isSearching, startSearch] = useTransition();

  function runSearch() {
    startSearch(async () => {
      setMatches(await searchCooperativesAction(query));
    });
  }

  return (
    <div>
      <label htmlFor="cooperativeCode" className="mb-1.5 block text-sm font-medium text-zinc-700">
        Cooperative code
      </label>
      <input
        id="cooperativeCode"
        name="cooperativeCode"
        type="text"
        autoComplete="off"
        placeholder="e.g. MBL-4821"
        value={code}
        onChange={(event) => setCode(event.target.value.toUpperCase())}
        className="block w-full rounded-lg border border-zinc-300 px-3 py-2.5 text-sm text-zinc-900 uppercase placeholder:text-zinc-400 focus:border-green-500 focus:ring-1 focus:ring-green-500 focus:outline-none"
      />
      <FieldError errors={errors} />

      <button
        type="button"
        onClick={() => setIsSearchOpen((open) => !open)}
        className="mt-2 text-sm font-medium text-green-600 hover:text-green-700"
        aria-expanded={isSearchOpen}
      >
        Can&apos;t find your code? Search by name or district
      </button>

      {isSearchOpen && (
        <div className="mt-3 rounded-lg border border-zinc-200 bg-zinc-50 p-3">
          <div className="flex gap-2">
            <input
              type="text"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              onKeyDown={(event) => {
                // Enter inside the lookup should search, not submit the signup form.
                if (event.key === "Enter") {
                  event.preventDefault();
                  runSearch();
                }
              }}
              placeholder="Cooperative name or district"
              aria-label="Search cooperatives by name or district"
              className="block w-full rounded-lg border border-zinc-300 bg-white px-3 py-2 text-sm text-zinc-900 placeholder:text-zinc-400 focus:border-green-500 focus:ring-1 focus:ring-green-500 focus:outline-none"
            />
            <button
              type="button"
              onClick={runSearch}
              disabled={isSearching}
              className="flex shrink-0 items-center gap-1.5 rounded-lg border border-zinc-300 bg-white px-3 py-2 text-sm font-medium text-zinc-700 transition-colors hover:bg-zinc-100 disabled:opacity-60"
            >
              <Search className="h-4 w-4" />
              Search
            </button>
          </div>

          {matches !== null && !isSearching && (
            <ul className="mt-3 flex flex-col gap-1.5">
              {matches.length === 0 && (
                <li className="text-sm text-zinc-500">
                  No cooperatives matched that name or district.
                </li>
              )}
              {matches.map((match) => (
                <li key={match.id}>
                  <button
                    type="button"
                    onClick={() => {
                      setCode(match.code);
                      setIsSearchOpen(false);
                    }}
                    className="flex w-full items-center justify-between gap-3 rounded-lg border border-zinc-200 bg-white px-3 py-2 text-left transition-colors hover:border-green-500 hover:bg-green-50"
                  >
                    <span className="text-sm text-zinc-900">
                      {match.name}
                      <span className="block text-xs text-zinc-500">{match.district}</span>
                    </span>
                    <span className="shrink-0 text-sm font-medium text-green-700">{match.code}</span>
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}

      {note && <p className="mt-2 text-sm text-zinc-500">{note}</p>}
    </div>
  );
}
