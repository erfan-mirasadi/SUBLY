import Section from "@/src/components/section/Section";
import AllProducts from "./AllProducts";

function ProductPage() {
  return (
    <Section
      className="overflow-hidden pt-[12rem] lg:translate-y-[5.25rem] -mt-[5.25rem]"
      id="roadmap"
      crosses
      crossesOffset="lg:translate-y-[5.25rem]"
      customPaddings
    >
      <AllProducts />
    </Section>
  );
}

export default ProductPage;
