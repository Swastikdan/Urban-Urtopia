'use client';
import React, { useRef, useState, useEffect } from 'react';
import { Search, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
export default function SearchBarTrigger({
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
      <div className="hidden w-full  items-center justify-between  rounded-full border-2 border-gray-300 p-1 md:flex ">
        <div className="  flex justify-between text-sm  ">
          {isLoading ? (
            <div className="items-center border-r-2 border-gray-300 px-2 ">
              <div className="h-5 w-16  animate-pulse rounded-sm bg-gray-200"></div>
            </div>
          ) : (
            <div
              className={`min-w-[64px] border-r-2 px-2 text-center ${
                Location ? 'font-medium text-black' : 'text-gray-700'
              }`}
            >
              {Location || 'Anywhere'}
            </div>
          )}
          {isLoading ? (
            <div className="items-center border-r-2 border-gray-300 px-2 ">
              <div className="h-5 w-16  animate-pulse rounded-sm bg-gray-200"></div>
            </div>
          ) : (
            <div
              className={`min-w-[64px] border-r-2  px-2 text-center ${
                CheckIn && CheckOut ? 'font-medium text-black' : 'text-gray-700'
              }`}
            >
              {CheckIn && CheckOut
                ? new Date(CheckIn).getMonth() ===
                    new Date(CheckOut).getMonth() &&
                  new Date(CheckIn).getFullYear() ===
                    new Date(CheckOut).getFullYear()
                  ? `${new Date(CheckIn).getDate()}–${formatDate(CheckOut)}`
                  : `${formatDate(CheckIn)} – ${formatDate(CheckOut)}`
                : 'Add Date'}
            </div>
          )}
          {isLoading ? (
            <div className=" items-center border-gray-300 pl-2 ">
              <div className="h-5 w-16  animate-pulse rounded-sm bg-gray-200"></div>
            </div>
          ) : (
            <div
              className={` min-w-[64px] pl-2 text-center ${
                Guests ? 'font-medium text-black' : 'text-gray-700'
              }`}
            >
              {Guests ? `${Guests} Guests` : 'Add Guests'}
            </div>
          )}
        </div>

        <div className="ml-5 rounded-full bg-blue-600 p-2.5 text-white  ">
          <Search width={20} height={20} className="text-white" />
        </div>
      </div>

      {/* <div className="flex w-full items-center rounded-full  bg-gray-100 p-1 md:hidden md:w-auto">
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
      </div> */}
    </>
  );
}
