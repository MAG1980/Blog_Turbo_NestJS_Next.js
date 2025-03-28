'use client'

import { useQuery } from "@tanstack/react-query";
import { GET_COMMENTS_GY_POST_ID } from "@/lib/gql/queries/comment";
import { fetchCommentsByPostId } from "@/lib/actions/comment";
import { useState } from "react";
import { DEFAULT_PAGE_SIZE } from "server/dist/src/constants";
import CommentCard from "@/app/blog/[slug]/[id]/_components/CommentCard";
import CommentsPagination from "@/app/blog/[slug]/[id]/_components/CommentsPagination";
import CommentCardSkeleton from "@/app/blog/[slug]/[id]/_components/CommentCardSkeleton";

type Props = {
  postId: number;
}

function CommentsList({ postId }: Props) {
  const [page, setPage] = useState(1)
  const { data, isLoading } = useQuery({
    // postId, page - парамеры, при изменении которых будет запрашиваться новые данные
    queryKey: [GET_COMMENTS_GY_POST_ID, postId, page],
    queryFn: async () => await fetchCommentsByPostId({
      postId,
      skip: ( page - 1 ) * DEFAULT_PAGE_SIZE,
      take: DEFAULT_PAGE_SIZE
    }),
  })

  const totalPages = Math.ceil(( data?.totalCount ?? 0 ) / DEFAULT_PAGE_SIZE)

  return (
    <div className="p-2 rounded-md shadow-md">
      <h6 className="text-lg text-slate-700">Комментарии</h6>
      <div className="flex flex-col gap-4">
        { isLoading ? Array.from({ length: DEFAULT_PAGE_SIZE }).map((_, index) => (
            <CommentCardSkeleton key={ index }/> ))
          :
          data?.comments.map(comment => ( <CommentCard key={ comment.id } comment={ comment }/> )) }
      </div>
      <CommentsPagination
        className="p-2"
        totalPages={ totalPages }
        currentPage={ page }
        setCurrentPage={ (page) => setPage(page) }/>
    </div>
  );
}

export default CommentsList;