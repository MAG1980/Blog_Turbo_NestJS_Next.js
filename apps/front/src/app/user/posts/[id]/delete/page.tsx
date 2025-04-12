import { fetchPostById } from '@/lib/actions/post/fetchPostById.action'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ExclamationCircleIcon } from "@heroicons/react/20/solid";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { deletePost } from "@/lib/actions/post/deletePost.action";
import { redirect } from "next/navigation";

type Props = {
  params: Promise<{
    id: string
  }>
}
const DeletePostPage = async ({ params }: Props) => {
  const { id } = await params
  const post = await fetchPostById(parseInt(id))

  const formAction = async (formData: FormData) => {
    'use server'
    await deletePost(parseInt(id))
    redirect('/user/posts')
  }

  return (
    <Card className="w-96 m-12 px-6">
      <CardHeader>
        <CardTitle className="flex justify-between items-center font-thin">
          <p className="text-red-500">Удалить пост</p>
          <ExclamationCircleIcon className="w-6 text-red-500"/>
        </CardTitle>
      </CardHeader>
      <CardDescription>
        <p className="text-red-500">Внимание! Этo действие необратимо.Вы уверены, что хотите удалить пост?</p>
        <hr className="m-3"/>
        <p className="text-slate-400">Заголовок:</p>
        <p className="font-bold">{ post.title }</p>
      </CardDescription>
      <CardContent>
        <form action={ formAction } className="flex justify-end py-4 gap-2">
          <Button variant={ 'secondary' } asChild>
            <Link href={ '/user/posts' }>Отмена</Link>
          </Button>
          <Button variant={ 'destructive' } type={ 'submit' }>
            Удалить
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
export default DeletePostPage