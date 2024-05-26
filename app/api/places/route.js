import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";



export async function GET(request) {
  const searchParams = request.nextUrl.searchParams;
  const category = searchParams.get("category");
  const sort = searchParams.get("sort");
  const sortType = searchParams.get("sortType");
  const location = searchParams.get("location");
  const checkin = searchParams.get("checkin");
  const checkout = searchParams.get("checkout");
  const adults = searchParams.get("adults");
  const children = searchParams.get("children");

  try {
    const whereClause = category ? { category: { has: category } } : {};

    const orderByClause = {};
    if (sort === "price") orderByClause.price = sortType;
    if (sort === "maxGuests") orderByClause.maxGuests = sortType;

const locationFilter = location
  ? {
      OR: [
        { state: { contains: location } },
        { city: { contains: location } },
        { address: { contains: location } },
      ],
    }
  : null;

const guestsFilter = adults || children
  ? {
      maxGuests: {
        gte: String(parseInt(adults || '1') + parseInt(children || '0')),
      },
    }
  : null;

const filters = {
  ...whereClause,
  ...(locationFilter ? locationFilter : {}),
  ...(guestsFilter ? guestsFilter : {}),
  status: "approved",
};

let places = await prisma.places.findMany({
  where: filters,
  orderBy: orderByClause,
});

if (places.length === 0) {
  return NextResponse.json({ message: "No places found" }, { status: 400 });
}

    if (checkin && checkout) {
      const checkinDate = new Date(checkin);
      const checkoutDate = new Date(checkout);

      places = await Promise.all(
        places.map(async (place) => {
          const bookingwindows = await getBookingWindows(place.id);
          const isAvailable = bookingwindows.some(
            (window) =>
              checkinDate >= new Date(window.availableFrom) &&
              checkoutDate <= new Date(window.availableTo)
          );
          return isAvailable ? place : null;
        })
      );

      places = places.filter(Boolean);
    }

    return NextResponse.json(places, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

async function getBookingWindows(id) {
  const place = await prisma.places.findUnique({
    where: { id: String(id), status: "approved" },
  });

  if (!place) return null;

  const bookings = await prisma.bookings.findMany({
    where: { placeId: String(id) },
    orderBy: { checkIn: 'asc' },
  });

  let bookingWindows = [];

  for (let i = 0; i < bookings.length; i++) {
    const availableFrom = new Date(bookings[i].checkOut);
    const availableTo = i < bookings.length - 1 ? new Date(bookings[i + 1].checkIn) : new Date(place.listTillDate);
    let diffTime = Math.abs(availableTo - availableFrom);
    let diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays >= place.minimumStay) {
      bookingWindows.push({ availableFrom, availableTo });
    }
  }

  return bookingWindows;
}









//  import prisma from '@/lib/prisma';
// import { NextResponse } from 'next/server';
// import { getServerSession } from 'next-auth';
// export async function allPlaces(request) {
//   const session = await getServerSession();
//   const searchParams = request.nextUrl.searchParams;
//   const category = searchParams.get('category');
//   const sort = searchParams.get('sort');
//   const sortType = searchParams.get('sortType');
//    const location = searchParams.get('location');
//   const checkin = searchParams.get('checkin');
//   const checkout = searchParams.get('checkout');
//   const adults = searchParams.get('adults');
//   const children = searchParams.get('children');

//   console.log(checkin , checkout )
//   // const infants = searchParams.get('infants');
//   // const pets = searchParams.get('pets');
// try {
//   // Build where clause for filtering
//   const whereClause = {};
//   if (category) whereClause.category = { has: category };

//   // Build orderBy clause for sorting
//   const orderByClause = {};
//   if (sort === 'price') orderByClause.price = sortType;
//   if (sort === 'maxGuests') orderByClause.maxGuests = sortType;

//   // Define the location filter
//   const locationFilter = location
//     ? {
//         OR: [
//           { state: { contains: location } },
//           { city: { contains: location } },
//           { address: { contains: location } },
//         ],
//       }
//     : {};

// // Define the guests filter
// const guestsFilter =
//   adults || children
//     ? {
//         maxGuests: {
//           lte: String(parseInt(adults || 0) + parseInt(children || 0)),
//         },
//       }
//     : {};

//   // Combine all filters
//   const filters = {
//     ...whereClause,
//     ...locationFilter,
//     ...guestsFilter,
//     status: 'approved',
//   };

//   // Fetch places
//   let places = await prisma.places.findMany({
//     where: filters,
//     orderBy: orderByClause,
//   });

//   // If no places found, return a message
//   if (places.length === 0) {
//     return NextResponse.json({ message: 'No places found' }, { status: 400 });
//   }

//   // For each place, find its booking windows and check if the checkin and checkout dates fall within any of the windows
//   for (let place of places) {
//     const bookings = await prisma.bookings.findMany({
//       where: { placeId: String(place.id) },
//       orderBy: { checkIn: 'asc' },
//     });

//     let bookingWindows = [];

//     if (bookings.length === 0) {
//       // If no bookings, set availableFrom to today and availableTo to listTillDate
//       const availableFrom = new Date();
//       const availableTo = new Date(place.listTillDate);
//       const diffTime = Math.abs(availableTo - availableFrom);
//       const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

//       if (diffDays >= place.minimumStay) {
//         bookingWindows.push({
//           availableFrom,
//           availableTo,
//         });
//       }
//     } else {
//       // If bookings, create booking windows
//       bookingWindows = getBookingWindows(bookings, place);
      
//       }
//     // Check if the checkin and checkout dates fall within any of the booking windows
// if (checkin && checkout) {
//   const checkinDate = new Date(checkin);
//   const checkoutDate = new Date(checkout);

//   const isAvailable = bookingWindows.some(
//     (window) =>
//       checkinDate > new Date(window.availableFrom) &&
//       checkoutDate < new Date(window.availableTo),
//   );

//   if (!isAvailable) {
//     // If the place is not available for the given dates, remove it from the places array
//     places = places.filter((p) => p.id !== place.id);
//   }
// }
//   }

//   return NextResponse.json(places, { status: 200 });
// } catch (error) {
//   return NextResponse.json({ error: error.message }, { status: 500 });
// }

// // Function to get booking windows
// function getBookingWindows(bookings, place) {
//   let bookingWindows = [];

//   // Sort bookings by checkIn date
//   bookings.sort((a, b) => new Date(a.checkIn) - new Date(b.checkIn));

//   const availableFrom = new Date();
//   const availableTo = new Date(bookings[0].checkIn);
//   let diffTime = Math.abs(availableTo - availableFrom);
//   let diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

//   if (diffDays >= place.minimumStay) {
//     bookingWindows.push({
//       availableFrom,
//       availableTo,
//     });
//   }

//   for (let i = 1; i < bookings.length; i++) {
//     const window = {
//       availableFrom: new Date(bookings[i - 1].checkOut),
//       availableTo: new Date(bookings[i].checkIn),
//     };
//     diffTime = Math.abs(window.availableTo - window.availableFrom);
//     diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

//     if (diffDays >= place.minimumStay) {
//       bookingWindows.push(window);
//     }
//   }

//   const lastWindow = {
//     availableFrom: new Date(bookings[bookings.length - 1].checkOut),
//     availableTo: place.listTillDate,
//   };
//   diffTime = Math.abs(lastWindow.availableTo - lastWindow.availableFrom);
//   diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

//   if (diffDays >= place.minimumStay) {
//     bookingWindows.push(lastWindow);
//   }

//   return bookingWindows;
// }





// {
//   /* 
//   try {
//     // Build where clause for filtering
//     const whereClause = {};
//     if (category) whereClause.category = { has: category };

//     // Build orderBy clause for sorting
//     const orderByClause = {};
//     if (sort === 'price') orderByClause.price = sortType;
//     if (sort === 'maxGuests') orderByClause.maxGuests = sortType;

//     let places;

//     if(session && session.user){
      
//       const user = await prisma.user.findUnique({
//         where: {
//           email: session.user.email,
//         },
//       });
      
//       const favoriteplaces = await prisma.userFavorites.findMany({
//         where: {
//           userId: user.id,
//         },
//       });

//       places = await prisma.places.findMany({
//         where: {
//           ...whereClause,
//           status: 'approved',
//         },
//         orderBy: orderByClause,
//       });

//       places = places.map((place) => {
//         const isFavorite = favoriteplaces.some((fav) => fav.placeId === place.id);
//         return { ...place, isFavorite };
//       });

//     }
//     else{
//       places = await prisma.places.findMany({
//         where: {
//           ...whereClause,
//           status: 'approved',
//         },
//         orderBy: orderByClause,
//       });
//     }

//     if (places.length === 0) {
//       return NextResponse.json({ message: 'No places found' }, { status: 400 });
//     }
//     return NextResponse.json(places, { status: 200 });

//   } catch (error) {
//     return NextResponse.json({ error: error.message }, { status: 500 });
//   }
//   */
// }
// }
// export { allPlaces as GET };

