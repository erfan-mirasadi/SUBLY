import {
  getApiCategories,
  getApiProductCategories,
} from "@/src/services/ApiCategories";
import Categories from "../../company/Categories";
import ProductSection from "../../company/ProductSection";
import Section from "@/src/components/section/Section";

export default async function CategoryPage({ params }) {
  const { slug } = await params;
  const category = await getApiCategories();
  const data = category?.find((c) => c.slug === slug);
  const productData = await getApiProductCategories(data.id);

  if (!data) {
    return (
      <div className="p-8 text-center text-red-500">
        محصول پیدا نشد یا خطا در دریافت اطلاعات!
      </div>
    );
  }

  return (
    <Section
      className="overflow-hidden lg:pt-0 pt-[6rem] lg:translate-y-[5.25rem] -mt-[5.25rem]"
      id="roadmap"
      crosses
      crossesOffset="lg:translate-y-[5.25rem]"
      customPaddings
    >
      <Categories item={data} />
      <ProductSection item={productData} />
    </Section>
  );
}
