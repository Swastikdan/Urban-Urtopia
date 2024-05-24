'use client';
import { Ban, Badge, BadgeCheck, BadgeX, LoaderCircle } from 'lucide-react';
import React, { useState, useEffect } from 'react';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import { toast } from 'sonner';
import { format } from 'date-fns';
export default function page() {
  const [bookings, setBookings] = useState([]);
  const [pageloading, setPageLoading] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/admin/bookings');
        const data = await response.json();
        if (response.ok) {
          setBookings(data.bookings);
        } else {
          throw new Error('Failed to load bookings');
        }
      } catch (error) {
        setError(error.message);
      } finally {
        setPageLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleStatusChange = async (id, status) => {
    setLoading(id);
    try {
      const response = await fetch('/api/admin/bookings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id, status }),
      });
      const data = await response.json();
      if (response.ok) {
        setBookings(data.bookings);
        toast.success('Status updated successfully');
      } else {
        throw new Error('Failed to update status');
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };
  console.log(loading);

  return (
    <>
      {pageloading ? (
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
      ) : (
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
                      <div className="col-span-4 flex flex-1 items-center justify-center py-8 lg:py-16 ">
                        <div className="mx-auto w-[80vw] max-w-2xl px-4 py-8 text-center">
                          <p className="mt-4 text-gray-500 ">
                            No bookings found.
                          </p>
                        </div>
                      </div>
                    ) : (
                      <ScrollArea className="w-auto max-w-[92vw] whitespace-nowrap  md:max-w-[81.5vw]">
                        <div className="flex w-max">
                          <Table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                            <TableHeader>
                              <TableRow>
                                <TableHead
                                  scope="col"
                                  className="py-3 pe-6 ps-6 text-start lg:ps-3 xl:ps-0"
                                >
                                  <div className="flex items-center gap-x-2 ps-6">
                                    <span className="text-sm font-semibold tracking-wide text-gray-800 dark:text-gray-200">
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
                                      Customer
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
                                      Price (INR)
                                    </span>
                                  </div>
                                </TableHead>
                                {/* <TableHead
                                  scope="col"
                                  className="px-6 py-3 text-start"
                                >
                                  <div className="flex items-center gap-x-2 ps-6">
                                    <span className="text-sm font-semibold tracking-wide text-gray-800 dark:text-gray-200">
                                      Action
                                    </span>
                                  </div>
                                </TableHead> */}
                              </TableRow>
                            </TableHeader>
                            <TableBody>
                              {bookings &&
                                bookings.map((booking) => (
                                  <TableRow>
                                    <TableCell className="size-px whitespace-nowrap">
                                      <div className="text-left">
                                        <span className="text-sm font-medium">
                                          {booking.place.title}
                                        </span>
                                      </div>
                                    </TableCell>
                                    <TableCell className="size-px whitespace-nowrap">
                                      <div className="px-6 py-3 ">
                                        <span className="pl-2 text-sm">
                                          {booking.user.name}
                                        </span>
                                      </div>
                                    </TableCell>
                                    <TableCell className="size-px whitespace-nowrap">
                                      <div className="px-6 py-3 ">
                                        <span className="pl-2 text-sm">
                                          {format(
                                            new Date(booking.checkIn),
                                            'dd MMM yyyy',
                                          ) +
                                            ' - ' +
                                            format(
                                              new Date(booking.checkOut),
                                              'dd MMM yyyy',
                                            )}
                                        </span>
                                      </div>
                                    </TableCell>

                                    <TableCell className="size-px whitespace-nowrap">
                                      <div className="px-6 py-3">
                                        {booking.status === 'approved' ? (
                                          <span className="inline-flex items-center gap-x-1 rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-800 dark:bg-green-500/10 dark:text-green-500">
                                            <BadgeCheck width={20} />
                                            {new Date(booking.checkOut) <
                                            new Date()
                                              ? 'Completed'
                                              : 'Approved'}
                                          </span>
                                        ) : booking.status === 'processing' ? (
                                          <span className="inline-flex items-center gap-x-1 rounded-full bg-yellow-100 px-3 py-1 text-xs font-medium text-yellow-800 dark:bg-yellow-500/10 dark:text-yellow-500">
                                            <Badge width={20} />
                                            Processing
                                          </span>
                                        ) : booking.status === 'rejected' ? (
                                          <span className="inline-flex items-center gap-x-1 rounded-full bg-red-100 px-3 py-1 text-xs font-medium text-red-800 dark:bg-red-500/10 dark:text-red-500">
                                            <BadgeX width={20} />
                                            Rejected
                                          </span>
                                        ) : booking.status === 'cancelled' ? (
                                          <span className="inline-flex items-center gap-x-1 rounded-full bg-red-100 px-3 py-1 text-xs font-medium text-red-800 dark:bg-red-500/10 dark:text-red-500">
                                            <BadgeX width={20} />
                                            Canceled
                                          </span>
                                        ) : booking.checkOut < new Date() ? (
                                          <span className="inline-flex items-center gap-x-1 rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-800 dark:bg-gray-500/10 dark:text-gray-500">
                                            <BadgeX width={20} />
                                            Expired
                                          </span>
                                        ) : null}
                                      </div>
                                    </TableCell>
                                    <TableCell className="size-px whitespace-nowrap">
                                      <div className="px-6 py-3">
                                        <span className="pl-2 text-sm">
                                          {booking.totalPrice}
                                        </span>
                                      </div>
                                    </TableCell>
                                    <TableCell className="size-px whitespace-nowrap">
                                      <div className="px-6 py-3">
                                        {booking.status === 'cancelled' ||
                                        booking.status === 'approved' ||
                                        new Date(booking.checkin) <
                                          new Date() ? (
                                          <div className="flex items-center space-x-3">
                                            <button className="inline-flex items-center gap-x-2 rounded-lg border-2 border-gray-200 bg-white px-3 py-2 text-sm text-gray-800 opacity-50 shadow-sm hover:bg-gray-50 disabled:pointer-events-none disabled:opacity-50 ">
                                              <BadgeCheck width={20} />
                                              Approve
                                            </button>
                                            <button className="inline-flex items-center gap-x-2 rounded-lg border-2 border-gray-200 bg-white px-3 py-2 text-sm text-gray-800 opacity-50 shadow-sm hover:bg-gray-50 disabled:pointer-events-none disabled:opacity-50 ">
                                              <Ban width={20} />
                                              Cancel
                                            </button>
                                          </div>
                                        ) : (
                                          <div className="flex items-center space-x-3">
                                            <button
                                              className="inline-flex items-center gap-x-2 rounded-lg border-2 border-green-500 bg-white px-3 py-2 text-sm text-green-600 shadow-sm hover:bg-green-50 disabled:pointer-events-none disabled:opacity-50"
                                              onClick={() =>
                                                handleStatusChange(
                                                  booking.id,
                                                  'approved',
                                                )
                                              }
                                            >
                                              {loading == booking.id ? (
                                                <LoaderCircle
                                                  width={20}
                                                  className="animate-spin"
                                                />
                                              ) : (
                                                <BadgeCheck width={20} />
                                              )}
                                              Approve
                                            </button>
                                            <button
                                              className="inline-flex items-center gap-x-2 rounded-lg border-2 border-red-500 bg-white px-3 py-2 text-sm text-red-600 shadow-sm hover:bg-red-50 disabled:pointer-events-none disabled:opacity-50"
                                              onClick={() =>
                                                handleStatusChange(
                                                  booking.id,
                                                  'cancelled',
                                                )
                                              }
                                            >
                                              {loading == booking.id ? (
                                                <LoaderCircle
                                                  width={20}
                                                  className="animate-spin"
                                                />
                                              ) : (
                                                <Ban width={20} />
                                              )}
                                              Cancel
                                            </button>
                                          </div>
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
      )}
    </>
  );
}

{
  /*
'use client';
import React, { useEffect, useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import axios from 'axios';
import { useSession } from 'next-auth/react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

export default function Page() {
  const { data: session } = useSession();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get('/api/admin/bookings');
        if (!res) {
          throw new Error('Failed to fetch booking');
        }
        console.log(res.data);
        setBookings(res.data.bookings);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // Converting the complex date time format into normal date time format DD:MM:YYYY HH:MM
  const formatDateTime = (dateString) => {
    const options = {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
    };
    return new Date(dateString)
      .toLocaleString('en-GB', options)
      .replace(',', '');
  };

  // updating the existing status
  const handleChangeStatus = async (bookingId, bookingStatus, status) => {
    if (bookingStatus === 'approved') {
      alert('user has already been approved');
      return;
    }
    try {
      setLoading(true);
      const response = await axios.post('/api/admin/bookings', {
        bookingId: bookingId,
        status: status,
      });
      if (!response) {
        console.log('something went wrong');
      } else {
        // console.log(response);
        setBookings(response.data.bookings);

        // find the id form response.data.booking this and update the status in the state wit

        setLoading(false);
        // window.location.reload();
        toast.success('Status updated successfully');
      }
    } catch (err) {
      console.log(err);
    }
  };

  // console.log(bookings);
  return (
    <div className="p-4 sm:p-8">
      {loading ? (
        <div>
          <div className="flex min-h-[90vh] flex-col">
            <div className="flex flex-col items-center justify-center flex-auto p-4 md:p-5">
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
      ) : (
        <div className="px-8">
          <h3 className="mb-8 text-xl font-semibold text-center text-black">
            Booking List
          </h3>
          <Table>
            <TableHeader className="bg-gray-100 shadow-md hover:shadow-lg">
              <TableRow>
                <TableCell className="text-base font-semibold text-left">
                  Booking Place
                </TableCell>
                <TableCell className="text-base font-semibold text-left">
                  User ID
                </TableCell>
                <TableCell className="text-base font-semibold text-left">
                  Check-in Date
                </TableCell>
                <TableCell className="text-base font-semibold text-left">
                  Check-out Date
                </TableCell>
                <TableCell className="text-base font-semibold text-left">
                  Status
                </TableCell>
                <TableCell className="text-base font-semibold text-center">
                  Action
                </TableCell>
              </TableRow>
            </TableHeader>
            <TableBody>
              {bookings &&
                bookings?.map((booking) => (
                  <TableRow key={booking.id}>
                    <TableCell className="text-left">{booking.placeTitle}</TableCell>
                    <TableCell className="text-left">
                      {booking.userId}
                    </TableCell>
                    <TableCell className="text-left">
                      {formatDateTime(booking.checkIn)}
                    </TableCell>
                    <TableCell className="text-left">
                      {formatDateTime(booking.checkOut)}
                    </TableCell>
                    <TableCell
                      className={`text-left text-base font-semibold ${
                        booking.status === 'approved'
                          ? 'text-green-500'
                          : booking.status === 'rejected'
                            ? 'text-red-500'
                            : 'text-yellow-500'
                      }`}
                    >
                      {booking.status}
                    </TableCell>
                    <TableCell className="flex flex-wrap justify-center gap-2 text-center">
                      <Button
                        className="w-full bg-green-500 hover:bg-green-600 sm:w-auto"
                        onClick={() =>
                          handleChangeStatus(
                            booking.id,
                            booking.status,
                            'approved',
                          )
                        }
                      >
                        Accept
                      </Button>
                      <Button
                        className="w-full bg-red-500 hover:bg-red-600 sm:w-auto"
                        onClick={() =>
                          handleChangeStatus(
                            booking.id,
                            booking.status,
                            'rejected',
                          )
                        }
                      >
                        Reject
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  );
}



*/
}
