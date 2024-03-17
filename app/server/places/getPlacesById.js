"use server"
import prisma from '@/lib/prisma';
import { getServerSession } from 'next-auth';

export default async function getPlacesById(id) {
  const session = await getServerSession();

  if (!id) {
    return { message: 'no id provied' };
  }
  if (!id || String(id).length !== 24) return {code:400 , message: 'Invalid ID' };
  try {
    if (session) {
      const place = await prisma.places.findUnique({
        where: { id: String(id) },
        include: {
          owner: {
            select: {
              name: true,
              image: true,
              email: true,
            },
          },
        },
      });

      if (place.status !== "approved" && place.owner.email !== session.user.email)
        return  { code:401 , message: 'You are not authorized to view this place' };
      if (!place || place.length === 0) return { code: 404, message: 'Place not found' };
      return place;
    } else {
      const place = await prisma.places.findUnique({
        where: { id: String(id), status: 'approved' },
        include: {
          owner: {
            select: {
              name: true,
              image: true,
            },
          },
        },
      });

      if (!place || place.length === 0) return {code:404 , message: 'Place not found' };
      return place;
    }
  } catch (error) {
    console.error('Error:', error);
    return { code: 500, message: 'Internal Server Error' };
  }
}
