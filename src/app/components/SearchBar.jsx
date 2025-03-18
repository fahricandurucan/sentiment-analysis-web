"use client";

import { useState } from "react";
import { FaSearch } from "react-icons/fa";

export default function SearchBar({ onSearch }) {
  const [query, setQuery] = useState("");
  const [isFocused, setIsFocused] = useState(false);

  const handleSearch = (e) => {
    e.preventDefault();
    onSearch(query);
  };

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };

  const handleInputChange = (e) => {
    setQuery(e.target.value);
  };

  return (
    <div className="flex items-center justify-center gap-4 animate-fade-in">
      {/* Search Bar */}
      <form onSubmit={handleSearch} className="relative">
        <div
          className={`relative w-96 h-12 rounded-full bg-transparent border ${
            isFocused ? "border-none" : "border-purple-500"
          } transition-all duration-400`}
        >
          {/* Input Field */}
          <input
            type="text"
            id="search"
            placeholder="Search..."
            className={`w-full h-full pl-10 pr-4 bg-transparent text-purple-600 placeholder-purple-400 outline-none rounded-full font-medium text-md transition-all duration-300 ${
              isFocused
                ? "border-b-2 border-purple-500 rounded-none pl-0"
                : "border-purple-300"
            }`}
            value={query}
            onChange={handleInputChange}
            onFocus={handleFocus}
            onBlur={handleBlur}
          />
          {/* Search Icon */}
          <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-purple-500">
            <FaSearch />
          </span>
        </div>
      </form>
    </div>
  );
}
