import Hero from "@/src/components/home/hero/Hero";
import Products from "../components/Products/Products";
import RoadMap from "../components/home/roadmap/RoadMap";
import { getUser } from "../services/get";

async function Home() {
  const data = await getUser();
  console.log(data);
  return (
    <div className="pt-[4.75rem] lg:pt-[5.25rem] overflow-hidden">
      <Hero />
      <Products />
      <RoadMap />
    </div>
  );
}

export default Home;
