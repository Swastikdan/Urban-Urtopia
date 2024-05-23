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
        const res = await axios.get('http://localhost:3000/api/admin/user');
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
        'http://localhost:3000/api/admin/user',
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
        <div>
          <h3 className="text-xl font-semibold text-black">Booking List</h3>
          <Table>
            <TableHeader>
              <TableRow>
                <TableCell>Booking ID</TableCell>
                <TableCell>User ID</TableCell>
                <TableCell>Check-in Date</TableCell>
                <TableCell>Check-out Date</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Action</TableCell>
              </TableRow>
            </TableHeader>
            <TableBody>
              {bookings?.map((booking) => (
                <TableRow key={booking.id}>
                  <TableCell>{booking.id}</TableCell>
                  <TableCell>{booking.userId}</TableCell>
                  <TableCell>{formatDateTime(booking.checkIn)}</TableCell>
                  <TableCell>{formatDateTime(booking.checkOut)}</TableCell>
                  <TableCell>{booking.status}</TableCell>
                  <TableCell className="flex flex-wrap justify-center gap-2">
                    <Button
                      className="w-full sm:w-auto"
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
                      className="w-full sm:w-auto"
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
