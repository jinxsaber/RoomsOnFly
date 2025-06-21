"use client";

import axios from "axios"
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";


interface Listing {
  _id: string;
  name: string;
  location: string;
  rating: number;
  reviews: number;
  price_per_night: number;
  details: {
    guests: number;
    bedrooms: number;
    bathrooms: number;
    dedicated_workspace: boolean;
    self_checkin: boolean;
    free_cancellation: boolean;
  };
  host: {
    name: string;
    joined: string;
  };
  description: string;
  images: string[];
}



export default function Grid(){

    const router = useRouter();

    const endpoint = process.env.NEXT_PUBLIC_API + "/listings";

    const [list,setList] = useState<Listing[]>([]);

    
    useEffect(() => {
        const data = async () => {
        try{
            const res = await axios.get(endpoint);
            setList(res.data);
        }
        catch(error){
            console.log("Error : ",error);
            return null;
        }
    }

    data();
    },[])
    
    

    const one = (id : string) => {

       router.push(`/hotels/${id}`)
    }

    console.log(list);
    return (
        <div className="min-h-screen bg-gray-900 text-white px-20 py-10">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {list.map((data,index) => (
                    <div className="bg-gray-800 rounded-lg overflow-hidden shadow-lg" key = {data._id} onClick={() => one(data._id)}>
                    <img src={data.images[Math.floor(Math.random() * 3)]} alt="" className="w-full h-48 object-cover" />
                    <div className="p-4">
                        <h2 className="text-lg font-semibold">{data.name}</h2>
                        <p className="text-sm text-gray-400">${data.price_per_night}</p>
                        <p className="text-sm text-yellow-400">
                        ★ {data.rating} <span className="text-gray-400"></span>
                        </p>
                    </div>
                    </div>
                ))}
            </div>
        </div>
    )
}