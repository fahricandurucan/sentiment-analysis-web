import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
const HotTopics = ({ onTopicClick }) => {
  const [topics, setTopics] = useState([]);
  const [loading, setLoading] = useState(true);
  const containerRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(4);
  useEffect(() => {
    const fetchTopics = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:5000/hot-topics");
        setTopics(response.data || []); 
      } catch (error) {
        console.error("Başlıkları çekerken hata:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchTopics();
  }, []);
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
  if (loading) return <div>Loading...</div>;
  if (topics.length === 0) return <div>Güncel konu bulunamadı.</div>;
  const scrollLeft = () => {
    setCurrentIndex((prevIndex) => Math.max(prevIndex - 1, 0));
  };
  const scrollRight = () => {
    setCurrentIndex((prevIndex) =>
      Math.min(prevIndex + 1, topics.length - itemsPerPage)
    );
  };
  return (
    <div className="mt-4 flex flex-col items-center">
      <div className="flex w-full justify-between items-center mb-4 relative">
        {/* Sol Kaydırma Butonu */}
        <button
          onClick={scrollLeft}
          className="absolute left-0 bg-yellow-400 hover:bg-yellow-500 text-white px-3 py-2 rounded-full z-10"
        >
          &lt;
        </button>
        {/* Konu Başlıkları */}
        <div
          ref={containerRef}
          className="flex overflow-hidden space-x-4 mx-10"
          style={{ width: "500px" }}
        >
          {topics.slice(currentIndex, currentIndex + itemsPerPage).map((topic, index) => (
            <button
              key={index}
              onClick={() => onTopicClick(topic)}
              className="bg-[#fcfc99] hover:bg-yellow-300 text-black px-2 py-2 rounded-xl transition-all duration-300 transform hover:scale-105"
              style={{ minWidth: "200px" }}
            >
              {topic}
            </button>
          ))}
        </div>
        {/* Sağ Kaydırma Butonu */}
        <button
          onClick={scrollRight}
          className="absolute right-0 bg-yellow-400 hover:bg-yellow-500 text-white px-3 py-2 rounded-full z-10"
        >
          &gt;
        </button>
      </div>
    </div>
  );
};
export default HotTopics;