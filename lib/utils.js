import { clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import { PrismaClient } from "@prisma/client";

export function cn(...inputs) {
  return twMerge(clsx(inputs))
}

export function prisma() {
  let prisma = new PrismaClient();
  return prisma;
}