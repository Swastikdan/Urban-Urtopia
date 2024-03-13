import ImageSlider from './ImageSlider';
import Link from 'next/link';
import { Star } from 'lucide-react';
export default function PlacesCard({ place }) {
  const { id, photos, state, city, title, price } = place;
  return (
    <Link href={`/place/${id}`} key={id}>
      <div className="relative">
        <ImageSlider images={photos} customButton={id} />

        <div className="tex-sm flex flex-col px-2">
          <div className="flex items-center justify-between ">
            <span className="text-base font-semibold">
              {state}, {city}
            </span>
            <div className="flex items-center space-x-1 ">
              <Star width={15} height={15} fill="black" className="" />
              <span className="text-sm">
                {Math.floor((Math.random() * 2.9 + 2) * 100) / 100}
              </span>
            </div>
          </div>
          <span className="  text-[15px] font-light text-gray-500">
            {title.substring(0, 40)}
          </span>
          <span className="py-0.5 text-[15px] font-light text-gray-500">
            10-12 Mar
          </span>

          <span className=" text-[15px] font-medium">
            <span className="font-sans">₹</span> {price}{' '}
            <span className="font-light"> night</span>
          </span>
        </div>
      </div>
    </Link>
  );
}
