import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import prisma from '@/lib/prisma';

async function getUser() {
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
      const users = await prisma.user.findMany();

      return NextResponse.json({ users }, { status: 200 });
    } catch (err) {
      console.log(err);
      return NextResponse.json({ message: err.message }, { status: 500 });
    }
  }
}

async function deleteUser(request, { params }) {
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
          { message: 'User id is required' },
          { status: 400 },
        );
      }

      // Delete the user based on the id
      await prisma.user.delete({
        where: { id: id },
      });

      // Fetch all users after the deletion
      const users = await prisma.user.findMany();

      return NextResponse.json(
        { message: 'User deleted successfully', users },
        { status: 200 },
      );
    } catch (err) {
      console.log(err);
      return NextResponse.json({ message: err.message }, { status: 500 });
    }
  }
}

export { getUser as GET, deleteUser as DELETE };
