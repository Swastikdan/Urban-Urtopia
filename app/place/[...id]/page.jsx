import React,{Suspense} from 'react';
import getPlacesById from '@/app/server/places/getPlacesById';
import PlacePageMobile from '@/components/placepage/PlacePageMobile';
import { redirect } from 'next/navigation';
export default async function page({ params }) {
  const id = params.id;

  const place = await getPlacesById(id[0]);


  return (
    <>
      <Suspense fallback={<div>Loading...</div>}>
      <PlacePageMobile place={place} />
      </Suspense>
    </>
  );
}
