"use client";
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
  LogIn,
  UserCircle2 as CircleUser,
  UserPlus as UserRoundPlus,
  Plus,
} from 'lucide-react';
export default function GuestProfile() {
  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger className="flex cursor-pointer items-center rounded-full shadow-black ring-1 ring-black  hover:shadow-xl dark:shadow-white/10 dark:ring-white md:space-x-3 md:px-2  md:py-1 ">
          <AlignJustify width={20} height={20} className="hidden md:flex" />
          <Avatar>
            <AvatarImage
              src="https://res.cloudinary.com/dp5tomvwb/image/upload/placeholder_guest.jpg"
              width={20}
              height={20}
              className=" h-10 w-10 items-center grayscale"
              alt="Guest profile image"
            />
            <AvatarFallback>
              <div className="h-10 w-10 animate-pulse rounded-full bg-gray-400"></div>
            </AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>

        <DropdownMenuContent className=" mr-5 rounded-xl ring-1  ring-black drop-shadow-xl dark:ring-white">
          <DropdownMenuLabel className="text-md ">
            Hello , Guest
          </DropdownMenuLabel>
          <DropdownMenuSeparator className="h-[.5px]  bg-black dark:bg-white" />

          <Link href="/register">
            <DropdownMenuItem className="flex cursor-pointer items-center rounded-md  ">
              <UserRoundPlus width={15} /> <span className="pl-2">Sign up</span>
            </DropdownMenuItem>
          </Link>
          <Link href="/login">
            <DropdownMenuItem className="flex cursor-pointer items-center rounded-md ">
              <LogIn width={15} /> <span className="pl-2 ">Sign in</span>
            </DropdownMenuItem>
          </Link>
          <DropdownMenuSeparator className="h-[.5px]  bg-black dark:bg-white" />
          <DropdownMenuItem className="font-heading cursor-pointer rounded-xl font-semibold text-primary">
            <Link href="/list-your-property">
              <DropdownMenuItem className="flex cursor-pointer items-center rounded-xl font-semibold text-primary ">
                <Plus width={15} />
                <span className="pl-2">
                  List Your Property‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎
                </span>
              </DropdownMenuItem>
            </Link>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}
