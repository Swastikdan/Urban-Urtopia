"use client";
import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Navigation, Pagination } from 'swiper/modules';
import { ChevronLeft, ChevronRight, Heart } from 'lucide-react';

export default function ImageSlider({ customButton, images }) {
  const likeselected = Math.random() < 0.5;
  return (
    <div className=" group relative m-1 flex h-full min-h-80 items-center justify-center overflow-hidden rounded-xl bg-gray-200 dark:bg-gray-600">
      <button
        className={`prevButton${customButton} absolute  left-5 -z-10 -mr-10 cursor-pointer rounded-full bg-white py-[6px] pl-[5px] pr-[6px] text-black  opacity-0 shadow-xl transition-all duration-200 hover:scale-105 hover:transition-all disabled:opacity-0 group-hover:z-10 md:opacity-100`}
      >
        <ChevronLeft width={20} height={20} />
        <span className="sr-only">Previous</span>
      </button>
      <Swiper
        cssMode={true}
        direction={'horizontal'}
        pagination={{
          el: '.swiper-pagination',
          dynamicBullets: true,
          clickable: true,
        }}
        slidesPerView={1}
        navigation={{
          nextEl: `.nextButton${customButton}`,
          prevEl: `.prevButton${customButton}`,
        }}
        modules={[Navigation, Pagination]}
        className="mySwiper"
      >
        {images.map((img, index) => (
          <SwiperSlide key={index} className="overflow-hidden">
            <img
              src={img.replace('/upload/', '/upload/w_500/')}
              alt="property image"
              className="h-80 w-full object-cover"
            />
          </SwiperSlide>
        ))}
        <div className="swiper-pagination px-3 py-1 "></div>
      </Swiper>

      <button
        className={`nextButton${customButton} absolute right-5 -z-10 -ml-10 cursor-pointer rounded-full bg-white p-[6px] text-black opacity-0 shadow-xl transition-all duration-200 hover:scale-105 hover:transition-all disabled:opacity-0 group-hover:z-10 md:opacity-100`}
      >
        <ChevronRight width={20} height={20} />
        <span className="sr-only">Next</span>
      </button>
      <button className="absolute right-2 top-2 z-10 rounded-full p-2">
        <Heart
          width={30}
          height={30}
          className="text-white md:h-7 md:w-7 "
          fill={likeselected ? 'rgb(255,56,92)' : 'rgb(0 0 0 / 0.6)'}
          focusable="true"
          strokeWidth={1}
        />
        {/* <button
          className="absolute right-2 top-2 z-10 rounded-full p-2"
          onClick={onClick}
        >
          <Heart
            width={30}
            height={30}
            className="text-white md:h-7 md:w-7 "
            fill={likeselected ? 'rgb(255,56,92)' : 'rgb(0 0 0 / 0.6)'}
            focusable="true"
            strokeWidth={1}
          />
        </button> */}
      </button>
    </div>
  );
}
