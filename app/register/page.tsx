import Left from "./components/left";
import Right from "./components/right";


export default function Home(){
    return (
        <div className=" overflow-hidden h-screen w-screen flex justify-center items-center bg-cover bg-[url('https://images.unsplash.com/photo-1542314831-068cd1dbfeeb')] backdrop-blur-2xl">
            <div className="h-[200%] w-[200%] blur-3xl fixed bg-white/50"></div>
            <div className="h-2/3 w-1/2 bg-[#FFFDF6] flex border-0 rounded-2xl shadow-2xl z-50">
                <Right/>
                <Left/>
            </div>
        </div>
    )
}