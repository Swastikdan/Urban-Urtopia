import React from 'react';
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
import { Ban, Badge, BadgeCheck, BadgeX } from 'lucide-react';

export default function Bookings({ bookings }) {
    // if (!Array.isArray(bookings)) {
    //   return <p>No bookings available</p>;
    // }

  return (
    <>
      <div className="mx-auto w-full py-10 sm:px-6 lg:px-8 lg:py-14">
        <div className="flex flex-col">
          <div className="-m-1.5 overflow-x-auto">
            <div className="inline-block min-w-full p-1.5 align-middle">
              <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm dark:border-gray-700 dark:bg-slate-900">
                <div className="flex items-center justify-between gap-3 border-b border-gray-200 px-6 py-4 dark:border-gray-700">
                  <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200">
                    Bookings
                  </h2>
                </div>
                {!Array.isArray(bookings) || bookings.length === 0 ? (
                  <div className="col-span-4 flex flex-1 items-center justify-center py-8 lg:py-16  ">
                    <div className="mx-auto w-[80vw] max-w-2xl px-4 py-8 text-center">
                      <p className=" mt-4 text-gray-500">
                        No bookings found.
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
                                  Duration
                                </span>
                              </div>
                            </TableHead>
                            <TableHead
                              scope="col"
                              className="px-6 py-3 text-start"
                            >
                              <div className="flex items-center gap-x-2 ps-6">
                                <span className="text-sm font-semibold tracking-wide text-gray-800 dark:text-gray-200">
                                  Check In - Check Out
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
                                  Payment Status
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
                          {bookings.map((booking) => (
                            <TableRow key={booking._id}>
                              <TableCell className="size-px whitespace-nowrap">
                                <div className="py-3 pe-6 ps-6 lg:ps-3 xl:ps-0">
                                  <div className="flex items-center gap-x-3">
                                    <Avatar className="h-10 w-10 rounded-lg md:h-12 md:w-12 xl:h-16 xl:w-16">
                                      <AvatarImage
                                        className="h-10 w-10 md:h-12 md:w-12 xl:h-16 xl:w-16 "
                                        src={booking.place.photos[0]}
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
                                        {booking.place.title}
                                      </span>
                                      <span className="block text-xs text-gray-500 md:text-sm">
                                        {booking.place.city} ,
                                        {booking.place.state}
                                      </span>
                                    </div>
                                  </div>
                                </div>
                              </TableCell>
                              <TableCell className="size-px whitespace-nowrap">
                                <div className="px-6 py-3 ">
                                  <span className="pl-2 text-sm">
                                    {Math.floor(
                                      (new Date(booking.checkOut) -
                                        new Date(booking.checkIn)) /
                                        (1000 * 60 * 60 * 24),
                                    )}{' '}
                                    days
                                  </span>
                                </div>
                              </TableCell>
                              <TableCell className="size-px whitespace-nowrap">
                                <div className="px-6 py-3 ">
                                  <span className="pl-2 text-sm">
                                    {new Intl.DateTimeFormat('en-GB', {
                                      day: 'numeric',
                                      month: 'short',
                                      year: 'numeric',
                                    }).format(new Date(booking.checkIn)) +
                                      ' - ' +
                                      new Intl.DateTimeFormat('en-GB', {
                                        day: 'numeric',
                                        month: 'short',
                                        year: 'numeric',
                                      }).format(new Date(booking.checkOut))}
                                  </span>
                                </div>
                              </TableCell>
                              <TableCell className="size-px whitespace-nowrap">
                                <div className="px-6 py-3">
                                  {booking.status === 'approved' ? (
                                    <span className="inline-flex items-center gap-x-1 rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-800 dark:bg-green-500/10 dark:text-green-500">
                                      <BadgeCheck width={20} />
                                      {new Date(booking.checkOut) < new Date()
                                        ? 'Completed'
                                        : 'Approved'}
                                    </span>
                                  ) : booking.status === 'pending' ? (
                                    <span className="inline-flex items-center gap-x-1 rounded-full bg-yellow-100 px-3 py-1 text-xs font-medium text-yellow-800 dark:bg-yellow-500/10 dark:text-yellow-500">
                                      <Badge width={20} />
                                      Processing
                                    </span>
                                  ) : booking.status === 'rejected' ? (
                                    <span className="inline-flex items-center gap-x-1 rounded-full bg-red-100 px-3 py-1 text-xs font-medium text-red-800 dark:bg-red-500/10 dark:text-red-500">
                                      <BadgeX width={20} />
                                      Rejected
                                    </span>
                                  ) : (
                                    booking.status ===
                                    'canceled'(
                                      <span className="inline-flex items-center gap-x-1 rounded-full bg-red-100 px-3 py-1 text-xs font-medium text-red-800 dark:bg-red-500/10 dark:text-red-500">
                                        <BadgeX width={20} />
                                        Canceled
                                      </span>,
                                    )
                                  )}
                                </div>
                              </TableCell>
                              <TableCell className="size-px whitespace-nowrap">
                                <div className="px-6 py-3">
                                  {booking.paymentstatus === 'approved' ? (
                                    <span className="inline-flex items-center gap-x-1 rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-800 dark:bg-green-500/10 dark:text-green-500">
                                      <BadgeCheck width={20} />
                                      Approved
                                    </span>
                                  ) : booking.paymentstatus === 'pending' ? (
                                    <span className="inline-flex items-center gap-x-1 rounded-full bg-yellow-100 px-3 py-1 text-xs font-medium text-yellow-800 dark:bg-yellow-500/10 dark:text-yellow-500">
                                      <Badge width={20} />
                                      Processing
                                    </span>
                                  ) : booking.paymentstatus === 'rejected' ? (
                                    <span className="inline-flex items-center gap-x-1 rounded-full bg-red-100 px-3 py-1 text-xs font-medium text-red-800 dark:bg-red-500/10 dark:text-red-500">
                                      <BadgeX width={20} />
                                      Rejected
                                    </span>
                                  ) : null}
                                </div>
                              </TableCell>
                              <TableCell className="size-px whitespace-nowrap">
                                <div className="px-6 py-3">
                                  <span className="pl-2 text-sm">
                                    {booking.price}
                                  </span>
                                </div>
                              </TableCell>
                              <TableCell className="size-px whitespace-nowrap">
                                <div className="px-6 py-3">
                                  {booking.status === 'cancelled' ||
                                  new Date() > new Date(booking.checkOut) ? (
                                    <button
                                      disabled
                                      className="inline-flex items-center gap-x-2 rounded-lg border-2 border-gray-200 bg-white px-3 py-2 text-sm text-gray-800 opacity-20 shadow-sm hover:bg-gray-50 disabled:pointer-events-none disabled:opacity-50 dark:border-gray-700 dark:bg-slate-900 dark:text-white dark:hover:bg-gray-800 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
                                    >
                                      <Ban width={16} /> Cancel
                                    </button>
                                  ) : (
                                    <button className="inline-flex items-center gap-x-2 rounded-lg border-2 border-red-500 bg-white px-3 py-2 text-sm text-red-600 shadow-sm hover:bg-red-50 disabled:pointer-events-none disabled:opacity-50 dark:border-gray-700 dark:bg-slate-900 dark:text-white dark:hover:bg-gray-800 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600">
                                      <Ban width={16} /> Cancel
                                    </button>
                                  )}
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
