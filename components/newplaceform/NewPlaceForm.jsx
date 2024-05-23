'use client';

import React, { useState, useEffect, use } from 'react';
import { Input } from '../Input';
import { Textarea } from '../Textarea';
import { toast } from 'sonner';
import { useSession } from 'next-auth/react';
import Indian_states_cities_list from 'indian-states-cities-list';
import {
  Star,
  Trash2,
  Expand,
  Link,
  PawPrint,
  Check,
  ChevronsUpDown,
} from 'lucide-react';
import PlaceImageUpload from './PlaceImageUpload';
import Amenity from './Amenity';
import categories from '../places/config/categories';
import {
  amenities,
  standout_amenities,
  safety_amenities,
} from '../places/config/amanities';
import houseRules from '../places/config/houserules';
import { usePathname } from 'next/navigation';
import { useParams , useRouter } from 'next/navigation';
import SelectScroll from './SelectScroll';
export default function NewPlaceForm() {
  const [loading, setLoading] = useState(false);
  const [prevoiusLoading, setPreviousLoading] = useState(false);
  const [files, setFiles] = useState([]);
  const [photoLink, setPhotoLink] = useState('');
  const [addedPhotos, setAddedPhotos] = useState([]);
  const [starredPhoto, setStarredPhoto] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [photosUploading, setPhotosUploading] = useState(0);
  const [wordCount, setWordCount] = useState(0);
  const [showCustomOptions, setShowCustomOptions] = useState(false);
  // const [selectedState, setSelectedState] = useState('');
  const { data: session } = useSession();

  const ownerId = session?.user?.id;
  const router = useRouter();
  const [formdata, setFormData] = useState({
    title: '',
    description: '',
    address: '',
    state: '',
    city: '',
    street: '',
    photos: [],
    category: [],
    necessary_amenities: [],
    standout_amenities: [],
    safety_amenities: [],
    price: null,
    listTillDate: null,
    maxGuests: null,
    petsAllowed: false,
    checkInTime: null,
    checkOutTime: null,
    minimumStay:'1',
    smokingNotAllowed: false,
    partiesNotAllowed: false,
    photographyNotAllowed: false,
    SelfcheckIn: false,

    additionalRules: '',
    numberOfRooms: null,
  });
  // console.log(formdata);
  const states = Indian_states_cities_list.STATES_OBJECT;

  const handleStateChnage = (value) => {
    setFormData({ ...formdata, state: value });
  };

  // const cities = Indian_states_cities_list.STATE_WISE_CITIES[formdata.state] || [];

const [cities, setCities] = useState([]);
// console.log((formdata.state).replace(' ', ''));
  useEffect(() => {
    if (formdata.state) {
      setCities(
        Indian_states_cities_list.STATE_WISE_CITIES[
          formdata.state.replace(' ', '')
        ],
      );
    }
  }, [formdata.state]);

console.log(formdata)


  const handleCitiesChnage = (value) => {
    setFormData({ ...formdata, city: value });
  };
  // console.log('states', states)
  // console.log('cities',cities);

  const pathname = usePathname();

  if (pathname !== '/places/add-place') {
    const { id } = useParams();
    
    async function fetchPlace() { 
     setPreviousLoading(true)
      const res = await fetch(`/api/places/search?id=${id}`);
      const place = await res.json();
      setFormData((prevState) => ({
        ...prevState,
        ...place,
      }));
      setPreviousLoading(false)
    }

    useEffect(() => {
      fetchPlace();
        
    }, []);
  }

  
  const isValidPlace = () => {
    const fields = [
      { value: formdata.title, name: 'Title', min: 10, max: 100 },
      {
        value: formdata.description,
        name: 'Description',
        min: 100,
        max: 2500,
        isWordCount: true,
      },
      { value: formdata.address, name: 'Address' },
      { value: formdata.state, name: 'State' },
      { value: formdata.city, name: 'City' },
      { value: formdata.street, name: 'Street', optional: true },
      { value: formdata.category, name: 'Category' },
      {
        value: formdata.necessary_amenities,
        name: 'Necessary amenities',
        optional: true,
      },
      {
        value: formdata.standout_amenities,
        name: 'Standout amenities',
        optional: true,
      },
      {
        value: formdata.safety_amenities,
        name: 'Safety amenities',
        optional: true,
      },
      { value: formdata.photos, name: 'Photos', min: 1 },
      { value: formdata.maxGuests, name: 'Max guests' },
      { value: formdata.price, name: 'Price' },
      { value: formdata.listTillDate, name: 'List Till Date', optional: true },
      { value: formdata.petsAllowed, name: 'Pets Allowed', optional: true },
      { value: formdata.checkInTime, name: 'Check In Time', optional: true },
      { value: formdata.checkOutTime, name: 'Check Out Time', optional: true },
      {
        value: formdata.smokingNotAllowed,
        name: 'Smoking Not Allowed',
        optional: true,
      },
      {
        value: formdata.partiesNotAllowed,
        name: 'Parties Not Allowed',
        optional: true,
      },
      {
        value: formdata.photographyNotAllowed,
        name: 'Photography Not Allowed',
        optional: true,
      },
      { value: formdata.SelfcheckIn, name: 'Self Check In', optional: true },
      {
        value: formdata.additionalRules,
        name: 'Additional Rules',
        optional: true,
      },
      { value: formdata.numberOfRooms, name: 'Number Of Rooms' },
      { value: formdata.minimumStay, name: 'Minimum Stay'}
    ];

    for (let field of fields) {
      if (
        !field.optional &&
        (field.value === undefined ||
          field.value === null ||
          (typeof field.value === 'string' && !field.value.trim()))
      ) {
        toast.error(`${field.name} can't be empty!`);
        return false;
      }

      const length = field.isWordCount
        ? field.value.split(/\s+/).length
        : typeof field.value === 'string'
          ? field.value.length
          : undefined;

      if (field.min && length < field.min) {
        toast.error(
          `${field.name} can't be less than ${field.min} ${field.isWordCount ? 'words' : 'characters'}`,
        );
        return false;
      }

      if (field.max && length > field.max) {
        toast.error(
          `${field.name} can't be more than ${field.max} ${field.isWordCount ? 'words' : 'characters'}`,
        );
        return false;
      }
    }

    if (
      formdata.checkInTime &&
      formdata.checkOutTime &&
      formdata.checkInTime >= formdata.checkOutTime
    ) {
      toast.error('Check In Time must be less than Check Out Time');
      return false;
    }

    if (formdata.listTillDate && formdata.listTillDate < new Date()) {
      toast.error('List Till Date must be a future date');
      return false;
    }
    if (formdata.minimumStay < 1) {
      toast.error('Minimum Stay must be atleast 1 day');
      return false;
    }
    if (formdata.minimumStay > 30) {
      toast.error('Minimum Stay must be less than 30 days');
      return false;
    }


    return true;
  };

  const handleChange = (key, value) => {
    if (
      [
        'necessary_amenities',
        'standout_amenities',
        'safety_amenities',
      ].includes(key)
    ) {
      setFormData((prevState) => ({
        ...prevState,
        [key]: prevState[key].includes(value)
          ? prevState[key].filter((amenity) => amenity !== value)
          : [...prevState[key], value],
      }));
    } else if (key === 'category') {
      setFormData((prevState) => ({
        ...prevState,
        [key]: prevState[key].includes(value)
          ? prevState[key].filter((category) => category !== value)
          : [...prevState[key], value],
      }));
    } else {
      setFormData({ ...formdata, [key]: value });
    }
   if (typeof value === 'string') {
  const wordCount = (value.match(/\b\w+\b/g) || []).length;
  setWordCount(wordCount);
}
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isValidPlace()) {
      return;
    }
    setLoading(true);
    // Add ownerId to formdata
    formdata.ownerId = ownerId;

    // prepare the data to send to the server and send a post request to /api/places/create

    if (pathname !== '/places/add-place') {
      const id = formdata.id;
      const res = await fetch(`/api/places/edit/${id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formdata),
      });
      if (!res.ok) {
        toast.error('Failed to update place');
        setLoading(false);
        return;
      } else {
        toast.success('Place updated successfully');
        setLoading(false);
      }
    } else {
      const res = await fetch('/api/places/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formdata),
      });

      if (!res.ok) {
        toast.error('Failed to create place');
        setLoading(false);
        return;
      } else {
        toast.success('Place created successfully');
        router.push(`/places/new/${formdata.id}/`);
        setLoading(false);
      }
    }
  };



  return (
    <>
      {prevoiusLoading ? (
        <div>
          <div className="flex min-h-[90vh] flex-col">
            <div className="flex flex-auto flex-col items-center justify-center p-4 md:p-5">
              <div className="flex justify-center">
                <div
                  className="inline-block size-9 animate-spin rounded-full border-[3px] border-current border-t-transparent text-blue-600 dark:text-blue-500"
                  role="status"
                  aria-label="loading"
                >
                  <span className="sr-only">Loading...</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div>
          <form onSubmit={handleSubmit}>
            <Input
              label="Title"
              name="title"
              value={formdata.title}
              onChange={(e) => handleChange('title', e.target.value)}
              placeholder="Short and Catchy Title for your place"
              type="text"
              className="my-3"
            />
            <div>
              <Textarea
                label="Description"
                name="description"
                value={formdata.description}
                onChange={(e) => handleChange('description', e.target.value)}
                placeholder="Please describe the place in detail"
                rows="15"
                className={`my-3`}
              />
            </div>
            <p className="text-right text-sm text-gray-500 ">
              {wordCount} / 2500 words
            </p>
            <Input
              label="Address"
              name="address"
              value={formdata.address}
              onChange={(e) => handleChange('address', e.target.value)}
              placeholder="Please state the address of this place"
              type="text"
              className="my-3"
            />
            {/* <Input
              label="State"
              name="state"
              value={formdata.state}
              onChange={(e) => handleChange('state', e.target.value)}
              placeholder="Please state the state in which the place is located"
              type="text"
              className="my-3"
            /> */}

            <SelectScroll
              items={states}
              setSelectedData={handleStateChnage}
              label="State"
              placeholder="Select State"
              className="my-3"
              type='states'
            />

            <SelectScroll
              items={cities}
              setSelectedData={handleCitiesChnage}
              label="City"
              placeholder="Select City"
              className="my-3  disabled:cursor-none disabled:opacity-50  "
              disabled={formdata.state === ''}
              type='cities'
            />

            {/* <Input
              label="City"
              name="city"
              value={formdata.city}
              onChange={(e) => handleChange('city', e.target.value)}
              placeholder="Please state the city of this place"
              type="text"
              className="my-3"
            /> */}
            <Input
              label="Street"
              name="street"
              value={formdata.street}
              onChange={(e) => handleChange('street', e.target.value)}
              placeholder="Please state the street of this place"
              type="text"
              className="my-3"
            />
            <PlaceImageUpload
              files={files}
              setFiles={setFiles}
              photoLink={photoLink}
              setPhotoLink={setPhotoLink}
              addedPhotos={addedPhotos}
              setAddedPhotos={setAddedPhotos}
              starredPhoto={starredPhoto}
              setStarredPhoto={setStarredPhoto}
              isUploading={isUploading}
              setIsUploading={setIsUploading}
              photosUploading={photosUploading}
              setPhotosUploading={setPhotosUploading}
              photos={formdata.photos}
              setFormData={setFormData}
              formdata={formdata}
            />
            <div className="py-3">
              <label
                htmlFor="Category"
                className="mb-2 block text-base font-semibold text-gray-900 md:text-lg"
              >
                {' '}
                Category{' '}
              </label>

              <ul class="grid w-full  grid-cols-2 gap-6 md:grid-cols-5 lg:grid-cols-6">
                {categories.map((category) => (
                  <li key={category.value}>
                    <input
                      className="peer hidden"
                      required=""
                      type="checkbox"
                      id={category.value}
                      name="category"
                      value={category.value}
                      checked={formdata.category.includes(category.value)}
                      onChange={(e) => handleChange('category', e.target.value)}
                    />
                    <label
                      htmlFor={category.value}
                      className="inline-flex w-full cursor-pointer items-center justify-between rounded-lg border-2 border-gray-200 bg-white p-2 px-3 text-gray-500 hover:bg-gray-50 hover:text-gray-600 peer-checked:border-blue-600 peer-checked:bg-blue-100 peer-checked:text-gray-600 "
                    >
                      <div className="flex items-center space-x-3 ">
                        <img
                          src={category.icon}
                          alt={category.name}
                          className="h-8 w-8 rounded-md bg-white p-1  "
                        />
                        <div className="w-full text-xs font-semibold text-black md:text-sm ">
                          {category.name}
                        </div>
                      </div>
                    </label>
                  </li>
                ))}
              </ul>
            </div>

            <div className="py-3">
              <label
                htmlFor="Amanities"
                className="my-3 mb-5 block text-lg font-semibold text-gray-900  md:text-xl"
              >
                Amanities
              </label>

              <div>
                <div className="py-3 font-semibold  text-gray-700 ">
                  Necessary Amanities
                </div>
                <ul className="grid w-full grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-4">
                  {amenities.map((amenity) => (
                    <Amenity
                      key={amenity.value}
                      amenity={amenity}
                      formData={formdata}
                      name="necessary_amenities"
                      onChange={(e) =>
                        handleChange('necessary_amenities', e.target.value)
                      }
                    />
                  ))}
                </ul>
              </div>

              <div>
                <div className="py-3 font-semibold  text-gray-700 ">
                  {' '}
                  Standout Amanities
                </div>
                <ul className="grid w-full grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-4">
                  {standout_amenities.map((amenity) => (
                    <Amenity
                      key={amenity.value}
                      amenity={amenity}
                      formData={formdata}
                      name="standout_amenities"
                      onChange={(e) =>
                        handleChange('standout_amenities', e.target.value)
                      }
                    />
                  ))}
                </ul>
              </div>

              <div>
                <div className="py-3 font-semibold  text-gray-700 ">
                  {' '}
                  Safety Amanities
                </div>
                <ul className="grid w-full grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-4">
                  {safety_amenities.map((amenity) => (
                    <Amenity
                      key={amenity.value}
                      amenity={amenity}
                      name="safety_amenities"
                      formData={formdata}
                      onChange={(e) =>
                        handleChange('safety_amenities', e.target.value)
                      }
                    />
                  ))}
                </ul>
              </div>
            </div>
            <div className="flex flex-col items-start justify-between py-3 md:flex-row md:items-center">
              <div className="mb-3 w-full md:mb-0 md:w-1/2 md:pr-2">
                <Input
                  label="Max Guests"
                  name="maxGuests"
                  value={formdata.maxGuests}
                  onChange={(e) => handleChange('maxGuests', e.target.value)}
                  placeholder=""
                  type="number"
                  className="w-full"
                />
              </div>

              <div className="w-full md:w-1/2 md:pl-2">
                <Input
                  label="Price"
                  name="price"
                  value={formdata.price}
                  onChange={(e) => handleChange('price', e.target.value)}
                  placeholder=""
                  type="number"
                  className="w-full"
                />
              </div>
              <div className="w-full md:w-1/2 md:pl-2">
                <Input
                  label="No. of Rooms"
                  name="numberOfRooms"
                  value={formdata.numberOfRooms}
                  onChange={(e) =>
                    handleChange('numberOfRooms', e.target.value)
                  }
                  placeholder=""
                  type="number"
                  className="w-full"
                />
              </div>
            </div>
            <div className="flex items-center space-x-3 py-3">
              <div className="flex items-center space-x-1 text-base font-bold md:text-lg ">
                <PawPrint size={24} className="h-6 w-6" />
                <span>Pets Allowed</span>
              </div>
              <div className="flex  items-start space-x-3 ">
                <label
                  htmlFor="petsAllowedYes"
                  className="inline-flex w-full cursor-pointer items-center justify-between rounded-lg border-2 border-gray-200 bg-white p-2 px-3 text-gray-500 hover:bg-gray-50 hover:text-gray-600 peer-checked:border-blue-600 peer-checked:bg-blue-100 peer-checked:text-gray-600"
                >
                  <input
                    type="radio"
                    id="petsAllowedYes"
                    name="petsAllowed"
                    value={true}
                    checked={formdata.petsAllowed === true}
                    onChange={(e) => handleChange('petsAllowed', true)}
                    className="form-radio mr-2 h-5 w-5 text-blue-500"
                  />
                  Yes
                </label>
                <label
                  htmlFor="petsAllowedNo"
                  className="inline-flex w-full cursor-pointer items-center justify-between rounded-lg border-2 border-gray-200 bg-white p-2 px-3 text-gray-500 hover:bg-gray-50 hover:text-gray-600 peer-checked:border-blue-600 peer-checked:bg-blue-100 peer-checked:text-gray-600"
                >
                  <input
                    type="radio"
                    id="petsAllowedNo"
                    name="petsAllowed"
                    value={false}
                    checked={formdata.petsAllowed === false}
                    onChange={(e) => handleChange('petsAllowed', false)}
                    className="form-radio mr-2 h-5 w-5 text-blue-500"
                  />
                  No
                </label>
              </div>
            </div>

            <div className="py-3">
              <div className="my-3 mb-5 block text-lg font-semibold text-gray-900 md:text-xl">
                Extra House Rules
              </div>
              <div className="py-3 font-semibold  text-gray-700 ">
                {' '}
                During stay
              </div>
              <ul className="grid w-full grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                {houseRules.map((rule) => (
                  <li key={rule.id}>
                    <input
                      className="peer hidden"
                      type="checkbox"
                      id={rule.value}
                      name={rule.name}
                      checked={formdata[rule.name]} // Changed this line
                      onChange={(e) =>
                        handleChange(rule.name, e.target.checked)
                      }
                    />
                    <label
                      htmlFor={rule.value}
                      className="inline-flex w-full cursor-pointer items-center justify-between rounded-lg border-2 border-gray-200 bg-white p-2 px-3 text-gray-500 hover:bg-gray-50 hover:text-gray-600 peer-checked:border-blue-600 peer-checked:bg-blue-100 peer-checked:text-gray-600 "
                    >
                      <div className="flex items-center space-x-3 ">
                        <img
                          src={rule.image}
                          alt={rule.title}
                          className="h-8 w-8 rounded-md bg-white p-1  "
                        />
                        <div className="w-full text-xs font-semibold text-black md:text-sm ">
                          {rule.title}
                        </div>
                      </div>
                    </label>
                  </li>
                ))}
              </ul>
              <div className="py-3 font-semibold  text-gray-700 ">
                {' '}
                Checking in and out
              </div>

              <div>
                <input
                  className="peer hidden"
                  required=""
                  type="checkbox"
                  id="customOptions"
                  name="customOptions"
                  onChange={() => setShowCustomOptions(!showCustomOptions)}
                />
                <label
                  htmlFor="customOptions"
                  className="inline-flex w-auto cursor-pointer items-center justify-between rounded-lg border-2 border-gray-200 bg-white p-2 px-3 text-gray-500 hover:bg-gray-50 hover:text-gray-600 peer-checked:border-blue-600 peer-checked:bg-blue-100 peer-checked:text-gray-600 "
                >
                  <div className="flex items-center space-x-3 ">
                    <div className="w-full text-xs font-semibold text-black md:text-sm ">
                      Add Custom check-in/check-out times
                    </div>
                  </div>
                </label>
                <div className="py-2 text-xs font-light text-gray-600 md:text-sm">
                  * Without custom time, check-in/out is unrestricted.
                </div>
                {showCustomOptions && (
                  <ul className="grid w-full grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                    <li>
                      <label
                        htmlFor="timePicker"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Check-in after
                      </label>
                      <select
                        id="timePicker"
                        name="timePicker"
                        className="mt-1 block w-full rounded-md border border-gray-300 bg-white px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                        value={formdata.checkInTime}
                        onChange={(e) =>
                          handleChange('checkInTime', e.target.value)
                        }
                      >
                        {Array.from({ length: 24 }, (_, i) => i).map((hour) => {
                          const isPM = hour >= 12;
                          const displayHour =
                            hour > 12 ? hour - 12 : hour === 0 ? 12 : hour;
                          const displayPeriod = isPM ? 'pm' : 'am';
                          return (
                            <option
                              key={hour}
                              value={hour}
                              className="py-2"
                            >{`${displayHour}  ${displayPeriod}`}</option>
                          );
                        })}
                      </select>
                    </li>
                    <li>
                      <label
                        htmlFor="timePicker"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Checkout before
                      </label>
                      <select
                        id="timePicker"
                        name="timePicker"
                        className="mt-1 block w-full rounded-md border border-gray-300 bg-white px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                        value={formdata.checkOutTime}
                        onChange={(e) =>
                          handleChange('checkOutTime', e.target.value)
                        }
                      >
                        {Array.from({ length: 24 }, (_, i) => i).map((hour) => {
                          const isPM = hour >= 12;
                          const displayHour =
                            hour > 12 ? hour - 12 : hour === 0 ? 12 : hour;
                          const displayPeriod = isPM ? 'pm' : 'am';
                          return (
                            <option
                              key={hour}
                              value={hour}
                              className="py-2"
                            >{`${displayHour}  ${displayPeriod}`}</option>
                          );
                        })}
                      </select>
                    </li>
                  </ul>
                )}
              </div>
              <div className="flex w-full items-center justify-start space-x-10 py-3">
                <div className=" w-full  max-w-max font-semibold text-gray-700">
                  {' '}
                  Minium Stay (in days)
                </div>
                <Input
                  className="w-full max-w-40"
                  type="number"
                  name="minimumStay"
                  value={formdata.minimumStay}
                  onChange={(e) => handleChange('minimumStay', e.target.value)}
                  placeholder="Enter the minimum stay duration"
                />
              </div>
            </div>
            <div className="py-3">
              <div className="py-3 font-semibold  text-gray-700 ">
                {' '}
                Other Rules
              </div>

              <input
                className="peer hidden"
                required=""
                type="checkbox"
                id="SelfCheckIn"
                value={formdata.SelfcheckIn}
                checked={formdata.SelfcheckIn}
                onChange={(e) => handleChange('SelfcheckIn', e.target.checked)}
              />
              <label
                htmlFor="SelfCheckIn"
                className="inline-flex w-auto cursor-pointer items-center justify-between rounded-lg border-2 border-gray-200 bg-white p-2 px-3 text-gray-500 hover:bg-gray-50 hover:text-gray-600 peer-checked:border-blue-600 peer-checked:bg-blue-100 peer-checked:text-gray-600 "
              >
                <div className="flex items-center space-x-3 ">
                  <img
                    src="/pictures/houserules/door.svg"
                    alt=""
                    className="h-8 w-8 rounded-md bg-white p-1  "
                  />
                  <div className="w-full text-xs font-semibold text-black md:text-sm ">
                    Self check-in
                  </div>
                </div>
              </label>

              <div className="py-3 font-semibold  text-gray-700 ">
                {' '}
                Extra Rules
              </div>

              <Textarea
                className="w-full"
                label="House Rules"
                name="additionalRules"
                value={formdata.additionalRules}
                onChange={(e) =>
                  handleChange('additionalRules', e.target.value)
                }
                rows="5"
                placeholder="Enter your additional house rules here ...  "
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="my-5 rounded bg-blue-500 px-8 py-2 font-bold text-white hover:bg-blue-700"
            >
              {pathname !== '/places/add-place'
                ? loading
                  ? 'Loading...'
                  : 'Update Place'
                : loading
                  ? 'Loading...'
                  : 'Add Place'}
            </button>
          </form>
        </div>
      )}
    </>
  );
}

// 'use client';
// import React, { useEffect, useState } from 'react';
// // import { Input } from '@/components/ui/input';
// // import { Label } from '@/components/ui/label';
// import { useSession } from 'next-auth/react';
// import { Input } from '../Input';
// import { Textarea } from '../Textarea';
// import { toast } from 'sonner';
// import { number, z } from 'zod';
// import { redirect } from 'next/navigation';
// import { Star, Trash2, Expand, Link, PawPrint } from 'lucide-react';
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from '@/components/ui/select';
// import PlaceImageUpload from './PlaceImageUpload';
// import Amenity from './Amenity';
// import categories from '../places/config/categories';
// import {
//   amenities,
//   standout_amenities,
//   safety_amenities,
// } from '../places/config/amanities';
// import houseRules from '../places/config/houserules';
// export default function NewPlaceForm() {
// const [loading, setLoading] = useState(false);
// // const [photos, setPhotos] = useState([]);
// const [files, setFiles] = useState([]);
// const [photoLink, setPhotoLink] = useState('');
// const [addedPhotos, setAddedPhotos] = useState([]);
// const [starredPhoto, setStarredPhoto] = useState(null);
// const [isUploading, setIsUploading] = useState(false);
// const [photosUploading, setPhotosUploading] = useState(0);
// const [wordCount, setWordCount] = useState(0);
// const [showCustomOptions, setShowCustomOptions] = useState(false);
// const { data: session } = useSession();
// const ownerId = session?.user?.id;

// const [formdata, setFormData] = useState({
//   title: '',
//   description: '',
//   address: '',
//   state: '',
//   city: '',
//   street: '',
//   photos: [],
//   category: [],
//   amenities: {
//     necessary: [],
//     standout: [],
//     safety: [],
//   },
//   price: null,
//   listTillDate: '',
//   houseRules: {
//     maxGuests: null,
//     petsAllowed: null,
//     checkInTime: null,
//     checkOutTime: null,
//     smokingNotAllowed: false,
//     partiesNotAllowed: false,
//     photographyNotAllowed: false,
//     SelfcheckIn: false,
//   },
//   additionalRules: '',
//   numberOfRooms: null,
// });

// const isValidPlaceData = () => {
//   const fields = [
//     { value: formdata.title, name: 'Title', min: 10, max: 100 },
//     {
//       value: formdata.description,
//       name: 'Description',
//       min: 100,
//       max: 2500,
//       isWordCount: true,
//     },
//     { value: formdata.address, name: 'Address' },
//     { value: formdata.state, name: 'State' },
//     { value: formdata.city, name: 'City' },
//     { value: formdata.street, name: 'Street' },
//     { value: formdata.category, name: 'Category' },
//     { value: formdata.amenities.necessary, name: 'Necessary amenities' },
//     { value: formdata.amenities.standout, name: 'Standout amenities' },
//     { value: formdata.amenities.safety, name: 'Safety amenities' },
//     { value: formdata.photos, name: 'Photos', min: 5 },
//     { value: formdata.maxGuests, name: 'Max guests' },
//     { value: formdata.price, name: 'Price' },
//     { value: formdata.houseRoules, name: 'House rules' },
//   ];

//   for (let field of fields) {
//     if (!field.value || !field.value.trim()) {
//       toast.error(`${field.name} can't be empty!`);
//       return false;
//     }

//     const length = field.isWordCount
//       ? field.value.split(/\s+/).length
//       : field.value.length;

//     if (field.min && length < field.min) {
//       toast.error(
//         `${field.name} can't be less than ${field.min} ${field.isWordCount ? 'words' : 'characters'}`,
//       );
//       return false;
//     }

//     if (field.max && length > field.max) {
//       toast.error(
//         `${field.name} can't be more than ${field.max} ${field.isWordCount ? 'words' : 'characters'}`,
//       );
//       return false;
//     }
//   }

//   return true;
// };

//   // const addPhotoByLink = async (e) => {
//   //   e.preventDefault();
//   //   setIsUploading(true);

//   //   try {
//   //     // Split the photoLink string into an array of links
//   //     const links = photoLink.split(',').map(link => link.trim());

//   //     const res = await fetch('/api/upload/upload-by-link', {
//   //       method: 'POST',
//   //       headers: {
//   //         'Content-Type': 'application/json',
//   //       },
//   //       body: JSON.stringify({ link: links }), // Send the array of links to the server
//   //     });

//   //     if (!res.ok) throw new Error('Failed to upload photo');

//   //     const filenames = await res.json(); // This should now be an array of URLs

//   //     // Handle the array of URLs
//   //     filenames.forEach(filename => {
//   //       setAddedPhotos((prev) => [...prev, filename]);
//   //       setFormData((prev) => ({ ...prev, photos: [...prev.photos, filename] }));
//   //     });

//   //     setPhotoLink('');
//   //     setPhotosUploading(links.length); // Set the number of photos uploading
//   //   } catch (error) {
//   //     console.error(error);
//   //     toast.error(error.message);
//   //   } finally {
//   //     setIsUploading(false);
//   //   }
//   // };
//   //   const handleFileChange = async (e) => {
//   //     e.preventDefault();
//   //     setIsUploading(true);

//   //     const files = Array.from(
//   //       e.dataTransfer ? e.dataTransfer.files : e.target.files,
//   //     );
//   //     const validFiles = [];

//   //     for (const file of files) {
//   //       const img = new Image();
//   //       img.src = URL.createObjectURL(file);

//   //       await new Promise((resolve) => {
//   //         img.onload = () => {
//   //           const aspectRatio = img.width / img.height;
//   //           if (img.width < 600 || img.height < 400) {
//   //             toast.error('Requried minimum resolution of 600x400');
//   //           } else if (aspectRatio < 4 / 3) {
//   //             toast.error('Requried an aspect ratio of 4:3 or higher');
//   //           } else {
//   //             validFiles.push(file);
//   //           }
//   //           resolve();
//   //         };
//   //       });
//   //     }
//   //     setPhotosUploading(validFiles.length);

//   //     if (validFiles.length > 0) {
//   //       try {
//   //         await addPhotoFromLocal(validFiles);
//   //       } catch (error) {
//   //         console.error('Error uploading photo:', error);
//   //       }
//   //     }

//   //     setIsUploading(false);
//   //   };

//   //   const addPhotoFromLocal = async (files) => {
//   //     try {
//   //       const formData = new FormData();
//   //       files.forEach((file) => formData.append('photos', file));

//   //       const res = await fetch('/api/upload/upload-local-files', {
//   //         method: 'POST',
//   //         body: formData,
//   //       });

//   //       if (!res.ok) throw new Error('Failed to upload photo');

//   //       const data = await res.json();
//   //       setAddedPhotos((prev) => [...prev, ...data]);
//   //       setFormData((prev) => ({ ...prev, photos: [...prev.photos, ...data] }));
//   //     } catch (error) {
//   //       console.error(error);
//   //       toast.error(error.message);
//   //     } finally {
//   //       setIsUploading(false);
//   //     }
//   //   };

//   //   const handleStarClick = (photo) => {
//   //     if (addedPhotos.length === 0) {
//   //       setStarredPhoto(photo);
//   //     }
//   //     setAddedPhotos([photo, ...addedPhotos.filter((p) => p !== photo)]);
//   //     setStarredPhoto(photo);
//   //   };
//   //   const handleTrashClick = (photo) => {
//   //     setAddedPhotos(addedPhotos.filter((p) => p !== photo));
//   //     if (photo === starredPhoto) {
//   //       setStarredPhoto(null);
//   //     }
//   //   };

//   const handleChange = (key, value) => {
//     if (['necessary', 'standout', 'safety'].includes(key)) {
//       setFormData((prevState) => ({
//         ...prevState,
//         amenities: {
//           ...prevState.amenities,
//           [key]: prevState.amenities[key].includes(value)
//             ? prevState.amenities[key].filter((amenity) => amenity !== value)
//             : [...prevState.amenities[key], value],
//         },
//       }));
//     } else if (key === 'category') {
//       setFormData((prevState) => ({
//         ...prevState,
//         [key]: prevState[key].includes(value)
//           ? prevState[key].filter((category) => category !== value)
//           : [...prevState[key], value],
//       }));
//     } else if (
//       [
//         'maxGuests',
//         'petsAllowed',
//         'checkInTime',
//         'checkOutTime',
//         'smokingNotAllowed',
//         'partiesNotAllowed',
//         'photographyNotAllowed',
//         'SelfcheckIn',
//       ].includes(key)
//     ) {
//       setFormData((prevState) => ({
//         ...prevState,
//         houseRules: {
//           ...prevState.houseRules,
//           [key]: value,
//         },
//       }));
//     } else {
//       setFormData({ ...formdata, [key]: value });
//     }
//     if (typeof value === 'string') {
//       const words = value
//         .trim()
//         .split(' ')
//         .filter((word) => word !== '');
//       setWordCount(words.length);
//     }
//   };
//   // handle submit form

//   const handleSubmit = async (e) => {
// e.preventDefault();
// if (!isValidPlaceData()) {
//   return;
// }
// setLoading(true);
// // Add ownerId to formdata
// formdata.ownerId = ownerId;
//     const formData = new FormData();
//     for (const key in formdata) {
//       if (formdata[key] instanceof Array) {
//         formdata[key].forEach((item) => {
//           formData.append(`${key}[]`, item);
//         });
//       } else {
//         formData.append(key, formdata[key]);
//       }
//     }
//     addedPhotos.forEach((file, index) => {
//       formData.append(`photos[${index}]`, file);
//     });

//     try {
//       const response = await fetch('/api/places/create', {
//         method: 'POST',
//         body: formData,
//       });
//       const data = await response.json();
//       if (!response.ok) {
//         throw new Error(data.message || 'Something went wrong!');
//       }
//       toast.success('Place added successfully!');
//       redirect(`/places/${data.id}`);
//     } catch (error) {
//       toast.error(error.message);
//     }
//     console.log('formdata', formdata);
//     setLoading(false);
//   };

//   return (
//     <div>
//       <form onSubmit={handleSubmit}>
//         <Input
//           label="Title"
//           name="title"
//           value={formdata.title}
//           onChange={(e) => handleChange('title', e.target.value)}
//           placeholder="Short and Catchy Title for your place"
//           type="text"
//           className="my-3"
//         />
//         <div>
//           <Textarea
//             label="Description"
//             name="description"
//             value={formdata.description}
//             onChange={(e) => handleChange('description', e.target.value)}
//             placeholder="Please describe the place in detail"
//             rows="15"
//             className={`my-3 ${wordCount > 2500 ? 'text-red-500' : ''}`}
//           />
//         </div>
//         <p className="text-right text-sm text-gray-500 ">
//           {wordCount} / 2500 words
//         </p>
//         <Input
//           label="Address"
//           name="address"
//           value={formdata.address}
//           onChange={(e) => handleChange('address', e.target.value)}
//           placeholder="Please state the address of this place"
//           type="text"
//           className="my-3"
//         />
//         <Input
//           label="State"
//           name="state"
//           value={formdata.state}
//           onChange={(e) => handleChange('state', e.target.value)}
//           placeholder="Please state the state in which the place is located"
//           type="text"
//           className="my-3"
//         />
//         <Input
//           label="City"
//           name="city"
//           value={formdata.city}
//           onChange={(e) => handleChange('city', e.target.value)}
//           placeholder="Please state the city of this place"
//           type="text"
//           className="my-3"
//         />
//         <Input
//           label="Street"
//           name="street"
//           value={formdata.street}
//           onChange={(e) => handleChange('street', e.target.value)}
//           placeholder="Please state the street of this place"
//           type="text"
//           className="my-3"
//         />
//         {/* <div className="py-3">
//           <Label htmlFor="Description">Description </Label>
//           <Input
//             label="Description"
//             value={formdata.description}
//             onChange={(e) => handleChange('description', e.target.value)}
//           />
//         </div>

//         <div className="py-3">
//           <Label htmlFor="Adress">Address </Label>
//           <Input
//             label="Address"
//             value={formdata.address}
//             onChange={(e) => handleChange('address', e.target.value)}
//           />
//         </div>
//         <div className="py-3">
//           <Label htmlFor="State">State </Label>
//           <Input
//             label="State"
//             value={formdata.state}
//             onChange={(e) => handleChange('state', e.target.value)}
//           />
//         </div>

//         <div className="py-3">
//           <Label htmlFor="City">City </Label>
//           <Input
//             label="City"
//             value={formdata.city}
//             onChange={(e) => handleChange('city', e.target.value)}
//           />
//         </div>

//         <div className="py-3">
//           <Label htmlFor="Street">Street </Label>
//           <Input
//             label="Street"
//             value={formdata.street}
//             onChange={(e) => handleChange('street', e.target.value)}
//           />
//         </div> */}
//         {/* <div className="py-3">
//           <span
//             htmlFor="Images of the Property"
//             className="mb-2 block text-base font-semibold text-gray-900 md:text-lg"
//           >
//             Images of the Property
//           </span>
//           <div>

//             <div className="w-full">
//               <div className="mb-4 flex flex-col">
//                 <label
//                   htmlFor="photos"
//                   className="sr-only  text-sm font-medium text-gray-900 dark:text-white"
//                 >
//                   Add photo by link
//                 </label>
//                 <span className=" text-xs font-light md:text-sm">
//                   The more the no. of photos uploaded the better it is{' '}
//                   <span className="font-medium text-blue-600">
//                     (Minimum 5 Images)
//                   </span>{' '}
//                 </span>
//               </div>
//               <div className="relative">
//                 <div className="absolute inset-y-0 start-0 flex cursor-pointer items-center px-3 py-2 pr-5">
//                   <Link width={24} height={24} />
//                 </div>

//                 <input
//                   className="block w-full   rounded-lg border border-gray-300 bg-gray-50 p-3 ps-10 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500  md:p-4 md:ps-10"
//                   placeholder="Add using a link "
//                   value={photoLink}
//                   onChange={(e) => setPhotoLink(e.target.value)}
//                 />
//                 <button
//                   type="button"
//                   className="absolute bottom-2.5 end-2.5 hidden rounded-lg  bg-primary px-4 py-2 text-sm font-medium  text-white hover:opacity-95 focus:outline-none focus:ring-4 md:flex"
//                   onClick={addPhotoByLink}
//                 >
//                   Search
//                 </button>
//               </div>
//               <span className="py-1 text-[10px] font-light text-gray-700 md:text-xs">
//                 To upload multiple images using links, separate them with a
//                 comma ( ' , ' ). For example: https://link1.jpg,https://link2.png
//               </span>
//             </div>
//             <div class="grid grid-cols-1 gap-3  py-5 pt-7 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 ">
//               <div
//                 class="flex w-full items-center justify-center"
//                 onDragOver={(e) => e.preventDefault()}
//                 onDrop={handleFileChange}
//               >
//                 <label
//                   for="photos"
//                   class="dark:hover:bg-bray-800  flex h-40 w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-500 bg-gray-50 hover:bg-gray-100 sm:h-36  "
//                 >
//                   <div class="flex flex-col items-center justify-center pb-6 pt-5">
//                     <svg
//                       class="mb-4 h-8 w-8 text-gray-500 dark:text-gray-400"
//                       aria-hidden="true"
//                       xmlns="http://www.w3.org/2000/svg"
//                       fill="none"
//                       viewBox="0 0 20 16"
//                     >
//                       <path
//                         stroke="currentColor"
//                         stroke-linecap="round"
//                         stroke-linejoin="round"
//                         stroke-width="2"
//                         d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
//                       />
//                     </svg>
//                     <p class="mb-2 text-xs text-gray-500 dark:text-gray-400">
//                       <span class="font-semibold">Click to upload</span> or drag
//                       and drop
//                     </p>
//                     <p class="text-[10px] text-gray-500 dark:text-gray-400">
//                       PNG, JPG (MIN. 600x400px)
//                     </p>
//                   </div>
//                   <input
//                     type="file"
//                     class="hidden"
//                     name="photos"
//                     id="photos"
//                     multiple
//                     onChange={handleFileChange}
//                   />
//                 </label>
//               </div>
//               {addedPhotos.map((photo, index) => (
//                 <div
//                   key={photo}
//                   className="group relative block h-44 w-full overflow-hidden rounded-xl border-dashed border-gray-500 bg-gray-100 sm:h-36 sm:border-2"
//                 >
//                   <img
//                     src={photo}
//                     loading="lazy"
//                     alt="Photo by Rachit Tank"
//                     className="h-full w-full object-cover object-center"
//                   />

//                   <button
//                     className={`absolute left-0 top-0 m-2 cursor-pointer rounded-full bg-gray-100 p-2 sm:p-1.5  sm:hover:opacity-80   ${index === 0 && 'text-yellow-400'}   `}
//                     onClick={() => handleStarClick(photo)}
//                     disabled={index === 0}
//                   >
//                     <Star
//                       size={20}
//                       fill={
//                         index === 0 ? 'rgb(250, 204, 21)' : 'rgb(243, 244, 246)'
//                       }
//                       className="h-6 w-6 sm:h-5 sm:w-5"
//                     />
//                   </button>
//                   <button
//                     className="absolute right-0 top-0 m-2 cursor-pointer rounded-full bg-gray-100 fill-black p-2 hover:bg-red-100 hover:text-red-500 sm:p-1.5"
//                     onClick={() => handleTrashClick(photo)}
//                   >
//                     <Trash2 size={20} className="h-6 w-6 sm:h-5 sm:w-5" />
//                   </button>
//                 </div>
//               ))}

//               {isUploading &&
//                 Array.from({ length: photosUploading }).map((_, index) => (
//                   <div
//                     key={index}
//                     className="group relative block h-44 w-full  animate-pulse overflow-hidden rounded-xl bg-gray-200 sm:h-36  "
//                   ></div>
//                 ))}
//             </div>
//           </div>
//         </div> */}
//         <PlaceImageUpload
//           files={files}
//           setFiles={setFiles}
//           photoLink={photoLink}
//           setPhotoLink={setPhotoLink}
//           addedPhotos={addedPhotos}
//           setAddedPhotos={setAddedPhotos}
//           starredPhoto={starredPhoto}
//           setStarredPhoto={setStarredPhoto}
//           isUploading={isUploading}
//           setIsUploading={setIsUploading}
//           photosUploading={photosUploading}
//           setPhotosUploading={setPhotosUploading}
//           photos={formdata.photos}
//           setFormData={setFormData}
//         />
//         <div className="py-3">
//           <label
//             htmlFor="Category"
//             className="mb-2 block text-base font-semibold text-gray-900 md:text-lg"
//           >
//             {' '}
//             Category{' '}
//           </label>
//           {/*

//             CHeckbox for category with names and values from the categories array

//           */}
//           {/* <div className="grid grid-cols-4 gap-5 ">
//             {categories.map((category) => (
//               <div key={category.value}>
//                 <input
//                   type="checkbox"
//                   id={category.value}
//                   name="category"
//                   value={category.value}
//                   onChange={(e) => handleChange('category', e.target.value)}
//                 />
//                 <label htmlFor={category.value}>{category.name}</label>
//               </div>
//             ))}
//           </div> */}

//           <ul class="grid w-full  grid-cols-2 gap-6 md:grid-cols-5 lg:grid-cols-6">
//             {categories.map((category) => (
//               <li key={category.value}>
//                 <input
//                   className="peer hidden"
//                   required=""
//                   type="checkbox"
//                   id={category.value}
//                   name="category"
//                   value={category.value}
//                   onChange={(e) => handleChange('category', e.target.value)}
//                 />
//                 <label
//                   htmlFor={category.value}
//                   className="inline-flex w-full cursor-pointer items-center justify-between rounded-lg border-2 border-gray-200 bg-white p-2 px-3 text-gray-500 hover:bg-gray-50 hover:text-gray-600 peer-checked:border-blue-600 peer-checked:bg-blue-100 peer-checked:text-gray-600 "
//                 >
//                   <div className="flex items-center space-x-3 ">
//                     <img
//                       src={category.icon}
//                       alt={category.name}
//                       className="h-8 w-8 rounded-md bg-white p-1  "
//                     />
//                     <div className="w-full text-xs font-semibold text-black md:text-sm ">
//                       {category.name}
//                     </div>
//                   </div>
//                 </label>
//               </li>
//             ))}
//           </ul>
//         </div>

//         <div className="py-3">
//           <label
//             htmlFor="Amanities"
//             className="my-3 mb-5 block text-lg font-semibold text-gray-900  md:text-xl"
//           >
//             Amanities
//           </label>

//           <div>
//             <div className="py-3 font-semibold  text-gray-700 ">
//               Necessary Amanities
//             </div>
//             <ul className="grid w-full grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-4">
//               {amenities.map((amenity) => (
//                 <Amenity
//                   key={amenity.value}
//                   amenity={amenity}
//                   name="necessary"
//                   onChange={(e) => handleChange('necessary', e.target.value)}
//                 />
//               ))}
//             </ul>
//           </div>

//           <div>
//             <div className="py-3 font-semibold  text-gray-700 ">
//               {' '}
//               Standout Amanities
//             </div>
//             <ul className="grid w-full grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-4">
//               {standout_amenities.map((amenity) => (
//                 <Amenity
//                   key={amenity.value}
//                   amenity={amenity}
//                   name="standout"
//                   onChange={(e) => handleChange('standout', e.target.value)}
//                 />
//               ))}
//             </ul>
//           </div>

//           <div>
//             <div className="py-3 font-semibold  text-gray-700 ">
//               {' '}
//               Safety Amanities
//             </div>
//             <ul className="grid w-full grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-4">
//               {safety_amenities.map((amenity) => (
//                 <Amenity
//                   key={amenity.value}
//                   amenity={amenity}
//                   name="safety"
//                   onChange={(e) => handleChange('safety', e.target.value)}
//                 />
//               ))}
//             </ul>
//           </div>
//         </div>
//         {/* <div className="py-3">
//           <Label htmlFor="MaxGuests"> Max Guests </Label>
//           <Input
//             label="Max Guests"
//             value={formdata.maxGuests}
//             onChange={(e) => handleChange('maxGuests', e.target.value)}
//           />
//         </div>

//         <div className="py-3">
//           <Label htmlFor="Price"> Price </Label>
//           <Input
//             label="Price"
//             value={formdata.price}
//             onChange={(e) => handleChange('price', e.target.value)}
//           />
//         </div>

//         <div className="py-3">
//           <input
//             label="Pets Allowed"
//             checked={formdata.petsAllowed}
//             type="checkbox"
//             onChange={(e) => handleChange('petsAllowed', e.target.checked)}
//           />
//           <Label htmlFor="PetsAllowed"> Pets Allowed </Label>
//         </div>

//         <div className="py-3">
//           <Label htmlFor="HouseRules"> House Rules </Label>
//           <div className="grid grid-cols-4 gap-5 ">
//             {houseRules.map((rule) => (
//               <div key={rule.id}>
//                 <input
//                   type="checkbox"
//                   id={rule.value}
//                   name="houseRoules"
//                   value={rule.value}
//                   onChange={(e) => handleChange('houseRoules', e.target.value)}
//                 />
//                 <label htmlFor={rule.value}>{rule.title}</label>
//               </div>
//             ))}
//           </div>
//         </div> */}
//         <div className="flex flex-col items-start justify-between py-3 md:flex-row md:items-center">
//           <div className="mb-3 w-full md:mb-0 md:w-1/2 md:pr-2">
//             <Input
//               label="Max Guests"
//               name="maxGuests"
//               value={formdata.houseRules.maxGuests}
//               onChange={(e) => handleChange('maxGuests', e.target.value)}
//               placeholder=""
//               type="number"
//               className="w-full"
//             />
//           </div>

//           <div className="w-full md:w-1/2 md:pl-2">
//             <Input
//               label="Price"
//               name="price"
//               value={formdata.price}
//               onChange={(e) => handleChange('price', e.target.value)}
//               placeholder=""
//               type="number"
//               className="w-full"
//             />
//           </div>
//           <div className="w-full md:w-1/2 md:pl-2">
//             <Input
//               label="No. of Rooms"
//               name="numberOfRooms"
//               value={formdata.numberOfRooms}
//               onChange={(e) => handleChange('numberOfRooms', e.target.value)}
//               placeholder=""
//               type="number"
//               className="w-full"
//             />
//           </div>
//         </div>
//         {/* Check box for pets allaed */}

//         <div className="flex items-center space-x-3 py-3">
//           <div className="flex items-center space-x-1 text-base font-bold md:text-lg ">
//             <PawPrint size={24} className="h-6 w-6" />
//             <span>Pets Allowed</span>
//           </div>
//           <div className="flex  items-start space-x-3 ">
//             <label
//               htmlFor="petsAllowedYes"
//               className="inline-flex w-full cursor-pointer items-center justify-between rounded-lg border-2 border-gray-200 bg-white p-2 px-3 text-gray-500 hover:bg-gray-50 hover:text-gray-600 peer-checked:border-blue-600 peer-checked:bg-blue-100 peer-checked:text-gray-600"
//             >
//               <input
//                 type="radio"
//                 id="petsAllowedYes"
//                 name="petsAllowed"
//                 value={true}
//                 checked={formdata.houseRules.petsAllowed === true}
//                 onChange={(e) => handleChange('petsAllowed', true)}
//                 className="form-radio mr-2 h-5 w-5 text-blue-500"
//               />
//               Yes
//             </label>
//             <label
//               htmlFor="petsAllowedNo"
//               className="inline-flex w-full cursor-pointer items-center justify-between rounded-lg border-2 border-gray-200 bg-white p-2 px-3 text-gray-500 hover:bg-gray-50 hover:text-gray-600 peer-checked:border-blue-600 peer-checked:bg-blue-100 peer-checked:text-gray-600"
//             >
//               <input
//                 type="radio"
//                 id="petsAllowedNo"
//                 name="petsAllowed"
//                 value={false}
//                 checked={formdata.houseRules.petsAllowed === false}
//                 onChange={(e) => handleChange('petsAllowed', false)}
//                 className="form-radio mr-2 h-5 w-5 text-blue-500"
//               />
//               No
//             </label>
//           </div>
//         </div>

//         <div className="py-3">
//           <div className="my-3 mb-5 block text-lg font-semibold text-gray-900 md:text-xl">
//             Extra House Rules
//           </div>
//           <div className="py-3 font-semibold  text-gray-700 "> During stay</div>
//           <ul className="grid w-full grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
//             {houseRules.map((rule) => (
//               <li key={rule.id}>
//                 <input
//                   className="peer hidden"
//                   type="checkbox"
//                   id={rule.value}
//                   name={rule.name}
//                   checked={formdata.houseRules[rule.name]}
//                   onChange={(e) => handleChange(rule.name, e.target.checked)}
//                 />
//                 <label
//                   htmlFor={rule.value}
//                   className="inline-flex w-full cursor-pointer items-center justify-between rounded-lg border-2 border-gray-200 bg-white p-2 px-3 text-gray-500 hover:bg-gray-50 hover:text-gray-600 peer-checked:border-blue-600 peer-checked:bg-blue-100 peer-checked:text-gray-600 "
//                 >
//                   <div className="flex items-center space-x-3 ">
//                     <img
//                       src={rule.image}
//                       alt={rule.title}
//                       className="h-8 w-8 rounded-md bg-white p-1  "
//                     />
//                     <div className="w-full text-xs font-semibold text-black md:text-sm ">
//                       {rule.title}
//                     </div>
//                   </div>
//                 </label>
//               </li>
//             ))}
//           </ul>
//           <div className="py-3 font-semibold  text-gray-700 ">
//             {' '}
//             Checking in and out
//           </div>

//           <div>
//             <input
//               className="peer hidden"
//               required=""
//               type="checkbox"
//               id="customOptions"
//               name="customOptions"
//               onChange={() => setShowCustomOptions(!showCustomOptions)}
//             />
//             <label
//               htmlFor="customOptions"
//               className="inline-flex w-auto cursor-pointer items-center justify-between rounded-lg border-2 border-gray-200 bg-white p-2 px-3 text-gray-500 hover:bg-gray-50 hover:text-gray-600 peer-checked:border-blue-600 peer-checked:bg-blue-100 peer-checked:text-gray-600 "
//             >
//               <div className="flex items-center space-x-3 ">
//                 <div className="w-full text-xs font-semibold text-black md:text-sm ">
//                   Add Custom check-in/check-out times
//                 </div>
//               </div>
//             </label>
//             <div className="py-2 text-xs font-light text-gray-600 md:text-sm">
//               * Without custom time, check-in/out is unrestricted.
//             </div>
//             {showCustomOptions && (
//               <ul className="grid w-full grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
//                 <li>
//                   <label
//                     htmlFor="timePicker"
//                     className="block text-sm font-medium text-gray-700"
//                   >
//                     Check-in after
//                   </label>
//                   <select
//                     id="timePicker"
//                     name="timePicker"
//                     className="mt-1 block w-full rounded-md border border-gray-300 bg-white px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
//                     value={formdata.houseRules.checkInTime}
//                     onChange={(e) =>
//                       handleChange('checkInTime', e.target.value)
//                     }
//                   >
//                     {Array.from({ length: 24 }, (_, i) => i).map((hour) => {
//                       const isPM = hour >= 12;
//                       const displayHour =
//                         hour > 12 ? hour - 12 : hour === 0 ? 12 : hour;
//                       const displayPeriod = isPM ? 'pm' : 'am';
//                       return (
//                         <option
//                           key={hour}
//                           value={hour}
//                           className="py-2"
//                         >{`${displayHour}  ${displayPeriod}`}</option>
//                       );
//                     })}
//                   </select>
//                 </li>
//                 <li>
//                   <label
//                     htmlFor="timePicker"
//                     className="block text-sm font-medium text-gray-700"
//                   >
//                     Checkout before
//                   </label>
//                   <select
//                     id="timePicker"
//                     name="timePicker"
//                     className="mt-1 block w-full rounded-md border border-gray-300 bg-white px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
//                     value={formdata.houseRules.checkOutTime}
//                     onChange={(e) =>
//                       handleChange('checkOutTime', e.target.value)
//                     }
//                   >
//                     {Array.from({ length: 24 }, (_, i) => i).map((hour) => {
//                       const isPM = hour >= 12;
//                       const displayHour =
//                         hour > 12 ? hour - 12 : hour === 0 ? 12 : hour;
//                       const displayPeriod = isPM ? 'pm' : 'am';
//                       return (
//                         <option
//                           key={hour}
//                           value={hour}
//                           className="py-2"
//                         >{`${displayHour}  ${displayPeriod}`}</option>
//                       );
//                     })}
//                   </select>
//                 </li>
//               </ul>
//             )}
//           </div>

//           <div className="py-3 font-semibold  text-gray-700 "> Other Rules</div>

//           <input
//             className="peer hidden"
//             required=""
//             type="checkbox"
//             id="SelfCheckIn"
//             value={formdata.houseRules.SelfcheckIn}
//             onChange={(e) => handleChange('SelfcheckIn', e.target.checked)}
//           />
//           <label
//             htmlFor="SelfCheckIn"
//             className="inline-flex w-auto cursor-pointer items-center justify-between rounded-lg border-2 border-gray-200 bg-white p-2 px-3 text-gray-500 hover:bg-gray-50 hover:text-gray-600 peer-checked:border-blue-600 peer-checked:bg-blue-100 peer-checked:text-gray-600 "
//           >
//             <div className="flex items-center space-x-3 ">
//               <img
//                 src="/pictures/houserules/door.svg"
//                 alt=""
//                 className="h-8 w-8 rounded-md bg-white p-1  "
//               />
//               <div className="w-full text-xs font-semibold text-black md:text-sm ">
//                 Self check-in
//               </div>
//             </div>
//           </label>

//           <div className="py-3 font-semibold  text-gray-700 "> Extra Rules</div>

//           <Textarea
//             className="w-full"
//             label="House Rules"
//             name="additionalRules"
//             value={formdata.additionalRules}
//             onChange={(e) => handleChange('additionalRules', e.target.value)}
//             rows="5"
//             placeholder="Enter your additional house rules here ...  "
//           />
//         </div>

//         <button
//           type="submit"
//           disabled={loading}
//           className="my-5 rounded bg-blue-500 px-8 py-2 font-bold text-white hover:bg-blue-700"
//         >
//           {loading ? 'Loading...' : 'Add Place'}
//         </button>
//       </form>
//     </div>
//   );
// }
