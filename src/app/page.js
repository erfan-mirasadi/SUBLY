import Hero from "../components/home/hero/Hero";
import RoadMap from "../components/home/roadmap/RoadMap";
import Products from "../components/Products/Products";

function Home() {
  return (
    <div className="pt-[4.75rem] lg:pt-[5.25rem] overflow-hidden">
      <Hero />
      <Products />
      <RoadMap />
    </div>
  );
}

export default Home;
