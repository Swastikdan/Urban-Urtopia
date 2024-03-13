'use client ';
import React from 'react';
import Link from 'next/link';
import { useSession, signOut } from 'next-auth/react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  UserRoundPlus,
  CircleUser,
  LayoutDashboard,
  LogIn,
  LogOut,
  Plus,
  ShieldCheck,
} from 'lucide-react';
import UserMenuTrigger from './UserMenuTrigger';

export default function UserMenu() {
  const { data: session } = useSession();
  const user = session?.user;

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger className="m-auto items-center rounded-3xl">
          <UserMenuTrigger user={user} />
        </DropdownMenuTrigger>
        <DropdownMenuContent className=" mr-5 rounded-xl    drop-shadow-xl ">
          <DropdownMenuLabel className="text-md ">
            Hello ,{user?.name?.split(' ')[0] || 'Guest'}
          </DropdownMenuLabel>
          <DropdownMenuSeparator className="h-[.5px]  bg-black dark:bg-white" />

          {user && user?.role === 'admin' ? (
            <Link href="/admin">
              <DropdownMenuItem className="flex cursor-pointer items-center rounded-md">
                <ShieldCheck width={15} />
                <span className="pl-2">Admin Pannel</span>
              </DropdownMenuItem>
            </Link>
          ) : null}
          {user ? (
            <>
              <Link href="/account">
                <DropdownMenuItem className="flex cursor-pointer items-center rounded-md">
                  <CircleUser width={15} />
                  <span className="pl-2">Profile</span>
                </DropdownMenuItem>
              </Link>

              <Link href="/dashboard">
                <DropdownMenuItem className="flex cursor-pointer items-center rounded-md">
                  <LayoutDashboard width={15} />{' '}
                  <span className="pl-2">Dashboard</span>
                </DropdownMenuItem>
              </Link>

              <Link href="/places/new">
                <DropdownMenuItem className="flex cursor-pointer items-center rounded-md ">
                  <Plus width={15} />
                  <span className="pl-2">
                    List Your Property‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎
                  </span>
                </DropdownMenuItem>
              </Link>

              <DropdownMenuSeparator className="h-[.5px]  bg-black dark:bg-white" />
              <DropdownMenuItem
                className="flex cursor-pointer items-center rounded-md"
                onClick={() => signOut()}
              >
                <LogOut width={15} />
                <span className="pl-2">Logout</span>
              </DropdownMenuItem>
            </>
          ) : (
            <>
              <Link href="/register">
                <DropdownMenuItem className="flex cursor-pointer items-center rounded-md  ">
                  <UserRoundPlus width={15} />{' '}
                  <span className="pl-2">Sign up</span>
                </DropdownMenuItem>
              </Link>
              <Link href="/login">
                <DropdownMenuItem className="flex cursor-pointer items-center rounded-md ">
                  <LogIn width={15} /> <span className="pl-2 ">Sign in</span>
                </DropdownMenuItem>
              </Link>
              <Link href="/login">
                <DropdownMenuItem className="flex cursor-pointer items-center rounded-md">
                  <Plus width={15} />
                  <span className="pl-2">
                    List Your Property‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎
                  </span>
                </DropdownMenuItem>
              </Link>
            </>
          )}
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}
