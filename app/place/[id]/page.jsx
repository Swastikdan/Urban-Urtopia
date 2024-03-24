import React,{Suspense} from 'react';
import getPlacesById from '@/app/server/places/getPlacesById';
import PlacePageDesktop from '@/components/placepage/PlacePageDesktop';
import PlacePageMobile from '@/components/placepage/PlacePageMobile';
import { redirect } from 'next/navigation';

export async function generateMetadata({ params }) {
  // read route params
  const id = params.id
  const place = await getPlacesById(id);
  return {
    title: place.title,
    description: place.description,
    ogImage:
      place.photos && place.photos.length > 0
        ? place.photos[0].replace(
            '/upload/',
            '/upload/w_1200,h_630,c_fill,g_auto/q_auto/f_auto/',
          )
        : 'https://res.cloudinary.com/debewnh29/image/upload/w_1200,h_630,c_fill,g_auto/q_auto/f_auto/nestly/public/OGImage.webp',
    ogTitle: place.title,
    ogDescription: place.description,
    ogUrl: `https://airluxe.com/place/${place.id}`,
  };
}



export default async function page({ params }) {
  const id = params.id;

  const place = await getPlacesById(id);


  return (
    <div className="mx-auto flex w-full max-w-screen-xl flex-col  items-center">
      <div className="flex w-full sm:hidden">
      
          <PlacePageMobile place={place} />
       
      </div>
      <div className="hidden px-4  sm:flex xl:px-16">
        
          <PlacePageDesktop place={place} />
 
      </div>
    </div>
  );
}
