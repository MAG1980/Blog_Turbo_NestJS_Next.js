'use client';
import { updatePost } from '@/lib/actions/post';
import { useActionState } from 'react';
import { PostEntity } from 'server/dist/src/post/entities/post.entity';
import UpsertPostForm from '@/app/user/posts/_components/UpsertPostForm';
import { PostFormState } from '@/lib/types';

type Props = {
  post: PostEntity
}

function UpdatePostContainer({ post }: Props) {
  const [state, action] = useActionState<PostFormState, FormData>(updatePost, {
    data: {
      postId: post.id,
      title: post.title,
      content: post.content,
      //Строка со ссылкой на предыдущее изображение.
      previousThumbnail: post.thumbnail,
      //Берем свойство name из каждого TagEntity в массиве тегов и объединяем их в строку.
      tags: post.tags?.map(tag => tag.name).join(', '),
      //Преобразуем логическое значение в строку, соответствующую состоянию checked или нет.
      published: post.published,
    },
  });
  return <UpsertPostForm state={state} formAction={action} />;
}

export default UpdatePostContainer;