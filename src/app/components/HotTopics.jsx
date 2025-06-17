import React, { useState, useEffect, useRef } from "react";

const HotTopics = ({ onTopicClick }) => {
  const containerRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(4);

  const topics = [
    "life",
    "trump",
    "peace",
    "government",
    "palestine",
    "technology",
    "Yenilenebilir Enerji"
  ];

  useEffect(() => {
    const handleResize = () => {
      if (containerRef.current) {
        const containerWidth = containerRef.current.offsetWidth;
        const itemWidth = 100;
        setItemsPerPage(Math.floor(containerWidth / itemWidth));
      }
    };
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const scrollLeft = () => {
    setCurrentIndex((prevIndex) => Math.max(prevIndex - 1, 0));
  };

  const scrollRight = () => {
    setCurrentIndex((prevIndex) =>
      Math.min(prevIndex + 1, topics.length - itemsPerPage)
    );
  };

  // Oklar sadece kaydırılacak başka konu varsa görünsün
  const showLeft = currentIndex > 0;
  const showRight = currentIndex + itemsPerPage < topics.length;

  return (
    <div className="w-full flex justify-center items-center mt-4 mb-2">
      <div className="flex items-center w-full max-w-3xl justify-center gap-2">
        {showLeft && (
          <button
            onClick={scrollLeft}
            className="bg-yellow-400 hover:bg-yellow-500 text-white px-2 py-1 md:px-3 md:py-2 rounded-full z-10 text-sm md:text-base"
          >
            &lt;
          </button>
        )}
        <div
          ref={containerRef}
          className="flex overflow-hidden space-x-1 md:space-x-4"
          style={{ width: "100%" }}
        >
          {topics.slice(currentIndex, currentIndex + itemsPerPage).map((topic, index) => (
            <button
              key={index}
              onClick={() => onTopicClick(topic)}
              className="bg-[#fcfc99] hover:bg-yellow-300 text-black px-2 py-1 md:px-3 md:py-2 rounded-xl transition-all duration-300 transform hover:scale-105 text-xs md:text-base whitespace-nowrap min-w-[90px] md:min-w-[160px]"
            >
              {topic}
            </button>
          ))}
        </div>
        {showRight && (
          <button
            onClick={scrollRight}
            className="bg-yellow-400 hover:bg-yellow-500 text-white px-2 py-1 md:px-3 md:py-2 rounded-full z-10 text-sm md:text-base"
          >
            &gt;
          </button>
        )}
      </div>
    </div>
  );
};

export default HotTopics;
