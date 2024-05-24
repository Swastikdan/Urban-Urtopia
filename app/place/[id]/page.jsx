
import React, { Suspense } from 'react';
import getPlacesById from '@/app/server/places/getPlacesById';
// import PlacePageDesktop from '@/components/placepage/PlacePageDesktop';
// import PlacePageMobile from '@/components/placepage/PlacePageMobile';
import PlacePage from '@/components/placepage/PlacePage';
export async function generateMetadata({ params }) {
  const id = params.id;

  const place = await getPlacesById(id);
  return {
    title: `${place.title} - Urban Utopia`,
    description: place.description ? `${place.description.split('.')[0]}.` : '',
    openGraph: {
      title: `${place.title} - Urban Utopia`,
      description: place.description ? `${place.description.split('.')[0]}.` : '',
      url: `https://urbanutopia.vercel.app/place/${place.id}`,
      images: [
        {
          url: place.photos && place.photos.length > 0 ? `${place.photos[0]}` : '',
          width: 1200,
          height: 630,
          alt: `${place.title} - Urban Utopia`,
        },
      ],
    },
  };
}

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
