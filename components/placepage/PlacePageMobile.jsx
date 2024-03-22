import React from 'react';
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

export default function PlacePageMobile({ place }) {
  const { title, address, description, photos } = place;

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
        <div className="pt-3">
          <span className="pb-1  text-xl font-semibold">About this Place </span>
          <div>
            {description && description.length > 150
              ? `${description.slice(0, 150)}...`
              : description}
          </div>
        </div>
        <Drawer>
          <DrawerTrigger>
            {description && description.length > 150 ? (
              <div className="gap-.5 mt-2 flex items-center font-medium underline">
                Shoe More <ChevronRight strokeWidth={1.25} size={20} />
              </div>
            ) : null}
          </DrawerTrigger>
          <DrawerContent className="px-4">
            <DrawerClose className="flex w-full">
              <div className="-ml-1 items-start ">
                <ChevronLeft strokeWidth={1.25} size={30} />
              </div>
            </DrawerClose>
            <DrawerTitle className="pt-5 text-start text-3xl font-bold ">
              About this place
            </DrawerTitle>
            <DrawerDescription className="pt-5 text-start text-base">
              {description}
            </DrawerDescription>
          </DrawerContent>
        </Drawer>

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
        </div>
      </div>
    </section>
  );
}
