import { getAllPosts } from "./lib/posts";
import { homeMetadata } from "./lib/metadata";
import Homepage from "./components/Homepage";

export const metadata = homeMetadata;

export default function Home() {
  const posts = getAllPosts();
  const latestPost = posts.length > 0 ? posts[0] : null;

  return <Homepage latestPost={latestPost} />;
}