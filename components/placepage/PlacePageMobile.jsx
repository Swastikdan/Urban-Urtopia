'use client';
import * as React from 'react';
import ImageGallerySmall from './ImageGallerySmall';
import { ChevronRight, ChevronLeft, Plus, Minus } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer';

import { Calendar } from '@/components/ui/calendar';
import { Separator } from '@/components/ui/separator';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

import { ScrollArea } from '@/components/ui/scroll-area';
import { Button } from '../ui/button';

export default function PlacePageMobile({ place }) {
  const { title, address, description, photos } = place;
  const [date, setDate] = React.useState(new Date());
  return (
    <section>
      <div className="w-full max-w-[100vw] overflow-hidden sm:hidden ">
        <ImageGallerySmall
          images={photos}
          title={title}
          text={description?.slice(0, 50)}
        />
      </div>

      <div className="relative px-5  pt-5 sm:hidden  ">
        <h1 className="pb-3 text-[26px] font-semibold">{title}</h1>

        <div className="flex flex-col space-y-1">
          <span className="text-lg font-medium">{address}</span>
          <span className="text-sm font-medium">
            4 guests &#183; 2 bedrooms &#183; 2 beds &#183; 2 bathrooms{' '}
          </span>
        </div>
        <Separator className="mt-3 py-[1px]" />
        <div className="flex items-center space-x-5 py-3">
          <Avatar>
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <span className="text-lg font-medium">Hosted By Shad</span>
        </div>
        <Separator className="py-[1px]" />

        <div className="pt-3">
          <span className="pb-1  text-xl font-semibold">About this Place </span>
          <div>
            {description && description.length > 150
              ? `${description.slice(0, 150)}...`
              : description}
          </div>

          <Drawer>
            <DrawerTrigger>
              {description && description.length > 150 ? (
                <div className="gap-.5 mt-2 flex items-center font-medium underline">
                  Shoe More <ChevronRight strokeWidth={1.25} size={20} />
                </div>
              ) : null}
            </DrawerTrigger>
            <DrawerContent className="h-full max-h-[90vh] px-4">
              <DrawerClose className="flex w-full">
                <div className="-ml-1 items-start ">
                  <ChevronLeft strokeWidth={1.25} size={30} />
                </div>
              </DrawerClose>
              <DrawerTitle className="pt-5 text-start text-2xl font-bold ">
                About this place
              </DrawerTitle>
              <DrawerDescription className="text-wrap pt-5 text-start text-base">
                <ScrollArea className="h-[100vh] w-full  pb-40 ">
                  <div className="pb-40">{description}</div>
                </ScrollArea>
              </DrawerDescription>
            </DrawerContent>
          </Drawer>
        </div>
        <div className="pt-3">
          <span className="pb-1  text-xl font-semibold">
            What this place offers
          </span>
          <div className="flex flex-col gap-2 pt-2 ">
            <span className="text-light flex items-center gap-2 line-through">
              <img src="/pictures/amanities/wifi.svg" alt="" width={20} />
              Wifi
            </span>
            <span className="text-light flex items-center gap-2">
              <img src="/pictures/amanities/kitchen.svg" alt="" width={20} />
              Kitchen
            </span>
            <span className="text-light flex items-center gap-2">
              <img
                src="/pictures/amanities/free-parking-on-premises.svg"
                alt=""
                width={20}
              />
              Free parking on premises
            </span>
            <span className="text-light flex items-center gap-2 line-through">
              <img
                src="/pictures/amanities/paid-parking-on-premises.svg"
                alt=""
                width={20}
              />
              Paid parking on premises
            </span>
            <span className="text-light flex items-center gap-2">
              <img
                src="/pictures/amanities/air-conditioning.svg"
                alt=""
                width={20}
              />
              Air conditioning
            </span>
          </div>
          <Drawer>
            <DrawerTrigger className="w-full">
              <div className="mt-5 w-full rounded-lg border border-input bg-background py-2 text-base duration-200 hover:bg-accent hover:text-accent-foreground active:scale-[99%]">
                Show all amenities
              </div>
            </DrawerTrigger>
            <DrawerContent className="h-full max-h-[90vh] px-4">
              <DrawerClose className="flex w-full">
                <div className="-ml-1 items-start ">
                  <ChevronLeft strokeWidth={1.25} size={30} />
                </div>
              </DrawerClose>
              <DrawerTitle className="pt-5 text-start text-2xl font-bold ">
                What this place offers
              </DrawerTitle>
              <DrawerDescription className="text-wrap pt-5 text-start text-base">
                <ScrollArea className="h-[100vh] w-full  pb-40 ">
                  All amenities here
                </ScrollArea>
              </DrawerDescription>
            </DrawerContent>
          </Drawer>
        </div>

        <div className="pt-3">
          <div className="flex flex-col">
            <span className="pb-1  text-xl font-semibold">
              5 Nights in Millowas
            </span>
            <span className="text-sm text-gray-500 md:text-base">
              1 Jun 2024 - 6 Jun 2024
            </span>
          </div>

          <div className="mx-auto my-auto flex w-full  justify-center pt-3 min-h-[337px] top-full">
            <Calendar
              mode="range"
              defaultMonth={date?.from}
              selected={date}
              onSelect={setDate}
              numberOfMonths={1}
            />
          </div>
          <div className="flex items-center justify-between pt-3">
            <span className="flex items-end px-5  text-sm font-light underline underline-offset-4">
              Clear Dates
            </span>
            <DropdownMenu>
              <DropdownMenuTrigger className="rounded-lg border border-input bg-background px-[10vw] py-1.5 hover:bg-accent hover:text-accent-foreground">
                10 Guests
              </DropdownMenuTrigger>
              <DropdownMenuContent className="mr-5 w-[80vw] space-y-3 p-3 ">
                <div className="w-full">
                  <div className="flex w-full justify-between">
                    <div className="flex flex-col ">
                      <span className="text-lg font-medium">Adults</span>
                      <span className="text-sm font-light">Age 13+</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <button class="rounded-full border border-input bg-background  p-3 hover:bg-accent hover:text-accent-foreground">
                        <Plus size={14} />
                      </button>
                      <span className="text-lg font-light">2</span>
                      <button class="rounded-full border border-input bg-background  p-3 hover:bg-accent hover:text-accent-foreground">
                        <Minus size={14} />
                      </button>
                    </div>
                  </div>
                </div>
                <div className="w-full">
                  <div className="flex w-full justify-between">
                    <div className="flex flex-col ">
                      <span className="text-lg font-medium">Children</span>
                      <span className="text-sm font-light">Ages 2-12</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <button class="rounded-full border border-input bg-background  p-3 hover:bg-accent hover:text-accent-foreground">
                        <Plus size={14} />
                      </button>
                      <span className="text-lg font-light">1</span>
                      <button class="rounded-full border border-input bg-background  p-3 hover:bg-accent hover:text-accent-foreground">
                        <Minus size={14} />
                      </button>
                    </div>
                  </div>
                </div>

                <div className="w-full">
                  <div className="flex w-full justify-between">
                    <div className="flex flex-col ">
                      <span className="text-lg font-medium">Infants</span>
                      <span className="text-sm font-light">Under 2</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <button class="rounded-full border border-input bg-background  p-3 hover:bg-accent hover:text-accent-foreground">
                        <Plus size={14} />
                      </button>
                      <span className="text-lg font-light">2</span>
                      <button class="rounded-full border border-input bg-background  p-3 hover:bg-accent hover:text-accent-foreground">
                        <Minus size={14} />
                      </button>
                    </div>
                  </div>
                </div>
                <div className="w-full">
                  <div className="flex w-full justify-between">
                    <div className="flex flex-col ">
                      <span className="text-lg font-medium">Pets</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <button class="rounded-full border border-input bg-background  p-3 hover:bg-accent hover:text-accent-foreground">
                        <Plus size={14} />
                      </button>
                      <span className="text-lg font-light">2</span>
                      <button class="rounded-full border border-input bg-background  p-3 hover:bg-accent hover:text-accent-foreground">
                        <Minus size={14} />
                      </button>
                    </div>
                  </div>
                </div>
                <div className="text-[10px] font-light">
                  This place has a maximum of 6 guests, not including infants.
                  If you're bringing more than 2 pets, please let your Host
                  know.
                </div>
                <DropdownMenuItem className=" w-fit items-center border border-input px-5 text-center text-base">
                  Close
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          <div className="py-3font-semibold text-3xl ">₹6,726 night</div>
          <div className="flex items-center justify-end space-x-5 pt-2 text-base">
            <span className="underline underline-offset-4">
              ₹6,726 x 5 nights
            </span>
            <span className=" fott-medium">₹33,630</span>
          </div>

          <button className="mt-5 w-full rounded-lg bg-gradient-to-r from-cyan-500 to-blue-500 py-3 text-lg font-bold text-white shadow-md duration-200 active:scale-[99%] ">
            Reserve
          </button>
          <div className="pt-2 text-center text-sm font-light">
            You won't be charged yet
          </div>
          {/* <button className="mt-10 w-full rounded-xl bg-gradient-to-r from-cyan-500 to-blue-500 py-3 text-lg font-bold text-white shadow-md transition  transition-colors duration-300 active:scale-95 active:from-blue-500 active:to-cyan-500">
            Reserve 
          </button>*/}
        </div>
        <Separator className="my-4 py-[1px]" />
        <div className="">
          <span className="pb-1  text-xl font-semibold">
            Cancellation policy
          </span>
          <Drawer>
            <DrawerTrigger className="w-full">
              <div className=" flex items-center justify-between">
                <div className="flex flex-col text-left">
                  <span className="text-[13px]">
                    Free cancellation before 2:00 pm on 24 Mar.
                  </span>
                  <span className="pt-3 text-[13px]">
                    Review the full cancellation policy which applies even if
                    you cancel for illness or disruptions caused by COVID-19.
                  </span>
                </div>
                <ChevronRight strokeWidth={1.25} size={48} />
              </div>
            </DrawerTrigger>
            <DrawerContent className="h-full max-h-[90vh] px-4">
              <DrawerClose className="flex w-full">
                <div className="-ml-1 items-start ">
                  <ChevronLeft strokeWidth={1.25} size={30} />
                </div>
              </DrawerClose>
              <DrawerTitle className="pt-5 text-start text-2xl font-bold ">
                Cancellation policy
              </DrawerTitle>
              <DrawerDescription className="text-wrap pt-5 text-start text-base">
                <ScrollArea className="h-[100vh] w-full  pb-40 ">
                  Cancellation policy here
                </ScrollArea>
              </DrawerDescription>
            </DrawerContent>
          </Drawer>
        </div>
        <Separator className="my-4 py-[1px]" />
        <div className="">
          <span className="pb-1  text-xl font-semibold">House Rules</span>
          <Drawer>
            <div className="flex flex-col space-y-2 text-left text-sm ">
              <span>Check-in: 2:00 pm – 10:00 pm</span>
              <span>Checkout before 11:00 am</span>
              <span>6 guests maximum</span>
            </div>
            <DrawerTrigger className="w-full pt-3 text-left font-semibold underline underline-offset-2">
              Show more
            </DrawerTrigger>
            <DrawerContent className="h-full max-h-[90vh] px-4">
              <DrawerClose className="flex w-full">
                <div className="-ml-1 items-start ">
                  <ChevronLeft strokeWidth={1.25} size={30} />
                </div>
              </DrawerClose>
              <DrawerTitle className="pt-5 text-start text-2xl font-bold ">
                House Rules
              </DrawerTitle>
              <DrawerDescription className="text-wrap pt-5 text-start text-base">
                <ScrollArea className="h-[100vh] w-full  pb-40 ">
                  House Rules here
                </ScrollArea>
              </DrawerDescription>
            </DrawerContent>
          </Drawer>
        </div>
        <Separator className="my-4 py-[1px]" />

        <div className="">
          <span className="pb-1  text-xl font-semibold">House Rules</span>

          <div className="flex flex-col space-y-2 text-left text-sm ">
            <span>No carbon monoxide alarm</span>
            <span>No smoke alarm</span>
            <span>Security camera/recording device</span>
          </div>
        </div>
      </div>
    </section>
  );
}
