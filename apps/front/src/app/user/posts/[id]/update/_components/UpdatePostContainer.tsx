'use client';
import { updatePost } from '@/lib/actions/post';
import { useActionState } from 'react';
import { PostEntity } from "server/dist/src/post/entities/post.entity";
import UpsertPostForm from "@/app/user/create-post/_components/UpsertPostForm";

type Props = {
  post: PostEntity
}

function UpdatePostContainer({ post }: Props) {
  //При первом рендере заполняем стейт формы данными поста, полученными из БД.
  const [state, action] = useActionState(updatePost, {
    data: {
      postId: post.id,
      title: post.title,
      content: post.content,
      thumbnail: post.thumbnail,
      //Берем свойство name из каждого TagEntity в массиве тегов и объединяем их в строку.
      tags: post.tags?.map(tag => tag.name).join(', '),
      //Преобразуем логическое значение в строку, соответствующую состоянию checked или нет.
      published: post.published ? 'on' : undefined
    }
  });
  return <UpsertPostForm state={ state } formAction={ action }/>;
}

export default UpdatePostContainer;