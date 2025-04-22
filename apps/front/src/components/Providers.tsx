'use client'
import { PropsWithChildren, useRef } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { TransitionRouter } from "next-transition-router";
import { animate } from 'framer-motion/dom';

type Props = PropsWithChildren
const queryClient = new QueryClient()
const Providers = ({ children }: Props) => {

  const wrapperRef = useRef<HTMLDivElement>(null)
  return (
    <TransitionRouter
      auto
      leave={ (next) => {
        animate(
          wrapperRef.current as unknown as object | object[],
          {
            opacity: [1, 0],
            y: [0, "-100vh"]
          },
          { duration: 0.5, onComplete: next }
        );
      } }
      enter={ (next) => {
        animate(
          wrapperRef.current as unknown as object | object[],
          {
            opacity: [0, 1],
            y: ["100vh", 0]
          },
          { duration: 0.5, onComplete: next }
        );
      } }
    >
      <QueryClientProvider client={ queryClient }>
        <div ref={ wrapperRef }>
          { children }
        </div>
      </QueryClientProvider>
    </TransitionRouter>
  )
}

export default Providers;