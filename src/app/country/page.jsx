
"use client";
import { useEffect, useState } from "react";
import MapComponent from "@/app/components/MapComponent";
import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";
import HotTopics from "@/app/components/HotTopics";
import SearchBar from "@/app/components/SearchBar";
import CountryInfoCard from "@/app/components/CountryInfoCard";
const MapPage = () => {
  const [countryData, setCountryData] = useState([]);
  const [filteredData, setFilteredData] = useState([]); // Filtrelenmiş veri için state
  const [keyword, setKeyword] = useState("");
  const [hoveredCountry, setHoveredCountry] = useState(null);
  const [clickedCountry, setClickedCountry] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/country.json");
        const data = await response.json();
        setCountryData(data);
        setFilteredData(data); // Başlangıçta tüm veriyi ata
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);
  useEffect(() => {
    if (keyword.trim() === "") {
      setFilteredData(countryData); 
    } else {
      const filtered = countryData.filter((post) =>
        post.title.toLowerCase().includes(keyword.toLowerCase())
      );
      setFilteredData(filtered);
    }
  }, [keyword, countryData]);
  const getCountrySentiment = (countryName) => {
    const countrySentiments = filteredData.filter(
      (entry) => entry.country === countryName
    );
    const sentimentCounts = countrySentiments.reduce((acc, entry) => {
      acc[entry.sentiment] = (acc[entry.sentiment] || 0) + 1;
      return acc;
    }, {});
    const mostFrequentSentiment = Object.entries(sentimentCounts).reduce(
      (max, [sentiment, count]) => {
        return count > max.count ? { sentiment, count } : max;
      },
      { sentiment: "UNKNOWN", count: 0 }
    );
    return mostFrequentSentiment.sentiment;
  };
  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-purple-50 flex flex-col items-center p-6 mt-12">
      <SearchBar onSearch={setKeyword} externalQuery={keyword} />
      {/* Hot Topics */}
        <HotTopics onTopicClick={setKeyword} />
        <div className="w-full flex flex-col md:flex-row justify-center gap-8 relative">
          {/* Map Component */}
          <MapComponent
            countryData={filteredData} 
            getCountrySentiment={getCountrySentiment}
            setHoveredCountry={setHoveredCountry}
            clickedCountry={clickedCountry}
            setClickedCountry={setClickedCountry}
          />
          {(hoveredCountry || clickedCountry) && (
            <div className="absolute top-0 right-4">
              <CountryInfoCard
                country={clickedCountry || hoveredCountry}
                countryData={filteredData} 
              />
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};
export default MapPage;