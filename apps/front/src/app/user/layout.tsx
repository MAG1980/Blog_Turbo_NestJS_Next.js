import { PropsWithChildren } from "react";

type Props = PropsWithChildren
const layout = ({ children }: Props) => {
  return (
    <div className="mt-24">
      { children }
    </div>
  )
}
export default layout