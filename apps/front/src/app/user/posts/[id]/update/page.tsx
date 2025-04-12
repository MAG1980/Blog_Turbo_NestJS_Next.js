import UpdatePostContainer from "@/app/user/posts/[id]/update/_components/UpdatePostContainer";
import { fetchPostById } from "@/lib/actions/post";


type Props = {
  params: {
    id: string
  }
}
const UpdatePostPage = async ({ params }: Props) => {
  const { id: postId } = await params
  const post = await fetchPostById(+postId)
  return (
    <div className="max-w-2xl w-full bg-white shadow-md rounded-md p-6">
      <h2 className="text-lg text-center font-bold text-slate-700">Обновить пост</h2>
      <UpdatePostContainer post={ post }/>
    </div>
  )
}
export default UpdatePostPage