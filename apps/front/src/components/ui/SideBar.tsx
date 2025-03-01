'use client';
import { PropsWithChildren, ReactNode, RefObject, useRef, useState } from 'react';
import { cn } from '@/lib/utils';
import { useOnClickOutside } from "usehooks-ts";

type Props = PropsWithChildren<{
  triggerIcon: ReactNode
  triggerButtonClassName?: string
}>

function SideBar(props: Props) {
  const [show, setShow] = useState(false);
  const ref = useRef(null);
  useOnClickOutside(ref as unknown as  RefObject<HTMLElement>, () => setShow(false))
  return (
    <>
      <button
        className={props.triggerButtonClassName}
        onClick={() => setShow((prevState) => !prevState)}
      >
        {props.triggerIcon}
      </button>
      <div
        ref={ ref }
        className={ cn('w-60 absolute top-0 z-10 transition-all duration-300 bg-white rounded-r-md min-h-screen',
        {
          '-left-full': !show,
          'left-0': show,
        })}>
        {props.children}
      </div>
    </>
  );
}

export default SideBar;