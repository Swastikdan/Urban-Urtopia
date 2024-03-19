'use client';
import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';

import getPlaces from './server/places/getPlaces';

import { Button } from '@/components/ui/button';
import PlacesCard from '@/components/places/placecard/PlacesCard';
import PlaceLoader from '@/components/places/placecard/PlaceLoader';
import { ArrowLeft } from 'lucide-react';
export default function page() {
    const searchParams = useSearchParams();
    const [places, setPlaces] = useState([]);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
      setLoading(true);
      const category = searchParams.get('category') || '';
      const sort = searchParams.get('sort') || '';
      const sortType = searchParams.get('sortType') || '';
      getPlaces(category, sort, sortType)
        .then((data) => {
          setPlaces(data);
          setLoading(false);
        })
        .catch((error) => {
          console.error(error);
          setLoading(false);
        });
    }, [searchParams]);

    if (loading) {
      return <PlaceLoader />;
    }

  return (
    <>
      <div className="mx-auto  my-5 max-w-[1440px]  px-4 md:px-8">
        {!Array.isArray(places) || places.length === 0 ? (
          <div className="mx-auto flex h-[70vh] w-full flex-col items-center justify-center space-y-3 text-center md:space-y-5">
            <h1 className="text-2xl font-semibold text-gray-700 md:text-3xl">
              No places found
            </h1>
            <p className="text-sm text-gray-500">
              Try adjusting your search or filter to find what you're looking
              for.
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
    </>
  );
}

// import React, { Suspense } from 'react';
// import getPlaces from './server/places/getPlaces';
// import Places from '@/components/places/Places';
// import PlaceLoader from '@/components/places/placecard/PlaceLoader';
// export default async function page() {
//   // const searchplaces = await searchPlaces('65ea138a5555c6ecd9ac9d76' );

//   return (
//     <section>
//       {/* <Suspense fallback={<PlaceLoader />}>
//         <Places />
//       </Suspense> */}
//       <Places />
//     </section>
//   );
// }
