import { PostEntity } from "server/dist/src/post/entities/post.entity";
import Post from "@/app/user/posts/_components/Post";
import Pagination from "@/components/Pagination";

type Props = {
  posts: PostEntity[]
  currentPage: number,
  totalPages: number
}
const PostList = ({ posts, currentPage, totalPages }: Props) => {
  return (
    <>
      <div className="grid grid-cols-8 text-center shadow-md m-3 p-3">
        <div className="col-span-3"></div>
        <div>Date</div>
        <div>Published</div>
        <div>Likes</div>
        <div>Comments</div>
        <div></div>
      </div>

      <div>
        { posts.map(post => ( <Post key={ post.id } post={ post }/> )) }
      </div>

      <Pagination className="my-4" {...{currentPage, totalPages}} />
    </>
  )
}
export default PostList