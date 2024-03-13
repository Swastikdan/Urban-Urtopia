import React from 'react'
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
export default function AllPhotos() {
  return (
    <Drawer>
      <DrawerTrigger>
        {description.length > 150 ? (
          <button className="gap-.5 mt-2 flex items-center font-medium underline">
            Shoe More <ChevronRight strokeWidth={1.25} size={20} />
          </button>
        ) : null}
      </DrawerTrigger>
      <DrawerContent className="px-2">
        <DrawerHeader>
          <DrawerClose className="flex w-full">
            <button className="-ml-1 items-start ">
              <ChevronLeft strokeWidth={1.25} size={30} />
            </button>
          </DrawerClose>
          <DrawerTitle className="pt-5 text-start text-3xl font-bold ">
            About this place
          </DrawerTitle>
          <DrawerDescription className="pt-5 text-start text-base">
            {description}
          </DrawerDescription>
        </DrawerHeader>
        <DrawerFooter>
          <button>Submit</button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
