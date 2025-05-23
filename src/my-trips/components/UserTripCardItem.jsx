import React, { useEffect } from 'react'
import { GetPlaceDetails } from '@/service/GlobalApi';
import { useState } from 'react';
import { PHOTO_REF_URL } from '@/service/GlobalApi';
import { Link } from "react-router-dom";

function UserTripCardItem({trip}) {
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
    <Link to={'/view-trip/'+trip?.id}>
    <div className='hover:scale-105 transition-all'>
        <img src={photoUrl?photoUrl: '/Placeholder.jpg'} className='object-cover rounded-xl h-[300px] w-[300px]'/>
        <div>
            <h2 className='font-bold text-lg'>{trip?.userSelection?.location?.label}</h2>
            <h2 className='text-gray-500 text-sm'>{trip?.userSelection?.noOfDays} Days Trip with {trip?.userSelection?.budget} Fund</h2>
        </div>
    </div>
    </Link>
  )
}

export default UserTripCardItem