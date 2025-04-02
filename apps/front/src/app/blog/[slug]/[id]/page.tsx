import React from 'react';
import Image from 'next/image';
import { fetchPostById } from '@/lib/actions/post';
import { SanitizedContent } from '@/app/blog/[slug]/[id]/_components/SanitizedContent';
import CommentsList from '@/app/blog/[slug]/[id]/_components/CommentsList';
import TagsList from '@/app/blog/[slug]/[id]/_components/TagsList';
import { getSession } from '@/lib/session';
import Like from "@/components/Like";

type Props = {
  params: {
    id: string
  }
}

async function PostPage({ params }: Props) {
  const postId = (await params).id;
  const post = await fetchPostById(+postId);
  const session = await getSession();

  return (
    <main className="container flex flex-col gap-4 mx-auto px-4 py-8 md:mt-16">
      <h1 className="text-center text-2xl md:text-4xl font-bold mb-4 text-slate-700">{post?.title}</h1>

      <p className="text-slate-500 text-sm mb-4" suppressHydrationWarning>
        By {post?.author?.name} | {new Date(post?.createdAt).toLocaleDateString()}
      </p>

      <div className="flex justify-center">
        <div className="relative rounded-lg  overflow-hidden">
          <Image
            src={post?.thumbnail ?? '/no-image.png'}
            alt={post?.title}
            width={640}
            height={380}
          />
        </div>
      </div>

      <SanitizedContent content={post?.content} />

      <TagsList tags={post?.tags} />

      <Like postId={ post?.id } user={ session?.user }/>

      <CommentsList postId={post?.id} user={session?.user} />
    </main>
  )
    ;
}

export default PostPage;