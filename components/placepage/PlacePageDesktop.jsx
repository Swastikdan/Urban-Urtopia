
import React from 'react';
import ImageGalleryMedium from './ImageGalleryMedium';
export default function PlacePageDesktop({place}) {
   const { title, address, description, photos } = place;


  return (
    <section>
      <div className="max-w-8xl">
        <ImageGalleryMedium images={photos} />
      </div>
    </section>
  );
}
