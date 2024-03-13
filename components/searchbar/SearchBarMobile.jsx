'use client';
// Demo Url /?location=NewYork&checkin=2023-Jan-01&checkout=2023-01-07&guests=4

import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
  DrawerFooter,
} from '@/components/ui/drawer';
import { Button } from '@/components/ui/button';
import SearchBarTriggerMobile from './SearchBarTriggerMobile';
export default function SearchBarMobile({
}) {
  return (
    <>
      <Drawer>
        <DrawerTrigger className="w-full md:w-auto">
          <SearchBarTriggerMobile
          />
        </DrawerTrigger>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>Are you sure absolutely sure?</DrawerTitle>
            <DrawerDescription className="py-40">
              This action cannot be undone.
            </DrawerDescription>
          </DrawerHeader>
          <DrawerFooter>
            <Button>Submit</Button>
            <DrawerClose>
              <Button variant="outline">Cancel</Button>
            </DrawerClose>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
}
