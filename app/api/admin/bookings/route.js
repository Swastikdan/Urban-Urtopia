import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import prisma from '@/lib/prisma';

// export default async function GET() {
//   const session = await getServerSession();
// if (!session) {
//   return NextResponse.json({ message: 'you have to login' }, { status: 401 });
// }
// if(session && session.user){
//   const user = await prisma.user.findUnique({
//       where:{
//           email: session.user.email
//       }
//   })
//   if(user.role != 'admin'){
//       return NextResponse.json({err:"admin not found"},{status:401});
//   }
//   const users = await prisma.user.findMany()
//     return NextResponse.json(users, { status: 400 });
//   }

// }
// delete function needs to be completed
async function getBooking() {
  const session = await getServerSession();
  if (!session) {
    return NextResponse.json({ message: 'you have to login' }, { status: 401 });
  }
  if (session && session.user) {
    const user = await prisma.user.findUnique({
      where: {
        email: session.user.email,
      },
    });
    if (user.role != 'admin') {
      return NextResponse.json({ message: 'admin not found' }, { status: 401 });
    }
    try {
      const bookings = await prisma.bookings.findMany();

      // Fetch place titles for each booking
      const bookingsWithPlaceTitles = await Promise.all(
        bookings.map(async (booking) => {
          const place = await prisma.places.findUnique({
            where: { id: booking.placeId },
          });
          return {
            ...booking,
            placeTitle: place ? place.title : 'Unknown Place',
          };
        }),
      );

      return NextResponse.json(
        { bookings: bookingsWithPlaceTitles },
        { status: 200 },
      );
      // return NextResponse.json({ message: 'hi' });
    } catch (err) {
      console.log(err);
      return NextResponse.json({ message: err.message }, { status: 500 });
    }
  }
}
//
async function statusUpdate(request) {
  const session = await getServerSession();

  if (!session)
    return NextResponse.json({ code: 401, message: 'Unauthorized' });

  try {
    const { bookingId, status } = await request.json();
    const booking = await prisma.bookings.update({
      where: { id: bookingId },
      data: {
        status: status,
      },
    });

    const bookings = await prisma.bookings.findMany();
    return NextResponse.json({ bookings });
  } catch (err) {
    console.log(err);
    return NextResponse.json({ message: err.message }, { status: 500 });
  }
}
export { getBooking as GET, statusUpdate as POST };
