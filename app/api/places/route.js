import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function allPlaces(request) {
    const searchParams = request.nextUrl.searchParams;
    const category = searchParams.get("category");
    const sort = searchParams.get("sort");
    const sortType = searchParams.get("sortType");

    try {
        // Build where clause for filtering
        const whereClause = {};
        if (category) whereClause.category = { has: category };

        // Build orderBy clause for sorting
        const orderByClause = {};
        if (sort === 'price') orderByClause.price = sortType; 
        if (sort === 'maxGuests') orderByClause.maxGuests = sortType;

        const places = await prisma.places.findMany({
            where: whereClause,
            orderBy: orderByClause,
        });

        if (places.length === 0) {
            return NextResponse.json({ message: "No places found" }, { status: 400 });
        }
        return NextResponse.json(places, { status: 200 });
    }
    catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
export {allPlaces as GET}