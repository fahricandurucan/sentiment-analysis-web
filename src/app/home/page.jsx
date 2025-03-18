"use client";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useRouter } from "next/navigation";

const Home = () => {
  const router = useRouter();

  return (
    <>
      {/* Arka planı sadece Home sayfasına özgü hale getiriyoruz */}
      <div 
        className="fixed inset-0 -z-10 bg-cover bg-center backdrop-blur-3xl" 
        style={{ backgroundImage: "url('/background.png')" }}
      />

      <Navbar />
      <div className="min-h-screen w-full justify-center p-4 md:p-6 relative">
        <div className="max-w-6xl mx-auto relative">
          {/* Ana başlık bölümü */}
          <div className="mb-4 mt-20 md:mt-28 text-left max-w-2xl px-4 md:px-0">
            <h1 className="text-xl md:text-2xl font-bold text-gray-900 mb-1">
              Sentiment Analysis Data - Reddit Graph
            </h1>
            <h2 className="text-sm md:text-md text-gray-800 mb-2">
              Visualizes: from Reddit
            </h2>
            <p className="text-xs md:text-sm text-gray-600 leading-relaxed">
            These fascinating Reddit-inspired sentiment analyses come from a background data context designed with soft-variant sentiment data in the background.            </p>
          </div>

          {/* Kutular */}
          <div className="relative h-[800px] md:h-[500px]">
            {/* Country Analysis Kutusu */}
            <div 
              className="absolute left-4 md:left-[35%] top-[5%] md:top-[24%] w-[calc(100%-2rem)] md:w-[280px] h-[120px] 
              bg-[#FFB5B5] p-5 rounded-2xl shadow-lg transform hover:-translate-y-2 transition-all duration-300 cursor-pointer
              border-t-[1px] border-r-[1px] border-white/50"
              onClick={() => router.push("/pages/country")}
            >
              <div className="w-4 h-4 bg-[#FF9999] rounded-full mb-3"></div>
              <h3 className="text-sm font-medium text-gray-800">Analysis by Country</h3>
              <p className="text-xs text-gray-600 mt-1">Discover sentiment analysis of people in different countries.</p>
            </div>

            {/* Gender Analysis Kutusu */}
            <div 
              className="absolute left-4 md:left-[55%] top-[28%] md:top-[8%] w-[calc(100%-2rem)] md:w-[280px] h-[120px] 
              bg-[#f0f7a9] p-5 rounded-2xl shadow-lg transform hover:-translate-y-2 transition-all duration-300 cursor-pointer
              border-t-[1px] border-r-[1px] border-white/50"
              onClick={() => router.push("/pages/gender")}
            >
              <div className="w-4 h-4 bg-[#baca60] rounded-full mb-3"></div>
              <h3 className="text-sm font-medium text-gray-800">Analysis by Gender</h3>
              <p className="text-xs text-gray-600 mt-1">Discover sentiment analysis by gender.</p>
            </div>

            {/* Generations Analysis Kutusu */}
            <div 
              className="absolute left-4 md:left-[55%] top-[51%] md:top-[45%] w-[calc(100%-2rem)] md:w-[280px] h-[120px] 
              bg-[#B5E0E5] p-5 rounded-2xl shadow-lg transform hover:-translate-y-2 transition-all duration-300 cursor-pointer
              border-t-[1px] border-r-[1px] border-white/50"
              onClick={() => router.push("/pages/generations")}
            >
              <div className="w-4 h-4 bg-[#92C5D5] rounded-full mb-3"></div>
              <h3 className="text-sm font-medium text-gray-800">Analysis by Generations</h3>
              <p className="text-xs text-gray-600 mt-1">Examine the sentiment analysis of different generations.</p>
            </div>

            {/* Reddit Posts Kutusu */}
            <div 
              className="absolute left-4 md:right-[1%] md:left-auto top-[74%] md:top-[18%] w-[calc(100%-2rem)] md:w-[280px] h-[120px] 
              bg-[#b8c6fd] p-5 rounded-2xl shadow-lg transform hover:-translate-y-2 transition-all duration-300 cursor-pointer
              border-t-[1px] border-r-[1px] border-white/50"
              onClick={() => router.push("/analysis/reddit-posts")}
            >
              <div className="w-4 h-4 bg-[#7b94f7] rounded-full mb-3"></div>
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
