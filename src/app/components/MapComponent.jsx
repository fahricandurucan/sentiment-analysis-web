"use client";
import { ComposableMap, Geographies, Geography, ZoomableGroup } from "react-simple-maps";
import { motion } from "framer-motion";
import { useState } from "react";
import { geoCentroid } from "d3-geo";
import { geoMercator } from "d3-geo";
import { Plus, Minus, ArrowUp, ArrowDown, ArrowLeft, ArrowRight } from "lucide-react";

const projection = geoMercator().scale(115).translate([400, 350]);

const sentimentColors = {
  positive: "#34D399",
  neutral: "#FBBF24",
  negative: "#EF4444",
  UNKNOWN: "#9CA3AF",
};

const sentimentEmojis = {
  positive: "😊",
  neutral: "😐",
  negative: "😞"
};

const MapComponent = ({ getCountrySentiment, setHoveredCountry, clickedCountry, setClickedCountry }) => {
  const [zoom, setZoom] = useState(1);
  const [center, setCenter] = useState({ x: 0, y: 0 });

  const adjustZoom = (amount) => setZoom((prev) => Math.max(0.7, Math.min(5, prev + amount)));
  
  const moveMap = (dx, dy) => setCenter((prev) => ({ x: prev.x + dx, y: prev.y + dy }));
  
  const resetMap = () => {
    setZoom(1);
    setCenter({ x: 0, y: 0 });
  };

  const handleCountryClick = (countryName) => {
    if (clickedCountry?.name === countryName) {
      setClickedCountry(null);
    } else {
      const sentiment = getCountrySentiment(countryName);
      setClickedCountry({ name: countryName, sentiment });
    }
  };
  

  return (
    <motion.div className="relative bg-white backdrop-blur-md rounded-lg w-full lg:w-[90%] xl:w-[95%] shadow-xl">
      {/* Controls Panel */}
      <div className="absolute top-4 left-4 z-10 flex flex-col space-y-4 bg-white p-4 rounded-lg shadow-lg border border-gray-100">
        {/* Zoom Controls */}
        <div className="flex flex-col space-y-2">
          <h3 className="text-sm font-semibold text-gray-700 mb-1">Zoom</h3>
          <div className="flex justify-center space-x-2">
            <button onClick={() => adjustZoom(0.2)} className="p-2 bg-blue-50 rounded-md hover:bg-blue-100 transition-colors">
              <Plus size={20} className="text-blue-600" />
            </button>
            <button onClick={() => adjustZoom(-2)} className="p-2 bg-blue-50 rounded-md hover:bg-blue-100 transition-colors">
              <Minus size={20} className="text-blue-600" />
            </button>
          </div>
        </div>

        {/* Navigation Controls */}
        <div className="flex flex-col space-y-2">
          <h3 className="text-sm font-semibold text-gray-700 mb-1">Navigation</h3>
          <div className="grid grid-cols-3 gap-1">
            <div></div>
            <button onClick={() => moveMap(0, -10)} className="p-2 bg-blue-50 rounded-md hover:bg-blue-100 transition-colors">
              <ArrowUp size={20} className="text-blue-600" />
            </button>
            <div></div>
            <button onClick={() => moveMap(-10, 0)} className="p-2 bg-blue-50 rounded-md hover:bg-blue-100 transition-colors">
              <ArrowLeft size={20} className="text-blue-600" />
            </button>
            <button 
              onClick={resetMap} 
              className="p-2 bg-blue-100 rounded-md hover:bg-blue-200 transition-colors flex items-center justify-center"
            >
              <div className="w-5 h-5 border-2 border-blue-600 rounded-full flex items-center justify-center">
                <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
              </div>
            </button>
            <button onClick={() => moveMap(10, 0)} className="p-2 bg-blue-50 rounded-md hover:bg-blue-100 transition-colors">
              <ArrowRight size={20} className="text-blue-600" />
            </button>
            <div></div>
            <button onClick={() => moveMap(0, 10)} className="p-2 bg-blue-50 rounded-md hover:bg-blue-100 transition-colors">
              <ArrowDown size={20} className="text-blue-600" />
            </button>
            <div></div>
          </div>
        </div>
      </div>

      {/* Sentiment Guide */}
      <div className="absolute top-72 left-4 z-10 bg-white p-5 rounded-lg shadow-lg border border-gray-100">
        <h3 className="text-sm font-semibold text-gray-700 mb-2">Sentiment Guide</h3>
        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 rounded-full" style={{ backgroundColor: sentimentColors.positive }}></div>
            <span className="text-sm text-gray-600">Positive {sentimentEmojis.positive}</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 rounded-full" style={{ backgroundColor: sentimentColors.neutral }}></div>
            <span className="text-sm text-gray-600">Neutral {sentimentEmojis.neutral}</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 rounded-full" style={{ backgroundColor: sentimentColors.negative }}></div>
            <span className="text-sm text-gray-600">Negative {sentimentEmojis.negative}</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 rounded-full" style={{ backgroundColor: sentimentColors.UNKNOWN }}></div>
            <span className="text-sm text-gray-600">Unknown</span>
          </div>
        </div>
      </div>

      <ComposableMap projection={projection} className="rounded-lg">
        <ZoomableGroup zoom={zoom} center={[center.x, center.y]}>
          <Geographies geography="https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json">
            {({ geographies }) =>
              geographies.map((geo) => {
                const countryName = geo.properties.name;
                const sentiment = getCountrySentiment(countryName);
                const fillColor = sentimentColors[sentiment] || "#D1D5DB";
                const centroid = projection(geoCentroid(geo)) || [0, 0];

                return (
                  <g key={geo.rsmKey}>
                    <Geography
                      geography={geo}
                      fill={fillColor}
                      stroke="#FFF"
                      strokeWidth={0.5}
                      onMouseEnter={() => setHoveredCountry({ name: countryName, sentiment })}
                      onMouseLeave={() => setHoveredCountry(null)}
                      style={{
                        default: { outline: "none" },
                        hover: { fill: "#A5B4FC", outline: "none", cursor: "pointer" },
                        pressed: { fill: "#1E40AF", outline: "none" },
                      }}
                    />
                    {centroid && (
                      <foreignObject x={centroid[0] - 10} y={centroid[1] - 10} width={30} height={30} className="pointer-events-none">
                        <button
                          className="bg-transparent text-lg rounded-full shadow-md hover:scale-110 transition-transform pointer-events-auto"
                          onClick={() => handleCountryClick(countryName)} // Handle click to keep information visible
                        >
                          {sentimentEmojis[sentiment]}
                        </button>
                      </foreignObject>
                    )}
                  </g>
                );
              })
            }
          </Geographies>
        </ZoomableGroup>
      </ComposableMap>
    </motion.div>
  );
};


export default MapComponent;
