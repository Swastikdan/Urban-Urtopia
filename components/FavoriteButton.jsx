import React, { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { ChevronLeft, ChevronRight, Heart } from 'lucide-react';
import { toast } from 'sonner';
import { useFavorite } from '@/lib/favorite';
export default function FavoriteButton({ isFavorite, id , type}) {
 const { isFavoritePlace, toggleFavorite } = useFavorite();
 const { data: session } = useSession();
 const router = useRouter();

 useEffect(() => {
   if (isFavorite === true) {
     toggleFavorite();
   }
 }, [isFavorite]);

 const handleFavoriteClick = () => {
   if (session?.user) {
     toggleFavorite();

     fetch('/api/user/favorites', {
       method: 'POST',
       headers: {
         'Content-Type': 'application/json',
       },
       body: JSON.stringify({ placeId: id }),
     })
       .then((res) => res.json())
       .then((data) => {
         toast.success(data.message);
       })
       .catch((error) => {
         toast.error('An error occurred');
         toggleFavorite();
       });
   } else {
     router.push('/login');
   }
 };

  if(type === 'gallerymid'){
    return (
      <button
        className="  flex items-center gap-1.5  text-center"
        onClick={() => handleFavoriteClick()}
      >
        <Heart
          width={20}
          height={20}
          className={`m-2  text-white transition-all duration-200  active:scale-[.8] md:h-7 md:w-7`}
          fill={
            isFavoritePlace === true ? 'rgb(255,56,92)' : 'rgb(0 0 0 / 0.6)'
          }
          focusable="true"
          strokeWidth={1}
        />

        <span className=" font-semibold underline ">
          {isFavoritePlace === true ? 'Saved' : 'Save'}
        </span>
      </button>
    );
  } 

  else if(type === 'gallerysmall'){

    return (
      <button
        className="rounded-full bg-white  p-1.5  text-center shadow-md transition-all duration-200 active:scale-90"
        onClick={() => handleFavoriteClick()}
      >
        {/* <Heart size={20} /> */}
        <Heart
          size={25}
          className={` text-white transition-all duration-200  active:scale-[.8] md:h-7 md:w-7`}
          fill={
            isFavoritePlace === true ? 'rgb(255,56,92)' : 'rgb(0 0 0 / 0.6)'
          }
          focusable="true"
          strokeWidth={1}
        />
      </button>
    );


  }

  else if(type === 'home'){
    return (
      <div
        className="group absolute right-2 top-2 z-20 cursor-pointer rounded-full disabled:pointer-events-none disabled:cursor-none "
        onClick={() => handleFavoriteClick()}
      >
        <Heart
          width={35}
          height={35}
          className={`m-2  text-white transition-all duration-200  active:scale-[.8] md:h-7 md:w-7`}
          fill={
            isFavoritePlace === true ? 'rgb(255,56,92)' : 'rgb(0 0 0 / 0.6)'
          }
          focusable="true"
          strokeWidth={1}
        />
      </div>
    );
  }

}
