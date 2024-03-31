import React from 'react';
import userPlaces from '../../server/places/userPlaces';
import Listing from '@/components/dashboard/Listing';
export default async function page() {
   const listings = await userPlaces();;
  return (
    <div className="mx-auto w-auto items-center ">
      <Listing listings={listings} />
    </div>
  );
}
