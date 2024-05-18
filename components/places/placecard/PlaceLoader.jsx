import React from 'react'

export default function PlaceLoader() {
  return (<div className="mx-auto   my-5 max-w-[1440px] px-4 md:px-8  ">
      <div className="grid grid-cols-1 gap-x-4 gap-y-6 sm:grid-cols-2 md:gap-x-6 lg:grid-cols-3 xl:grid-cols-4">
    
        {Array(12)
          .fill()
          .map((_, i) => (
            <div key={i}>
              <div className="mb-2 block h-[300px] animate-pulse overflow-hidden rounded-xl  bg-gray-200 lg:mb-3 "></div>
              <div className="flex flex-col space-y-2 px-2 ">
                <div className="flex items-center justify-between  ">
                  <div className="h-[18px] w-4/6 animate-pulse rounded bg-gray-200 "></div>
                  {/* <div className="h-[18px] w-1/4 animate-pulse rounded bg-gray-200 "></div> */}
                </div>
                <div className="h-[18px] w-4/6 animate-pulse rounded bg-gray-200 "></div>
                <div className="h-[18px] w-2/6 animate-pulse rounded bg-gray-200 "></div>
                {/* <div className="h-[18px] w-1/6 animate-pulse rounded bg-gray-200 "></div> */}
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}
