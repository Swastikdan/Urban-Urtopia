"use client"
import React, { useState } from 'react'

export default function page() {

  const [files, setFiles] = useState([])
  const [photoLink, setPhotoLink] = useState('')
  const [addedPhotos, setAddedPhotos] = useState([])

  const addPhotoByLink = async (e) => {
    e.preventDefault();
    const res = await fetch("/api/upload/upload-by-link", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ link: photoLink })
    });
    const filename = await res.json();
    setAddedPhotos((prev) => {
      return [...prev, filename];
    });
    setPhotoLink("");
  };

  const onSubmit = async (e) => {
    e.preventDefault()
    const formData = new FormData()
    files.forEach((file, index) => {
      formData.append('photos', file)
    })
    const res = await fetch('/api/upload', {
      method: 'POST',
      body: formData
    })
    const data = await res.json()
    console.log(data)
  }

  return (
    <>
      <div>
        <form onSubmit={onSubmit}>
          <input type="file" name="photos" id="photos" multiple onChange={(e) => setFiles([...e.target.files])} />
          <input type="submit" value="Upload" />
        </form>

        <form onSubmit={addPhotoByLink}>
          <input type="text" name="link" id="link" value={photoLink} onChange={(e) => setPhotoLink(e.target.value)} />
          <input type="submit" value="Upload by link" />
        </form>
      </div>
    </>
  )
}