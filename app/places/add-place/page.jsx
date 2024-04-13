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
    <section className="mx-auto flex w-full max-w-screen-lg flex-col  ">
      <NewPlaceForm />
    </section>
  );
}
