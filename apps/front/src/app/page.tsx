import Hero from '@/components/hero';
import PostList from '@/components/PostList';
import { fetchPosts } from '@/lib/actions/postActions';
import { DEFAULT_PAGE_SIZE } from 'server/dist/src/constants';

type Props = {
  searchParams: { [key: string]: string | string[] | undefined }
}
export default async function Home({ searchParams }: Props) {
  const { page } = await searchParams;
  const { posts, postsTotalCount } = await fetchPosts({ pageNumber: page ? +page : undefined });
  return (
    <main>
      <Hero />
      <PostList
        posts={posts}
        currentPage={page ? +page : 1}
        totalPages={Math.ceil(postsTotalCount/DEFAULT_PAGE_SIZE)}/>
    </main>
  );
}
