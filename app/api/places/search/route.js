import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function plsces(request) {
  const searchParams = request.nextUrl.searchParams;
  const query = searchParams.get("query");
  const id = searchParams.get("id");
  if (id) {
    if (!id || String(id).length !== 24)
      return NextResponse.json("Invalid ID", { status: 401 });

    try {
      const place = await prisma.places.findUnique({
        where: { id: String(id), status: "approved" },
      });

      if (!place || place.length === 0)
        return new Response("Place not found", { status: 404 });

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

      return NextResponse.json(place);
    } catch (error) {
      console.error("Error:", error);
      return NextResponse.json({ status: 500 });
    }
  }
  try {
    const places = await prisma.places.findMany({
      where: {
        status: "approved",
        OR: [
          {
            title: {
              contains: query,
              mode: "insensitive",
            },
          },
          {
            description: {
              contains: query,
              mode: "insensitive",
            },
          },
          {
            address: {
              contains: query,
              mode: "insensitive",
            },
          },
          {
            city: {
              contains: query,
              mode: "insensitive",
            },
          },
          {
            state: {
              contains: query,
              mode: "insensitive",
            },
          },
          {
            category: {
              hasSome: [query],
            },
          },
        ],
      },
      include: {
        owner: {
          select: {
            name: true,
            email: true,
          },
        },
      },
    });
    return NextResponse.json(places);
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json({ status: 500 });
  }
}

export { plsces as GET };
