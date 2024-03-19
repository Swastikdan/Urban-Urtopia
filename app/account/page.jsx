import React from 'react';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import ProfileEdit from '@/components/ProfileEdit';
export default async function page() {
  const session = await getServerSession();

  if (!session) {
    redirect('/login');
  }
  return (
      <div class="mx-auto max-w-4xl px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
    <ProfileEdit />
</div>
  );
}
