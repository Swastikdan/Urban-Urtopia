'use client';
import React, { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import PlacePageDesktop from './PlacePageDesktop';
import PlacePageMobile from './PlacePageMobile';
export default function PlacePage({ place }) {
  const { id, isFavorite } = place;
  const { data: session } = useSession();
  const router = useRouter();
  const [isFavoritePlace, setIsFavoritePlace] = useState(false);
  const [favoriteLoading, setFavoriteLoading] = useState(false);
  useEffect(() => {
    if (isFavorite === true) {
      setIsFavoritePlace(true);
    }
  }, [isFavorite]);

  const handleFavoriteClick = () => {
    if (session?.user) {
      setFavoriteLoading(true);
      setIsFavoritePlace(!isFavoritePlace);

      fetch('/api/user/favorites', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ placeId: id }),
      })
        .then((res) => res.json())
        .then((data) => {
          setFavoriteLoading(false);
          toast.success(data.message);
        })
        .catch((error) => {
          setFavoriteLoading(false);
          toast.error('An error occurred');
          setIsFavoritePlace(isFavoritePlace);
        });
    } else {
      router.push('/login');
    }
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
          place={place}
          isFavoritePlace={isFavoritePlace}
          onClick={handleFavoriteClick}
        />
      </div>
    </>
  );
}
