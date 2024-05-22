'use client';
import React, { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import PlacePageDesktop from './PlacePageDesktop';
import PlacePageMobile from './PlacePageMobile';
import { useLikeContext } from '@/providers/LikeProvider';

import {
  addDays,
} from 'date-fns';

export default function PlacePage({ place }) {
  const { id, minimumStay, isFavorite } = place;
  const [adults, setAdults] = useState(1);
  const [children, setChildren] = useState(0);
  const [infants, setInfants] = useState(0);
  const [pets, setPets] = useState(0);
  const [bookingdays, setBookingDays] = useState(Number(minimumStay));
  // const [isvaidBookingdates, setIsVaidBookingdates] = useState();
  const [isErrorDates, setIsErrorDates] = useState(false);
  const initialFrom = new Date();
  const initialTo = addDays(new Date(), Number(minimumStay));
  let from = initialFrom;
  let to = initialTo;
  const [date, setDate] = useState({
    from: from,
    to: to,
  });

  const { data: session } = useSession();
  const router = useRouter();

  const { favorites, toggleLike } = useLikeContext();

  const [isFavoritePlace, setIsFavoritePlace] = useState(false);

  /* Like related */
  useEffect(() => {
    if (favorites.some((favorite) => favorite.id === id)) {
      setIsFavoritePlace(true);
    }
  }, [favorites]);

  /* Function to handle favourite place */
  const handleFavoriteClick = () => {
    if (session) {
      setIsFavoritePlace(!isFavoritePlace);
    }
    toggleLike(id);
  };

  return (
    <>
      <div className="flex w-full sm:hidden">
        <PlacePageMobile
          session={session}
          place={place}
          isFavoritePlace={isFavoritePlace}
          onClick={handleFavoriteClick}
          router={router}
          date={date}
          setDate={setDate}
          minimumStay={minimumStay}
          adults={adults}
          setAdults={setAdults}
          infants={infants}
          setInfants={setInfants}
          children={children}
          setChildren={setChildren}
          pets={pets}
          setPets={setPets}
          bookingdays={bookingdays}
          setBookingDays={setBookingDays}
          isErrorDates={isErrorDates}
          setIsErrorDates={setIsErrorDates}
          from={from}
          to={to}
        />
      </div>
      <div className="hidden px-4 sm:flex xl:px-16">
        <PlacePageDesktop
          session={session}
          place={place}
          isFavoritePlace={isFavoritePlace}
          onClick={handleFavoriteClick}
          date={date}
          setDate={setDate}
          minimumStay={minimumStay}
          adults={adults}
          setAdults={setAdults}
          infants={infants}
          setInfants={setInfants}
          children={children}
          setChildren={setChildren}
          pets={pets}
          setPets={setPets}
          bookingdays={bookingdays}
          setBookingDays={setBookingDays}
          isErrorDates={isErrorDates}
          setIsErrorDates={setIsErrorDates}
          from={from}
          to={to}
        />
      </div>
    </>
  );
}
