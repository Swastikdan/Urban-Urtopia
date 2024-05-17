
import React, { Suspense } from 'react';
import getPlacesById from '@/app/server/places/getPlacesById';
// import PlacePageDesktop from '@/components/placepage/PlacePageDesktop';
// import PlacePageMobile from '@/components/placepage/PlacePageMobile';
import PlacePage from '@/components/placepage/PlacePage';
export default async function page({ params }) {
  const id = params.id;

  const place = await getPlacesById(id);

  // console.log(place)

  return (
    <div className="mx-auto flex w-full max-w-screen-xl flex-col  items-center">
      {/* <div className="flex w-full sm:hidden">
        <PlacePageMobile place={place} />
      </div>
      <div className="hidden px-4  sm:flex xl:px-16">
        <PlacePageDesktop place={place} />
      </div> */}
      <PlacePage place={place} />
    </div>
  );
}
