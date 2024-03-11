import React from 'react';
import Link from 'next/link';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  AlignJustify,
  UserCircle2 as CircleUser,
  LayoutDashboard,
  LogOut,
  Plus,
} from 'lucide-react';

export default function UserProfile({ user, handleLogout }) {
  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger className="flex cursor-pointer items-center rounded-full shadow-black ring-1 ring-black  hover:shadow-xl dark:shadow-white/10 dark:ring-white md:space-x-3 md:px-2  md:py-1 ">
          <AlignJustify width={20} height={20} className="hidden md:flex" />
          <Avatar>
            <AvatarImage
              src={user.picture}
              alt={`${user.name || 'user'} profile image`}
            />
            <AvatarFallback className="bg-black text-white">
              {user.name.charAt(0).toUpperCase()}
            </AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent className=" mr-5 rounded-xl ring-1  ring-black drop-shadow-xl dark:ring-white">
          <DropdownMenuLabel className="text-md ">
            Hello ,
            {user?.name?.substring(0, 10) +
              (user?.name?.length > 10 ? '...' : '') || 'Guest'}
          </DropdownMenuLabel>
          <DropdownMenuSeparator className="h-[.5px]  bg-black dark:bg-white" />
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

          <Link href="/dashboard">
            <DropdownMenuItem className="flex cursor-pointer items-center rounded-md">
              <Plus width={15} />
              <span className="pl-2">
                List Your Property‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎
              </span>
            </DropdownMenuItem>
          </Link>

          <DropdownMenuSeparator className="h-[.5px]  bg-black dark:bg-white" />
          <DropdownMenuItem
            className="flex cursor-pointer items-center rounded-md"
            onClick={handleLogout}
          >
            <LogOut width={15} />
            <span className="pl-2">Logout</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}
