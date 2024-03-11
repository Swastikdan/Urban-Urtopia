import React from 'react';
import { getServerSession } from 'next-auth';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import UserMenuTrigger from './UserMenuTrigger';

export default async function UserMenu() {

 const session = await getServerSession();
 const user = session?.user;

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger className="m-auto items-center rounded-3xl">
          <UserMenuTrigger user={user} />
        </DropdownMenuTrigger>
        <DropdownMenuContent className=" mr-5 rounded-xl drop-shadow-xl">
          <DropdownMenuItem className="  cursor-pointer items-center rounded-md py-3">
            Best Rating
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}
