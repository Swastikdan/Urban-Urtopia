import React from 'react'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

export default function SignedInMenu({user}) {
  return (
    <>
      <DropdownMenu>
        {/* <DropdownMenuTrigger>
          <Avatar>
            <AvatarImage src={user.picture} alt={`${user.name} profile image`} />
            <AvatarFallback>{user.name.charAt(0).toUpperCase()}</AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger> */}
        <DropdownMenuTrigger className="flex cursor-pointer items-center space-x-3 rounded-full px-2 py-1 shadow-black ring-1 ring-black  hover:shadow-xl">
          <img
            src="https://stayz-old.vercel.app/menu.svg"
            width={20}
            height={20}
            alt="menu"
          />
          <Avatar>
            <AvatarImage
              src={user.picture}
              alt={`${user.name} profile image`}
            />
            <AvatarFallback>{user.name.charAt(0).toUpperCase()}</AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem>Profile</DropdownMenuItem>
          <DropdownMenuItem>Billing</DropdownMenuItem>
          <DropdownMenuItem>Team</DropdownMenuItem>
          <DropdownMenuItem>Subscription</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}
