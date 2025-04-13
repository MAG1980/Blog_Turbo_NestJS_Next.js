import { PropsWithChildren, ReactNode } from "react";

type Props = PropsWithChildren<{
  modal: ReactNode
}>
const PostsLayout = ({ children, modal }: Props) => {
  return (
    <div>
      { children }
      { modal }
    </div>
  )
}
export default PostsLayout