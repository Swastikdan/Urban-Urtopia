'use client';
import { Heart } from 'lucide-react';
import { useLikeContext } from '@/providers/LikeProvider';

export default function LikeButton({ roomId }) {
  const { favorites, toggleLike } = useLikeContext();
  const isFavoritePlace = favorites.some((favorite) => favorite.id === roomId);

  return (
    <div
      className="flex cursor-pointer items-center gap-1.5 text-center"
      onClick={() => toggleLike(roomId)}
    >
      <Heart
        width={20}
        height={20}
        className={`m-2 text-white transition-all duration-200 active:scale-[.8] md:h-7 md:w-7`}
        fill={isFavoritePlace ? 'rgb(255,56,92)' : 'rgb(0 0 0 / 0.6)'}
        focusable="true"
        strokeWidth={1}
      />
      <span className="font-semibold underline">
        {isFavoritePlace ? 'Saved' : 'Save'}
      </span>
    </div>
  );
}
