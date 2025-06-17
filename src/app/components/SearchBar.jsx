"use client";
import { useState, useEffect } from "react";
import { FaSearch } from "react-icons/fa";

export default function SearchBar({ onSearch, externalQuery }) {
  const [query, setQuery] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isSearching, setIsSearching] = useState(false);

  useEffect(() => {
    if (externalQuery !== undefined) {
      setQuery(externalQuery);
      setIsSearching(true);
      onSearch(externalQuery);
      setTimeout(() => setIsSearching(false), 2000);
    }
  }, [externalQuery]);
  
  const handleSearch = (e) => {
    e.preventDefault();
    setIsSearching(true); 
    onSearch(query);
    setTimeout(() => setIsSearching(false), 2000);
  };

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const handleInputChange = (e) => {
    setQuery(e.target.value);
  };

  return (
    <div className="flex items-center justify-center gap-4 animate-fade-in w-full px-4">
      <form onSubmit={handleSearch} className="relative w-full max-w-[384px]">
        <div
          className={`relative w-full h-10 md:h-12 rounded-full bg-transparent border border-purple-500 transition-all duration-300
            ${isFocused || isHovered ? "opacity-0 border-transparent" : "opacity-100"}
            ${isHovered ? "opacity-0 border-transparent" : "opacity-100"}
          `}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        ></div>
        <input
          type="text"
          id="search"
          placeholder="Search..."
          className={`absolute top-0 left-0 w-full h-full pl-8 md:pl-10 pr-4 bg-transparent text-purple-600 placeholder-purple-400 outline-none rounded-full font-medium text-sm md:text-md transition-all duration-300
            focus:border-b-2 focus:border-purple-500 focus:rounded-none focus:pl-0
          `}
          value={query}
          onChange={handleInputChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
        />
        <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-purple-500 transition-all duration-500">
          <FaSearch className="text-sm md:text-base" />
        </span>
      </form>
    </div>
  );
}
