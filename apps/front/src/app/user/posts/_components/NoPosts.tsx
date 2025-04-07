import { Button } from "@/components/ui/button";
import Link from "next/link";
import { PencilSquareIcon } from "@heroicons/react/20/solid";

const NoPosts = () => {
  return (
    <div className="mt-32 flex flex-col items-center gap-5">
      <p className="text-center p-4 text-5xl text-slate-400">У Вас пока нет постов!</p>
      {/*Благодаря наличию аттрибута asChild click по Button будет передаваться дочернему компоненту.*/}
      <Button asChild>
        <Link
          className="flex justify-center items-center"
          href={ "/user/create-post" }>
          <span><PencilSquareIcon className="w-4"/></span>
          <span>Создать свой первый пост!</span>
        </Link>
      </Button>
    </div>
  )
}
export default NoPosts