'use client';
import { ChangeEvent, useEffect, useState } from 'react';
import Image from 'next/image';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import SubmitButton from '@/components/SubmitButton';
import { PostFormState } from '@/lib/types';
import { useToast } from '@/hooks/use-toast';

type Props = {
  state: PostFormState,
  formAction: (payload: FormData) => void
}
const UpsertPostForm = ({ state, formAction }: Props) => {
  const [imageUrl, setImageUrl] = useState('');

  const { toast } = useToast();

  useEffect(() => {
    //При первом рендере компонента предотвращаем вывод уведомления благодаря тому, что message отсутствует.
    if (state?.message) {
      toast({
        title: state?.ok ? 'Успешно!' : 'Упс...',
        description: state?.message,
      });
    }
  }, [state, toast]);

  //При выборе файла с изображением преобразует путь к нему в URL и сохраняет его в стейт.
  const onChangeFileName = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setImageUrl(URL.createObjectURL(e.target.files[0]));
    }
  };
  return (
    <form
      className="flex flex-col gap-5 [&>div>label]:text-slate-500 [&>div>input]:transition [&>div>textarea]:transition"
      action={formAction}
    >
      <div>
        <Label htmlFor="title">Заголовок</Label>
        <Input
          type="text"
          name="title" placeholder="Введите заголовок поста"
          defaultValue={state?.data?.title}
        />
        {!!state?.errors?.title && (
          <p className="text-red-500 animate-shake">{state.errors.title}</p>
        )}
      </div>

      <div>
        <Label htmlFor="content">Заголовок</Label>
        <Textarea
          name="content"
          placeholder="Введите содержание поста"
          rows={6}
          defaultValue={state?.data?.content}
        />
        {!!state?.errors?.content && (
          <p className="text-red-500 animate-shake">{state.errors.content}</p>
        )}
      </div>

      <div>
        <Label htmlFor="thumbnail">Изображение</Label>
        <Input
          type="file"
          name="thumbnail"
          accept="image/*"
          onChange={(e) => onChangeFileName(e)}
        />
        {!!state?.errors?.thumbnail && (
          <p className="text-red-500 animate-shake">{state.errors.thumbnail}</p>
        )}
        {!!imageUrl && <Image src={imageUrl} alt="post thumbnail" width={200} height={200} />}
      </div>

      <div>
        <Label htmlFor="tags">Теги (через запятую)</Label>
        <Input
          name="tags"
          placeholder="Теги (через запятую)"
          defaultValue={state?.data?.tags}
        />
        {!!state?.errors?.tags && (
          <p className="text-red-500 animate-shake">{state.errors.tags}</p>
        )}
      </div>

      <div className="flex items-center">
        <Input
          className="mx-2 w-4 h-4"
          type="checkbox"
          name="published"
          defaultChecked={!!state?.data?.published}
        />
        <Label htmlFor="published">Опубликовать сейчас</Label>
        {!!state?.errors?.published && (
          <p className="text-red-500 animate-shake">{state.errors.published}</p>
        )}
      </div>

      <SubmitButton>Сохранить пост</SubmitButton>
    </form>
  );
};
export default UpsertPostForm;