'use client';
import { useState, useEffect } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Link as LinkIcon, Trash } from 'lucide-react';
import Link from 'next/link';
import { toast } from 'sonner';
import { useLikeContext } from '@/providers/LikeProvider';
export default function page() {

  const {
    favorites,
    setFavorites,
    favoriteLoading: isLoading,
  } = useLikeContext();

  const handleFavoriteClick = (id) => {
    setFavorites((prevFavorites) =>
      prevFavorites.filter((favorite) => favorite.id !== id),
    );
    fetch('/api/user/favorites', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ placeId: id }),
    })

      .then((res) => {
        if (!res.ok) {
          throw new Error('Failed to delete favorite');
        }
        return res.json();
      })
      .then((data) => {
        toast.success(data.message);
      })
      .catch((error) => {
        console.error(error);
        setFavorites(places);
        toast.error('An error occurred while deleting favorite');
      });
  };

  if (isLoading) {
    return (
      <div>
        <div className="flex min-h-[90vh] flex-col">
          <div className="flex flex-auto flex-col items-center justify-center p-4 md:p-5">
            <div className="flex justify-center">
              <div
                className="inline-block size-9 animate-spin rounded-full border-[3px] border-current border-t-transparent text-blue-600 dark:text-blue-500"
                role="status"
                aria-label="loading"
              >
                <span className="sr-only">Loading...</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

 
  if (favorites.length === 0) {
    return (
      <div className="flex  flex-col items-center justify-center">
        <div className="flex flex-col items-center justify-center gap-2 pb-56 pt-20">
          <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-300 md:text-xl">
            You have no favorites yet
          </h2>
        </div>
      </div>
    );
  }

  return (

    <div className="mx-auto w-full py-5">

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {favorites.map((place, index) => (
          <div
            key={index}
            className="group flex h-full flex-col rounded-xl border border-gray-200 bg-white shadow-sm dark:border-gray-700 dark:bg-slate-900 dark:shadow-slate-700/[.7]"
          >
            <Avatar className="flex h-52 w-full flex-col items-center justify-center rounded-none  ">
              <AvatarImage
                className="h-52 w-full rounded-t-xl "
                src={place.photos[0].replace(
                  '/upload/',
                  '/upload/w_300,c_fill,g_auto/q_auto/f_auto/',
                )}
                alt="property Image"
                width={80}
                height={80}
              />
              <AvatarFallback>
                <div className="h-52 w-full animate-pulse rounded-t-xl bg-gray-400"></div>
              </AvatarFallback>
            </Avatar>
            <div className="px-4 py-2 md:px-6 md:py-3">
              <h3 className="text-sm font-medium text-gray-800 dark:text-gray-300 dark:hover:text-white sm:text-base">
                {place.title.length > 28
                  ? place.title.substring(0, 28) + '...'
                  : place.title}
              </h3>
            </div>
            <div className="mt-auto flex divide-x divide-gray-200 border-t border-gray-200 dark:divide-gray-700 dark:border-gray-700">
              <Link
                href={`/place/${place.id}`}
                target="_blank"
                className="inline-flex w-full items-center justify-center gap-x-2 rounded-es-xl bg-white px-4 py-3 text-sm font-medium text-gray-800 shadow-sm hover:bg-gray-50 disabled:pointer-events-none disabled:opacity-50 dark:border-gray-700 dark:bg-slate-900 dark:text-white dark:hover:bg-gray-800 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
              >
                <LinkIcon width={16} />
                Visit Place
              </Link>{' '}
              <button
                onClick={() => handleFavoriteClick(place.id)}
                type="button"
                className="inline-flex w-full items-center justify-center gap-x-2 rounded-ee-xl bg-white px-4 py-3 text-sm font-medium text-red-600 shadow-sm hover:bg-gray-50  disabled:pointer-events-none disabled:opacity-50 dark:border-gray-700 dark:bg-slate-900 dark:text-white dark:hover:bg-gray-800 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
              >
                <Trash width={16} />
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );






  // return (
  //   <div className="mx-auto w-full py-5">
  //     <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
  //       {favorites.map((place, index) => (
  //         <div
  //           key={index}
  //           className="group flex h-full flex-col rounded-xl border border-gray-200 bg-white shadow-sm dark:border-gray-700 dark:bg-slate-900 dark:shadow-slate-700/[.7]"
  //         >
  //           <Avatar className="flex h-52 w-full flex-col items-center justify-center rounded-none  ">
  //             <AvatarImage
  //               className="h-52 w-full rounded-t-xl "
  //               src={place.place.photos[0].replace(
  //                 '/upload/',
  //                 '/upload/w_300,c_fill,g_auto/q_auto/f_auto/',
  //               )}
  //               alt="property Image"
  //               width={80}
  //               height={80}
  //             />
  //             <AvatarFallback>
  //               <div className="h-52 w-full animate-pulse rounded-t-xl bg-gray-400"></div>
  //             </AvatarFallback>
  //           </Avatar>
  //           <div className="px-4 py-2 md:px-6 md:py-3">
  //             <h3 className="text-sm font-medium text-gray-800 dark:text-gray-300 dark:hover:text-white sm:text-base">
  //               {place.place.title.length > 28
  //                 ? place.place.title.substring(0, 28) + '...'
  //                 : place.place.title}
  //             </h3>
  //           </div>
  //           <div className="mt-auto flex divide-x divide-gray-200 border-t border-gray-200 dark:divide-gray-700 dark:border-gray-700">
  //             <Link
  //               href={`/place/${place.place.id}`}
  //               target="_blank"
  //               className="inline-flex w-full items-center justify-center gap-x-2 rounded-es-xl bg-white px-4 py-3 text-sm font-medium text-gray-800 shadow-sm hover:bg-gray-50 disabled:pointer-events-none disabled:opacity-50 dark:border-gray-700 dark:bg-slate-900 dark:text-white dark:hover:bg-gray-800 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
  //             >
  //               <LinkIcon width={16} />
  //               Visit Place
  //             </Link>{' '}
  //             <button
  //               onClick={() => handleFavoriteClick(place.place.id)}
  //               type="button"
  //               className="inline-flex w-full items-center justify-center gap-x-2 rounded-ee-xl bg-white px-4 py-3 text-sm font-medium text-red-600 shadow-sm hover:bg-gray-50  disabled:pointer-events-none disabled:opacity-50 dark:border-gray-700 dark:bg-slate-900 dark:text-white dark:hover:bg-gray-800 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
  //             >
  //               <Trash width={16} />
  //               Delete
  //             </button>
  //           </div>
  //         </div>
  //       ))}
  //     </div>
  //   </div>
  //);
}
