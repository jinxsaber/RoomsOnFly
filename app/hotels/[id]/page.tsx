import NavBar from "@/components/navBar";
import Details from "./components/Details";
import Hero from "./components/Hero";

interface PageProps {
    params: Promise<{ id: string }>;
}

const Page = async ({ params }: PageProps) => {
    const { id } = await params;

    return (
        <div className="w-full pb-32">
            <NavBar />
            <div className="mx-auto max-w-screen-xl">
                <Hero id={id} />
                <Details id={id} />
            </div>
        </div>
    );
};

export default Page;
