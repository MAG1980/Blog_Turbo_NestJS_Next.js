'use client'

import { use, useEffect, useState } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { usePathname, useRouter } from "next/navigation";
import { deletePost } from "@/lib/actions/post/deletePost.action";

type Props = {
  params: Promise<{ id: string }>
}
const InterceptorDeletePostPage = (props: Props) => {
  const [open, setOpen] = useState(true)
  const router = useRouter()

  const currentPage = usePathname();

  const params = use(props.params)

  const postId = parseInt(params.id)

  const onDeletePost = async (postId: number) => {
    await deletePost(postId)
    setOpen(false)
    router.replace('/user/posts')
  }

  useEffect(() => {
    //Получаем сегменты маршрута текущей страницы.
    const pathSegments = currentPage.split('/')
    //Получаем последний сегмент маршрута.
    const lastPathSegment = pathSegments[pathSegments.length - 1]
    if ( lastPathSegment === 'delete' ) {
      setOpen(true)
    }
  }, [currentPage]);

  return (
    // Из-за наличия неизменного атрибута open диалоговое окно не будет закрыаться никогда.
    <AlertDialog open={ open }>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Удалить пост</AlertDialogTitle>
          <AlertDialogDescription>
            Внимание! Этo действие необратимо.Вы уверены, что хотите удалить этот пост?
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel asChild>
            {/*Для закрытия диалогового окна Link не подойдет.*/ }
            <Button variant={ 'outline' } onClick={ () => {
              setOpen(false)
              router.back()
            } }>
              {/*<Link href={ '/user/posts' }>Отмена</Link>*/ }
              Отмена
            </Button>
          </AlertDialogCancel>
          <AlertDialogAction asChild>
            <Button
              onClick={ () => onDeletePost(postId) }
              variant={ 'destructive' }
            >
              {/*Для закрытия диалогового окна и автоматического обновления списка постов после удаления.*/ }
              Удалить
            </Button>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
export default InterceptorDeletePostPage