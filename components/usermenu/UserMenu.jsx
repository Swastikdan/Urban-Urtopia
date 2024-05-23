'use client ';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useSession, signOut } from 'next-auth/react';
import {useUserContext} from '@/providers/UserProvider';
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


  // const user = fetch(`/api/user/${id}`).then((res) => res.json());

// const [userImage, setUserImage] = useState(null);

// useEffect(() => {
//   if (session) {
//     fetch(`/api/user/${session.user.id}`)
//       .then((res) => res.json())
//       .then((data) => {
//         setUserImage(data);
//       });
//   }
// }, [session]);

  const {  userData } = useUserContext();


  

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger className="m-auto items-center rounded-3xl">
          <UserMenuTrigger user={userData} />
        </DropdownMenuTrigger>
        <DropdownMenuContent className=" mr-5 rounded-xl    drop-shadow-xl ">
          <DropdownMenuLabel className="text-md ">
            Hello ,‎ {userData?.name?.split(' ')[0] || 'Guest'}
          </DropdownMenuLabel>
          <DropdownMenuSeparator className="h-[.5px]  bg-black dark:bg-white" />

          {user && user?.role === 'admin' ? (
            <Link href="/admin/bookings">
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

              <Link href="/places/add-place">
                <DropdownMenuItem className="flex cursor-pointer items-center rounded-md ">
                  <Plus width={15} />
                  <span className="pl-2">
                    List Your Property‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎
                  </span>
                </DropdownMenuItem>
              </Link>

              <DropdownMenuSeparator className="h-[.5px]  bg-black dark:bg-white" />
              <DropdownMenuItem
                className="flex cursor-pointer items-center rounded-md font-medium text-red-500 group hover:text-red-600 focus:text-red-600 focus:bg-red-100 "
                onClick={() => signOut()}
              >
                <LogOut width={15} className=' ' />
                <span className="pl-2  ">Logout</span>
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
