import NavBar from "@/components/navBar";
import Details from "./components/Details";
import Hero from "./components/Hero";

const Page = async ({params}) =>{
    const {id} = await params;
    // console.log("booyah I am page id", id)
    return (
        <div className="w-full pb-32">
            <NavBar/>
            <div className="mx-auto max-w-screen-xl">
                <Hero id={id}/>
                <Details id={id}/>
            </div>
        </div>
    )
}

export default Page;