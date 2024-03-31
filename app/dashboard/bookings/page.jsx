import React from 'react'
import userBookings from '../../server/userBookings';
import Bookings from '@/components/dashboard/Bookings';
export default async function page() {
   const bookings = await userBookings();
  return (
    <div className="mx-auto w-auto items-center ">
      <Bookings bookings={bookings} />
    </div>
  );
}
