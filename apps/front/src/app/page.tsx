import Hero from '@/components/hero';
import PostList from "@/components/PostList";
import { fetchPosts } from "@/lib/actions/postActions";

export default async function Home() {
  const posts = await fetchPosts()
  return (
    <main>
      <Hero />
      <PostList posts={ posts }/>
    </main>
  );
}
