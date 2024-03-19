import React from 'react';
import getPlaces from './server/places/getPlaces';
import Link from 'next/link';
import PlacesCard from '@/components/places/placecard/PlacesCard';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
export default async function page({ searchParams }) {
  const category = await searchParams.category;
  const sort = await searchParams.sort;
  const sortType = await searchParams.sortType;
  let places = [];
  try {
    places = await getPlaces(category, sort, sortType);
  } catch (error) {
    console.error(error);
  }
  // console.log(category, 'category')
  // console.log(places, 'places')
  return (
    <div className="mx-auto   my-5 max-w-[1440px] px-4 md:px-8  ">
      {!Array.isArray(places) || places.length === 0 ? (
        <div className="mx-auto flex h-[70vh] w-full flex-col items-center justify-center space-y-3 text-center md:space-y-5">
          <h1 className="text-2xl font-semibold text-gray-700 md:text-3xl">
            No places found
          </h1>
          <p className="text-sm text-gray-500">
            Try adjusting your search or filter to find what you're looking for.
          </p>
          <Link href="/">
            <Button variant="outline" className="flex items-center gap-2 ">
              <ArrowLeft size={16} /> Go Back
            </Button>
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-x-4 gap-y-6 sm:grid-cols-2 md:gap-x-6 lg:grid-cols-3 xl:grid-cols-4">
          {places.map((place) => (
            <PlacesCard key={place.id} place={place} />
          ))}
        </div>
      )}
    </div>
  );
}

// import React, { Suspense } from 'react';
// import getPlaces from './server/places/getPlaces';
// import Places from '@/components/places/Places';

// import PlaceLoader from '@/components/places/placecard/PlaceLoader';
// import { Award, Search } from 'lucide-react';
// export default async function page({ params, searchParams }) {
//   const category =  await searchParams.category;
//   const sort = await searchParams.sort;
//   const sortType = await searchParams.sortType;
//   let places = [];
// //  try{
//   if(category && sort && sortType){
//     places = await getPlaces(category, sort, sortType);
//   }
//   else{
//     places = await getPlaces();
//   }
//  }
//   catch(error){
//     console.error(error);
//   }
//     return {
//       props: {
//         places,
//       },
//     };
//  console.log(places, 'places')
//   // if (loading) {
//   //   return <PlaceLoader />;
//   // }
//   console.log(loading, 'loading')
//   console.log('places', places);

//   return (
//     <section>
//       {/* <Places /> */}
//     </section>
//   );
// }
