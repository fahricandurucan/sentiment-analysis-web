import { ComposableMap, Geographies, Geography } from "react-simple-maps";

const sentimentColors = {
  positive: "#4CAF50", // Yeşil
  neutral: "#FFC107",  // Sarı
  negative: "#F44336", // Kırmızı
  UNKNOWN: "#B0BEC5",  // Gri (Bilinmeyen)
};

const MapComponent = ({ countryData, getCountrySentiment, setHoveredCountry }) => {
  return (
    <div className="bg-transparent backdrop-blur-sm rounded-lg w-full lg:w-4/5 xl:w-3/4 shadow-md">
      <ComposableMap projectionConfig={{ scale: 200 }}>
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
  );
};

export default MapComponent;
