import PlacesCard from './placecard/PlacesCard';
import CatagorySlider from './placecard/catagory/CatagorySlider';

const apiurl = process.env.APP_URL;

export default async function Places() {
  const places = await fetch(`${apiurl}/api/places`).then((res) => res.json());

  return (
    <>
      <div className="w-full py-5">
        <CatagorySlider />
      </div>

      <div>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {places.map((place) => (
            <PlacesCard key={place.id} place={place} />
          ))}
        </div>
      </div>
    </>
  );
}
