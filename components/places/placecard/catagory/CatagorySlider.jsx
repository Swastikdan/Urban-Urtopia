'use client';
import React, { useRef, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { FreeMode, Mousewheel, Navigation } from 'swiper/modules';
import categories from '@/components/places/config/categories';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
export default function page() {
  const router = useRouter();
  const [cat, setCat] = useState('');
  const prevButtonRef = useRef(null);
  const nextButtonRef = useRef(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const category = params.get('category');
    if (category) {
      setCat(category);
    } else {
      setCat('');
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
      setLoading(false);
    }, 0);
    return () => clearTimeout(timer);
  }, []);
  return (
    <div className="relative flex items-center ">
      {loading ? (
        <div className="w-full rounded-xl   mx-4 ">
          <div className="  h-[50px] pb-3 mb-1 w-full bg-gray-200 animate-pulse rounded-xl  "></div>
        </div>
      ) : (
        <>
          <button
            ref={prevButtonRef}
            className="prevButton absolute left-3 z-10 mb-3  hidden cursor-pointer rounded-full bg-white p-1.5 shadow-xl ring-[1.5px] ring-gray-500 transition-transform duration-200 hover:scale-105 hover:transition-all disabled:opacity-0 md:flex"
          >
            <ChevronLeft strokeWidth={3} width={19} height={19} />
            <span className="sr-only">Previous</span>
          </button>
          <Swiper
            direction={'horizontal'}
            slidesPerView={5}
            mousewheel={true}
            slidesPerGroup={5}
            freeMode={true}
            navigation={{ nextEl: '.nextButton', prevEl: '.prevButton' }}
            breakpoints={{
              400: { slidesPerView: 6 },
              640: { slidesPerView: 9 },
              768: { slidesPerView: 8 },
              1024: { slidesPerView: 10 },
              1120: { slidesPerView: 10 },
              1280: { slidesPerView: 13.5 },
              1536: { slidesPerView: 14.5 },
              1920: { slidesPerView: 15.5 },
              2560: { slidesPerView: 19.5 },
            }}
            modules={[FreeMode, Mousewheel, Navigation]}
            className="mySwiper z-0 w-full -mb-0"
          >
            {categories.map((category, index) => (
              <SwiperSlide>
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
          <button
            ref={nextButtonRef}
            className="nextButton absolute right-3 z-10 mb-3   hidden cursor-pointer rounded-full bg-white p-1.5 shadow-xl ring-[1.5px] ring-gray-500 transition-transform duration-200 hover:scale-105 hover:transition-all disabled:opacity-0 md:flex  "
          >
            <ChevronRight strokeWidth={3} width={19} height={19} />
            <span className="sr-only">Next</span>
          </button>
        </>
      )}
    </div>
  );
}
