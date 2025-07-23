import { getAllPosts } from "./lib/posts";
import Homepage from "./components/Homepage";

export default function Home() {
  const posts = getAllPosts();
  const latestPost = posts.length > 0 ? posts[0] : null;

  return <Homepage latestPost={latestPost} />;
}