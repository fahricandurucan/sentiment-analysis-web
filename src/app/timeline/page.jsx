"use client";
import { useState, useEffect, useCallback } from 'react';
import { Line } from 'react-chartjs-2';
import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";
import HotTopics from "@/app/components/HotTopics";
import SearchBar from "@/app/components/SearchBar";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export default function TimelinePage() {
  const [activeTab, setActiveTab] = useState('country');
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [selectedOption, setSelectedOption] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [dropdownOptions, setDropdownOptions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = useCallback(async (type) => {
    try {
      console.log('Fetching data for type:', type);
      const response = await fetch(`/api/timeline?type=${type}`);
      
      if (!response.ok) {
        throw new Error(`Failed to fetch ${type} data: ${response.status}`);
      }
      
      const jsonData = await response.json();
      console.log('Received data:', jsonData.length, 'items');
      
      if (!Array.isArray(jsonData)) {
        throw new Error('Invalid data format: expected an array');
      }

      return jsonData;
    } catch (error) {
      console.error('Error in fetchData:', error);
      throw error;
    }
  }, []);

  // Veri yükleme işlemi
  useEffect(() => {
    let isMounted = true;

    const loadData = async () => {
      try {
        setIsLoading(true);
        setError(null);
        console.log('Starting data load for:', activeTab);

        const jsonData = await fetchData(activeTab);
        
        if (!isMounted) {
          console.log('Component unmounted, skipping state updates');
          return;
        }

        // Filter out items with invalid dates
        const validData = jsonData.filter(item => {
          const date = new Date(item.date);
          return !isNaN(date.getTime());
        });

        console.log('Valid data count:', validData.length);

        setData(validData);
        setFilteredData(validData);
        
        // Set dropdown options based on active tab
        const options = new Set();
        validData.forEach(item => {
          const value = item[activeTab];
          if (value) options.add(value);
        });
        
        setDropdownOptions(Array.from(options));
        console.log('Dropdown options:', Array.from(options));

      } catch (error) {
        console.error('Error in loadData:', error);
        if (isMounted) {
          setError(error.message);
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    loadData();

    return () => {
      isMounted = false;
    };
  }, [activeTab, fetchData]);

  // Arama işlemi
  useEffect(() => {
    if (!data) return;

    if (searchQuery) {
      const filtered = data.filter(item => 
        item.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.content?.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredData(filtered);
    } else {
      setFilteredData(data);
    }
  }, [searchQuery, data]);

  const handleSearch = useCallback((query) => {
    setSearchQuery(query);
  }, []);

  const getChartData = useCallback(() => {
    if (!selectedOption || !filteredData || filteredData.length === 0) {
      console.log('No data available for chart');
      return null;
    }

    console.log('Generating chart data for:', selectedOption);

    // Group data by month and calculate sentiment counts
    const monthlyData = {};
    filteredData.forEach(item => {
      if (item[activeTab] === selectedOption) {
        const date = new Date(item.date);
        if (isNaN(date.getTime())) return;

        const month = date.toLocaleString('default', { month: 'long' });
        const year = date.getFullYear();
        const monthYear = `${month} ${year}`;
        
        if (!monthlyData[monthYear]) {
          monthlyData[monthYear] = {
            positive: 0,
            negative: 0,
            neutral: 0,
            date: date
          };
        }
        
        const sentiment = item.sentiment?.toLowerCase();
        if (sentiment && monthlyData[monthYear].hasOwnProperty(sentiment)) {
          monthlyData[monthYear][sentiment]++;
        }
      }
    });

    // Convert to array and sort by date
    const sortedMonths = Object.entries(monthlyData)
      .sort((a, b) => a[1].date - b[1].date)
      .map(([monthYear]) => monthYear);

    console.log('Chart months:', sortedMonths);

    const positiveData = sortedMonths.map(month => monthlyData[month].positive);
    const negativeData = sortedMonths.map(month => monthlyData[month].negative);
    const neutralData = sortedMonths.map(month => monthlyData[month].neutral);

    return {
      labels: sortedMonths,
      datasets: [
        {
          label: 'Positive',
          data: positiveData,
          borderColor: 'rgb(34, 197, 94)',
          backgroundColor: 'rgba(34, 197, 94, 0.1)',
          tension: 0.1,
          fill: true
        },
        {
          label: 'Negative',
          data: negativeData,
          borderColor: 'rgb(239, 68, 68)',
          backgroundColor: 'rgba(239, 68, 68, 0.1)',
          tension: 0.1,
          fill: true
        },
        {
          label: 'Neutral',
          data: neutralData,
          borderColor: 'rgb(234, 179, 8)',
          backgroundColor: 'rgba(234, 179, 8, 0.1)',
          tension: 0.1,
          fill: true
        }
      ]
    };
  }, [selectedOption, filteredData, activeTab]);

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          font: {
            size: 14
          }
        }
      },
      title: {
        display: true,
        text: 'Monthly Sentiment Distribution',
        font: {
          size: 16
        }
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Number of Posts'
        }
      },
      x: {
        title: {
          display: true,
          text: 'Month'
        },
        ticks: {
          maxRotation: 45,
          minRotation: 45
        }
      }
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-purple-50 flex items-center justify-center">
        <div className="text-2xl text-purple-600">Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-purple-50 flex items-center justify-center">
        <div className="text-2xl text-red-600">Error: {error}</div>
      </div>
    );
  }

  const chartData = getChartData();

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-purple-50 flex flex-col items-center p-4 md:p-6 mt-12">
        <div className="w-full max-w-7xl mx-auto">
          <div className="w-full flex flex-col items-center">
            <SearchBar onSearch={handleSearch} externalQuery={searchQuery} />
            <HotTopics onTopicClick={handleSearch} />
          </div>
          
          <div className="mt-8 flex flex-col md:flex-row justify-center gap-4">
            <button
              onClick={() => setActiveTab('country')}
              className={`px-4 py-2 rounded-lg text-sm md:text-base ${
                activeTab === 'country' 
                  ? 'bg-purple-600 text-white' 
                  : 'bg-gray-200 text-gray-700'
              }`}
            >
              Country
            </button>
            <button
              onClick={() => setActiveTab('gender')}
              className={`px-4 py-2 rounded-lg text-sm md:text-base ${
                activeTab === 'gender' 
                  ? 'bg-purple-600 text-white' 
                  : 'bg-gray-200 text-gray-700'
              }`}
            >
              Gender
            </button>
            <button
              onClick={() => setActiveTab('generation')}
              className={`px-4 py-2 rounded-lg text-sm md:text-base ${
                activeTab === 'generation' 
                  ? 'bg-purple-600 text-white' 
                  : 'bg-gray-200 text-gray-700'
              }`}
            >
              Generation
            </button>
          </div>

          <div className="mt-8 w-full max-w-xs md:max-w-md mx-auto">
            <select
              value={selectedOption}
              onChange={(e) => setSelectedOption(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-lg text-sm md:text-base"
            >
              <option value="">Select {activeTab}</option>
              {dropdownOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>

          {chartData && (
            <div className="mt-8 w-full bg-white p-4 md:p-6 rounded-lg shadow-lg">
              <div className="w-full" style={{ height: '300px', '@media (min-width: 768px)': { height: '500px' } }}>
                <Line 
                  data={chartData} 
                  options={{
                    ...chartOptions,
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                      ...chartOptions.plugins,
                      legend: {
                        ...chartOptions.plugins.legend,
                        labels: {
                          ...chartOptions.plugins.legend.labels,
                          boxWidth: 12,
                          padding: 15,
                          font: {
                            size: window.innerWidth < 768 ? 10 : 14
                          }
                        }
                      },
                      title: {
                        ...chartOptions.plugins.title,
                        font: {
                          size: window.innerWidth < 768 ? 14 : 16
                        }
                      }
                    },
                    scales: {
                      ...chartOptions.scales,
                      x: {
                        ...chartOptions.scales.x,
                        ticks: {
                          ...chartOptions.scales.x.ticks,
                          font: {
                            size: window.innerWidth < 768 ? 10 : 12
                          }
                        }
                      },
                      y: {
                        ...chartOptions.scales.y,
                        ticks: {
                          font: {
                            size: window.innerWidth < 768 ? 10 : 12
                          }
                        }
                      }
                    }
                  }} 
                />
              </div>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
} 