import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ModeToggle } from '../ModeToggle';
import Sort from '../sort/Sort';
import SearchBar from '../searchbar/SearchBar';
export default function NavBar() {
  return (
    <>
      <header className="mx-auto flex w-full max-w-screen-xl items-center ">
        <nav className="flex w-full items-center justify-between px-5 py-5">
          <Link
            href="/"
            className="hidden items-center space-x-2 text-xl font-bold md:flex  "
          >
            <Image src="/logo_small.svg" alt="Nestly" width={40} height={20} />
            <h1>Nestly</h1>
          </Link>
          <SearchBar />
          {/* <ModeToggle /> */}
          <div className="ml-2">
            {' '}
            <Sort />
          </div>
        </nav>
      </header>
    </>
  );
}
