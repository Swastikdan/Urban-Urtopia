
'use server';
import prisma from '@/lib/prisma';
import { getServerSession } from 'next-auth';

export default async function getPlacesById(id) {
  if (!id || String(id).length !== 24)
    return { code: 400, message: 'Invalid ID' };

  const session = await getServerSession();
  const statusCondition = session ? {} : { status: 'approved' };

  // if the place is in the user's favorites, set isFavorite to true and  add that to final result

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

    if (session) {
      const user = await prisma.user.findUnique({
        where: { email: session?.user.email },
      });

      const favorites = await prisma.userFavorites.findMany({
        where: {
          userId: user.id,
        },
      });
      place.isFavorite = favorites.some(
        (favorite) => favorite.placeId === place.id,
      );
    } else {
      place.isFavorite = false;
    }
    // Find bookings for the place
    const bookings = await prisma.bookings.findMany({
      where: { placeId: String(id) },
      orderBy: { checkIn: 'asc' },
    });

    let bookingWindows = [];

    if (bookings.length === 0) {
      // If no bookings, set availableFrom to today and availableTo to listTillDate
      const availableFrom = new Date();
      const availableTo = new Date(place.listTillDate);
      const diffTime = Math.abs(availableTo - availableFrom);
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

      if (diffDays >= place.minimumStay) {
        bookingWindows.push({
          availableFrom,
          availableTo,
        });
      }
    } else {
      // If bookings, create booking windows
      const availableFrom = new Date();
      const availableTo = new Date(bookings[0].checkIn);
      let diffTime = Math.abs(availableTo - availableFrom);
      let diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

      if (diffDays >= place.minimumStay) {
        bookingWindows.push({
          availableFrom,
          availableTo,
        });
      }

      for (let i = 1; i < bookings.length; i++) {
        const window = {
          availableFrom: new Date(bookings[i - 1].checkOut),
          availableTo: new Date(bookings[i].checkIn),
        };
        diffTime = Math.abs(window.availableTo - window.availableFrom);
        diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

        if (diffDays >= place.minimumStay) {
          bookingWindows.push(window);
        }
      }

      const lastWindow = {
        availableFrom: new Date(bookings[bookings.length - 1].checkOut),
        availableTo: place.listTillDate,
      };
      diffTime = Math.abs(lastWindow.availableTo - lastWindow.availableFrom);
      diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

      if (diffDays >= place.minimumStay) {
        bookingWindows.push(lastWindow);
      }
    }

    place.bookingWindows = bookingWindows;
    if (
      place.status !== 'approved' &&
      (!place.owner || place.owner.email !== session.user.email)
    )
      return {
        code: 401,
        message: 'You are not authorized to view this place',
      };
   
    return place;
  } catch (error) {
    console.error('Error:', error);
    return { code: 500, message: 'Internal Server Error' };
  }
}
/*
"use server"
import prisma from '@/lib/prisma';
import { getServerSession } from 'next-auth';

export default async function getPlacesById(id) {
  if (id) {
    if (!id || String(id).length !== 24)
      return { code: 401, message: 'Invalid ID' };

    try {
      const place = await prisma.places.findUnique({
        where: { id: String(id), status: "approved" },
      });

      if (!place)
        return { code: 404, message: 'Place not found' };

      // Find bookings for the place
      const bookings = await prisma.bookings.findMany({
        where: { placeId: String(id) },
        orderBy: { checkIn: 'asc' },
      });

      let bookingWindows = [];

      if (bookings.length === 0) {
        // If no bookings, set availableFrom to today and availableTo to listTillDate
        const availableFrom = new Date();
        const availableTo = new Date(place.listTillDate);
        const diffTime = Math.abs(availableTo - availableFrom);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 

        if(diffDays >= place.minimumStay) {
          bookingWindows.push({
            availableFrom,
            availableTo,
          });
        }
      } else {
        // If bookings, create booking windows
        const availableFrom = new Date();
        const availableTo = new Date(bookings[0].checkIn);
        let diffTime = Math.abs(availableTo - availableFrom);
        let diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 

        if(diffDays >= place.minimumStay) {
          bookingWindows.push({
            availableFrom,
            availableTo,
          });
        }

        for (let i = 1; i < bookings.length; i++) {
          const window = {
            availableFrom: new Date(bookings[i - 1].checkOut),
            availableTo: new Date(bookings[i].checkIn),
          };
          diffTime = Math.abs(window.availableTo - window.availableFrom);
          diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 

          if(diffDays >= place.minimumStay) {
            bookingWindows.push(window);
          }
        }

        const lastWindow = {
          availableFrom: new Date(bookings[bookings.length - 1].checkOut),
          availableTo: place.listTillDate,
        };
        diffTime = Math.abs(lastWindow.availableTo - lastWindow.availableFrom);
        diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 

        if(diffDays >= place.minimumStay) {
          bookingWindows.push(lastWindow);
        }
      }

      place.bookingWindows = bookingWindows;
      console.log(place)
      return place;

    } catch (error) {
      console.error("Error:", error);
      return { code: 500, message: 'Internal Server Error' };
    }
  }
} */