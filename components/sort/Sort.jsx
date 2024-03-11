"use client";
import React, { useRef, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import SortTrigger from './SortTrigger';

export default function Sort() {
  // const navigate = useNavigate();
  // const handleClick = (value) => {
  //   const fullUrl = new URL(window.location.href);
  //   fullUrl.searchParams.set('sort', value);
  //   navigate(`/${fullUrl.search}`);
  // };
  const router = useRouter();
  const handleClick = (value) => {
    const fullUrl = new URL(window.location.href);
    fullUrl.searchParams.set('sort', value);
    router.push(`/${fullUrl.search}`);
  };


  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="rounded-xl">
        <SortTrigger />
      </DropdownMenuTrigger>
      <DropdownMenuContent className=" mr-5 rounded-xl drop-shadow-xl">
        <DropdownMenuItem
          className=" hidden cursor-pointer items-center rounded-md py-3"
          onClick={() => handleClick('')}
        >
          Best Rating
        </DropdownMenuItem>
        <DropdownMenuItem
          className="flex cursor-pointer items-center rounded-md py-3"
          onClick={() => handleClick('priceLowToHigh')}
        >
          Price: Low to High
        </DropdownMenuItem>
        <DropdownMenuItem
          className="flex cursor-pointer items-center rounded-md py-3"
          onClick={() => handleClick('priceHighToLow')}
        >
          Price: High to Low
        </DropdownMenuItem>
        <DropdownMenuItem
          className="flex cursor-pointer items-center rounded-md py-3"
          onClick={() => handleClick('guestsLowToHigh')}
        >
          Capacity: Low to High
        </DropdownMenuItem>
        <DropdownMenuItem
          className="flex cursor-pointer items-center rounded-md py-3"
          onClick={() => handleClick('guestsHighToLow')}
        >
          Capacity: High to Low
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
