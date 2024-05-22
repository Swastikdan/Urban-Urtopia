import React from 'react';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import NewPlaceForm from '@/components/newplaceform/NewPlaceForm';

export async function generateMetadata() {
  return {
    title: 'Edit Place Details - Urban Utopia',
    description: 'Edit place details on Urban Utopia.',
  };
}

export default async  function page() {
    const session = await getServerSession();

  if (!session) {
    redirect('/login');
  }


  
  return (
    <section className="flex flex-col w-full max-w-screen-xl px-4 mx-auto md:px-8">
      <div className="flex flex-col pt-5 pb-10 space-y-2">
        <h2 className="text-3xl font-semibold text-gray-800 md:text-4xl xl:text-5xl">
          Edit Place Details
        </h2>
        <span className="px-3 text-sm text-right text-gray-600">
          For more information visit{' '}
          <a
            href="#"
            className="font-semibold text-black underline-offset-4 hover:underline"
          >
            here
          </a>{' '}
        </span>
      </div>

      <NewPlaceForm />
    </section>
  );
}
