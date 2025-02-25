"use client";

import SearchBar from "@/app/components/SearchBar";
import { useEffect, useState } from "react";
import { ComposableMap, Geographies, Geography } from "react-simple-maps";

const sentimentColors = {
  positive: "#4CAF50", // Yeşil
  neutral: "#FFC107",  // Sarı
  negative: "#F44336", // Kırmızı
  UNKNOWN: "#B0BEC5",  // Gri (Bilinmeyen)
};

const MapPage = () => {
  const [countryData, setCountryData] = useState([]);
  const [keyword, setKeyword] = useState("");
  const [hoveredCountry, setHoveredCountry] = useState(null); // Hovered ülke bilgisini tutacak state


  useEffect(() => {
    const fetchData = async () => {
      console.log("calisti");

      try {
        const response = await fetch(`http://127.0.0.1:5000/sentiment-analysis?keyword=${encodeURIComponent(keyword)}`);
        const data = await response.json();
        setCountryData(data);
        console.log("response alındı", data);
      } catch (error) {
        console.error("Veri çekme hatası:", error);
      }
      console.log("bitti");

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
    <div className="min-h-screen bg-gray-100 flex flex-col items-center p-6">
      <h1 className="text-4xl font-bold text-gray-800 mb-2">
        Küresel Duygu Analizi
      </h1>
      <p className="text-gray-600 mb-6">
        Dünya genelindeki insanların iklim değişikliği hakkındaki duygularını keşfedin.
      </p>
      
      {/* Arama çubuğu */}
      <SearchBar onSearch={setKeyword} />

      <div className="w-full flex flex-col md:flex-row justify-center gap-8">
        {/* Dünya Haritası */}
        <div className="bg-white p-4 rounded-lg shadow-lg w-full md:w-2/3">
          <ComposableMap projectionConfig={{ scale: 150 }}>
            <Geographies geography="https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json">
              {({ geographies }) =>
                geographies.map((geo) => {
                  const countryName = geo.properties.name;
                  const sentiment = getCountrySentiment(countryName);
                  const fillColor = sentimentColors[sentiment] || "#D3D3D3";

                  return (
                    <Geography
                      key={geo.rsmKey}
                      geography={geo}
                      fill={fillColor}
                      stroke="#FFF"
                      className="transition-all duration-200 hover:scale-103"
                      onMouseEnter={() => setHoveredCountry({ name: countryName, sentiment })}
                      onMouseLeave={() => setHoveredCountry(null)}
                      style={{
                        default: { outline: "none" },
                        hover: { fill: "#2196F3", outline: "none" },
                        pressed: { fill: "#1565C0", outline: "none" },
                      }}
                    />
                  );
                })
              }
            </Geographies>
          </ComposableMap>
        </div>

        {/* Ülke Sentiment Listesi */}
        <div className="bg-white p-4 rounded-lg shadow-lg w-full md:w-1/3 h-[800px] overflow-y-auto">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">
            "{keyword.toLocaleUpperCase()}" Kelimesine Göre Ülkelerin Göre Duygu Analizi
          </h2>
          <ul className="space-y-2">
            {countryData.map((country, index) => (
              <li key={index} className="flex justify-between border-b pb-2">
                <span className="text-gray-800">{country.country}</span>
                <span
                  className={`px-3 py-1 rounded-full text-white text-xs ${
                    country.sentiment === "positive"
                      ? "bg-green-500"
                      : country.sentiment === "neutral"
                      ? "bg-yellow-500"
                      : country.sentiment === "negative"
                      ? "bg-red-500"
                      : "bg-gray-400"
                  }`}
                >
                  {country.sentiment}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Hover Bilgileri */}
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
  );
};

export default MapPage;
