'use client';
import { useState, useEffect } from 'react';
import { useLikeContext } from '../../providers/LikeProvider';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { ChevronLeft, ChevronRight, Heart } from 'lucide-react';
export default function LikeButton({ placeid, buttontype, ...props }) {
  const { data: session } = useSession();
  const router = useRouter();

  const { favorites , favoriteLoading, setFavoriteLoading } = useLikeContext();
  const [isFavoritePlace, setIsFavoritePlace] = useState(false);

  useEffect(() => {
    if (favorites.some((favorite) => favorite.id === placeid)) {
      setIsFavoritePlace(true);
    }
  }, [favorites]);

  const onClick = () => {
    if (session?.user) {
      setIsFavoritePlace(!isFavoritePlace);

      fetch('/api/user/favorites', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ placeId: placeid }),
      })
        .then((res) => res.json())
        .then((data) => {
          toast.success(data.message);
        })
        .catch((error) => {
          toast.error('An error occurred');
          setIsFavoritePlace(!isFavoritePlace);
        });
    } else {
      router.push('/login');
    }
  };
 if (buttontype === 'small') {
   return (
     <div
       className="cursor-pointer rounded-full bg-white p-1.5 text-center shadow-md transition-all duration-200 active:scale-90"
       onClick={onClick}
     >
       <Heart
         size={25}
         className={`text-white transition-all duration-200 active:scale-[.8] md:h-7 md:w-7 ${favoriteLoading ? 'opacity-20 cursor-none ':'' } `}
         fill={isFavoritePlace ? 'rgb(255,56,92)' : 'rgb(0 0 0 / 0.6)'}
         focusable="true"
         strokeWidth={1}
       />
     </div>
   );
 } else if (buttontype === 'medium') {
   return (
     <div
       className="flex cursor-pointer items-center gap-1.5 text-center"
       onClick={onClick}
     >
       <Heart
         width={20}
         height={20}
         className={`m-2 text-white transition-all duration-200 active:scale-[.8] md:h-7 md:w-7 ${favoriteLoading ? 'cursor-none opacity-20 ' : ''}`}
         fill={isFavoritePlace ? 'rgb(255,56,92)' : 'rgb(0 0 0 / 0.6)'}
         focusable="true"
         strokeWidth={1}
       />
       <span className="font-semibold underline">
         {isFavoritePlace ? 'Saved' : 'Save'}
       </span>
     </div>
   );
 } else {
   return (
     <div
       className={`group absolute right-2 top-2 z-20  cursor-pointer rounded-full disabled:pointer-events-none disabled:cursor-none ${favoriteLoading ? 'cursor-none opacity-20 ' : ''}`}
       onClick={onClick}
     >
       <Heart
         size={25}
         className={`text-white transition-all duration-200 active:scale-[.8] md:h-7 md:w-7`}
         fill={isFavoritePlace ? 'rgb(255,56,92)' : 'rgb(0 0 0 / 0.6)'}
         focusable="true"
         strokeWidth={1}
       />
     </div>
   );
 }
}

// function ButtonWithText(onClick, isFavoritePlace) {
//   return (
//     <div
//       className="flex cursor-pointer items-center gap-1.5 text-center"
//       onClick={onClick}
//     >
//       <Heart
//         width={20}
//         height={20}
//         className={`m-2 text-white transition-all duration-200 active:scale-[.8] md:h-7 md:w-7`}
//         fill={isFavoritePlace ? 'rgb(255,56,92)' : 'rgb(0 0 0 / 0.6)'}
//         focusable="true"
//         strokeWidth={1}
//       />

//       <span className="font-semibold underline">
//         {isFavoritePlace ? 'Saved' : 'Save'}
//       </span>
//     </div>
//   );
// }

// function Button(onClick, isFavoritePlace) {
//   return (
//     <div
//       className="cursor-pointer rounded-full bg-white p-1.5 text-center shadow-md transition-all duration-200 active:scale-90"
//       onClick={onClick}
//     >
//       <Heart
//         size={25}
//         className={`text-white transition-all duration-200 active:scale-[.8] md:h-7 md:w-7`}
//         fill={isFavoritePlace ? 'rgb(255,56,92)' : 'rgb(0 0 0 / 0.6)'}
//         focusable="true"
//         strokeWidth={1}
//       />
//     </div>
//   );
// }