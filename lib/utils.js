import { clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import { PrismaClient } from "@prisma/client";

export function cn(...inputs) {
  return twMerge(clsx(inputs))
}

export function prisma() {
  const client = globalThis.prisma || new PrismaClient();
  if (process.env.NODE_ENV !== "production") globalThis.prisma = client;
  return client;
}