import { useEffect, useState } from 'react';

export const useIsScrollDown = (initialScrollPosition:number=0) => {
  const [scrollPosition, setScrollPosition] = useState(initialScrollPosition);
  useEffect(() => {
    const handleScroll = () => {
      setScrollPosition(window.scrollY);
    };
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  return scrollPosition > 10;
};