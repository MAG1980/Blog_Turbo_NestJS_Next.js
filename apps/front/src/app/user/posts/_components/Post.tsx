import { CheckIcon } from "@heroicons/react/20/solid";
import Image from "next/image";
import { PostEntity } from "server/dist/src/post/entities/post.entity";
import PostActions from "@/app/user/posts/_components/PostActions";

type Props = {
  post: PostEntity
}
const Post = ({ post }: Props) => {
  return (
    <div
      className="grid grid-cols-8 m-2 rounded-md overflow-hidden border shadow hover:scale-[101%] transition-transform duration-300 text-center bg-white"
      key={ post.id }>
      <div className="relative w-48 h-32">
        <Image src={ post.thumbnail || '/no-image.png' } alt={ post.title } fill/>
      </div>

      <div className="col-span-2 flex flex-col gap-2">
        <p className="text-slate-700 text-lg line-clamp-1 px-2">{ post.title }</p>
        <p className="text-slate-500 text-sm line-clamp-3 px-1">{ post.content }</p>
      </div>

      <p className="flex justify-center items-center">{ new Date(post.createdAt).toLocaleDateString() }</p>

      <div className="flex justify-center items-center">
        { post.published && <CheckIcon className="w-5"/> }
      </div>

      <div className="flex justify-center items-center">
        { post._count.likes }
      </div>

      <div className="flex justify-center items-center">
        { post._count.comments }
      </div>

      <PostActions postId={ post.id }/>
    </div>
  )
}
export default Post