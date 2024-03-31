'use client';

import { useState, useEffect } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Link as LinkIcon, Trash } from 'lucide-react';
import Link from 'next/link';
import { toast } from 'sonner';

export default function Favorites({ places }) {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    if (places) {
      setFavorites(places);
    }
  }, [places]);

  const handleFavoriteClick = (id) => {
    setFavorites((prevFavorites) =>
      prevFavorites.filter((favorite) => favorite.place.id !== id),
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
                src={place.place.photos[0].replace(
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
            <div className="p-4 md:p-6">
              <span className="mb-1 block text-xs   text-blue-600 dark:text-blue-500">
                {place.place.city} ,{' '}
                {place.place.state.length > 20
                  ? place.place.state.substring(0, 20) + '...'
                  : place.place.state}
              </span>
              <h3 className="text-sm font-medium text-gray-800 dark:text-gray-300 dark:hover:text-white sm:text-base">
                {place.place.title.length > 28
                  ? place.place.title.substring(0, 28) + '...'
                  : place.place.title}
              </h3>
            </div>
            <div className="mt-auto flex divide-x divide-gray-200 border-t border-gray-200 dark:divide-gray-700 dark:border-gray-700">
              {/* <a
                className="inline-flex w-full items-center justify-center gap-x-2 rounded-es-xl bg-white px-4 py-3 text-sm font-medium text-gray-800 shadow-sm hover:bg-gray-50 disabled:pointer-events-none disabled:opacity-50 dark:border-gray-700 dark:bg-slate-900 dark:text-white dark:hover:bg-gray-800 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
                href="#"
              >
                View sample
              </a> */}{' '}
              <Link
                href={`/place/${place.place.id}`}
                target="_blank"
                className="inline-flex w-full items-center justify-center gap-x-2 rounded-es-xl bg-white px-4 py-3 text-sm font-medium text-gray-800 shadow-sm hover:bg-gray-50 disabled:pointer-events-none disabled:opacity-50 dark:border-gray-700 dark:bg-slate-900 dark:text-white dark:hover:bg-gray-800 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
              >
                <LinkIcon width={16} />
                Visit Place
              </Link>{' '}
              <button
                onClick={() => handleFavoriteClick(place.place.id)}
                type="button"
                className="inline-flex w-full items-center justify-center gap-x-2 rounded-ee-xl bg-white px-4 py-3 text-sm font-medium text-red-600 shadow-sm hover:bg-gray-50  disabled:pointer-events-none disabled:opacity-50 dark:border-gray-700 dark:bg-slate-900 dark:text-white dark:hover:bg-gray-800 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
              >
                <Trash width={16} />
                Delete
              </button>
              {/* <button
                onClick={() => handleFavoriteClick(place.place.id)}
                type="button"
                className="inline-flex items-center gap-x-2 rounded-lg border-2 border-red-500 bg-white px-3 py-2 text-sm text-red-600 shadow-sm hover:bg-red-50 disabled:pointer-events-none disabled:opacity-50 dark:border-gray-700 dark:bg-slate-900 dark:text-white dark:hover:bg-gray-800 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
              >
                <Trash width={16} />
              </button> */}
            </div>
          </div>
        ))}
      </div>

      {/* <div className="flex flex-col">
        <div className="-m-1.5 overflow-x-auto">
          <div className="inline-block min-w-full p-1.5 align-middle">
            <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm dark:border-gray-700 dark:bg-slate-900">
              <div className="flex items-center justify-between gap-3 border-b border-gray-200 px-6 py-4 dark:border-gray-700">
                <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200">
                  Favorites
                </h2>
              </div>
              {!Array.isArray(favorites) || favorites.length === 0 ? (
                <div className="col-span-4 flex flex-1 items-center justify-center py-8 lg:py-16  ">
                  <div className="mx-auto w-[80vw] max-w-2xl px-4 py-8 text-center">
                    <p className="mt-4 text-gray-500">No Favorites found.</p>
                  </div>
                </div>
              ) : (
                <ScrollArea className="w-auto max-w-[92vw] whitespace-nowrap  md:max-w-[85vw]">
                  <div className="flex w-max space-x-4 ">
                    <Table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                      <TableHeader>
                        <TableRow>
                          <TableHead
                            scope="col"
                            className="py-3 pe-6 ps-6 text-start lg:ps-3 xl:ps-0"
                          >
                            <div className="flex items-center gap-x-2 ps-6">
                              <span className="text-sm font-semibold  tracking-wide text-gray-800 dark:text-gray-200">
                                Property
                              </span>
                            </div>
                          </TableHead>
                          <TableHead
                            scope="col"
                            className="hidden px-6 py-3 text-start sm:flex"
                          >
                            <div className="flex items-center gap-x-2 ps-0">
                              <span className="text-sm font-semibold tracking-wide text-gray-800 dark:text-gray-200">
                                Price (INR)
                              </span>
                            </div>
                          </TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {favorites.map((place, index) => (
                          <TableRow key={index}>
                            <TableCell className="size-px whitespace-nowrap">
                              <div className="py-3 pe-6 ps-6 lg:ps-3 xl:ps-0">
                                <div className="flex items-center gap-x-3">
                                  <Avatar className="h-10 w-10 rounded-lg md:h-12 md:w-12 xl:h-16 xl:w-16">
                                    <AvatarImage
                                      className="h-10 w-10 md:h-12 md:w-12 xl:h-16 xl:w-16 "
                                      src={place.place.photos[0]}
                                      alt="property Image"
                                      width={80}
                                      height={80}
                                    />
                                    <AvatarFallback>
                                      <div className="h-10 w-10 animate-pulse bg-gray-400 md:h-12 md:w-12 xl:h-16 xl:w-16"></div>
                                    </AvatarFallback>
                                  </Avatar>
                                  <div className="grow">
                                    <span className="block text-sm font-semibold text-gray-800 dark:text-gray-200 md:text-base xl:text-lg">
                                      {place.place.title.length > 20
                                        ? place.place.title.substring(0, 20) +
                                          '...'
                                        : place.place.title}
                                    </span>
                                    <span className="block text-xs text-gray-500 md:text-sm">
                                      {place.place.city} ,{' '}
                                      {place.place.state.length > 10
                                        ? place.place.state.substring(0, 10) +
                                          '...'
                                        : place.place.state}
                                    </span>
                                  </div>
                                </div>
                              </div>
                            </TableCell>
                            <TableCell className="hidden size-px whitespace-nowrap sm:flex">
                              <div className="px-2 py-3">
                                <span className="pl-2 text-sm">
                                  {place.place.price}
                                </span>
                              </div>
                            </TableCell>
                            <TableCell className="size-px whitespace-nowrap">
                              <div className="px-2 py-3">
                                <Link
                                  href={`/place/${place.place.id}`}
                                  target="_blank"
                                  className="inline-flex items-center gap-x-2 rounded-lg border-2 border-gray-200 bg-white px-3 py-2 text-sm text-gray-800 shadow-sm hover:bg-gray-50 disabled:pointer-events-none disabled:opacity-50 dark:border-gray-700 dark:bg-slate-900 dark:text-white dark:hover:bg-gray-800 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
                                >
                                  <LinkIcon width={16} />
                                </Link>
                              </div>
                            </TableCell>
                            <TableCell className="size-px whitespace-nowrap">
                              <div className="px-2 py-3">
                                <button
                                  onClick={() =>
                                    handleFavoriteClick(place.place.id)
                                  }
                                  type="button"
                                  className="inline-flex items-center gap-x-2 rounded-lg border-2 border-red-500 bg-white px-3 py-2 text-sm text-red-600 shadow-sm hover:bg-red-50 disabled:pointer-events-none disabled:opacity-50 dark:border-gray-700 dark:bg-slate-900 dark:text-white dark:hover:bg-gray-800 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
                                >
                                  <Trash width={16} />
                                </button>
                              </div>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                  <ScrollBar orientation="horizontal" />
                </ScrollArea>
              )}
            </div>
          </div>
        </div>
      </div> */}
    </div>
  );
}
