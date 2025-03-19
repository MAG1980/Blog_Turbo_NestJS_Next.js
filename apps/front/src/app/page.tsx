import Hero from '@/components/Hero';
import PostList from '@/components/PostList';
import { fetchPosts } from '@/lib/actions/post';
import { DEFAULT_PAGE_SIZE } from 'server/dist/src/constants';
import { getSession } from '@/lib/session';

type Props = {
  searchParams: { [key: string]: string | string[] | undefined }
}
export default async function Home({ searchParams }: Props) {
  const { page } = await searchParams;
  const { posts, postsTotalCount } = await fetchPosts({ pageNumber: page ? +page : undefined });

  const session = await getSession();
  console.log({ session });
  return (
    <main>
      <Hero />
      <PostList
        posts={posts}
        currentPage={page ? +page : 1}
        totalPages={Math.ceil(postsTotalCount / DEFAULT_PAGE_SIZE)} />
    </main>
  );
}
