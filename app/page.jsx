"use client";
import React, { useCallback } from "react";
import { useSession } from "next-auth/react";

export default function Page() {
  const { data: session } = useSession();

  const userid =  session?.user.id;
  
  const sendData = useCallback(() => {
    let data = {
      title: "some title",
      address: "Manali, Himachal Pradesh, India",
      state: "Himachal Pradesh",
      city: "Manali",
      street: "",
      photos: [
        "https://res.cloudinary.com/dp5tomvwb/image/upload/v1709405242/Airbnb/Places/sk8xwpzqprsspc0d5h7s.jpg",
        "https://res.cloudinary.com/dp5tomvwb/image/upload/v1709405250/Airbnb/Places/ejbtqgvsvqtfhcsrceed.jpg",
        "https://res.cloudinary.com/dp5tomvwb/image/upload/v1709405251/Airbnb/Places/dqzsf9v6klbxmeqzagkj.jpg",
        "https://res.cloudinary.com/dp5tomvwb/image/upload/v1709405252/Airbnb/Places/zjqdj8e3zp2to0otz9xg.jpg",
        "https://res.cloudinary.com/dp5tomvwb/image/upload/v1709405253/Airbnb/Places/u0oraoifctcxwgy1tyzy.jpg",
      ],
      description:
        "Ménage - By The Beas , A colonial style hill cottage near Manali, this delightful vacation home promises the perfect mix of hills with a scenic river side in the privacy of your own space. It offers a great stay on the river bank amidst a small Apple orchard. Tastefully done up interiors, 3 cosy bedrooms, a large living room with fireplace, sun bathing attic with a view of the river and mountains, bon-fire & barbecue by our cook, absolutely perfect for a laid-back friends or family staycation.",
      category: [
        "amazing-views",
        "rooms",
        "tropical",
        "farms",
        "tiny-homes",
        "historical-homes",
        "trending",
        "camping",
        "cabins",
      ],
      maxGuests: 9,
      price: 9000,
      petsAllowed: false,
      extraInfo: "Some extra Info",
      status: "approved",
  
    };

    data.ownerId = userid;
    

    const routeUrl = "http://localhost:3000/api/places/create";

    fetch(routeUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        console.log("Success:", data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, []);

  return (
    <div>
      {session && <h1>Session {session.user.id}</h1>}
      <button onClick={sendData}>Send Data</button>
    </div>
  );
}
