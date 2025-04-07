'use client'
import { ChangeEvent, useState } from "react";
import Image from "next/image";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import SubmitButton from "@/components/SubmitButton";

type Props = {}
const UpsertPostForm = (props: Props) => {
  const [imageUrl, setImageUrl] = useState('')

  //При выборе файла с изображением преобразует путь к нему в URL и сохраняет его в стейт.
  const onChangeFileName = (e: ChangeEvent<HTMLInputElement>) => {
    if ( e.target.files ) {
      setImageUrl(URL.createObjectURL(e.target.files[0]))
    }
  }
  return (
    <form
      className="flex flex-col gap-5 [&>div>label]:text-slate-500 [&>div>input]:transition [&>div>textarea]:transition">
      <div>
        <Label htmlFor="title">Заголовок</Label>
        <Input type="text" name='title' placeholder='Введите заголовок поста'/>
      </div>

      <div>
        <Label htmlFor="content">Заголовок</Label>
        <Textarea
          name="content"
          placeholder='Введите содержание поста'
          rows={ 6 }
        />
      </div>

      <div>
        <Label htmlFor="thumbnail">Изображение</Label>
        <Input
          type="file"
          name='thumbnail'
          accept='image/*'
          onChange={ (e) => onChangeFileName(e) }
        />
        { !!imageUrl && <Image src={ imageUrl } alt="post thumbnail" width={ 200 } height={ 200 }/> }
      </div>

      <div>
        <Label htmlFor="tags">Теги (через запятую)</Label>
        <Input name="tags" placeholder="Теги (через запятую)"/>
      </div>

      <div className="flex items-center">
        <Input className="mx-2 w-4 h-4" type="checkbox" name="published"/>
        <Label htmlFor="published">Опубликовать сейчас</Label>
      </div>

      <SubmitButton>Сохранить пост</SubmitButton>
    </form>
  )
}
export default UpsertPostForm