'use client';
import { useState, useEffect } from 'react';
import ImageSlider from './ImageSlider';
import Link from 'next/link';
import { Star } from 'lucide-react';
export default function PlacesCard({ place }) {
 
  const { id, photos, state, city, title, price, isFavorite } = place;
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 0);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div>
      {isLoading ? (
        <div>
          <div className="mb-2 block h-[300px] animate-pulse overflow-hidden rounded-xl  bg-gray-200 lg:mb-3 "></div>
          <div className="flex flex-col space-y-2 px-2 ">
            <div className="flex items-center justify-between  ">
              <div className="h-[18px] w-2/4 animate-pulse rounded bg-gray-200 "></div>
              <div className="h-[18px] w-1/4 animate-pulse rounded bg-gray-200 "></div>
            </div>
            <div className="h-[18px] w-3/6 animate-pulse rounded bg-gray-200 "></div>
            <div className="h-[18px] w-2/6 animate-pulse rounded bg-gray-200 "></div>
            <div className="h-[18px] w-1/6 animate-pulse rounded bg-gray-200 "></div>
          </div>
        </div>
      ) : (
        <div>
          <div className="relative">
            <ImageSlider
              images={photos}
              customButton={id}
              id={id}
              isFavorite={isFavorite}
            />

            <Link href={`/place/${id}`} className="tex-sm flex flex-col px-2">
              <div className="flex items-center justify-between ">
                <span className="text-base font-semibold">
                  {state}, {city}
                </span>
                {/* <div className="flex items-center space-x-1 ">
                  <Star width={15} height={15} fill="black" className="" />
                  <span className="text-sm">
                    {Math.floor((Math.random() * 2.9 + 2) * 100) / 100}
                  </span>
                </div> */}
              </div>
              <span className="  text-[15px] font-light text-gray-500">
                {title.substring(0, 60)}
              </span>
              {/* <span className="py-0.5 text-[15px] font-light text-gray-500">
                10-12 Mar
              </span> */}

              <span className=" text-[15px] font-medium ">
                <span className="">₹ </span>
                <span className="bg-white  tabular-nums">{` ${price}`}</span>
                <span className="font-light"> night</span>
              </span>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
