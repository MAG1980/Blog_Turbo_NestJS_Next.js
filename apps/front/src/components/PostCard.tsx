import Image from 'next/image';

import { Post } from '@prisma/client';
import Link from 'next/link';

type Props = Partial<Post>

function PostCard({ id, title, slug, thumbnail, content, createdAt }: Props) {
  return (
    <div className="flex flex-col items-center bg-white rounded-t-lg shadow-md overflow-hidden">
      <div className="relative">
        <Image
          src={thumbnail ?? '/no-image.png'}
          alt={title ?? ''}
          // fill
          width={640}
          height={480}
        />
        {/*        <img
          className="md:h-60 w-full object-cover"
          src={thumbnail ?? '/no-image.png'}
          alt={title ?? ''}
        />*/}
      </div>
      <div className="flex flex-col flex-grow p-6">
        <h3 className="h-14 overflow-hidden text-lg font-bold mt-4 break-words text-center text-gray-600">{title}</h3>
        <p className="mt-2 text-gray-500 text-sm">{new Date(createdAt ?? '').toLocaleDateString()}</p>
        <p className="flex-grow mt-4 text-gray-700">{content?.slice(0, 100)}...</p>
        <Link className="text-indigo-600 text-right hover:underline mt-2 block" href={`/blog/${slug}/${id}`}>Read
          more</Link>
      </div>
    </div>
  );
}

export default PostCard;