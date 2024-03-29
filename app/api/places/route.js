import prisma from '@/lib/prisma';
import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
export async function allPlaces(request) {
  const session = await getServerSession();
  const searchParams = request.nextUrl.searchParams;
  const category = searchParams.get('category');
  const sort = searchParams.get('sort');
  const sortType = searchParams.get('sortType');

  try {
    // Build where clause for filtering
    const whereClause = {};
    if (category) whereClause.category = { has: category };

    // Build orderBy clause for sorting
    const orderByClause = {};
    if (sort === 'price') orderByClause.price = sortType;
    if (sort === 'maxGuests') orderByClause.maxGuests = sortType;

    let places;

    if(session && session.user){
      
      const user = await prisma.user.findUnique({
        where: {
          email: session.user.email,
        },
      });
      
      const favoriteplaces = await prisma.userFavorites.findMany({
        where: {
          userId: user.id,
        },
      });

      places = await prisma.places.findMany({
        where: {
          ...whereClause,
          status: 'approved',
        },
        orderBy: orderByClause,
      });

      places = places.map((place) => {
        const isFavorite = favoriteplaces.some((fav) => fav.placeId === place.id);
        return { ...place, isFavorite };
      });

    }
    else{
      places = await prisma.places.findMany({
        where: {
          ...whereClause,
          status: 'approved',
        },
        orderBy: orderByClause,
      });
    }

    if (places.length === 0) {
      return NextResponse.json({ message: 'No places found' }, { status: 400 });
    }
    return NextResponse.json(places, { status: 200 });

  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
export { allPlaces as GET };