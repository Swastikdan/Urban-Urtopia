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
