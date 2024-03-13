'use client';
import React, { useRef, useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { Search, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { formatRangeDate } from '@/utils';
import { formatGuests } from '@/utils';
export default function SearchBarTriggerMobile({
}) {
    const searchParams = useSearchParams();

    // Extracting values from URL
    const Location = searchParams.get('location') || '';
    const CheckIn = searchParams.get('checkin') || '';
    const CheckOut = searchParams.get('checkout') || '';
    const Guests = JSON.parse(searchParams.get('guests'));
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    });

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <div className="flex w-full items-center rounded-full  bg-gray-100 p-1 -ml-2 md:hidden md:w-auto">
        <div className="mr-2 rounded-full bg-white px-3 py-3">
          {Location || CheckIn || CheckOut || Guests ? (
            <Link href="/" className=" ">
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
              {Location.charAt(0).toUpperCase() + Location.slice(1) ||
                'Anywhere'}
            </div>
            <div className="flex pb-1 text-xs">
              <span className="border-r-[1px] pr-1">
                {/* {CheckIn && CheckOut
                  ? new Date(CheckIn).getMonth() ===
                      new Date(CheckOut).getMonth() &&
                    new Date(CheckIn).getFullYear() ===
                      new Date(CheckOut).getFullYear()
                    ? `${new Date(CheckIn).getDate()}–${formatDate(CheckOut)}`
                    : `${formatDate(CheckIn)} – ${formatDate(CheckOut)}`
                  : 'Add Date'} */}
                {CheckIn && CheckOut
                  ? formatRangeDate(CheckIn, CheckOut)
                  : 'Add Date'}
              </span>
              <span className="pl-1">
                {Guests
                  ? `${formatGuests(Guests, { noInfants: true })}`
                  : 'Add Guests'}
              </span>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
