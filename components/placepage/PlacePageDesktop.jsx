'use client';
import * as React from 'react';
import ImageGalleryMedium from './ImageGalleryMedium';
import { Separator } from '@/components/ui/separator';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ChevronRight, ChevronLeft, Plus, Minus } from 'lucide-react';
import { Calendar } from '@/components/ui/calendar';
import { addDays, format } from 'date-fns';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

export default function PlacePageDesktop({ place }) {
  const { title, address, description, photos } = place;
  const [date, setDate] = React.useState({
    from: new Date(2024, 3, 30),
    to: addDays(new Date(2024, 5, 20), 20),
  });

  return (
    <section className="max-w-6xl px-10">
      <h1 className="text-pretty pb-5 pt-1 text-2xl font-bold xl:text-3xl">
        {title}
      </h1>
      <ImageGalleryMedium images={photos} />
      <div className="py-5">
        <div className="flex flex-col space-y-1">
          <span className="text-lg font-medium xl:text-xl">{address}</span>
          <span className="text-sm font-medium">
            4 guests &#183; 2 bedrooms &#183; 2 beds &#183; 2 bathrooms
          </span>
        </div>
      </div>
      <div className="grid grid-cols-5 gap-10 xl:gap-16">
        <div className="col-span-3 w-full ">
          <Separator className="w-full " />
          <div className="flex items-center space-x-5 py-3">
            <Avatar>
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <span className="text-lg font-medium">Hosted By Shad</span>
          </div>
          <Separator className="" />
          <div className="pt-3">
            <span className="pb-1  text-xl font-semibold">
              What this place offers
            </span>
            <div className="grid grid-cols-2 gap-2 pt-2 ">
              <span className="text-light flex items-center gap-2 line-through">
                <img src="/pictures/amanities/wifi.svg" alt="" width={32} />
                Wifi
              </span>
              <span className="text-light flex items-center gap-2">
                <img src="/pictures/amanities/kitchen.svg" alt="" width={32} />
                Kitchen
              </span>
              <span className="text-light flex items-center gap-2">
                <img
                  src="/pictures/amanities/free-parking-on-premises.svg"
                  alt=""
                  width={32}
                />
                Free parking on premises
              </span>
              <span className="text-light flex items-center gap-2 line-through">
                <img
                  src="/pictures/amanities/paid-parking-on-premises.svg"
                  alt=""
                  width={32}
                />
                Paid parking on premises
              </span>
              <span className="text-light flex items-center gap-2">
                <img
                  src="/pictures/amanities/air-conditioning.svg"
                  alt=""
                  width={32}
                />
                Air conditioning
              </span>
              <span className="text-light flex items-center gap-2">
                <img src="/pictures/amanities/kitchen.svg" alt="" width={32} />
                Kitchen
              </span>
              <span className="text-light flex items-center gap-2">
                <img
                  src="/pictures/amanities/free-parking-on-premises.svg"
                  alt=""
                  width={32}
                />
                Free parking on premises
              </span>
              <span className="text-light flex items-center gap-2 line-through">
                <img
                  src="/pictures/amanities/paid-parking-on-premises.svg"
                  alt=""
                  width={32}
                />
                Paid parking on premises
              </span>
            </div>
            {/* <Drawer>
              <DrawerTrigger className="w-full">
                <div className="mt-5 w-max px-5 rounded-lg border border-black bg-background py-2 text-base duration-200 hover:bg-accent hover:text-accent-foreground active:scale-[99%]">
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
            </Drawer> */}
            <Dialog>
              <DialogTrigger className="w-full">
                <div className="mt-5 w-max rounded-lg border border-black bg-background px-5 py-2 text-base duration-200 hover:bg-accent hover:text-accent-foreground active:scale-[99%]">
                  Show all amenities
                </div>
              </DialogTrigger>
              <DialogContent className=" w-fit min-w-[50vw] max-w-[80vw] ">
                <DialogHeader>
                  <DialogTitle> What this place offers</DialogTitle>
                  <DialogDescription className="p-5 ">
                    <div className="flex flex-col gap-2 pt-2 ">
                      <span className="text-light flex items-center gap-2 line-through">
                        <img
                          src="/pictures/amanities/wifi.svg"
                          alt=""
                          width={40}
                        />
                        Wifi
                      </span>
                      <span className="text-light flex items-center gap-2">
                        <img
                          src="/pictures/amanities/kitchen.svg"
                          alt=""
                          width={40}
                        />
                        Kitchen
                      </span>
                      <span className="text-light flex items-center gap-2">
                        <img
                          src="/pictures/amanities/free-parking-on-premises.svg"
                          alt=""
                          width={40}
                        />
                        Free parking on premises
                      </span>
                      <span className="text-light flex items-center gap-2 line-through">
                        <img
                          src="/pictures/amanities/paid-parking-on-premises.svg"
                          alt=""
                          width={40}
                        />
                        Paid parking on premises
                      </span>
                      <span className="text-light flex items-center gap-2">
                        <img
                          src="/pictures/amanities/air-conditioning.svg"
                          alt=""
                          width={40}
                        />
                        Air conditioning
                      </span>
                    </div>
                  </DialogDescription>
                </DialogHeader>
              </DialogContent>
            </Dialog>
          </div>
          <Separator className="my-4 py-[1px]" />
          <div className="">
            <span className="pb-1  text-xl font-semibold">
              About this Place
            </span>
            <div>
              {description && description.length > 300
                ? `${description.slice(0, 300)}...`
                : description}
            </div>
            {/* <Drawer>
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
            </Drawer> */}
            <Dialog>
              <DialogTrigger className="w-full">
                {description && description.length > 300 ? (
                  <div className="gap-.5 mt-2 flex items-center font-medium underline">
                    Shoe More <ChevronRight strokeWidth={1.25} size={20} />
                  </div>
                ) : null}
              </DialogTrigger>
              <DialogContent className=" w-fit min-w-[50vw] max-w-[80vw] ">
                <DialogHeader>
                  <DialogTitle> About this place</DialogTitle>
                  <DialogDescription className="p-5 ">
                    <ScrollArea className="h-[50vh] w-full  ">
                      {description}
                    </ScrollArea>
                  </DialogDescription>
                </DialogHeader>
              </DialogContent>
            </Dialog>
          </div>
        </div>
        <div className="col-span-2  w-full">
          <div className="  rounded-xl border border-gray-200 p-5 shadow-md">
            <div className="py-3 text-xl font-semibold tabular-nums">
              ₹6,726 night
            </div>
            <div className="my-5  rounded-xl border-[2px] border-gray-400">
              <DropdownMenu>
                <DropdownMenuTrigger className="w-full rounded-xl">
                  <div className="flex justify-between">
                    <div className="flex w-full flex-col border-r-2 border-gray-200 p-3 text-left text-sm">
                      <span className="font-bold capitalize">Check-in</span>
                      <span>4/15/2024</span>
                    </div>

                    <Separator
                      orientation="vertical"
                      className="h-[1px]  bg-gray-400"
                    />

                    <div className="flex w-full flex-col p-3 text-left text-sm">
                      <span className="font-bold capitalize">Checkout</span>
                      <span>4/15/2024</span>
                    </div>
                  </div>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="mr-5 w-full space-y-3 p-3 ">
                  <Calendar
                    initialFocus
                    mode="range"
                    defaultMonth={date?.from}
                    selected={date}
                    onSelect={setDate}
                    numberOfMonths={2}
                  />
                </DropdownMenuContent>
              </DropdownMenu>

              <Separator className="h-[1px]  bg-gray-400" />
              <div className="flex justify-between ">
                <DropdownMenu>
                  <DropdownMenuTrigger className="w-full rounded-xl">
                    <div className="flex w-full flex-col  p-3 text-left text-sm">
                      <span className="font-bold capitalize">Guests</span>
                      <span>1 Guest</span>
                    </div>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="mr-5 w-[25vw] space-y-3 p-3 ">
                    <div className="w-full">
                      <div className="flex w-full justify-between">
                        <div className="flex flex-col ">
                          <span className="text-base font-medium">Adults</span>
                          <span className="text-sm font-light">Age 13+</span>
                        </div>
                        <div className="flex items-center space-x-3">
                          <button class="rounded-full border border-input bg-background  p-2 hover:bg-accent hover:text-accent-foreground">
                            <Plus size={14} />
                          </button>
                          <span className="text-base font-light tabular-nums">2</span>
                          <button class="rounded-full border border-input bg-background  p-2 hover:bg-accent hover:text-accent-foreground">
                            <Minus size={14} />
                          </button>
                        </div>
                      </div>
                    </div>
                    <div className="w-full">
                      <div className="flex w-full justify-between">
                        <div className="flex flex-col ">
                          <span className="text-base font-medium">
                            Children
                          </span>
                          <span className="text-sm font-light">Ages 2-12</span>
                        </div>
                        <div className="flex items-center space-x-3">
                          <button class="rounded-full border border-input bg-background  p-2 hover:bg-accent hover:text-accent-foreground">
                            <Plus size={14} />
                          </button>
                          <span className="text-base font-light tabular-nums">1</span>
                          <button class="rounded-full border border-input bg-background  p-2 hover:bg-accent hover:text-accent-foreground">
                            <Minus size={14} />
                          </button>
                        </div>
                      </div>
                    </div>

                    <div className="w-full">
                      <div className="flex w-full justify-between">
                        <div className="flex flex-col ">
                          <span className="text-base font-medium">Infants</span>
                          <span className="text-sm font-light">Under 2</span>
                        </div>
                        <div className="flex items-center space-x-3">
                          <button class="rounded-full border border-input bg-background  p-2 hover:bg-accent hover:text-accent-foreground">
                            <Plus size={14} />
                          </button>
                          <span className="text-base font-light tabular-nums">2</span>
                          <button class="rounded-full border border-input bg-background  p-2 hover:bg-accent hover:text-accent-foreground">
                            <Minus size={14} />
                          </button>
                        </div>
                      </div>
                    </div>
                    <div className="w-full">
                      <div className="flex w-full justify-between">
                        <div className="flex flex-col ">
                          <span className="text-base font-medium">Pets</span>
                        </div>
                        <div className="flex items-center space-x-3">
                          <button class="rounded-full border border-input bg-background  p-2 hover:bg-accent hover:text-accent-foreground">
                            <Plus size={14} />
                          </button>
                          <span className="text-base font-light tabular-nums">2</span>
                          <button class="rounded-full border border-input bg-background  p-2 hover:bg-accent hover:text-accent-foreground">
                            <Minus size={14} />
                          </button>
                        </div>
                      </div>
                    </div>
                    <div className="text-[10px] font-light">
                      This place has a maximum of 6 guests, not including
                      infants. If you're bringing more than 2 pets, please let
                      your Host know.
                    </div>
                    <DropdownMenuItem className=" w-fit cursor-pointer items-center border border-input px-5 text-center text-base">
                      Close
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>

            <button className=" w-full rounded-lg bg-gradient-to-r from-cyan-500 to-blue-500 py-3 text-lg font-bold text-white shadow-md duration-200 active:scale-[99%] ">
              Reserve
            </button>
            <div className="pt-2 text-center text-sm font-light">
              You won't be charged yet
            </div>
            <Separator className="my-3 mb-5 h-[1px] bg-gray-400" />
            <div className="flex items-center justify-between  pt-2 text-base">
              <span className="font-light underline underline-offset-4">
                ₹6,726 x 5 nights
              </span>
              <span className=" font-bold">₹33,630</span>
            </div>
          </div>
        </div>
      </div>
      <Separator className="my-4  h-[1px] bg-gray-400" />

      <div>
        <span className="pb-5  text-2xl font-semibold">Things to know</span>
        <div className="mt-5 flex justify-between  gap-5">
          <div className="">
            <span className="  text-lg font-medium">Cancellation policy</span>

            <Dialog>
              <div className="flex items-center justify-between">
                <div className="flex max-w-md flex-col text-left text-[13px]">
                  <span>Free cancellation for 48 hours.</span>
                  <span className="text-wrap pt-3">
                    Review the full cancellation policy which applies even if
                    you cancel for illness or disruptions caused by COVID-19.
                  </span>
                </div>
              </div>
              <DialogTrigger className="w-full pt-3 text-left text-sm font-semibold underline underline-offset-2">
                Show more
              </DialogTrigger>
              <DialogContent className=" w-fit min-w-[50vw] max-w-[80vw] ">
                <DialogHeader>
                  <DialogTitle> Cancellation policy</DialogTitle>
                  <span className="pb-5 pt-1 text-sm font-light">
                    Before you book, make sure you're comfortable with this
                    Host's cancellation policy. Keep in mind that Airbnb's
                    Extenuating Circumstances policy doesn't cover cancellations
                    due to illness or travel disruptions caused by COVID-19.
                  </span>
                  <DialogDescription className=" ">
                    <ScrollArea className="h-[30vh] w-full  ">
                      Cancellation policy here
                    </ScrollArea>
                  </DialogDescription>
                </DialogHeader>
              </DialogContent>
            </Dialog>
          </div>
          <div className="h-full">
            <span className="text-lg font-medium">House Rules</span>

            <Dialog>
              <div className="flex flex-col space-y-2 text-left text-[13px] ">
                <span>Check-in: 2:00 pm – 10:00 pm</span>
                <span>Checkout before 11:00 am</span>
                <span>6 guests maximum</span>
              </div>
              <DialogTrigger className="w-full pt-3 text-left text-sm font-semibold underline underline-offset-2">
                Show more
              </DialogTrigger>
              <DialogContent className=" w-fit min-w-[50vw] max-w-[80vw] ">
                <DialogHeader>
                  <DialogTitle> House rules</DialogTitle>
                  <span className="pb-5 pt-1 text-sm font-light">
                    You'll be staying in someone's home, so please treat it with
                    care and respect.
                  </span>
                  <DialogDescription className=" ">
                    <ScrollArea className="h-[30vh] w-full  ">
                      Cancellation policy here
                    </ScrollArea>
                  </DialogDescription>
                </DialogHeader>
              </DialogContent>
            </Dialog>
          </div>
          <div className="">
            <span className="  text-lg font-medium">Safety & property</span>
            <Dialog>
              <div className="flex flex-col space-y-2 text-left text-sm ">
                <span>No carbon monoxide alarm</span>
                <span>No smoke alarm</span>
                <span>Security camera/recording device</span>
              </div>
              <DialogTrigger className="w-full pt-3 text-left text-sm font-semibold underline underline-offset-2">
                Show more
              </DialogTrigger>
              <DialogContent className=" w-fit min-w-[50vw] max-w-[80vw] ">
                <DialogHeader>
                  <DialogTitle> Safety & property</DialogTitle>
                  <span className="pb-5 pt-1 text-sm font-light">
                    Avoid surprises by looking over these important details
                    about your Host's property.
                  </span>
                  <DialogDescription className=" ">
                    <ScrollArea className="h-[30vh] w-full text-black  ">
                      <span className="text-base font-semibold">
                        Safety devices
                      </span>
                    </ScrollArea>
                  </DialogDescription>
                </DialogHeader>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </div>
    </section>
  );
}
