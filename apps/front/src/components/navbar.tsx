import React from 'react';
import Link from 'next/link';


function Navbar() {
  return (
    <>
      <h1 className="text-2xl font-bold p-2">Мой блог</h1>
      <div className="flex flex-col md:flex-row gap-2 ml-auto [&>a]:px-4 [&>a]:transition [&>a]:rounded-md [&>a]:py-2 [&>a:hover]:text-sky-100 [&>a:hover]:bg-sky-500">
        <Link href="/">Блог</Link>
        <Link href="#about">Обо мне</Link>
        <Link href="#contact">Контакты</Link>
      </div>
    </>
  );
}

export default Navbar;