import { CommentEntity } from "server/dist/src/comment/entities/comment.entity";

type Props = {
  comments: CommentEntity[]
}

function CommentsList({ comments }: Props) {
  return (
    <div>
      <p className="text-3xl mb-4">Комментарии</p>
      { comments.map(comment => (
        <div className="bg-sky-200 rounded-md px-4 mb-2" key={ comment.id }>
          <div>{ comment.content }</div>
          <div>{ comment.author?.name }</div>
        </div>
      )) }
    </div>
  );
}

export default CommentsList;