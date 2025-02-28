"use client";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useRouter } from "next/navigation";
import { FaGlobe, FaVenusMars, FaUsers } from "react-icons/fa";

export default function HomePage() {
  const router = useRouter();

  const categories = [
    {
      title: "Analysis by Country",
      description:
        "Discover sentiment analysis of people in different countries.",
      icon: <FaGlobe size={50} />,
      bgColor: "bg-lime-50/40 backdrop-blur-md",
      hoverColor: "hover:bg-lime-200/50",
      link: "/pages/country",
    },
    {
      title: "Analysis by Gender",
      description: "Explore how men and women perceive climate change.",
      icon: <FaVenusMars size={50} />,
      bgColor: "bg-rose-100/40 backdrop-blur-md",
      hoverColor: "hover:bg-rose-300/50",
      link: "/search/gender",
    },
    {
      title: "Analysis by Generations",
      description: "Examine the sentiment analysis of different generations.",
      icon: <FaUsers size={50} />,
      bgColor: "bg-slate-200/40 backdrop-blur-md",
      hoverColor: "hover:bg-slate-400/50",
      link: "/search/generations",
    },
  ];

  return (
    <>
      <Navbar />
      <div
        className="min-h-screen flex flex-col items-center justify-center p-6 relative bg-cover bg-center"
        style={{ backgroundImage: "url('/background_new2.jpg')" }}
      >
        {/* Opaklık efekti */}
        <div className="absolute inset-0 bg-gray-300 opacity-80"></div>

        {/* Hero Bölümü */}
        <div className="relative z-10 text-slate-900 mb-12 flex flex-col items-center font-serif">
          {/* Ana Başlık */}
          <h1 className="text-6xl font-bold mb-2 leading-tight text-lime-600 tracking-wide">
            GlobaLens<span className="text-lg">🌍</span>
          </h1>

          {/* Alt Başlık */}
          <h1 className="text-4xl font-semibold mb-4 leading-snug max-w-3x tracking-[0.1em]">
            Explore <span className="text-[#123F50]">Global Sentiment</span>{" "}
            Analysis
          </h1>

          {/* Alt Navigation Metni */}
          <p className="text-md font-medium tracking-[0.8em] text-gray-800 flex gap-12">
            Country &  
            Gender &
            Generation
          </p>
        </div>

        {/* Kategoriler */}
        <div className="relative z-10 flex gap-6">
          {categories.map((category, index) => (
            <div
              key={index}
              className={`w-72 h-80 p-6 rounded-xl border border-white/40 shadow-lg text-slate-900 flex flex-col items-center justify-center text-center cursor-pointer transition-all duration-500 ease-in-out transform hover:scale-110 hover:shadow-2xl ${category.bgColor} ${category.hoverColor}`}
              onClick={() => router.push(category.link)}
            >
              <div className="mb-3 text-white drop-shadow-xl text-center">
                {category.icon}
              </div>
              <h2 className="text-2xl font-semibold text-black drop-shadow-md">
                {category.title}
              </h2>
              <p className="text-sm text-gray-800 opacity-90 mt-1">
                {category.description}
              </p>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </>
  );
}
