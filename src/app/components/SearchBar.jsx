"use client";

import { useState } from "react";

export default function SearchBar({ onSearch }) {
  const [query, setQuery] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();
    onSearch(query);
  };

  return (
    <form onSubmit={handleSearch} className="flex items-center gap-4">
      <div className="relative w-72">
        <input
          type="text"
          placeholder="Enter the term to search for..."
          className="w-full p-3 pl-10 pr-4 border border-gray-300 rounded-full text-gray-700 focus:outline-none focus:ring-2 focus:ring-scale-300 transition-all duration-300 ease-in-out "
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-5 h-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M10 18l6-6m0 0l-6-6m6 6H4"
            />
          </svg>
        </span>
      </div>
      <button
        type="submit"
        className="bg-yellow-500 hover:bg-yellow-600 text-white px-6 py-3 rounded-full text-lg font-semibold transform transition-all duration-300 hover:scale-105"
      >
        Ara
      </button>
    </form>
  );
}
