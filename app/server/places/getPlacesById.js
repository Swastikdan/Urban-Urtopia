"use server"
import prisma from '@/lib/prisma';
import { getServerSession } from 'next-auth';

export default async function getPlacesById(id) {
  if (!id || String(id).length !== 24) return {code:400 , message: 'Invalid ID' };

  const session = await getServerSession();
  const statusCondition = session ? {} : { status: 'approved' };

  try {
    const place = await prisma.places.findUnique({
      where: { id: String(id), ...statusCondition },
      include: {
        owner: {
          select: {
            name: true,
            image: true,
            email: session ? true : false,
          },
        },
      },
    });

    if (!place) return { code: 404, message: 'Place not found' };
    if (place.status !== "approved" && (!place.owner || place.owner.email !== session.user.email))
      return  { code:401 , message: 'You are not authorized to view this place' };

    return place;
  } catch (error) {
    console.error('Error:', error);
    return { code: 500, message: 'Internal Server Error' };
  }
}