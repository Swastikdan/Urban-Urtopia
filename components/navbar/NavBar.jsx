import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ModeToggle } from '../ModeToggle';

export default function NavBar() {
  return (
    <>
      <header className='flex mx-auto w-full items-center max-w-screen-xl '>
        <nav className='flex w-full justify-between items-center px-5 py-5'>
          <Link
            href="/"
            className="flex items-center space-x-2 text-xl font-bold  "
          >
            <Image src="/logo_small.svg" alt="Nestly" width={40} height={20} />
            <h1>Nestly</h1>
          </Link>

          <ModeToggle />
        </nav>
      </header>
    </>
  );
}
