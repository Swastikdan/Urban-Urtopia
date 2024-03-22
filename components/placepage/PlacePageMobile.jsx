'use client';
import * as React from 'react';
import ImageGallerySmall from './ImageGallerySmall';
import { ChevronRight, ChevronLeft } from 'lucide-react';
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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
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
          <span className="text-lg font-semibold">Hosted By Shad</span>
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
              <Button
                className="mt-5 w-full text-base duration-200 active:scale-[99%]"
                variant="outline"
              >
                Show all amenities
              </Button>
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

          <div className="mx-auto my-auto flex w-full items-center justify-center">
            <Calendar
              mode="range"
              defaultMonth={date?.from}
              selected={date}
              onSelect={setDate}
              numberOfMonths={1}
            />
          </div>
          <div>
            <span className="flex items-end px-5 text-sm font-light underline underline-offset-4">
              Clear Dates
            </span>
          </div>

          <button className="mt-10 w-full rounded-xl bg-gradient-to-r from-cyan-500 to-blue-500 py-3 text-lg font-bold shadow-md duration-200 active:scale-[99%] text-white ">
            Reserve
          </button>

          {/* <button className="mt-10 w-full rounded-xl bg-gradient-to-r from-cyan-500 to-blue-500 py-3 text-lg font-bold text-white shadow-md transition  transition-colors duration-300 active:scale-95 active:from-blue-500 active:to-cyan-500">
            Reserve 
          </button>*/}
        </div>
      </div>
    </section>
  );
}
