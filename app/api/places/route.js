import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function allPlaces(request, response) {
    try {
        const places = await prisma.places.findMany();
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