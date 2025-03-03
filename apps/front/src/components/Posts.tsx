import React, { PropsWithChildren } from 'react';
import { Post } from '@prisma/client';

type Props = PropsWithChildren & {
  posts: Post[]
}

function Posts(props: Props) {
  return (
    <section>
      <h2 className="text-2xl font-bold text-center text-gray-600 leading-tight">Свежие публикации</h2>
      <div className="h-1 mx-auto bg-gradient-to-r from-sky-500 to-indigo-500 w-96 mb-9 mt-5 rounded-t-md"></div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        Post is here
        { props.posts.map((post) => (
          <div>
            { post.title }
          </div>
        )) }
      </div>
    </section>
  );
}

export default Posts;