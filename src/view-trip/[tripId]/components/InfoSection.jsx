import React, { useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { IoIosSend } from "react-icons/io";
import { GetPlaceDetails } from '@/service/GlobalApi';
import { useState } from 'react';
import { PHOTO_REF_URL } from '@/service/GlobalApi';

// const PHOTO_REF_URL = `https://places.googleapis.com/v1/${NAME}/media?key=${import.meta.env.VITE_GOOGLE_PLACE_API_KEY}`

function InfoSection({trip}) {

  const [photoUrl, setPhotoUrl]= useState();
  useEffect(()=>{
    trip && GetPlacePhoto()
  },[trip])

  const GetPlacePhoto = () => {
    const data={
      textQuery : trip?.userSelection?.location?.label
    }
    const result = GetPlaceDetails(data).then(resp=>{
      console.log(resp.data.places[0].photos[3].name);

      const PhotoURL = PHOTO_REF_URL.replace('{NAME}',resp.data.places[0].photos[3].name);
      setPhotoUrl(PhotoURL);
    })
  }
  return (
    <div>
        <img src={photoUrl?photoUrl:'/Placeholder.jpg'} className='h-[450px] w-full object-cover rounded-xl'/>

        <div className='flex justify-between items-center'>
        <div className='my-5 flex flex-col gap-2'>
            <h2 className='font-bold text-2xl '>{trip?.userSelection?.location?.label}</h2>
            <div className='flex gap-5'>
                <h2 className='p-1 px-3 bg-gray-200 rounded-full text-gray-500 text-xs md:text-md'>📅 {trip?.userSelection?.noOfDays} Days</h2>
                <h2 className='p-1 px-3 bg-gray-200 rounded-full text-gray-500 text-xs md:text-md'>💰 {trip?.userSelection?.budget} Budget</h2>
                <h2 className='p-1 px-3 bg-gray-200 rounded-full text-gray-500 text-xs md:text-md'>🥂 No of Traveler : {trip?.userSelection?.people}</h2>
            </div>
        </div>
        <Button><IoIosSend /></Button>
        </div>
    </div>
  )
}

export default InfoSection