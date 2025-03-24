import React from "react";
import { Link } from "react-router-dom";
import { useState } from 'react';
import { useEffect } from 'react';
import { GetPlaceDetails } from '@/service/GlobalApi';
import { PHOTO_REF_URL } from '@/service/GlobalApi';

function HotelCardItem({ hotel }) {

    const [photoUrl, setPhotoUrl] = useState();
    useEffect(() => {
        hotel && GetPlacePhoto()
    }, [hotel])

    const GetPlacePhoto = () => {
        const data = {
            textQuery: hotel?.hotelName
        }
        const result = GetPlaceDetails(data).then(resp => {
            console.log(resp.data.places[0].photos[3].name);

            const PhotoURL = PHOTO_REF_URL.replace('{NAME}', resp.data.places[0].photos[3].name);
            setPhotoUrl(PhotoURL);
        })
    }
    return (
        <Link
            to={
                "https://www.google.com/maps/search/?api=1&query=" +
                hotel.hotelName +
                "," +
                hotel?.hotelAddress
            }
            target="_blank"
        >
            <div className="hover:scale-105 transition-all cursor-pointer mt-5">
                <img src={photoUrl?photoUrl:'/Placeholder.jpg'} className="rounded-lg h-[180px] w-full object-cover" />
                <div className="my-3 flex flex-col gap-2">
                    <h2 className="font-medium">{hotel?.hotelName}</h2>
                    <h2 className="text-xs text-gray-500">📍 {hotel?.hotelAddress}</h2>
                    <h2 className="text-sm ">💰 {hotel?.price}</h2>
                    <h2 className="text-sm">⭐ {hotel.rating}</h2>
                </div>
            </div>
        </Link>
    );
}

export default HotelCardItem;
