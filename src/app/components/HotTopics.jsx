import React, { useState, useEffect, useRef } from 'react';

const HotTopics = ({ onTopicClick }) => {
  const topics = [
    "Climate Change",
    "Technology",
    "Sustainability",
    "AI",
    "Health",
    "Education",
    "Space Exploration",
    "Mental Health",
    "Innovation",
    "Global Warming",
    "Blockchain",
    "Cybersecurity",
    "Social Media",
    "Economy",
    "Smart Cities"
  ];

  const containerRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(4);

  // Calculate number of items that can fit in the container
  useEffect(() => {
    const handleResize = () => {
      if (containerRef.current) {
        const containerWidth = containerRef.current.offsetWidth;
        const itemWidth = 200; 
        setItemsPerPage(Math.floor(containerWidth / itemWidth)); 
      }
    };

    window.addEventListener('resize', handleResize);
    handleResize(); 
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const scrollLeft = () => {
    setCurrentIndex((prevIndex) => Math.max(prevIndex - 1, 0));
  };

  const scrollRight = () => {
    setCurrentIndex((prevIndex) => Math.min(prevIndex + 1, topics.length - itemsPerPage));
  };

  return (
    <div className="mt-4 flex flex-col items-center">
      <div className="flex w-full justify-between items-center mb-4 relative">
        {/* Left Scroll Button */}
        <button
          onClick={scrollLeft}
          className="absolute left-0 bg-gray-600 hover:bg-gray-700 text-white px-3 py-2 rounded-full z-10"
        >
          &lt;
        </button>

        {/* Topics Container */}
        <div
          ref={containerRef}
          className="flex overflow-hidden space-x-4 mx-10"
          style={{ width: "500px" }} 
        >
          {topics.slice(currentIndex, currentIndex + itemsPerPage).map((topic, index) => (
            <button
              key={index}
              onClick={() => onTopicClick(topic)}
              className="bg-gray-500 hover:bg-gray-600 text-white px-2 py-2 rounded-xl transition-all duration-300 transform hover:scale-105"
              style={{ minWidth: "200px" }} 
            >
              {topic}
            </button>
          ))}
        </div>

        {/* Right Scroll Button */}
        <button
          onClick={scrollRight}
          className="absolute right-0 bg-gray-600 hover:bg-gray-700 text-white px-3 py-2 rounded-full z-10"
        >
          &gt;
        </button>
      </div>
    </div>
  );
};

export default HotTopics;
