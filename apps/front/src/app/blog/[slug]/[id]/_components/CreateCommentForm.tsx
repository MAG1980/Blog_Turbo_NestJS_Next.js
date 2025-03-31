import { useActionState, useEffect } from "react";
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Textarea } from "@/components/ui/textarea";
import { Label } from '@/components/ui/label';
import SubmitButton from '@/components/SubmitButton';
import { cn } from '@/lib/utils';
import { SessionUser } from '@/lib/session/types';
import { saveComment } from "@/lib/actions/comment/saveComment.action";
import { useToast } from "@/hooks/use-toast";
import { QueryObserverResult, RefetchOptions } from "@tanstack/react-query";
import { CommentEntity } from "server/dist/src/comment/entities/comment.entity";


type Props = {
  postId: number
  user: SessionUser
  className?: string
  refetch: (options?: RefetchOptions) => Promise<QueryObserverResult<{
    comments: CommentEntity[],
    totalCount: number
  }, Error>>
}

function CreateCommentForm(props: Props) {
  const [state, action] = useActionState(saveComment, undefined);
  const { toast } = useToast()

  //При каждом изменении состояния формы, обновляем данные в компоненте Toaster shadcn, расположенном в корневом layout,
  //и выполняем повторный запрос на сервер для отображения нового комментария.
  useEffect(() => {
    toast({
      title: state?.ok ? 'Успех!' : 'Ошибка!',
      description: state?.message
    })

    if ( state?.ok ) {
      props.refetch()
    }
  }, [state, toast, props.refetch]);

  return (
    <Dialog open={ state?.open }>
      {/*asChild при нажатии на child будет срабатывать триггер.*/}
      <DialogTrigger asChild>
        <Button>Оставить комментарий</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogTitle>Введите текст комментария</DialogTitle>
        <form
          className={ cn(props.className) }
          action={ action }
        >
          <input type="hidden" name="postId" defaultValue={ props.postId }/>

          <Label htmlFor="content">Комментарий</Label>
          <div className="border-t  border-x rounded-t-md">
            <Textarea className="border-none active:outline-none focus-visible:ring-0 shadow-none" name="content" />
            { !!state?.errors?.content && <p className="text-red-500 pl-2 animate-shake">{ state?.errors?.content }</p> }
          </div>

          <p className="border rounded-b-md p-2">
            <span className="text-slate-500">Автор: </span>
            <span className="text-slate-700">{props.user.name}</span>
          </p>

          <SubmitButton className="mt-2">Отправить</SubmitButton>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default CreateCommentForm;