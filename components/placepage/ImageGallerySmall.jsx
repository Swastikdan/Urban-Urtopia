'use client';
import React, { useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Pagination } from 'swiper/modules';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { toast } from 'sonner';
import { ChevronLeft, Heart, Share } from 'lucide-react';
export default function ImageGallerySmall({ images, title, id, isFavorite }) {
  const router = useRouter();
  const { data: session } = useSession();
  const [isFavoritePlace, setIsFavoritePlace] = useState(false);
  useEffect(() => {
    if (isFavorite === true) {
      setIsFavoritePlace(true);
    }
  }, [isFavorite]);


  const handleFavoriteClick = () => {
    if (session?.user) {
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
          toast.success(data.message);
        })
        .catch((error) => {
          toast.error('An error occurred');
          setIsFavoritePlace(isFavoritePlace);
        });
    } else {
      router.push('/login');
    }
  };
  return (
    <>
      <div className=" relative flex w-full">
        <div className="absolute top-5 z-20 mx-5  flex w-full justify-between">
          <button
            className="rounded-full bg-white  p-1.5 text-center shadow-md transition-all duration-200 active:scale-90"
            onClick={() => {
              router.back();
            }}
          >
            <ChevronLeft size={25} />
          </button>
          <div className="mr-10 flex space-x-3">
            <button
              className="rounded-full bg-white  p-1.5  text-center shadow-md transition-all duration-200 active:scale-90"
              onClick={() => handleFavoriteClick()}
            >
              {/* <Heart size={20} /> */}
              <Heart
                size={25}
                className={` text-white transition-all duration-200  active:scale-[.8] md:h-7 md:w-7`}
                fill={
                  isFavoritePlace === true
                    ? 'rgb(255,56,92)'
                    : 'rgb(0 0 0 / 0.6)'
                }
                focusable="true"
                strokeWidth={1}
              />
            </button>

            <div
              className="rounded-full bg-white p-1.5 text-center shadow-md transition-all duration-200 active:scale-90"
              onClick={() => {
                if (navigator.share) {
                  navigator.share({
                    title: title,
                    url: window.location.href,
                  });
                } else {
                  alert('Web Share API is not supported in your browser');
                }
              }}
            >
              <Share size={25} />
            </div>
          </div>
        </div>
        <Swiper
          pagination={{
            el: '.custom-swiper-pagination',
            type: 'fraction',
          }}
          modules={[Pagination]}
          className="mySwiper "
        >
          {images &&
            images.map((img, index) => (
              <SwiperSlide key={index} className="bg-gray-400">
                <img
                  src={img.replace(
                    '/upload/',
                    '/upload/w_1200,c_fill,g_auto/q_auto/f_auto/',
                  )}
                  alt="property image"
                  className="h-60 w-full object-cover "
                />
              </SwiperSlide>
            ))}
          <div className=" absolute bottom-5 right-5 z-10 w-14 text-white">
            <span className="custom-swiper-pagination  rounded-md bg-black/70 px-2 py-1 text-xs font-medium text-white"></span>
          </div>
        </Swiper>
      </div>
    </>
  );
}

//
