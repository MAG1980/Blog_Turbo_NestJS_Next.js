'use client';
import React, { PropsWithChildren, useEffect, useState } from 'react';
import { cn } from '@/lib/utils';
import { usePathname } from "next/navigation";
import { useIsScrollDown } from '@/lib/hooks';

type Props = PropsWithChildren

function DesktopNavbar(props: Props) {
  const isScrollDown = useIsScrollDown(0);

  const pathName = usePathname()
  const isHomePage = pathName === '/'
  return (
    <nav
      className={ cn('hidden md:flex justify-center fixed top-0 w-full z-50 text-white transition-colors',
        { 'bg-white text-gray-700 shadow-md': isScrollDown || !isHomePage }) }>
      <div className="container flex items-center px-4 py-4">
        {props.children}
      </div>
      <hr className="border-b border-gray-100 opacity-25" />
    </nav>
  );
}

export default DesktopNavbar;