import React from 'react'
import Markdown from 'react-markdown';

export default function page() {
    const markdown = `Discover a slice of paradise, Nestled in the embrace of majestic mountains, our villa is a haven of luxury and natural beauty. Immerse yourself in the serenity of a private pool, soak in breathtaking mountain views from the gazebo, and gather around the bonfire for magical evenings. It's not just accommodation; it's an unforgettable experience where every detail has been crafted to ensure your stay is exceptional. Embrace the allure of nature and luxury, making your stay a memory to treasure.
### **The space**
Welcome to Teakwood Villa, where luxury and nature intertwine to offer you an unforgettable retreat. Nestled amidst breathtaking mountain landscapes, our villa promises a serene escape from the everyday hustle and bustle. Immerse yourself in the lap of opulence as you step into the world of Teakwood Villa.

Indulge in the ultimate relaxation as you take a dip in our exquisite swimming pool, enveloped by lush greenery and the stunning backdrop of majestic mountains. Each moment spent here is a rejuvenating experience, letting you unwind and recharge in style.

Discover the art of unwinding in our elegantly designed gazebo, where you can immerse yourself in the tranquil sounds of nature while taking in panoramic mountain views. As the sun sets, gather around a warm bonfire with friends and family, creating cherished memories under the starlit sky.

Teakwood Villa offers three lavish bedrooms, each accompanied by three luxurious bathrooms, ensuring ample space and comfort for all guests. Additionally, experience the epitome of convenience with a remote-controlled sunshade enhancing the living room, providing an ideal setting to enjoy the breathtaking surroundings.

Teakwood Villa isn't just a destination; it's an experience that combines luxurious living with the untouched beauty of nature. Join us soon to bask in the lap of luxury, where every detail has been meticulously crafted to ensure your stay is nothing short of extraordinary.`;
  return <Markdown>{markdown}</Markdown>;
}
