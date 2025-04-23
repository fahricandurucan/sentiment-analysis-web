"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Navbar from "@/app/components/Navbar";
import PostCard from "@/app/components/PostCard";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/solid";

const PostsPage = () => {
  const params = useParams();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 5;

  useEffect(() => {
    const genderName = params.gender;
    if (genderName) {
      fetch("/gender.json")
        .then((res) => res.json())
        .then((data) => {
          const filtered = data.filter(
            (post) =>
              post.gender.toLowerCase() === decodeURIComponent(genderName).toLowerCase()
          );
          setPosts(filtered);
          setLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching posts:", error);
          setLoading(false);
        });
    }
  }, [params.gender]);

  const totalPages = Math.ceil(posts.length / postsPerPage);
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  if (loading) {
    return (
      <div className="min-h-screen bg-purple-50">
        <Navbar />
        <div className="flex justify-center items-center h-screen">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
        </div>
      </div>
    );
  }
  const getFormattedGenderTitle = (genderParam) => {
    if (!genderParam) return "";
    const lower = genderParam.toLowerCase();
    if (lower === "askmen") return "Men";
    if (lower === "askwomen") return "Women";
    return decodeURIComponent(genderParam);
  };
  
  

  return (
    <div className="min-h-screen bg-purple-50">
      <Navbar />
      <div className="container mx-auto p-6 mt-16 flex flex-col items-center">
        <h1 className="text-3xl font-semibold mb-6 text-gray-800 text-center">
        • Posts from {getFormattedGenderTitle(params.gender)} •
        </h1>
        <div className="w-full max-w-2xl grid gap-4">
          {currentPosts.length > 0 ? (
            currentPosts.map((post, index) => (
              <PostCard
                key={post.id || index}
                title={post.title}
                link={post.link}
                sentiment={post.sentiment}
                date={post.date}
              />
            ))
          ) : (
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <p className="text-gray-600">No posts available for this gender.</p>
            </div>
          )}
        </div>

        {totalPages > 1 && (
          <div className="flex mt-6 space-x-4 items-center">
            <button
              onClick={() => paginate(currentPage - 1)}
              disabled={currentPage === 1}
              className="p-2 rounded-full border border-purple-500 text-purple-500 hover:bg-purple-500 hover:text-white transition disabled:opacity-50"
            >
              <ChevronLeftIcon className="h-6 w-6" />
            </button>
            <span className="px-4 py-2 text-gray-700">
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={() => paginate(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="p-2 rounded-full border border-purple-500 text-purple-500 hover:bg-purple-500 hover:text-white transition disabled:opacity-50"
            >
              <ChevronRightIcon className="h-6 w-6" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default PostsPage;
