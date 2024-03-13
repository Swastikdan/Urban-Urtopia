'use server';
import prisma from '@/lib/prisma';
export default async function getPlaces(category, sort , sortType ){
  try {
    // Build where clause for filtering
    const whereClause = {};
    if (category) whereClause.category = { has: category };

    // Build orderBy clause for sorting
    const orderByClause = {};
    if (sort === 'price') orderByClause.price = sortType;
    if (sort === 'maxGuests') orderByClause.maxGuests = sortType;

    const places = await prisma.places.findMany({
      where: {
        ...whereClause,
        status: 'approved',
      },
      orderBy: orderByClause,
    });

    if (places.length === 0) {
      return { message: 'No places found' };
    }
    return places;
  } catch (error) {
    return { error: error.message };
  }
}
