import React from 'react';
import getPlacesById from '@/app/server/places/getPlacesById';
import PlacePage from '@/components/placepage/PlacePage';
import { notFound } from 'next/navigation';

export async function generateMetadata({ params }) {
  const id = params.id;

  let place = await getPlacesById(id);
  place = place.place;
  if(place && place.place ){
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
}

export default async function page({ params }) {

  const id = params.id;
  let place = null;
  
place = await getPlacesById(id);


  if(!place || place.code != 200){
    notFound();
  }

  return (
    <div className="mx-auto flex w-full max-w-screen-xl flex-col  items-center">
      <PlacePage place={place.place} />
    </div>
  );
}