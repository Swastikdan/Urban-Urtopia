'use client';
import React, { useRef, useState, useEffect } from 'react';
import { Search, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
export default function SearchBarTriggerMobile({
  Location,
  CheckIn,
  CheckOut,
  Guests,
}) {

   function formatDate(dateString) {
     const date = new Date(dateString);
     const year =
       date.getFullYear() === new Date().getFullYear()
         ? ''
         : ` ${date.getFullYear()}`;
     return `${date.getDate()} ${date.toLocaleString('en-US', {
       month: 'short',
     })}${year}`;
   }

   const [isLoading, setIsLoading] = useState(true);

   useEffect(() => {
     const timer = setTimeout(() => {
       setIsLoading(false);
     });

     return () => clearTimeout(timer);
   }, []);

  return (
    <>
      <div className="flex w-full items-center rounded-full  bg-gray-100 p-1 md:hidden md:w-auto">
        <div className="px-3 py-2">
          {Location || CheckIn || CheckOut || Guests ? (
            <Link href="/">
              <ArrowLeft width={20} height={20} />
            </Link>
          ) : (
            <Search width={20} height={20} />
          )}
        </div>

        {isLoading ? (
          <div className="my-1 mr-4 h-9 w-full animate-pulse rounded-sm bg-gray-200"></div>
        ) : (
          <div className="flex flex-col text-sm">
            <div className="text-start text-base font-semibold">
              {Location || 'Anywhere'}
            </div>
            <div className="flex pb-1 text-xs">
              <span className="border-r-[1px] pr-1">
                {CheckIn && CheckOut
                  ? new Date(CheckIn).getMonth() ===
                      new Date(CheckOut).getMonth() &&
                    new Date(CheckIn).getFullYear() ===
                      new Date(CheckOut).getFullYear()
                    ? `${new Date(CheckIn).getDate()}–${formatDate(CheckOut)}`
                    : `${formatDate(CheckIn)} – ${formatDate(CheckOut)}`
                  : 'Add Date'}
              </span>
              <span className="pl-1">
                {Guests ? `${Guests} Guests` : 'Add Guests'}
              </span>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
