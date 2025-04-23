const PostCard = ({ title, link, sentiment, date }) => {
    return (
      <div className="border p-4 rounded-lg shadow-xl mb-4 bg-white">
        <h3 className="text-xl font-semibold">{title}</h3>
        <a
          href={link}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-500 hover:underline"
        >
          Read More
        </a>
        <p className="mt-2 text-sm">
          Sentiment:{" "}
          <span
            className={`${
              sentiment === "positive"
                ? "text-green-500"
                : sentiment === "neutral"
                ? "text-yellow-500"
                : sentiment === "negative"
                ? "text-red-500"
                : "text-gray-400"
            }`}
          >
            {sentiment}
          </span>
        </p>
        <p className="mt-2 text-sm">Posted on: {new Date(date).toLocaleDateString()}</p>
      </div>
    );
  };
  export default PostCard;