import React from 'react'
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { getServerSession } from 'next-auth';
import {
  Activity,
  ArrowUpRight,
  CircleUser,
  CreditCard,
  DollarSign,
  Menu,
  Package2,
  Search,
  Users,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import BreadCrumb from '@/components/dashboard/Breadcrumb';
export default async  function layout({children}) {
      const session = await getServerSession();
  if (!session) {
   
      redirect('/login');
   
  }
  return (
    <div className="flex min-h-screen  w-full flex-col ">
      <header className="sticky top-0 mx-auto flex h-16 w-full items-center justify-between gap-4 border-b bg-background px-4 py-10 md:px-6 z-20">
        <h1 className="text-start text-4xl font-bold sm:text-center md:text-5xl xl:text-6xl ">
          Dashboard
        </h1>

        <nav className="hidden flex-col justify-end gap-6 text-base font-medium md:flex md:flex-row md:items-center md:gap-5 lg:gap-6">
          <Link
            href="/dashboard/bookings"
            className="text-muted-foreground transition-colors hover:text-foreground"
          >
            Bookings
          </Link>
          <Link
            href="/dashboard/favorites"
            className="text-muted-foreground transition-colors hover:text-foreground"
          >
            Favorites
          </Link>
          <Link
            href="/dashboard/listings"
            className="text-muted-foreground transition-colors hover:text-foreground"
          >
            Listings
          </Link>
          <Link
            href="/dashboard/customers"
            className="text-muted-foreground transition-colors hover:text-foreground"
          >
            Customers
          </Link>
        </nav>

        <Sheet>
          <SheetTrigger asChild>
            <Button
              variant="outline"
              size="icon"
              className="shrink-0 md:hidden"
            >
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle navigation menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="right">
            <nav className="grid gap-6 text-xl font-medium pt-10">
              <Link
                href="/dashboard/bookings"
                className="text-muted-foreground hover:text-foreground"
              >
                Bookings
              </Link>
              <Link
                href="/dashboard/favorites"
                className="text-muted-foreground hover:text-foreground"
              >
                Favorites
              </Link>
              <Link
                href="/dashboard/listings"
                className="text-muted-foreground hover:text-foreground"
              >
                Listings
              </Link>
              <Link
                href="/dashboard/customers"
                className="text-muted-foreground hover:text-foreground"
              >
                Customers
              </Link>
            </nav>
          </SheetContent>
        </Sheet>
      </header>
      <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
        <BreadCrumb />
        {children}
      </main>
    </div>
  );
}
