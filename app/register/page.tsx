import Left from "./components/left";
import Right from "./components/right";


export default function Home(){
    return (
        <div className="h-screen w-screen flex justify-center items-center bg-cover bg-[url('https://images.unsplash.com/photo-1542314831-068cd1dbfeeb')] backdrop-blur-2xl">
            <div className="h-2/3 w-1/2 bg-[#FFFDF6] flex border-0 rounded-2xl shadow-2xl">
                <Right/>
                <Left/>
            </div>
        </div>
    )
}