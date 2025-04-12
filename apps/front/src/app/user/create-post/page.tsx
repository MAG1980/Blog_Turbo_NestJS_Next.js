import CreatePostContainer from '@/app/user/create-post/_components/CreatePostContainer';


const CreatePostPage = () => {
  return (
    <div className="max-w-2xl w-full bg-white shadow-md rounded-md p-6">
      <h2 className="text-lg text-center font-bold text-slate-700">Создать новый пост</h2>
      <CreatePostContainer/>
    </div>
  )
}
export default CreatePostPage