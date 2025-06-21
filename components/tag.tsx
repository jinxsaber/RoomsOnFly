const SearchBar = () =>{
    return (
        <div className="w-full max-w-screen-md flex px-6 py-4 bg-white rounded text-black ">
            {/* <div className=" flex-1 border-r-2 border-blue-400">
                <div className="text-sm">
                    Check in 
                    <div className="text-xl font-semibold mt-2">
                        July 13, 2025
                    </div>
                </div>
            </div>
            <div className="flex-1  border-blue-400 px-4 ">
                <div className="text-sm">
                    Check out
                    <div className="text-xl font-semibold mt-2">
                        November 13, 2025
                    </div>
                </div>
            </div>
            <div className="flex-1 ">
                <div className="text-sm">
                    Person
                    <div className="text-xl font-semibold mt-2">
                        2{" "}Person
                    </div>
                </div>
            </div>
            <button className="flex-1 rounded bg-black text-white mx-4 ">
                Book Now
            </button> 
            */}
            <div className="flex-1 border-r-2 border-black">
                <div className="text-sm ">
                    Check in
                    <div className="text-lg font-semibold mt-2">
                        July 13, 2025
                    </div>
                </div>
            </div>
            <div className="flex-1 px-4 min-w-max border-r-2 border-black">
                <div className="text-sm ">
                    Check out
                    <div className="text-lg font-semibold mt-2">
                        November 13, 2025
                    </div>
                </div>
            </div>
            <div className="flex-1 px-8 max-w-fit">
                <div className="text-sm">
                    Person
                    <div className="text-lg font-semibold mt-2">
                        4 Person
                    </div>
                </div>
            </div>
            <div className="flex-1 flex max-w-fit">
                <button className="rounded bg-black text-white flex-1 px-8">
                    Book Now
                </button> 
            </div>
        </div>
    )
}

export default function Tag(){
    return (
        <div className="h-4/5 w-screen flex justify-center items-center">
            <div className="h-full py-20 flex flex-col items-center mx-20 px-10">
                <div className="text-6xl text-white w-1/2 text-center ">
                    Your Perfect Stay, Just a Click Away.
                </div>
                <div className="my-6 w-1/2 text-xl text-center">
                    Find your perfect stay with ease explore a wide range of rooms, grab great deals and book your ideal getaway today
                </div>
                <SearchBar/>
            </div>
        </div>
    )
}