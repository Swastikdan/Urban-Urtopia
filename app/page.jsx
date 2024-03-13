import React from 'react'
import getPlaces from './server/places/getPlaces'
import Places from '@/components/places/Places'
export default async function page() {

  
  // const searchplaces = await searchPlaces('65ea138a5555c6ecd9ac9d76' );
  

  return (
  <section>


<Places />

  </section>
  )
}
