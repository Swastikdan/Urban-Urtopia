"use client";
import React, {useState, useEffect} from 'react'

export default function page() {

  const [files, setFiles] = useState([])

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
   </div>
   </>
  )
}
