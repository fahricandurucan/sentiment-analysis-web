"use client";
import { useEffect, useState } from "react";
import MapComponent from "@/app/components/MapComponent";
import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";
import HotTopics from "@/app/components/HotTopics";
import SearchBar from "@/app/components/SearchBar";
import CountryInfoCard from "@/app/components/CountryInfoCard";

const MapPage = () => {
  const [sentimentData, setSentimentData] = useState([]); 
  const [countryData, setCountryData] = useState([]); 
  const [filteredData, setFilteredData] = useState([]); 
  const [keyword, setKeyword] = useState("");
  const [hoveredCountry, setHoveredCountry] = useState(null);
  const [clickedCountry, setClickedCountry] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        setError(null);
        
        // Sentiment verilerini çek
        const sentimentResponse = await fetch('/api/sentiments');
        if (!sentimentResponse.ok) {
          throw new Error('Failed to fetch sentiment data');
        }
        const sentiment = await sentimentResponse.json();
        
        // Veri yapısını kontrol et
        if (!Array.isArray(sentiment)) {
          throw new Error('Invalid sentiment data format');
        }
        
        setSentimentData(sentiment);
        setFilteredData(sentiment);

        // Ülke verilerini çek
        const countryResponse = await fetch('/api/countries');
        if (!countryResponse.ok) {
          throw new Error('Failed to fetch country data');
        }
        const country = await countryResponse.json();
        
        // Veri yapısını kontrol et
        if (!Array.isArray(country)) {
          throw new Error('Invalid country data format');
        }
        
        setCountryData(country);
      } catch (error) {
        console.error("Error fetching data:", error);
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (keyword.trim() === "") {
      setFilteredData(sentimentData);
    } else {
      const filtered = countryData.filter((post) =>
        post.title?.toLowerCase().includes(keyword.toLowerCase())
      );
      setFilteredData(filtered);
    }
  }, [keyword, countryData, sentimentData]);

  const getCountrySentiment = (countryName) => {
    if (!Array.isArray(filteredData)) {
      console.error('filteredData is not an array:', filteredData);
      return "UNKNOWN";
    }

    const countrySentiments = filteredData.filter(
      (entry) => entry.country === countryName
    );
    
    if (countrySentiments.length === 0) {
      return "UNKNOWN";
    }

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

  if (isLoading) {
    return (
      <div className="min-h-screen bg-purple-50 flex items-center justify-center">
        <div className="text-2xl text-purple-600">Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-purple-50 flex items-center justify-center">
        <div className="text-2xl text-red-600">Error: {error}</div>
      </div>
    );
  }

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-purple-50 flex flex-col items-center p-6 mt-12">
        <SearchBar onSearch={setKeyword} externalQuery={keyword} />
        <HotTopics onTopicClick={setKeyword} />
        <div className="w-full flex flex-col md:flex-row justify-center gap-8 relative">
          <MapComponent
            countryData={filteredData}
            getCountrySentiment={getCountrySentiment}
            setHoveredCountry={setHoveredCountry}
            clickedCountry={clickedCountry}
            setClickedCountry={setClickedCountry}
          />
          {(hoveredCountry || clickedCountry) && (
            <div className="fixed top-46 right-13 z-50">
              <CountryInfoCard
                country={clickedCountry || hoveredCountry}
                countryData={filteredData}
                keyword={keyword}
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
