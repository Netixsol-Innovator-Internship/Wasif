"use client";
import React from "react";

type FilterBarProps = {
  filters: string[];
  removeFilter: (tag: string) => void;
  clearFilters: () => void;
};

export default function FilterBar({ filters, removeFilter, clearFilters }: FilterBarProps) {
  return (
    <div className="bg-white shadow-md rounded-md p-4 flex items-center justify-between mb-8">
      <div className="flex flex-wrap gap-2">
        {filters.map((filter) => (
          <div
            key={filter}
            className="flex items-center bg-teal-50 text-teal-700 font-bold rounded-md overflow-hidden"
          >
            <span className="px-3 py-1">{filter}</span>
            <button
              onClick={() => removeFilter(filter)}
              className="bg-teal-600 text-white px-2 hover:bg-slate-800"
            >
              ✕
            </button>
          </div>
        ))}
      </div>

      <button
        onClick={clearFilters}
        className="text-sm text-gray-500 font-bold hover:underline"
      >
        Clear
      </button>
    </div>
  );
}
