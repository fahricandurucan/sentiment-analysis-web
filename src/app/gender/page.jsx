"use client";

import { useEffect, useState } from "react";
import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";
import HotTopics from "@/app/components/HotTopics";
import SearchBar from "@/app/components/SearchBar";
import Link from "next/link";
import GenderTooltip from "@/app/components/GenderTooltip";

import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  Legend,
} from "recharts";

const GenderGraph = () => {
  const [allPosts, setAllPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [keyword, setKeyword] = useState("");

  const SENTIMENT_COLORS = {
    positive: "#4ade80",
    neutral: "#fbbf24",
    negative: "#ef4444",
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/gender.json");
        const data = await response.json();
        setAllPosts(data);
        setFilteredPosts(data);
      } catch (error) {
        console.error("Veri çekme hatası:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (keyword.trim() === "") {
      setFilteredPosts(allPosts);
    } else {
      const lowerKeyword = keyword.toLowerCase();
      const filtered = allPosts.filter(
        (post) =>
          post.title?.toLowerCase().includes(lowerKeyword) ||
          post.content?.toLowerCase().includes(lowerKeyword)
      );
      setFilteredPosts(filtered);
    }
  }, [keyword, allPosts]);

  const prepareGenderSentimentData = (genderType) => {
    const sentimentCounts = {
      positive: 0,
      neutral: 0,
      negative: 0,
    };

    filteredPosts
      .filter((post) => post.gender === genderType)
      .forEach((post) => {
        const sentiment = post.sentiment?.toLowerCase();
        if (sentimentCounts[sentiment] !== undefined) {
          sentimentCounts[sentiment]++;
        }
      });

    return Object.entries(sentimentCounts).map(([name, value]) => ({
      name,
      value,
    }));
  };

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 rounded-lg shadow-md border border-gray-300">
          <p className="font-semibold capitalize">{payload[0].name}</p>
          <p className="text-gray-600">Posts: {payload[0].value}</p>
        </div>
      );
    }
    return null;
  };

  const totalPosts = filteredPosts.length;
  const latestPost =
    filteredPosts.length > 0
      ? filteredPosts.reduce((latest, current) =>
          new Date(current.date) > new Date(latest.date) ? current : latest
        )
      : null;

  const askWomenData = prepareGenderSentimentData("askwomen");
  const askMenData = prepareGenderSentimentData("askmen");

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-purple-50 flex flex-col items-center p-6 mt-12">
      <SearchBar onSearch={setKeyword} externalQuery={keyword} />
        <HotTopics onTopicClick={setKeyword} />

        <div className="mt-10 bg-white rounded-2xl shadow-xl p-6 w-full max-w-7xl">
          {/* Bilgi Kartları */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
            <div className="bg-purple-50 p-4 rounded-xl">
              <h3 className="text-xl font-bold mb-2">Total Posts</h3>
              <p className="text-3xl font-bold text-purple-600">{totalPosts}</p>
            </div>

            <div className="bg-purple-50 p-4 rounded-xl">
              <h3 className="text-xl font-bold mb-2">Latest Post</h3>
              {latestPost && (
                <p className="text-sm text-gray-600 truncate">
                  {latestPost.title}
                  <br />
                  <span className="text-xs text-gray-500">
                    {new Date(latestPost.date).toLocaleDateString()}
                  </span>
                </p>
              )}
            </div>
          </div>

          {/* İki ayrı grafik ya da boş veri mesajı */}
          {keyword.trim() !== "" && filteredPosts.length === 0 ? (
            <div className="text-center mt-16 text-gray-500 text-lg font-medium">
              No matching posts found for your search.
            </div>
          ) : (
            <div className="mb-8">
              <h2 className="text-2xl font-bold mb-6 text-center text-purple-700">
                Sentiment Distribution by Gender
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Kadın */}
                <div>
                  <h3 className="text-lg font-semibold text-center mb-4 text-purple-500">
                    Women
                  </h3>
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={askWomenData}
                        dataKey="value"
                        nameKey="name"
                        cx="50%"
                        cy="50%"
                        outerRadius={120}
                        label={({ name, percent }) =>
                          `${name} ${(percent * 100).toFixed(0)}%`
                        }
                      >
                        {askWomenData.map((entry, index) => (
                          <Cell
                            key={`cell-women-${index}`}
                            fill={SENTIMENT_COLORS[entry.name]}
                          />
                        ))}
                      </Pie>
                      <Tooltip content={<CustomTooltip />} />
                    </PieChart>
                  </ResponsiveContainer>
                  <div className="mt-4 flex justify-center">
                    <Link
                      href="/postsGender/askwomen"
                      className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded-full transition-colors duration-200 flex items-center gap-2"
                    >
                      <span>See All Women Posts</span>
                    </Link>
                  </div>
                </div>

                {/* Erkek */}
                <div>
                  <h3 className="text-lg font-semibold text-center mb-4 text-purple-500">
                    Men
                  </h3>
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={askMenData}
                        dataKey="value"
                        nameKey="name"
                        cx="50%"
                        cy="50%"
                        outerRadius={120}
                        label={({ name, percent }) =>
                          `${name} ${(percent * 100).toFixed(0)}%`
                        }
                      >
                        {askMenData.map((entry, index) => (
                          <Cell
                            key={`cell-men-${index}`}
                            fill={SENTIMENT_COLORS[entry.name]}
                          />
                        ))}
                      </Pie>
                      <Tooltip content={<CustomTooltip />} />
                    </PieChart>
                  </ResponsiveContainer>
                  <div className="mt-4 flex justify-center">
                    <Link
                      href="/postsGender/askmen"
                      className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded-full transition-colors duration-200 flex items-center gap-2"
                    >
                      <span>See All Men Posts</span>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default GenderGraph;
