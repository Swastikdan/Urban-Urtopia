import React from 'react';
import { AlignJustify } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
export default function UserMenuTrigger({ user }) {
  return (
    <>
      <div className="flex cursor-pointer items-center rounded-full shadow-black ring-1 ring-gray-300  hover:shadow-xl dark:shadow-white/10 dark:ring-white md:space-x-3 md:px-2  md:py-1 md:pl-3 ">
        <AlignJustify
          width={18}
          height={18}
          strokeWidth={2.5}
          className="hidden text-gray-600 md:flex"
        />
        <Avatar>
          {user && user.image && user.name ? (
            <>
              <AvatarImage
                src={user.image.replace(
                  '/upload/',
                  '/upload/w_200,h_200,c_fill,g_auto/q_auto/f_auto/',
                )}
                alt={`${user.name || 'user'} profile image`}
              />
              <AvatarFallback className="bg-gray-200 text-black">
                {user.name.charAt(0).toUpperCase()}
              </AvatarFallback>
            </>
          ) : (
            <>
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
            </>
          )}
        </Avatar>
      </div>
    </>
  );
}
