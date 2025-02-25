"use client";

import { useEffect, useState } from "react";
import { ComposableMap, Geographies, Geography } from "react-simple-maps";

const sentimentColors = {
  positive: "#4CAF50", // Yeşil
  neutral: "#FFC107",  // Sarı
  negative: "#F44336", // Kırmızı
  UNKNOWN: "#B0BEC5",  // Gri (Bilinmeyen)
};

const SentimentMap = ({ apiUrl }) => {
  const [countryData, setCountryData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        setCountryData(data);
      } catch (error) {
        console.error("Error fetching sentiment data:", error);
      }
    };

    fetchData();
  }, [apiUrl]);

  // Ülke adına göre sentiment değeri bul
  const getCountrySentiment = (countryName) => {
    const country = countryData.find((c) => c.country === countryName);
    return country ? country.sentiment : "UNKNOWN";
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <ComposableMap projectionConfig={{ scale: 150 }}>
        <Geographies geography="https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json">
          {({ geographies }) =>
            geographies.map((geo) => {
              const countryName = geo.properties.name;
              const sentiment = getCountrySentiment(countryName);
              const fillColor = sentimentColors[sentiment] || "#D3D3D3"; // Varsayılan gri renk

              return (
                <Geography
                  key={geo.rsmKey}
                  geography={geo}
                  fill={fillColor}
                  stroke="#FFF"
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
  );
};

export default SentimentMap;
