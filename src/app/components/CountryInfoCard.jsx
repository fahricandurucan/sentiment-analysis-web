import Link from "next/link";
const CountryInfoCard = ({ country, countryData }) => {
  // Calculate total posts for this country
  const countryPosts = countryData?.filter(post => post.country === country.name) || [];
  const totalPosts = countryPosts.length;
  // Calculate sentiment distribution
  const sentimentCounts = countryPosts.reduce((acc, post) => {
    acc[post.sentiment] = (acc[post.sentiment] || 0) + 1;
    return acc;
  }, {});
  // Get the latest post
  const latestPost = countryPosts.sort((a, b) => new Date(b.date) - new Date(a.date))[0];
  return (
    <div className="bg-white p-6 rounded-lg shadow-lg max-w-xs w-full">
      {/* Country Name */}
      <h3 className="text-3xl font-semibold text-gray-800 mb-4">
        {country.name}
      </h3>
      {/* Country Details */}
      <div className="space-y-4 mb-6">
        <div className="flex items-center text-gray-600">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
          </svg>
          <span className="text-lg">Total Posts: {totalPosts}</span>
        </div>
        {/* Sentiment Distribution */}
        <div className="space-y-2">
          <div className="text-gray-600 font-medium mb-1">Sentiment Distribution:</div>
          <div className="flex gap-2 flex-wrap">
            {Object.entries(sentimentCounts).map(([sentiment, count]) => (
              <span
                key={sentiment}
                className={`px-3 py-1 rounded-full text-white text-sm ${
                  sentiment === "positive"
                    ? "bg-green-500"
                    : sentiment === "neutral"
                    ? "bg-yellow-500"
                    : sentiment === "negative"
                    ? "bg-red-500"
                    : "bg-gray-400"
                }`}
              >
                {sentiment}: {count}
              </span>
            ))}
          </div>
        </div>
        {/* Latest Post */}
        {latestPost && (
          <div className="space-y-2">
            <div className="text-gray-600 font-medium">Latest Post:</div>
            <div className="text-sm text-gray-600">
              <p className="line-clamp-2">{latestPost.title}</p>
              <p className="text-xs mt-1">
                {new Date(latestPost.date).toLocaleDateString()}
              </p>
            </div>
          </div>
        )}
      </div>
      {/* Overall Sentiment Badge */}
      <div className="flex flex-col items-center space-y-4">
        <span
          className={`px-4 py-2 rounded-full text-white text-sm w-full text-center ${
            country.sentiment === "positive"
              ? "bg-green-500"
              : country.sentiment === "neutral"
              ? "bg-yellow-500"
              : country.sentiment === "negative"
              ? "bg-red-500"
              : "bg-gray-400"
          }`}
        >
          Overall Sentiment: {country.sentiment}
        </span>
        {/* See All Posts Button */}
        <Link
          href={`/postsCountry/${country.name}`}
          className="w-full py-2 px-4 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors duration-200 text-center flex items-center justify-center space-x-2"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
          </svg>
          <span>See All Posts</span>
        </Link>
      </div>
    </div>
  );
};
export default CountryInfoCard; 