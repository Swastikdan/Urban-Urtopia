import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import bcrypt from "bcryptjs";

// Function to handle GET requests
async function handleGetRequest(user) {
  return NextResponse.json(user);
}

// Function to handle POST requests
async function handlePostRequest(request, user, id, session) {
  if (id !== session.user.id) return new Response("Unauthorized", { status: 401 });

  const { name, image, oldPassword, newPassword } = await request.json();

  if (!name || typeof name !== "string" || name.length < 3 || name.length > 50 || name === user.name)
    return new Response("Invalid name", { status: 400 });

  if (!image || typeof image !== "string")
    return new Response("Invalid image", { status: 400 });

  if (!oldPassword || !newPassword)
    return new Response("Invalid password", { status: 400 });

  const isPasswordMatch = await bcrypt.compare(oldPassword, user.password);
  if (!isPasswordMatch)
    return new Response("Old password is incorrect", { status: 400 });

  const hashedPassword = await bcrypt.hash(newPassword, 12);

  const updatedUser = await prisma.user.update({
    where: { id: String(id) },
    data: { name, image, password: hashedPassword },
  });

  return NextResponse.json(updatedUser);
}

// Main function to handle requests
export async function users(request, { params }) {
  const session = await getServerSession();
  const id = params.id;

  if (!session || !id || String(id).length !== 24)
    return new Response("Unauthorized or Invalid ID", { status: 401 });

  const user = await prisma.user.findUnique({ where: { id: String(id) } });

  if (!user) return new Response("User not found", { status: 404 });

  try {
    if (request.method === 'GET') return handleGetRequest(user);
    if (request.method === 'POST') return handlePostRequest(request, user, id, session);
  } catch (error) {
    console.error('Error:', error);
    return new Response("Internal server error", { status: 500 });
  }
}

export { users as GET, users as POST };



// import prisma from "@/lib/prisma";
// import { NextResponse } from "next/server";
// import { getServerSession } from "next-auth";
// import bcrypt from "bcryptjs";
// export async function users(request, { params }) {
//   // Get the current session
//   const session = await getServerSession();

//   // Extract the id from the params
//   const id = params.id;

//   // Check if the session exists, if not return 401 Unauthorized
//   if (!session) return new Response("Unauthorized", { status: 401 });

//   // Check if the id exists, if not return 404 Not Found
//   if (!id) return new Response("No ObjectID provided", { status: 404 });

//   // Check if the id is a valid MongoDB ObjectID, if not return 404 Not Found
//   if (String(id).length !== 24) return new Response("Malformed ObjectID", { status: 404 });

//   // Find the user with the given id
//   const user = await prisma.user.findUnique({ where: { id: String(id) } });

//   // Check if the user exists, if not return 404 Not Found
//   if (!user) return new Response("User not found", { status: 404 });

//   // If the request method is GET, return the user
//   if (request.method === 'GET') return NextResponse.json(user);

//   // If the request method is POST, update the user
//   if (request.method === 'POST') {
//     if (id !== session.user.id) return new Response("Unauthorized", { status: 401 });
//     // Extract the name from the request body
//     const { name, image, oldPassword, newPassword } = await request.json();

//     // Check if the name exists, if not return 400 Bad Request
//     if (!name) return new Response("No name provided", { status: 400 });

//     // Check if the name is a string, if not return 400 Bad Request
//     if (typeof name !== "string")
//       return new Response("Name must be a string", { status: 400 });

//     // Check if the name length is valid, if not return 400 Bad Request
//     if (name.length < 3 || name.length > 50)
//       return new Response("Name must be between 3 and 50 characters long", {
//         status: 400,
//       });

//     // Check if the name is the same as the current name, if so return 400 Bad Request
//     if (name === user.name)
//       return new Response("Name is the same as the current name", {
//         status: 400,
//       });

//     // Check if the image exists, if not return 400 Bad Request
//     if (!image) return new Response("No image provided", { status: 400 });

//     // Check if the image is a string, if not return 400 Bad Request
//     if (typeof image !== "string")
//       return new Response("Image must be a string", { status: 400 });

//     // Check if the oldPassword exists, if not return 400 Bad Request
//     if (!oldPassword)
//       return new Response("No old password provided", { status: 400 });

//     // Check if the newPassword exists, if not return 400 Bad Request
//     if (!newPassword)
//       return new Response("No new password provided", { status: 400 });

//     // Verify the old password
//     const isPasswordMatch = await bcrypt.compare(oldPassword, user.password);
//     if (!isPasswordMatch)
//       return new Response("Old password is incorrect", { status: 400 });

//     // Hash the new password
//     const hashedPassword = await bcrypt.hash(newPassword, 12);

//     // Update the user with the new name, image, and password
//     const updatedUser = await prisma.user.update({
//       where: { id: String(id) },
//       data: { name, image, password: hashedPassword },
//     });

//     // Return the updated user
//     return NextResponse.json(updatedUser);
//   }
// }

// export { users as GET, users as POST };