'use client';
import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import getPlaces from '@/app/server/places/getPlaces';
import { Button } from '../ui/button';
import PlacesCard from './placecard/PlacesCard';
import PlaceLoader from './placecard/PlaceLoader';
import { ArrowLeft } from 'lucide-react';
export default function Places() {
  const searchParams = useSearchParams();
  const [places, setPlaces] = useState([]);
  useEffect(() => {

    const category = searchParams.get('category') || '';
    const sort = searchParams.get('sort') || '';
    const sortType = searchParams.get('sortType') || '';
    getPlaces(category, sort, sortType)
      .then((data) => {
        setPlaces(data);

      })
      .catch((error) => {
        console.error(error);
      });
  }, [searchParams]);



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

// 'use client';
// import React, { useState, useEffect } from 'react';
// import { useSearchParams } from 'next/navigation';
// import Link from 'next/link';
// import getPlaces from '@/app/server/places/getPlaces';
// import { Button } from '../ui/button';
// import PlacesCard from './placecard/PlacesCard';
// import PlaceLoader from './placecard/PlaceLoader';
// import { ArrowLeft } from 'lucide-react';
// export default function Places() {
//   const searchParams = useSearchParams();
//   const [places, setPlaces] = useState([]);
//   const [loading, setLoading] = useState(true);
//   useEffect(() => {
//     setLoading(true);
//     const category = searchParams.get('category') || '';
//     const sort = searchParams.get('sort') || '';
//     const sortType = searchParams.get('sortType') || '';
//     getPlaces(category, sort, sortType)
//       .then((data) => {
//         setPlaces(data);
//         setLoading(false);
//       })
//       .catch((error) => {
//         console.error(error);
//         setLoading(false);
//       });
//   }, [searchParams]);

//   if (loading) {
//     return <PlaceLoader />;
//   }

//   return (
//     <>
//       <div className="mx-auto  my-5 max-w-[1440px]  px-4 md:px-8">
//         {!Array.isArray(places) || places.length === 0 ? (
//           <div className="mx-auto flex h-[70vh] w-full flex-col items-center justify-center space-y-3 text-center md:space-y-5">
//             <h1 className="text-2xl font-semibold text-gray-700 md:text-3xl">
//               No places found
//             </h1>
//             <p className="text-sm text-gray-500">
//               Try adjusting your search or filter to find what you're looking
//               for.
//             </p>
//             <Link href="/">

//               <Button variant="outline" className="flex items-center gap-2 ">
//                 <ArrowLeft size={16} /> Go Back
//               </Button>
//             </Link>
//           </div>
//         ) : (
//           <div className="grid grid-cols-1 gap-x-4 gap-y-6 sm:grid-cols-2 md:gap-x-6 lg:grid-cols-3 xl:grid-cols-4">
//             {places.map((place) => (
//               <PlacesCard key={place.id} place={place} />
//             ))}
//           </div>
//         )}
//       </div>
//     </>
//   );
// }

// "use client";
// import { useEffect, useState } from 'react';
// import { useSearchParams } from 'next/navigation';
// import getPlaces from '@/app/server/places/getPlaces'
// import PlacesCard from './placecard/PlacesCard';

// export default function Places() {
//   const searchParams = useSearchParams();
//   const [places, setPlaces] = useState([]);

//   useEffect(() => {

//     const category = searchParams.get('category') || '';
//     const sort = searchParams.get('sort') || '';
//     const sortType = searchParams.get('sortType') || '';

//     getPlaces(category, sort, sortType)
//       .then((data) => {
//         setPlaces(data);

//       })
//       .catch((error) => {
//         console.error(error);

//       });
//   }, [searchParams]);

//   return (
//     <>

//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
//         {places.map((place) => (
//           <PlacesCard key={place.id} place={place} />
//         ))}
//       </div>

//     </>
//   )
// }
