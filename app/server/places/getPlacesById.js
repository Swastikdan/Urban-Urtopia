import prisma from "@/lib/prisma";


export default async function getPlacesById(id) {
  if (!id) {
    return { message: 'no id provied' };
  }
    if (!id || String(id).length !== 24) return { message: 'Invalid ID' };
    try {
    const place = await prisma.places.findUnique({
        where: { id: String(id), status: 'approved' },
        include: {
            owner: {
                select: {
                    name: true,
                    image: true
                }
            }
        }
    });
      if (!place || place.length === 0) return { message: 'Place not found' };
      return place;
    } catch (error) {
      console.error('Error:', error);
      return { message: 'Internal Server Error' };
    }
  }
