import { fetchPostsByJwtUser } from "@/lib/actions/post";
import { DEFAULT_PAGE_SIZE } from "server/dist/src/constants";
import NoPosts from "@/app/user/posts/_components/NoPosts";
import PostList from "@/app/user/posts/_components/PostList";

type Props = {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}
const UserPostsPage = async ({ searchParams }: Props) => {
  const { page, pageSize } = await searchParams

  const currentPage = page ? +page : 1
  const currentPageSize = pageSize ? +pageSize : DEFAULT_PAGE_SIZE

  const { totalPosts, posts } = await fetchPostsByJwtUser({
    pageNumber: currentPage,
    pageSize: currentPageSize
  })

  const totalPages = Math.ceil(totalPosts / currentPageSize)

  return (
    <div>
      { ( !posts || !posts.length ) ? <NoPosts/>
        :
        <PostList posts={ posts } currentPage={ currentPage } totalPages={ totalPages }/>
      }
      <div>Всего: { totalPosts }</div>
    </div>
  )
}
export default UserPostsPage