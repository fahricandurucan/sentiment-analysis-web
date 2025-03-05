"use client";

import { useEffect, useState } from "react";
import MapComponent from "@/app/components/MapComponent";
import Navbar from "@/app/components/Navbar";
import HotTopics from "@/app/components/HotTopics";
import SearchBar from "@/app/components/SearchBar";

const MapPage = () => {
  const [countryData, setCountryData] = useState([]);
  const [keyword, setKeyword] = useState("");
  const [hoveredCountry, setHoveredCountry] = useState(null); // Hovered country state

  useEffect(() => {
    const fetchData = async () => {
      console.log("Fetching data");

      try {
        const response = await fetch(`http://127.0.0.1:5000/sentiment-analysis?keyword=${encodeURIComponent(keyword)}`);
        const data = await response.json();
        console.log("Response received", data);

        setCountryData(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
      console.log("Fetch complete");
    };

    if (keyword) {
      fetchData();
    }
  }, [keyword]);

  const getCountrySentiment = (countryName) => {
    const country = countryData.find((c) => c.country === countryName);
    return country ? country.sentiment : "UNKNOWN";
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-purple-50 flex flex-col items-center p-6 ">
        <h1 className="text-4xl font-bold text-gray-800 mb-2 mt-16">Küresel Duygu Analizi</h1>

        {/* Search Bar */}
        <SearchBar onSearch={setKeyword} />

        {/* Hot Topics */}
        <HotTopics onTopicClick={setKeyword} />

        <div className="w-full flex flex-col md:flex-row justify-center gap-8">
          {/* Map Component */}
          <MapComponent
            countryData={countryData}
            getCountrySentiment={getCountrySentiment}
            setHoveredCountry={setHoveredCountry}
          />
        </div>

        {/* Hover Information */}
        {hoveredCountry && (
          <div className="absolute bottom-4 left-4 bg-white p-4 rounded-lg shadow-lg">
            <h3 className="text-lg font-semibold text-gray-800">{hoveredCountry.name}</h3>
            <span
              className={`px-3 py-1 rounded-full text-white text-xs ${
                hoveredCountry.sentiment === "positive"
                  ? "bg-green-500"
                  : hoveredCountry.sentiment === "neutral"
                  ? "bg-yellow-500"
                  : hoveredCountry.sentiment === "negative"
                  ? "bg-red-500"
                  : "bg-gray-400"
              }`}
            >
              {hoveredCountry.sentiment}
            </span>
          </div>
        )}
      </div>
    </>
  );
};

export default MapPage;
