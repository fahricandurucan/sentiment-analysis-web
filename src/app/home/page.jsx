"use client";
import React from 'react';
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useRouter } from "next/navigation";

const Home = () => {
  const router = useRouter();

  return (
    <>
      <Navbar />
      <div 
        className="min-h-screen w-full justify-center p-6 relative bg-cover bg-center backdrop-blur-3xl" 
        style={{ backgroundImage: "url('background.png')" }}
      >
        <div className="absolute inset-0 bg-white opacity-10"></div>
        <div className="max-w-6xl mx-auto relative">
          {/* Ana başlık bölümü */}
          <div className="mb-4 mt-28 text-left max-w-2xl">
            <h1 className="text-2xl font-bold text-gray-900 mb-1">
              Sentiment Analysis Data - Reddit Graph
            </h1>
            <h2 className="text-xl text-gray-800 mb-2">
              Visualizes: from Reddit
            </h2>
            <p className="text-sm text-gray-600 leading-relaxed">
              This fascinating Reddit-inspired sentiment graph with background designed with soft variables sentiment data from the background data content gives.
            </p>
          </div>

          {/* Kutular */}
          <div className="relative h-[500px]">
            {/* Analysis by Country */}
            <div 
              className="absolute left-[35%] top-[18%] w-[280px] h-[120px] bg-[#FFB5B5] p-5 
                rounded-2xl shadow-lg transform hover:-translate-y-2 transition-all duration-300
                cursor-pointer"
              onClick={() => router.push("/pages/country")}
            >
              <div className="w-4 h-4 bg-[#FF9999] rounded-full mb-3"></div>
              <h3 className="text-sm font-medium text-gray-800">Analysis by Country</h3>
              <p className="text-xs text-gray-600 mt-1">Discover sentiment analysis of people in different countries.</p>
            </div>

            {/* Analysis by Gender */}
            <div 
              className="absolute left-[60%] bottom-[30rem] w-[280px] h-[120px] bg-[#f0f7a9] p-5 
                rounded-2xl shadow-lg transform hover:-translate-y-2 transition-all duration-300
                cursor-pointer"
              onClick={() => router.push("/pages/gender")}
            >
              <div className="w-4 h-4 bg-[#baca60] rounded-full mb-3"></div>
              <h3 className="text-sm font-medium text-gray-800">Analysis by Gender</h3>
              <p className="text-xs text-gray-600 mt-1">Discover sentiment analysis by gender.</p>
            </div>

            {/* Analysis by Generations */}
            <div 
              className="absolute left-[55%] top-[35%] w-[280px] h-[120px] bg-[#B5E0E5] p-5 
                rounded-2xl shadow-lg transform hover:-translate-y-2 transition-all duration-300
                cursor-pointer"
              onClick={() => router.push("/pages/generations")}
            >
              <div className="w-4 h-4 bg-[#92C5D5] rounded-full mb-3"></div>
              <h3 className="text-sm font-medium text-gray-800">Analysis by Generations</h3>
              <p className="text-xs text-gray-600 mt-1">Examine the sentiment analysis of different generations.</p>
            </div>

            {/* Reddit Sentiment Post */}
            <div 
              className="absolute right-[2%] top-[8%] w-[280px] h-[120px] bg-[#dcb5ff] p-5 
                rounded-2xl shadow-lg transform hover:-translate-y-2 transition-all duration-300
                cursor-pointer"
              onClick={() => router.push("/analysis/reddit-posts")}
            >
              <div className="w-4 h-4 bg-[#ab25ff] rounded-full mb-3"></div>
              <h3 className="text-sm font-medium text-gray-800">Reddit Sentiment Post</h3>
              <p className="text-xs text-gray-600 mt-1">Additional insights</p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Home;
