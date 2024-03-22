import React from 'react';
import Link from 'next/link';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableFooter,
  TableRow,
} from '@/components/ui/table';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  Plus,
  Badge,
  BadgeCheck,
  BadgeX,
  PenSquare,
  HelpCircle,
} from 'lucide-react';
export default function Listing({ listings }) {
  return (
    <>
      <div className="mx-auto w-full py-10 sm:px-6 lg:px-8 lg:py-14">
        <div className="flex flex-col">
          <div className="-m-1.5 overflow-x-auto">
            <div className="inline-block min-w-full p-1.5 align-middle">
              <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm dark:border-gray-700 dark:bg-slate-900">
                <div className="flex items-center justify-between gap-3 border-b border-gray-200 px-6 py-4 dark:border-gray-700">
                  <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200">
                    Listings
                  </h2>
                  <Link
                    className="inline-flex items-center gap-x-2 rounded-lg border border-transparent bg-blue-600 px-3 py-2 text-sm font-semibold text-white hover:bg-blue-700 disabled:pointer-events-none disabled:opacity-50 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
                    href="/dashboard/places/new"
                  >
                    <Plus width={20} height={20} />
                    <span className="">Add new</span>
                  </Link>
                </div>
                {!Array.isArray(listings) || listings.length === 0 ? (
                  <div className="col-span-4 flex flex-1 items-center justify-center py-8 lg:py-16  ">
                    <div className="mx-auto w-[80vw] max-w-2xl px-4 py-8 text-center">
                      <p className="m-20 mt-4 text-gray-500">
                        No listings found.
                      </p>
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
                              className="px-6 py-3 text-start"
                            >
                              <div className="flex items-center gap-x-2 ps-6">
                                <span className="text-sm font-semibold tracking-wide text-gray-800 dark:text-gray-200">
                                  Status
                                </span>
                              </div>
                            </TableHead>
                            <TableHead
                              scope="col"
                              className="px-6 py-3 text-start"
                            >
                              <div className="flex items-center gap-x-2 ps-6">
                                <span className="text-sm font-semibold tracking-wide text-gray-800 dark:text-gray-200">
                                  Price (INR)
                                </span>
                              </div>
                            </TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {listings.map((place, index) => (
                            <TableRow key={index}>
                              <TableCell className="size-px whitespace-nowrap">
                                <div className="py-3 pe-6 ps-6 lg:ps-3 xl:ps-0">
                                  <div className="flex items-center gap-x-3">
                                    <Avatar className="h-10 w-10 rounded-lg md:h-12 md:w-12 xl:h-16 xl:w-16">
                                      <AvatarImage
                                        className="h-10 w-10 md:h-12 md:w-12 xl:h-16 xl:w-16 "
                                        src={place.photos[0]}
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
                                        {place.title}
                                      </span>
                                      <span className="block text-xs text-gray-500 md:text-sm">
                                        {place.city} , {place.state}
                                      </span>
                                    </div>
                                  </div>
                                </div>
                              </TableCell>
                              <TableCell className="size-px whitespace-nowrap">
                                <div className="px-6 py-3">
                                  {place.status === 'approved' ? (
                                    <span className="inline-flex items-center gap-x-1 rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-800 dark:bg-green-500/10 dark:text-green-500">
                                      <BadgeCheck width={20} />
                                      Aprooved
                                    </span>
                                  ) : place.status === 'processing' ? (
                                    <span className="inline-flex items-center gap-x-1 rounded-full bg-yellow-100 px-3 py-1 text-xs font-medium text-yellow-800 dark:bg-yellow-500/10 dark:text-yellow-500">
                                      <Badge width={20} />
                                      Processing
                                    </span>
                                  ) : place.status === 'rejected' ? (
                                    <span className="inline-flex items-center gap-x-1 rounded-full bg-red-100 px-3 py-1 text-xs font-medium text-red-800 dark:bg-red-500/10 dark:text-red-500">
                                      <BadgeX width={20} />
                                      Rejected
                                    </span>
                                  ) : null}
                                </div>
                              </TableCell>
                              <TableCell className="size-px whitespace-nowrap">
                                <div className="px-6 py-3">
                                  <span className="pl-2 font-sans text-sm">
                                    {place.price}
                                  </span>
                                </div>
                              </TableCell>
                              <TableCell className="size-px whitespace-nowrap">
                                <div className="px-6 py-3">
                                  <Link
                                    href={
                                      place.status === 'rejected'
                                        ? '/pages/help'
                                        : `/dashboard/places/${place.id}`
                                    }
                                    className="inline-flex items-center gap-x-2 rounded-lg border-2 border-gray-200 bg-white px-3 py-2 text-sm text-gray-800 shadow-sm hover:bg-gray-50 disabled:pointer-events-none disabled:opacity-50 dark:border-gray-700 dark:bg-slate-900 dark:text-white dark:hover:bg-gray-800 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
                                  >
                                    {place.status === 'rejected' ? (
                                      <>
                                        <HelpCircle width={16} />
                                        Help
                                      </>
                                    ) : (
                                      <>
                                        <PenSquare width={16} />
                                        Edit
                                      </>
                                    )}
                                  </Link>
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
        </div>
      </div>
    </>
  );
}
