import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import prisma from '@/lib/prisma';
async function getPlaces() {
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
      const places = await prisma.Places.findMany();
      if (!places) {
        return NextResponse.json(
          { message: 'places not found' },
          { status: 401 },
        );
      }
      return NextResponse.json({ places }, { status: 200 });
    } catch (err) {
      console.log(err);
      return NextResponse.json({ message: err.message }, { status: 500 });
    }
  }
}

async function deletePlace(request) {
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
      const searchParams = request.nextUrl.searchParams;
      const id = searchParams.get('id');
      if (!id) {
        return NextResponse.json(
          { message: 'Place id is required' },
          { status: 400 },
        );
      }
      const place = await prisma.Places.delete({
        where: {
          id: id,
        },
      });

      const places = await prisma.Places.findMany();
      return NextResponse.json({ places }, { status: 200 });
    } catch (err) {
      console.log(err);
      return NextResponse.json({ message: err.message }, { status: 500 });
    }
  }
}
export { getPlaces as GET , deletePlace as DELETE};
