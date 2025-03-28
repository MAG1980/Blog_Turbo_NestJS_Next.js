import { Skeleton } from "@/components/ui/skeleton";

const CommentCardSkeleton = () => {
  return (
    <div className="flex flex-col shadow rounded gap-3 p-2">
      <div className="flex items-center gap-2">
        {/*Для аватара*/}
        <Skeleton className="rounded-full w-12 h-12"/>
        {/*Для автора и даты*/}
        <Skeleton className="h-4 w-48"/>
      </div>
      <Skeleton className="h-8 w-96"/>
    </div>

  );
}

export default CommentCardSkeleton;