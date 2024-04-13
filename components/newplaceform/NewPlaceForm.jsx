'use client';
import React, { useEffect, useState } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import { z } from 'zod';
import { redirect } from 'next/navigation';
import { Star, Trash2, Expand } from 'lucide-react';
import categories from '../places/config/categories';
import {
  amenities,
  standout_amenities,
  safety_amenities,
} from '../places/config/amanities';
import houseRules from '../places/config/houserules';
export default function NewPlaceForm() {
  
  const [loading, setLoading] = useState(false);
  // const [photos, setPhotos] = useState([]);
  const [files, setFiles] = useState([]);
  const [photoLink, setPhotoLink] = useState('');
  const [addedPhotos, setAddedPhotos] = useState([]);
  const [starredPhoto, setStarredPhoto] = useState(null);
  const [isuploading, setIsUploading] = useState(false);
  const [formdata, setFormData] = useState({
    title: '',
    description: '',
    address: '',
    state: '',
    city: '',
    street: '',
    photos: [],
    category: [],
    amenities: {
      necessary: [],
      standout: [],
      safety: [],
    },
    maxGuests: null,
    price: null,
    petsAllowed: null,
    listTillDate: '',
    houseRoules: [],
  });

  // validation for form
  // const schema = z.object({
  //   title: z.string().nonempty(),
  //   description: z.string().nonempty(),
  //   address: z.string().nonempty(),
  //   state: z.string().nonempty(),
  //   city: z.string().nonempty(),
  //   street: z.string().nonempty(),
  //   photos: z.array(z.string()).nonempty().length(5),
  //   category: z.array(z.string()),
  //   amenities: z.object({
  //     necessary: z.array(z.string()),
  //     standout: z.array(z.string()),
  //     safety: z.array(z.string()),
  //   }),
  //   maxGuests: z.number(),
  //   price: z.number(),
  //   petsAllowed: z.boolean(),
  // });

  const isValidPlaceData = () => {
  const fields = [
    { value: formdata.title, name: 'Title', min: 10, max: 100 },
    { value: formdata.description, name: 'Description', min: 200, max: 2000, isWordCount: true },
    { value: formdata.address, name: 'Address' },
    { value: formdata.state, name: 'State' },
    { value: formdata.city, name: 'City' },
    { value: formdata.street, name: 'Street' },
    { value: formdata.category, name: 'Category' },
    { value: formdata.amenities.necessary, name: 'Necessary amenities' },
    { value: formdata.amenities.standout, name: 'Standout amenities' },
    { value: formdata.amenities.safety, name: 'Safety amenities' },
    { value: formdata.photos, name: 'Photos', min: 5 },
    { value: formdata.maxGuests, name: 'Max guests' },
    { value: formdata.price, name: 'Price' },
    { value: formdata.houseRoules, name: 'House rules' },
  ];

  for (let field of fields) {
    if (!field.value || !field.value.trim()) {
      toast.error(`${field.name} can't be empty!`);
      return false;
    }

    const length = field.isWordCount ? field.value.split(/\s+/).length : field.value.length;

    if (field.min && length < field.min) {
      toast.error(`${field.name} can't be less than ${field.min} ${field.isWordCount ? 'words' : 'characters'}`);
      return false;
    }

    if (field.max && length > field.max) {
      toast.error(`${field.name} can't be more than ${field.max} ${field.isWordCount ? 'words' : 'characters'}`);
      return false;
    }
  }

  return true;
};

  // handle change in form data

  // const handleFileChange = async (e) => {
  //   const files = Array.from(e.target.files);
  //   const validFiles = [];

  //   for (let file of files) {
  //     const isImageValid = await new Promise((resolve) => {
  //       const img = new Image();
  //       img.onload = () => resolve(img.width >= 600 && img.height >= 400);
  //       img.onerror = () => resolve(false);
  //       img.src = URL.createObjectURL(file);
  //     });

  //      // Add this line

  //     if (isImageValid) {
  //       validFiles.push(file);
  //     }else
  //     {
  //       toast.error('Please upload images with minimum resolution of 600x400');
  //     }
  //   }
  //   setFiles(validFiles);
  //   if (validFiles.length > 0) {
  //     addPhotoFromLocal(validFiles);
  //   }
  // };
  const addPhotoByLink = async (e) => {
    e.preventDefault();
    setIsUploading(true);
    try {
      const res = await fetch('/api/upload/upload-by-link', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ link: photoLink }),
      });
      const filename = await res.json();
      setAddedPhotos((prev) => {
        const newPhotos = [...prev, filename];
        setFormData({ ...formdata, photos: newPhotos });
        return newPhotos;
      });
      setPhotoLink('');
    } catch (error) {
      toast.error('Failed to upload photo');
    } finally {
      setIsUploading(false);
    }
  };

  const handleFileChange = async (e) => {
    setIsUploading(true);
    const files = Array.from(e.target.files);
    const validFiles = [];

    for (let file of files) {
      const isImageValid = await new Promise((resolve) => {
        const img = new Image();
        img.onload = () => resolve(img.width >= 600 && img.height >= 400);
        img.onerror = () => resolve(false);
        img.src = URL.createObjectURL(file);
      });

      if (isImageValid) {
        validFiles.push(file);
      } else {
        toast.error('Upload images with minimum resolution of 600x400');
      }
    }

    setFiles(validFiles);
    if (validFiles.length > 0) {
      try {
        await addPhotoFromLocal(validFiles);
      } catch (error) {
        console.error('Error uploading photo:', error);
      }
    }
    setIsUploading(false);
  };

  const addPhotoFromLocal = async (files) => {
    setIsUploading(true);
    try {
      const formData = new FormData();
      files.forEach((file) => {
        formData.append('photos', file);
      });
      const res = await fetch('/api/upload/upload-local-files', {
        method: 'POST',
        body: formData,
      });
      const data = await res.json();
      setAddedPhotos((prev) => {
        const newPhotos = [...prev, ...data];
        setFormData({ ...formdata, photos: newPhotos });
        return newPhotos;
      });
    } catch (error) {
      toast.error('Failed to upload photo');
    } finally {
      setFiles([]);
      setIsUploading(false);
    }
  };
  const handleStarClick = (photo) => {
    if (addedPhotos.length === 0) {
      setStarredPhoto(photo);
    }
    setAddedPhotos([photo, ...addedPhotos.filter((p) => p !== photo)]);
    setStarredPhoto(photo);
  };
  const handleTrashClick = (photo) => {
    setAddedPhotos(addedPhotos.filter((p) => p !== photo));
    if (photo === starredPhoto) {
      setStarredPhoto(null);
    }
  };
  const handleChange = (key, value) => {
    if (['necessary', 'standout', 'safety'].includes(key)) {
      setFormData((prevState) => ({
        ...prevState,
        amenities: {
          ...prevState.amenities,
          [key]: prevState.amenities[key].includes(value)
            ? prevState.amenities[key].filter((amenity) => amenity !== value)
            : [...prevState.amenities[key], value],
        },
      }));
    } else if (key === 'category') {
      setFormData((prevState) => ({
        ...prevState,
        [key]: prevState[key].includes(value)
          ? prevState[key].filter((category) => category !== value)
          : [...prevState[key], value],
      }));
    } else if (key === 'houseRoules') {
      setFormData((prevState) => ({
        ...prevState,
        houseRoules: prevState.houseRoules.includes(value)
          ? prevState.houseRoules.filter((rule) => rule !== value)
          : [...prevState.houseRoules, value],
      }));
    } else {
      setFormData({ ...formdata, [key]: value });
    }
  };
  // handle submit form

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isValidPlaceData()) {
      return;
    }
    setLoading(true);

    const formData = new FormData();
    for (const key in formdata) {
      if (formdata[key] instanceof Array) {
        formdata[key].forEach((item) => {
          formData.append(`${key}[]`, item);
        });
      } else {
        formData.append(key, formdata[key]);
      }
    }
    addedPhotos.forEach((file, index) => {
      formData.append(`photos[${index}]`, file);
    });

    try {
      const response = await fetch('/api/places', {
        method: 'POST',
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        body: formData,
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || 'Something went wrong!');
      }
      toast.success('Place added successfully!');
      redirect(`/places/${data.id}`);
    } catch (error) {
      toast.error(error.message);
    }
    console.log('formdata', formdata);
    setLoading(false);
  };

  return (
    <div>
      <h1>Add New Place</h1>
      <form onSubmit={handleSubmit}>
        <div className="py-3">
          <Label htmlFor="Title">Title </Label>
          <Input
            label="Title"
            value={formdata.title}
            onChange={(e) => handleChange('title', e.target.value)}
          />
        </div>

        <div className="py-3">
          <Label htmlFor="Description">Description </Label>
          <Input
            label="Description"
            value={formdata.description}
            onChange={(e) => handleChange('description', e.target.value)}
          />
        </div>

        <div className="py-3">
          <Label htmlFor="Adress">Address </Label>
          <Input
            label="Address"
            value={formdata.address}
            onChange={(e) => handleChange('address', e.target.value)}
          />
        </div>
        <div className="py-3">
          <Label htmlFor="State">State </Label>
          <Input
            label="State"
            value={formdata.state}
            onChange={(e) => handleChange('state', e.target.value)}
          />
        </div>

        <div className="py-3">
          <Label htmlFor="City">City </Label>
          <Input
            label="City"
            value={formdata.city}
            onChange={(e) => handleChange('city', e.target.value)}
          />
        </div>

        <div className="py-3">
          <Label htmlFor="Street">Street </Label>
          <Input
            label="Street"
            value={formdata.street}
            onChange={(e) => handleChange('street', e.target.value)}
          />
        </div>

        <div className="py-3">
          <Label htmlFor="Photos"> Photos </Label>

          <div>
            <input
              type="text"
              placeholder="Add photo by link"
              value={photoLink}
              onChange={(e) => setPhotoLink(e.target.value)}
            />

            <button
              type="button"
              onClick={addPhotoByLink}
              className="rounded bg-blue-500 px-4 py-2 text-white"
            >
              Add by link
            </button>

            <div>
              <input
                type="file"
                name="photos"
                id="photos"
                multiple
                onChange={handleFileChange}
              />
            </div>

            <div class="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
              {/* {addedPhotos.map((photo) => (
                <div class="group group relative mb-2 block h-36 w-full overflow-hidden rounded-xl bg-gray-100 lg:mb-3">
                  <img
                    key={photo}
                    src={photo}
                    loading="lazy"
                    alt="Photo by Rachit Tank"
                    class="h-full w-full object-cover object-center"
                  />

                  <span class="absolute left-0 top-0  m-2 cursor-pointer rounded-full bg-gray-100 p-1    "  >
                    <Star size={20} fill="rgb(250, 204, 21)" />
                  </span>
                  <span className="invisible absolute left-[50%] top-[50%] -translate-x-1/2 -translate-y-1/2 transform cursor-pointer rounded-lg bg-gray-100/70 p-2  group-hover:visible  ">
                    <Expand size={20} />
                  </span>
                  <span class="absolute right-0 top-0 m-2 cursor-pointer rounded-full bg-gray-100 p-1 hover:bg-red-100 hover:text-red-500    ">
                    <Trash2 size={20} />
                  </span>
                </div>
              ))} */}
              {addedPhotos.map((photo, index) => (
                <div
                  key={photo}
                  className="group relative mb-2 block h-36 w-full overflow-hidden rounded-xl bg-gray-100 lg:mb-3"
                >
                  <img
                    src={photo}
                    loading="lazy"
                    alt="Photo by Rachit Tank"
                    className="h-full w-full object-cover object-center"
                  />

                  <button
                    className="absolute left-0 top-0 m-2 cursor-pointer rounded-full bg-gray-100 p-1"
                    onClick={() => handleStarClick(photo)}
                    disabled={index === 0}
                  >
                    <Star
                      size={20}
                      fill={
                        index === 0 ? 'rgb(250, 204, 21)' : 'rgb(211, 211, 211)'
                      }
                    />
                  </button>

                  <span className="invisible absolute left-[50%] top-[50%] -translate-x-1/2 -translate-y-1/2 transform cursor-pointer rounded-lg bg-gray-100/70 p-2 group-hover:visible">
                    <Expand size={20} />
                  </span>

                  <button
                    className="absolute right-0 top-0 m-2 cursor-pointer rounded-full bg-gray-100 p-1 hover:bg-red-100 hover:text-red-500"
                    onClick={() => handleTrashClick(photo)}
                  >
                    <Trash2 size={20} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="py-3">
          <Label htmlFor="Category"> Category </Label>
          {/*

            CHeckbox for category with names and values from the categories array


          */}
          <div className="grid grid-cols-4 gap-5 ">
            {categories.map((category) => (
              <div key={category.value}>
                <input
                  type="checkbox"
                  id={category.value}
                  name="category"
                  value={category.value}
                  onChange={(e) => handleChange('category', e.target.value)}
                />
                <label htmlFor={category.value}>{category.name}</label>
              </div>
            ))}
          </div>
        </div>

        <div className="py-3">
          <Label htmlFor="Amanities"> Amanities </Label>

          <div className="grid grid-cols-4 gap-5 ">
            <div>Necessary Amanities </div>
            {amenities.map((amenity) => (
              <div key={amenity.value}>
                <input
                  type="checkbox"
                  id={amenity.value}
                  name="necessary"
                  value={amenity.value}
                  onChange={(e) => handleChange(e.target.name, e.target.value)}
                />
                <label htmlFor={amenity.value}>{amenity.title}</label>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-4 gap-5 ">
            <div>Standout Amanities </div>
            {standout_amenities.map((amenity) => (
              <div key={amenity.value}>
                <input
                  type="checkbox"
                  id={amenity.value}
                  name="standout"
                  value={amenity.value}
                  onChange={(e) => handleChange(e.target.name, e.target.value)}
                />
                <label htmlFor={amenity.value}>{amenity.title}</label>
              </div>
            ))}
          </div>
          <div className="grid grid-cols-4 gap-5 ">
            <div>Safety Amanities </div>
            {safety_amenities.map((amenity) => (
              <div key={amenity.value}>
                <input
                  type="checkbox"
                  id={amenity.value}
                  name="safety"
                  value={amenity.value}
                  onChange={(e) => handleChange(e.target.name, e.target.value)}
                />
                <label htmlFor={amenity.value}>{amenity.title}</label>
              </div>
            ))}
          </div>
        </div>

        <div className="py-3">
          <Label htmlFor="MaxGuests"> Max Guests </Label>
          <Input
            label="Max Guests"
            value={formdata.maxGuests}
            onChange={(e) => handleChange('maxGuests', e.target.value)}
          />
        </div>

        <div className="py-3">
          <Label htmlFor="Price"> Price </Label>
          <Input
            label="Price"
            value={formdata.price}
            onChange={(e) => handleChange('price', e.target.value)}
          />
        </div>

        <div className="py-3">
          <input
            label="Pets Allowed"
            checked={formdata.petsAllowed}
            type="checkbox"
            onChange={(e) => handleChange('petsAllowed', e.target.checked)}
          />
          <Label htmlFor="PetsAllowed"> Pets Allowed </Label>
        </div>

        <div className="py-3">
          <Label htmlFor="HouseRules"> House Rules </Label>
          <div className="grid grid-cols-4 gap-5 ">
            {houseRules.map((rule) => (
              <div key={rule.id}>
                <input
                  type="checkbox"
                  id={rule.value}
                  name="houseRoules"
                  value={rule.value}
                  onChange={(e) => handleChange('houseRoules', e.target.value)}
                />
                <label htmlFor={rule.value}>{rule.title}</label>
              </div>
            ))}
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="my-5 rounded bg-blue-500 px-8 py-2 font-bold text-white hover:bg-blue-700"
        >
          {loading ? 'Loading...' : 'Add Place'}
        </button>
      </form>
    </div>
  );
}
