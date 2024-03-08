'use client';

import React, { useRef, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation'; // corrected import
import { Swiper, SwiperSlide } from 'swiper/react';
import { FreeMode, Mousewheel, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import Image from 'next/image';
import categories from '../../config/categories';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
export default function CatagorySlider() {
  const [swiper, setSwiper] = useState(null);
  const router = useRouter();
  const [cat, setCat] = useState('');
  const prevButtonRef = useRef(null);
  const nextButtonRef = useRef(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const category = params.get('category');
    if (category) {
      setCat(category);
    } else {
      setCat(''); // Reset category state when no category is selected
    }
  }, [router.asPath]);

  const handleClick = (vlaue) => {
    const fullUrl = new URL(window.location.href);
    fullUrl.searchParams.set('category', vlaue);
    router.replace(`/${fullUrl.search}`);
    setCat(vlaue);
  };
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 0); // Adjust the delay as needed

    return () => clearTimeout(timer);
  }, []);
  return (
    <>
      <div className="flex w-full items-center pl-3 md:w-auto  ">
        {isLoading ? (
          <div></div>
        ) : (
          <button
            ref={prevButtonRef}
            className="prevButton mx-3 mb-3 hidden cursor-pointer rounded-full  p-[4px] shadow-xl ring-[1.5px] ring-gray-500 transition-all duration-200 hover:scale-105 hover:transition-all disabled:opacity-0 md:flex "
          >
            <ChevronLeft width={18} height={18} />
            <span className="sr-only">Previous</span>
          </button>
        )}
        {isLoading ? (
          <div className="mx-[17px] -mt-3 mb-3 h-12 w-full animate-pulse rounded-xl bg-gray-200 "></div>
        ) : (
          <Swiper
            onSwiper={setSwiper}
            direction={'horizontal'}
            slidesPerView={4}
            mousewheel={true}
            slidesPerGroup={3}
            freeMode={true}
            navigation={{ nextEl: '.nextButton', prevEl: '.prevButton' }}
            breakpoints={{
              400: { slidesPerView: 5 },
              640: { slidesPerView: 6 },
              768: { slidesPerView: 7 },
              1120: { slidesPerView: 9 },
              1280: { slidesPerView: 10 },
              1536: { slidesPerView: 13 },
              1920: { slidesPerView: 14 },
              2560: { slidesPerView: 18 },
            }}
            modules={[FreeMode, Mousewheel, Navigation]}
            className="mySwiper"
          >
            {categories.map((category, index) => (
              <SwiperSlide key={index}>
                <div
                  className=" group scale-100 cursor-pointer transition-all duration-200 active:scale-95"
                  onClick={() => handleClick(category.value)}
                >
                  <div
                    className={`flex flex-col items-center space-y-2 ${
                      category.value === cat ? 'opacity-100  ' : 'opacity-70'
                    }`}
                  >
                    <div>
                      {/* <Image
                        
                        placeholder="blur"
                        blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mN8+vz1WwAJFgOmu+DJrAAAAABJRU5ErkJggg=="
                        src={category.icon}
                        alt={category.name}
                        width={24}
                        height={24}
                        quality={100}
                        onload={(e) => {
                          e.target.onerror = null; // To prevent infinite loop in case fallback image also fails
                          e.target.src = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mN8+vz1WwAJFgOmu+DJrAAAAABJRU5ErkJggg=='; // Replace with your fallback image
                        }}
                      /> */}
                      <Avatar className="h-5 w-5 rounded-none">
                        <AvatarImage
                          src={category.icon}
                          alt={category.name}
                          width={20}
                          height={20}
                        />
                        <AvatarFallback className="rounded-sm">
                          <img
                            src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mN8+vz1WwAJFgOmu+DJrAAAAABJRU5ErkJggg=="
                            alt=""
                            srcset=""
                          />
                        </AvatarFallback>
                      </Avatar>
                    </div>
                    <span
                      className={`pb-3 text-[10px]  text-gray-700 group-hover:border-b-2 group-hover:border-black/40   sm:text-xs ${
                        category.value === cat
                          ? 'border-b-2 border-black pb-3 font-bold'
                          : 'border-b-2 border-white/0 font-medium'
                      }`}
                    >
                      {category.name}
                    </span>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        )}
        {isLoading ? (
          <div></div>
        ) : (
          <button
            ref={nextButtonRef}
            className="nextButton mb-3 ml-3 hidden cursor-pointer rounded-full  p-[4px] shadow-xl ring-[1.5px] ring-gray-500 transition-all duration-200 hover:scale-105 hover:transition-all disabled:opacity-0 md:flex  "
          >
            <ChevronRight width={18} height={18} />
            <span className="sr-only">Next</span>
          </button>
        )}
      </div>
    </>
  );
}
