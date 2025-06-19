import Tag from '@/components/tag';
import NavBar from '@/components/navBar';
// import bg from '@/assests/bg.jpg'


export default function Home() {
  return (
    <div className="h-screen w-screen bg-cover bg-[url('https://images.unsplash.com/photo-1542314831-068cd1dbfeeb')]">
      <NavBar/>
      <Tag/>
    </div>
  );
}
