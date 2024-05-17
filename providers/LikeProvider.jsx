'use client';
import React, { createContext, useEffect, useContext, useState } from 'react';
import { useSession } from 'next-auth/react';
const LikeContext = createContext();
export const LikeProvider = ({ children }) => {
  const { data: session } = useSession();
  const [favoriteLoading, setFavoriteLoading] = useState(false);
  const [favorites, setFavorites] = useState([]);
  useEffect(() => {
    if (session) {
      setFavoriteLoading(true);
      fetch('/api/user/favorites')
        .then((res) => res.json())
        .then((data) => {
          const modifiedData = data.map((item) => {
            return {
                id: item.place.id,
                photos: item.place.photos.slice(0, 1),
                title: item.place.title,
            };
          });
          setFavorites(modifiedData);
          setFavoriteLoading(false);
        });
    }
  }, [session]);

  console.log(favorites);
  return (
    <LikeContext.Provider
      value={{ favorites, favoriteLoading, setFavorites }}
    >
      {children}
    </LikeContext.Provider>
  );
};

export const useLikeContext = () => useContext(LikeContext);