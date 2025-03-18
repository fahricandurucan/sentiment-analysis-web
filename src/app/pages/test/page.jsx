"use client"
import PostCard from "../../components/PostCard";

const testPost = {
  title: "Test Post",
  content: "Bu bir test içeriğidir.",
  sentiment: "positive",
  image_url:"https://i.redd.it/tdiebll4isje1.png",
  link: "https://www.reddit.com/r/afghanistan/comments/1j0f9ku/taliban_says_misunderstanding_led_to_arrest_of/"
};

const TestPost = () => {
  return (
    <div className="p-10">
      <PostCard post={testPost} />
    </div>
  );
};

export default TestPost;
