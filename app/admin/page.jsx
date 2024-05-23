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

export default function Page() {
  const { data: session } = useSession();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get('/api/admin/user');
        if (!res) {
          throw new Error('Failed to fetch booking');
        }
        console.log(res.data);
        setBookings(res.data.booking);
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
      const response = await axios.post(
        '/api/admin/user',
        {
          bookingId: bookingId,
          status: status,
        },
      );
      if (!response) {
        console.log('something went wrong');
      } else {
        setBookings(response.data.booking);
        window.location.reload();
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="p-4 sm:p-8">
      {loading ? (
        <div className="flex min-h-screen items-center justify-center">
          <h3 className="text-2xl font-semibold">Loading...</h3>
        </div>
      ) : (
        <div className="px-8">
          <h3 className="mb-8 text-center text-xl font-semibold text-black">
            Booking List
          </h3>
          <Table>
            <TableHeader className="bg-gray-100 shadow-md hover:shadow-lg">
              <TableRow>
                <TableCell className="text-left text-base font-semibold">
                  Booking ID
                </TableCell>
                <TableCell className="text-left text-base font-semibold">
                  User ID
                </TableCell>
                <TableCell className="text-left text-base font-semibold">
                  Check-in Date
                </TableCell>
                <TableCell className="text-left text-base font-semibold">
                  Check-out Date
                </TableCell>
                <TableCell className="text-left text-base font-semibold">
                  Status
                </TableCell>
                <TableCell className="text-center text-base font-semibold">
                  Action
                </TableCell>
              </TableRow>
            </TableHeader>
            <TableBody>
              {bookings?.map((booking) => (
                <TableRow key={booking.id}>
                  <TableCell className="text-left">{booking.id}</TableCell>
                  <TableCell className="text-left">{booking.userId}</TableCell>
                  <TableCell className="text-left">
                    {formatDateTime(booking.checkIn)}
                  </TableCell>
                  <TableCell className="text-left">
                    {formatDateTime(booking.checkOut)}
                  </TableCell>
                  <TableCell
                    className={`text-left font-semibold text-base ${
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
                      className="w-full bg-green-500 sm:w-auto hover:bg-green-600"
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
                      className="w-full bg-red-500 sm:w-auto hover:bg-red-600"
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
