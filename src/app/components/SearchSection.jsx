import React, { useState, useEffect } from "react";
import HotTopics from "./HotTopics";
import SearchBar from "./SearchBar";

const SearchSection = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (query) => {
    console.log("Arama yapılıyor:", query);
    // burada arama işlemini başlatabilirsin
  };

  const handleTopicClick = (topic) => {
    setSearchQuery(topic);
    handleSearch(topic); // otomatik arama başlat
  };

  return (
    <div>
      <SearchBar onSearch={handleSearch} externalQuery={searchQuery} />
      <HotTopics onTopicClick={handleTopicClick} />
    </div>
  );
};

export default SearchSection;
