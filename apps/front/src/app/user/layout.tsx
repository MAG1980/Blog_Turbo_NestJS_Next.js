import { PropsWithChildren } from "react";

type Props = PropsWithChildren
const layout = ({ children }: Props) => {
  return (
    <div className="flex flex-col justify-center items-center mt-24">
      { children }
    </div>
  )
}
export default layout