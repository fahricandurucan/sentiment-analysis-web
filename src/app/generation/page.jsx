"use client";
import { useEffect, useState } from "react";
import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";
import HotTopics from "@/app/components/HotTopics";
import SearchBar from "@/app/components/SearchBar";
import Link from "next/link";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const GenerationGraph = () => {
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
        const response = await fetch("/generation.json");
        const data = await response.json();
        setAllPosts(data);
        setFilteredPosts(data);
      } catch (error) {
        console.error("Error fetching data:", error);
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

  const prepareGenerationSentimentData = () => {
    const generations = ["GenX", "millennials", "GenZ", "GenAlpha"];
    const data = generations.map((generation) => {
      const generationPosts = filteredPosts.filter(
        (post) => post.generation === generation
      );
      const sentimentCounts = {
        positive: 0,
        neutral: 0,
        negative: 0,
      };

      generationPosts.forEach((post) => {
        const sentiment = post.sentiment?.toLowerCase();
        if (sentimentCounts[sentiment] !== undefined) {
          sentimentCounts[sentiment]++;
        }
      });

      return {
        generation,
        ...sentimentCounts,
        total: generationPosts.length,
      };
    });

    return data;
  };

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 rounded-lg shadow-md border border-gray-300">
          <p className="font-semibold">{label}</p>
          {payload.map((entry, index) => (
            <p key={index} className="text-gray-600">
              {entry.name}: {entry.value}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  const generationData = prepareGenerationSentimentData();
  const totalPosts = filteredPosts.length;
  const latestPost =
    filteredPosts.length > 0
      ? filteredPosts.reduce((latest, current) =>
          new Date(current.date) > new Date(latest.date) ? current : latest
        )
      : null;

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-purple-50 flex flex-col items-center p-6 mt-12">
      <SearchBar onSearch={setKeyword} externalQuery={keyword} />
        <HotTopics onTopicClick={setKeyword} />

        <div className="mt-10 bg-white rounded-2xl shadow-xl p-6 w-full max-w-7xl">
          {/* Info Cards */}
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

          {/* Bar Chart */}
          {keyword.trim() !== "" && filteredPosts.length === 0 ? (
            <div className="text-center mt-16 text-gray-500 text-lg font-medium">
              No matching posts found for your search.
            </div>
          ) : (
            <div className="mb-8">
              <h2 className="text-2xl font-bold mb-6 text-center text-purple-700">
                Sentiment Distribution by Generation
              </h2>

              <div className="h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={generationData}
                    margin={{
                      top: 20,
                      right: 30,
                      left: 20,
                      bottom: 5,
                    }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="generation" />
                    <YAxis />
                    <Tooltip content={<CustomTooltip />} />
                    <Legend />
                    <Bar dataKey="positive" fill={SENTIMENT_COLORS.positive} name="Positive" />
                    <Bar dataKey="neutral" fill={SENTIMENT_COLORS.neutral} name="Neutral" />
                    <Bar dataKey="negative" fill={SENTIMENT_COLORS.negative} name="Negative" />
                  </BarChart>
                </ResponsiveContainer>
              </div>

              {/* Generation Links */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-8">
                {generationData.map((gen) => (
                  <div
                    key={gen.generation}
                    className="bg-purple-50 p-4 rounded-xl hover:bg-purple-100 transition-colors duration-200"
                  >
                    <h3 className="text-lg font-semibold text-purple-700">
                      {gen.generation === "millennials" ? "GenY" : gen.generation}
                    </h3>
                    <p className="text-sm text-gray-600">
                      Total Posts: {gen.total}
                    </p>
                    <div className="mt-2 space-y-1">
                      <p className="text-sm">
                        <span className="text-green-500">Positive:</span>{" "}
                        {gen.positive}
                      </p>
                      <p className="text-sm">
                        <span className="text-yellow-500">Neutral:</span>{" "}
                        {gen.neutral}
                      </p>
                      <p className="text-sm">
                        <span className="text-red-500">Negative:</span>{" "}
                        {gen.negative}
                      </p>
                    </div>
                    <Link
                      href={`/postsGeneration/${gen.generation}`}
                      className="mt-4 block w-full text-center bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded-lg transition-colors duration-200"
                    >
                      See All {gen.generation === "millennials" ? "GenY" : gen.generation} Posts
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default GenerationGraph;