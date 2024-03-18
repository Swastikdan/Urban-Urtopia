import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { getServerSession } from 'next-auth';
import userPlaces from '../server/places/userPlaces';
import userBookings from '../server/userBookings';
import Bookings from '@/components/Bookings';
import Listing from '@/components/Listing';
export default async function page() {
  const session = await getServerSession();
  if (!session) {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    };
  }
  const user = session?.user;

  // console.log('places', await userPlaces());
  // console.log('bookings', await userBookings());

  const listings = await userPlaces();
  const bookings = await userBookings();

  return (
    <>
      {/* <div className="mx-auto items-center justify-center pb-10">
        <div className=" px-4 pb-10 pt-5">
          <h1 className="w-full text-start text-4xl font-bold sm:text-center md:text-5xl xl:text-6xl ">
            Dashboard
          </h1>
        </div>
        <Tabs
          defaultValue="Bookings"
          className="flex w-full flex-col items-center justify-center"
        >
          <TabsList className="rounded-full bg-transparent p-1">
            <TabsTrigger
              value="Bookings"
              className="mr-1 rounded-full bg-secondary px-12 py-3 data-[state=active]:bg-primary data-[state=active]:text-white sm:mr-3 md:mr-5 md:px-20 md:py-5"
            >
              Bookings
            </TabsTrigger>
            <TabsTrigger
              value="Listings"
              className="ml-1 rounded-full bg-secondary px-12 py-3 data-[state=active]:bg-primary data-[state=active]:text-white sm:ml-3 md:ml-5 md:px-20 md:py-5"
            >
              Listings
            </TabsTrigger>
          </TabsList>
          <TabsContent value="Bookings" className="w-full ">
            <Bookings bookings={bookings} />
          </TabsContent>
          <TabsContent value="Listings" className="w-full ">
            <Listing listings={listings} />
          </TabsContent>
        </Tabs>
      </div> */}
      <div className="mx-auto  items-center justify-center pb-10">
        <div className=" px-4 pb-10 pt-5">
          <h1 className="w-full text-start text-4xl font-bold sm:text-center md:text-5xl xl:text-6xl ">
            Dashboard
          </h1>
        </div>
        <Tabs
          defaultValue="Bookings"
          className="flex w-full flex-col items-center justify-center"
        >
          <TabsList className="rounded-full bg-transparent p-1">
            <TabsTrigger
              value="Bookings"
              className="mr-1 rounded-full bg-secondary px-12 py-3 data-[state=active]:bg-primary data-[state=active]:text-white sm:mr-3 md:mr-5 md:px-20 md:py-5"
            >
              Bookings
            </TabsTrigger>
            <TabsTrigger
              value="Listings"
              className="ml-1 rounded-full bg-secondary px-12 py-3 data-[state=active]:bg-primary data-[state=active]:text-white sm:ml-3 md:ml-5 md:px-20 md:py-5"
            >
              Listings
            </TabsTrigger>
          </TabsList>
          <TabsContent
            value="Bookings"
            className="mx-auto w-auto items-center "
          >
            <Bookings bookings={bookings} />
          </TabsContent>
          <TabsContent
            value="Listings"
            className="mx-auto w-auto items-center "
          >
            <Listing listings={listings} />
          </TabsContent>
        </Tabs>
      </div>
    </>
  );
}
