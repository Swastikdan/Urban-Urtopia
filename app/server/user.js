import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth/server";

export default async function user(id) { 
    const session = await getServerSession();
    console.log("session", session);

    // const user = await prisma.user.findUnique({
    //     where: {
    //     id: id,
    //     },
    //     include: {
    //     places: true,
    //     },
    // });
    
    // return user;








}