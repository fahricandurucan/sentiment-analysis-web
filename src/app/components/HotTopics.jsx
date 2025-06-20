import React, { useState, useEffect, useRef } from "react";

const HotTopics = ({ onTopicClick }) => {
  const containerRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(4);

  const topics = [
    "life",
    "Trump",
    "poverty",
    "LGBT",
    "palestine",
    "feminism",
    "ai"
  ];

  // Butonun toplam genişliği (px): min-w + padding + margin
  const BUTTON_WIDTH = 120; // min-w-[100px] + px-3 + margin (gerekirse ayarlayın)

  useEffect(() => {
    const handleResize = () => {
      if (containerRef.current) {
        const containerWidth = containerRef.current.offsetWidth;
        const calculated = Math.max(1, Math.floor(containerWidth / BUTTON_WIDTH));
        setItemsPerPage(calculated);
        setCurrentIndex((prev) =>
          Math.min(prev, Math.max(0, topics.length - calculated))
        );
      }
    };
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
    // eslint-disable-next-line
  }, [topics.length]);

  const scrollLeft = () => {
    setCurrentIndex((prevIndex) => Math.max(prevIndex - itemsPerPage, 0));
  };

  const scrollRight = () => {
    setCurrentIndex((prevIndex) =>
      Math.min(
        prevIndex + itemsPerPage,
        Math.max(0, topics.length - itemsPerPage)
      )
    );
  };

  const showLeft = currentIndex > 0;
  const showRight = currentIndex + itemsPerPage < topics.length;

  return (
    <div className="w-full flex justify-center items-center mt-4 mb-2">
      <div className="flex items-center w-full max-w-3xl justify-center gap-2 relative">
        {showLeft && (
          <button
            onClick={scrollLeft}
            className="bg-yellow-400 hover:bg-yellow-500 text-white px-3 py-1 rounded-full z-50 text-lg flex items-center justify-center min-w-[40px]"
            aria-label="Scroll left"
            style={{ position: 'relative' }}
          >
            &lt;
          </button>
        )}
        <div
          ref={containerRef}
          className="flex overflow-hidden space-x-2 md:space-x-4"
          style={{ width: "100%" }}
        >
          {topics
            .slice(currentIndex, currentIndex + itemsPerPage)
            .map((topic, index) => (
              <button
                key={index}
                onClick={() => onTopicClick(topic)}
                className="bg-[#fcfc99] hover:bg-yellow-300 text-black px-2 py-2 rounded-xl transition-all duration-300 transform hover:scale-105 text-sm md:text-base whitespace-nowrap min-w-[100px] md:min-w-[150px] shadow-sm"
                style={{ marginRight: "8px" }} // space-x-2 için
              >
                {topic}
              </button>
            ))}
        </div>
        {showRight && (
          <button
            onClick={scrollRight}
            className="bg-yellow-400 hover:bg-yellow-500 text-white px-3 py-1 rounded-full z-50 text-lg flex items-center justify-center min-w-[40px]"
            aria-label="Scroll right"
            style={{ position: 'relative' }}
          >
            &gt;
          </button>
        )}
      </div>
    </div>
  );
};

export default HotTopics;