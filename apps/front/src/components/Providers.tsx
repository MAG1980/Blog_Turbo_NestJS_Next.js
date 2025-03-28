'use client'
import { PropsWithChildren } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

type Props = PropsWithChildren
const queryClient = new QueryClient()
const Providers = ({ children }: Props) => {
  return (
    <QueryClientProvider client={ queryClient }>{ children }</QueryClientProvider>
  );
}

export default Providers;