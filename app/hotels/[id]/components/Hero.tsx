"use client";

import axios from "axios"
import { Heart, Map, Star } from "lucide-react"
import { useEffect, useState } from "react"

const Icons = [
    Map,
    Heart,
]

const IconButtons = ({children}) =>{
    return(
        <div className="rounded-full p-2 bg-red hover:bg-red-500 cursor-pointer">
            {children}
        </div>
    )
}

const Header = ({id}) =>{
    const [data,setData] = useState([]);

    const endpoint = process.env.NEXT_PUBLIC_API + `/listings/${id}`;

    useEffect(() => {
        const res = async () =>{
            try{
                const val = await axios.get(endpoint);
                setData(val.data);
                console.log(val.data);
            }
            catch(error){
                console.log(error);
            }
        }
        res();
        console.log(endpoint);
    },[])
    return (
        <div className="flex justify-between items-center">
            <div className="flex flex-col gap-4 py-8">
                <div className="font-semibold text-3xl">
                    {data.name}
                </div>
                <div className="flex gap-4">
                    <div className="rounded-full px-4 text-sm text-center py-1 border">
                        Resort
                    </div>
                    <div className="flex gap-2 items-center">
                        <Star/> {data.rating}/5 ({data.reviews} reviews)
                    </div>
                </div>
            </div>
            <div className="flex gap-4">
                {Icons.map((Icon, index) => (
                    <IconButtons key={index}>
                        <Icon  size={24} color="white" />
                    </IconButtons>
                ))}
            </div>
        </div>
    )
}

const Hero = ({id}) =>{

    const [data,setData] = useState([]);

    const endpoint = process.env.NEXT_PUBLIC_API + `/listings/${id}`;

    useEffect(() => {
        const res = async () =>{
            try{
                const val = await axios.get(endpoint);
                setData(val.data);
                console.log(val.data);
            }
            catch(error){
                console.log(error);
            }
        }
        res();
        console.log(endpoint);
    },[])
    
        return (
        <>
            <Header id = {id}/>
            <div className="flex gap-8 py-12">
                <div className="flex-1 bg-blue-500 rounded-lg overflow-hidden relative">
                    {data?.images?.[Math.floor(Math.random()*2)] && (
                        <img src={data.images[Math.floor(Math.random()*2)]} alt="" className="" />
                    )}
                </div>
                <div className="flex flex-col gap-8 ">
                    <div className="w-96 aspect-video rounded-lg bg-green-500">
                        {data?.images?.[Math.floor(Math.random()*2)] && (
                            <img src={data.images[Math.floor(Math.random()*2)]} alt="" className="" />
                        )}
                    </div>
                    <div className="w-96 aspect-video rounded-lg bg-green-500">
                        {data?.images?.[Math.floor(Math.random()*2)] && (
                            <img src={data.images[Math.floor(Math.random()*2)]} alt="" className="" />
                        )}
                    </div>
                </div>
            </div>
        </>
    )
    }

export default Hero;