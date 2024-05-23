'use client';
import React from 'react';
import Link from 'next/link';
import { usePathname, redirect } from 'next/navigation';
import { useSession } from 'next-auth/react';

export default function AdminNav() {
  const { data: session } = useSession();

  // if(!session || session.user.role !== 'admin') {
  //   redirect('/');
  // }

  const navItems = [
    {
      name: 'Home',
      href: '/admin',
    },
    {
      name: 'Bookings',
      href: '/admin/bookings',
    },
    {
      name: 'Users',
      href: '/admin/users',
    },
    {
      name: 'Listings',
      href: '/admin/listings',
    },
  ];
  const pathname = usePathname();
  return (
    <div className="pb-5 ">
      <h1 className="pb-2 pt-5 text-start text-2xl font-bold md:text-3xl ">
        Admin Pannel
      </h1>
      <nav className="flex w-min items-start rounded-md bg-gray-200/70 p-1">
        {navItems.map((item, index) => (
          <Link
            key={index}
            href={item.href}
            className={`rounded-sm bg-transparent  px-4 py-1.5 text-sm ${pathname === item.href ? 'bg-white shadow-sm' : ''}`}
          >
            {item.name}
          </Link>
        ))}
      </nav>
    </div>
  );
}
