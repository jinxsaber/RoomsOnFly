"use client";

import axios from "axios"
import { Heart, Map, Star, LucideIcon } from "lucide-react"
import { useEffect, useState, ReactNode } from "react"


interface ListingData {
    name: string;
    rating: number;
    reviews: number;
    images: string[];
}

interface IconButtonsProps {
    children: ReactNode;
}

interface HeaderProps {
    id: string;
}

interface HeroProps {
    id: string;
}

const Icons: LucideIcon[] = [
    Map,
    Heart,
]

const IconButtons = ({ children }: IconButtonsProps) => {
    return (
        <div className="rounded-full p-2 bg-red hover:bg-red-500 cursor-pointer">
            {children}
        </div>
    )
}

const Header = ({ id }: HeaderProps) => {
    const [data, setData] = useState<ListingData | null>(null);

    const endpoint = process.env.NEXT_PUBLIC_API + `/listings/${id}`;

    useEffect(() => {
        const fetchData = async () => {
            try {
                const val = await axios.get<ListingData>(endpoint);
                setData(val.data);
            }
            catch (error) {
                
            }
        }
        fetchData();
    }, [endpoint])

    return (
        <div className="flex justify-between items-center">
            <div className="flex flex-col gap-4 py-8">
                <div className="font-semibold text-3xl">
                    {data?.name}
                </div>
                <div className="flex gap-4">
                    <div className="rounded-full px-4 text-sm text-center py-1 border">
                        Resort
                    </div>
                    <div className="flex gap-2 items-center">
                        <Star /> {data?.rating}/5 ({data?.reviews} reviews)
                    </div>
                </div>
            </div>
            <div className="flex gap-4">
                {Icons.map((Icon, index) => (
                    <IconButtons key={index}>
                        <Icon size={24} color="white" />
                    </IconButtons>
                ))}
            </div>
        </div>
    )
}

const Hero = ({ id }: HeroProps) => {
    const [data, setData] = useState<ListingData | null>(null);

    const endpoint = process.env.NEXT_PUBLIC_API + `/listings/${id}`;

    useEffect(() => {
        const fetchData = async () => {
            try {
                const val = await axios.get<ListingData>(endpoint);
                setData(val.data);
            }
            catch (error) {
            }
        }
        fetchData();
    }, [endpoint])

    const getRandomImage = () => {
        if (!data?.images || data.images.length === 0) return null;
        return data.images[Math.floor(Math.random() * data.images.length)];
    };

    return (
        <>
            <Header id={id} />
            <div className="flex gap-8 py-12">
                <div className="flex-1 bg-blue-500 rounded-lg overflow-hidden relative">
                    {data?.images && data.images.length > 0 && (
                        <img 
                            src={getRandomImage() || ''} 
                            alt="Resort main image" 
                            className="w-full h-full object-cover" 
                        />
                    )}
                </div>
                <div className="flex flex-col gap-8 ">
                    <div className="w-96 aspect-video rounded-lg bg-green-500 overflow-hidden">
                        {data?.images && data.images.length > 0 && (
                            <img 
                                src={getRandomImage() || ''} 
                                alt="Resort image 1" 
                                className="w-full h-full object-cover" 
                            />
                        )}
                    </div>
                    <div className="w-96 aspect-video rounded-lg bg-green-500 overflow-hidden">
                        {data?.images && data.images.length > 0 && (
                            <img 
                                src={getRandomImage() || ''} 
                                alt="Resort image 2" 
                                className="w-full h-full object-cover" 
                            />
                        )}
                    </div>
                </div>
            </div>
        </>
    )
}

export default Hero;