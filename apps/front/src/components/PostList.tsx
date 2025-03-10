import React, { PropsWithChildren } from 'react';
import PostCard from '@/components/PostCard';
import Pagination from '@/components/Pagination';
import { PostEntity } from "server/dist/src/post/entities/post.entity";

type Props = PropsWithChildren & {
  posts: PostEntity[],
  currentPage: number,
  totalPages: number
}

function PostList(props: Props) {
  return (
    <section className="container mx-auto m-8 max-w-5xl">
      <h2 className="text-2xl font-bold text-center text-gray-600 leading-tight">Свежие публикации</h2>
      <div className="h-1 mx-auto bg-gradient-to-r from-sky-500 to-indigo-500 w-96 mb-9 mt-5 rounded-t-md"></div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        Post is here
        {props.posts?.map((post) => (
          <PostCard key={post.id} {...post} />
        ))}
      </div>
      <Pagination
        className="mt-4"
        currentPage={props.currentPage}
        totalPages={props.totalPages}
      />
    </section>
  );
}

export default PostList;