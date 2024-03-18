'use server';
import prisma from '@/lib/prisma';
import { getServerSession } from 'next-auth';

export default async function userBookings() {
  const session = await getServerSession();

  const user = session?.user;
  const userEmail = user?.email;

  if (!session) {
    return { code: 401, message: 'Unauthorized' };
  }
  try {
    // Find the user by their email
    const user = await prisma.user.findUnique({
      where: {
        email: userEmail,
      },
    });

    // Find all places owned by the user
    const bookings = await prisma.bookings.findMany({
      where: {
        userId: user.id,
      },
    });

    if (!bookings || bookings.length === 0) {
      return { code: 404, message: 'Bookings not found' };
    }
    return bookings;
  } catch (error) {
    console.error('Error:', error);
    return { code: 500, message: 'Internal Server Error' };
  }
}
