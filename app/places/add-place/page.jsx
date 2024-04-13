import React from 'react';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import NewPlaceForm from '@/components/newplaceform/NewPlaceForm';
export default async function page() {
  const session = await getServerSession();

  if (!session) {
    redirect('/login');
  }

  return (
    <section className="mx-auto flex w-full max-w-screen-xl flex-col px-4 md:px-8 ">
      <div className="flex flex-col space-y-2 pb-10 pt-5">
        <h2 className=" text-3xl font-semibold text-gray-800  md:text-4xl xl:text-5xl">
          {/*   Write a tile to add places to my air ben clione      */}
          Add to Urban Utopia
        </h2>
        <span className='text-sm text-right px-3 text-gray-600'>
          For more information visit <a href="#" className='hover:underline underline-offset-4 text-black font-semibold '>here</a>{' '}
        </span>
      </div>

      <NewPlaceForm />
    </section>
  );
}
