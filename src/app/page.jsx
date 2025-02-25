"use client";

import { useRouter } from "next/navigation";
import { FaGlobe, FaVenusMars, FaUsers } from "react-icons/fa";

export default function HomePage() {
  const router = useRouter();

  const categories = [
    {
      title: "Ülkelere Göre Analiz",
      description: "Farklı ülkelerdeki insanların duygu analizini keşfedin.",
      icon: <FaGlobe size={50} />,
      bgColor: "bg-blue-500",
      hoverColor: "hover:bg-blue-600",
      link: "/pages/map-page",
    },
    {
      title: "Cinsiyete Göre Analiz",
      description: "Kadın ve erkeklerin iklim değişikliği hakkındaki görüşleri.",
      icon: <FaVenusMars size={50} />,
      bgColor: "bg-pink-500",
      hoverColor: "hover:bg-pink-600",
      link: "/search/gender",
    },
    {
      title: "Kuşaklara Göre Analiz",
      description: "Farklı kuşakların duygu analizlerini inceleyin.",
      icon: <FaUsers size={50} />,
      bgColor: "bg-green-500",
      hoverColor: "hover:bg-green-600",
      link: "/search/generations",
    },
  ];

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
      <div className="flex gap-6">
        {categories.map((category, index) => (
          <div
            key={index}
            className={`w-64 h-40 p-6 rounded-lg shadow-lg text-white text-center cursor-pointer transition-transform transform hover:scale-105 flex flex-col items-center justify-center ${category.bgColor} ${category.hoverColor}`}
            onClick={() => router.push(category.link)}
          >
            <div className="mb-3">{category.icon}</div>
            <h2 className="text-xl font-semibold">{category.title}</h2>
            <p className="text-sm opacity-90 mt-1">{category.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
