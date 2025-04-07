'use client'
import Link from "next/link";
import { PencilIcon, TrashIcon } from "@heroicons/react/20/solid";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

type Props = {
  postId: number
}
const PostActions = ({ postId }: Props) => {
  return (
    <div className="flex justify-center items-center gap-2">
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Link
              className="border border-yellow-500 text-yellow-500 rounded-md p-2 hover:border-yellow-700 hover:text-yellow-700 transition-colors duration-300"
              href={ `/user/posts/${ postId }/edit` }>
              <PencilIcon className="w-4"/>
            </Link>
          </TooltipTrigger>
          <TooltipContent className="bg-yellow-500 text-white">
            <p>Редактировать</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>

      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Link
              className="border border-red-500 text-red-500 rounded-md p-2 hover:border-red-700 hover:text-red-700 transition-colors duration-300"
              href={ `/user/posts/${ postId }/delete` }>
              <TrashIcon className="w-4"/>
            </Link>
          </TooltipTrigger>
          <TooltipContent className="bg-red-500 text-white">
            <p>Удалить</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  )
}
export default PostActions