"use client"
import React, {useState, useEffect} from 'react'

export default function page() {

  const [file, setFile] = useState(null)

  const onSubmit = async (e) => {
    e.preventDefault()
    const formData = new FormData()
    formData.append('file', file)
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

    <form onSubmit={onSubmit} >



    <input type="file" name="file" id="file" onChange={(e)=>setFile(e.target.files?.[0])}  />

    <input type="submit" value="Upload" />  
    </form>
   </div>
   
   
   </>
  )
}
