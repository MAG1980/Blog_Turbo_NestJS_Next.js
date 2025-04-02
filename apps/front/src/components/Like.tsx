'use client'
import { SessionUser } from "@/lib/session/types";
import { useQuery } from "@tanstack/react-query";
import { fetchPostLikesData } from "@/lib/actions/like"
import { HeartIcon as SolidHeartIcon } from "@heroicons/react/20/solid";
import { HeartIcon } from "@heroicons/react/24/outline";

type Props = {
  postId: number
  user?: SessionUser
}
const Like = ({ postId, user }: Props) => {
  const { data } = useQuery({
    queryKey: ["FETCH_POST_LIKES_DATA", postId],
    queryFn: async () => await fetchPostLikesData(postId)
  })
  return (
    <div className="flex items-center justify-start mt-3 gap-2">
      { data?.isAuthUserLikedPost ? (
          <button>
            <SolidHeartIcon className="w-6 text-rose-600"/>
          </button>
        )
        : (
          <button>
            <HeartIcon className="w-6"/>
          </button>
        ) }
      <p className="text-slate-600">{ data?.postLikesCount }</p>
    </div>
  )
}
export default Like