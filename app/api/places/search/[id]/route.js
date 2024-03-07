import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function findPlace(request,{params}) {

    const id = params.id;
    
    if (!id || String(id).length !== 24)
        return NextResponse.json("Invalid ID", { status: 401 });

    // const place = await prisma.place.findUnique({ where: { id: String(id) } });
    try{
        const place = await prisma.places.findUnique({ where: { id: String(id) } });
        if (!place || place.length === 0 ) return new Response("Place not found", { status: 404 });
        return NextResponse.json(place);
        
    }
    catch (error) {
        console.error('Error:', error);
        return NextResponse.json({ status: 500 });
    }
    

}

export { findPlace as GET}