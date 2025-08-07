import Gradient from "@/src/components/ui/Gradient";
import Heading from "@/src/components/ui/Heading";
import ProductCard from "./ProductCard";
import ProductSwiper from "@/src/components/ui/ProductSwiper";
import { getProductCategoriesQuery, getProductsQuery } from "@/src/hooks/query/product";

async function AllProducts() {
  const products = await getProductsQuery()
  const productsByCategory = await getProductCategoriesQuery()
  return (
    <div className="max-w-[1240px] mx-auto px-4 md:px-10 lg:px-15 xl:max-w-[1400px] md:pb-10">
      {productsByCategory.map((cat, idx) => (
        <div key={cat.id}>
          <Heading tag="Ready to get started" title={cat.title} />
          <ProductSwiper items={productsByCategory[idx] || []} />
        </div>
      ))}
      <Heading tag="Ready to get started" title="ALL PRODUCTS" />
      <div className="grid gap-6 sm:gap-8 grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        {products?.map((item) => (
          <div key={item.id} className="relative group opacity-75 hover:opacity-100 transition-opacity duration-300">
            <ProductCard item={item} />
          </div>
        ))}
      </div>
      <Gradient />
    </div>
  );
}

export default AllProducts;