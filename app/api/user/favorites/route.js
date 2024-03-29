{/*

model UserFavorites {
  id      String  @id @default(auto()) @map("_id") @db.ObjectId
  userId  String  @db.ObjectId
  placeId String  @db.ObjectId
  user    User    @relation(fields: [userId], references: [id])
  place   Places  @relation(fields: [placeId], references: [id])
  @@unique([userId, placeId])
}

*/}

import prisma from '@/lib/prisma';
import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';

// async function  addFavorite(request){

// const session = await getServerSession();
// const { placeId } = await request.json;
// console.log('placeId:', placeId); // Add this line
// const useremail = session.user.email;
//   if (!session) {
//     return NextResponse.json('You must be signed in to add a favorite');
//   }
//     const user = await prisma.user.findUnique({
//       where: {
//         email: useremail,
//       },
//     });

//     if (!user) {
//       return NextResponse.json('User not found');
//     }

//     const place = await prisma.places.findUnique({
//       where: {
//         id: placeId,
//       },
//     });

//     if (!place) {
//       return NextResponse.json('Place not found');
//     }

//     const favorite = await prisma.userFavorites.create({
//       data: {
//         userId: user.id,
//         placeId,
//       },
//     });

//     console.log('favorite', favorite);

//     return NextResponse.json({ message: ' Favorite added ' }, { status: 200 });

// }

async function addOrRemoveFavorite(request) {
  const session = await getServerSession();
  const { placeId } = await request.json();

  if (!session) {
    return NextResponse.json({ message: 'You must be signed in to add a favorite' }, { status: 401 });
  }

  const user = await prisma.user.findUnique({
    where: {
      email: session.user.email,
    },
  });

  const place = await prisma.places.findUnique({
    where: {
      id: placeId,
    },
  });

  if (!place) {
    return NextResponse.json({ message: 'Place not found' } , { status: 404 });
  }

  const favorite = await prisma.userFavorites.findUnique({
    where: {
      userId_placeId: {
        userId: user.id,
        placeId: placeId,
      },
    },
  });

  if (favorite) {
    // If the place is already a favorite, delete it from favorites
    await prisma.userFavorites.delete({
      where: {
        userId_placeId: {
          userId: user.id,
          placeId: placeId,
        },
      },
    });
    return NextResponse.json({ message: 'Favorite removed' }, { status: 200 });
  } else {
    // If the place is not a favorite, add it to favorites
    await prisma.userFavorites.create({
      data: {
        userId: user.id,
        placeId,
      },
    });
    return NextResponse.json({ message: 'Favorite added' }, { status: 200 });
  }
}

export { addOrRemoveFavorite as POST };