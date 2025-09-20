import Categories from "../../company/Categories";
import ProductSection from "../../company/ProductSection";
import Section from "@/src/components/section/Section";
import {
  getCategoryQuery,
  getProductByCategoryQuery,
} from "@/src/hooks/query/category";

export default async function CategoryPage({ params }) {
  const { slug } = await params;
  const category = await getCategoryQuery();
  const matchedCategory = category?.find((c) => c.slug === slug);
  const productData = await getProductByCategoryQuery(matchedCategory.id);

  return (
    <Section
      className="overflow-hidden lg:pt-0 pt-[6rem] lg:translate-y-[5.25rem] -mt-[5.25rem]"
      id="roadmap"
      crosses
      crossesOffset="lg:translate-y-[5.25rem]"
      customPaddings
    >
      <Categories item={matchedCategory} />
      <ProductSection item={productData} />
    </Section>
  );
}
