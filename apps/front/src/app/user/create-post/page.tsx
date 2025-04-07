import UpsertPostForm from "@/app/user/create-post/_components/UpsertPostForm";


const page = () => {
  return (
    <div className="max-w-2xl w-full bg-white shadow-md rounded-md p-6">
      <h2 className="text-lg text-center font-bold text-slate-700">Создать новый пост</h2>
      <UpsertPostForm/>
    </div>
  )
}
export default page