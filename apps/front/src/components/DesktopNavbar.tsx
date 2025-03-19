'use client';
import React, { PropsWithChildren, useEffect, useState } from 'react';
import { cn } from '@/lib/utils';
import { usePathname } from "next/navigation";

type Props = PropsWithChildren

function DesktopNavbar(props: Props) {
  const [scrollPosition, setScrollPosition] = useState(0);

  const pathName = usePathname()
  const isHomePage = pathName === '/'

  const handleScroll = () => {
    setScrollPosition(window.scrollY);
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const isScrollDown = scrollPosition > 10;
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