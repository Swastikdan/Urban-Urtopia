'use client';
import React, { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import PlacePageDesktop from './PlacePageDesktop';
import PlacePageMobile from './PlacePageMobile';
import { useLikeContext } from '@/providers/LikeProvider';
export default function PlacePage({ place }) {
  const { id, isFavorite } = place;
  const { data: session } = useSession();
  const router = useRouter();

    const { favorites, toggleLike } = useLikeContext();

    const [isFavoritePlace, setIsFavoritePlace] = useState(false);

      useEffect(() => {
        if (favorites.some((favorite) => favorite.id === id)) {
          setIsFavoritePlace(true);
        }
      }, [favorites]);

      const handleFavoriteClick = () => {
       if(session){
          setIsFavoritePlace(!isFavoritePlace);
       }
          toggleLike(id);
     
      };

  return (
    <>
      <div className="flex w-full sm:hidden">
        <PlacePageMobile
          place={place}
          isFavoritePlace={isFavoritePlace}
          onClick={handleFavoriteClick}
          router={router}
        />
      </div>
      <div className="hidden px-4  sm:flex xl:px-16">
        <PlacePageDesktop
          session={session}
          place={place}
          isFavoritePlace={isFavoritePlace}
          onClick={handleFavoriteClick}
        />
      </div>
    </>
  );
}
