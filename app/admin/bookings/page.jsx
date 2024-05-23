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
