import Section from "../section/Section";
import Heading from "../ui/Heading";
import ProductCard from "./ProductCard";
import { getFilteredProductsQuery } from "@/src/hooks/query/product";

async function Products() {
  const productsList = await getFilteredProductsQuery();

  return (
    <Section id="productsss">
      <div className="max-w-[1240px] mx-auto px-5 md:px-10 lg:px-15 xl:max-w-[1400px] relative z-[2]">
        <Heading
          className="md:max-w-xl lg:max-w-3xl font-vazirmatn whitespace-nowrap"
          title="با سابلی همیشه یک قدم جلوتر باش"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
          {productsList.map((item, index) => (
            <ProductCard
              key={item.id}
              item={item}
              index={index}
              width={48}
              height={48}
            />
          ))}
        </div>
      </div>
    </Section>
  );
}

export default Products;
