"use client";

import { Flag, Users } from "lucide-react";
import { useState, useEffect } from "react";
import axios from "axios";
const Book = () =>{
    return (
        <div className="rounded-lg border shadow p-6 w-96 flex flex-col gap-8">
            <div className="text-2xl font-semibold">
                $200/<span className="text-sm">night</span>
            </div>
            <div className="">
                <span className="font-semibold">3 nights</span> in Starlight World
            </div>
            <div className="">
                hello frkndskjn
            </div>
            <div className="">
                hello frkndskjn
            </div>
            <div className="">
                hello frkndskjn
            </div>
            <div className="">
                hello frkndskjn
            </div>
        </div>
    )
}

const Details = ({id}) =>{

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
        <div className="flex gap-24">
            <div className="flex-1">
                <div className="text-2xl font-semibold pb-4">
                    Entire Hotel Details
                </div>
                <div className="flex gap-8">
                    <div className="flex gap-4">
                        <Users/>  Guests
                    </div>
                    <div className="flex gap-4">
                        <Flag/> 1 bedroom
                    </div>
                    <div className="flex gap-4">
                        <Flag/> 1 Private bath
                    </div>
                </div>
                <div className="pt-4">
                    <div className="text-sm py-4">
                        Hosted by:
                    </div>
                    <div className="flex gap-4 items-center">
                        <div className="rounded-full aspect-square bg-blue-500 h-12"></div>
                        <div className="text-lg">
                            {data.host.name}
                        </div>
                    </div>
                </div>
                <div className="flex py-8 flex-col gap-4">
                    <div className="text-lg font-semibold">
                        Room Description
                    </div>
                    <div className="">
                        {data.about}
                    </div>
                </div>
            </div>
            <Book/>
        </div>
    )
}

export default Details;