import {
  getApiCompanies,
  getApiProductCompanies,
} from "@/src/services/ApiCompanies";
import Categories from "../Categories";
import ProductSection from "../ProductSection";
import Section from "@/src/components/section/Section";

export default async function ComponyPage({ params }) {
  const { slug } = await params;
  const company = await getApiCompanies();

  const data = company?.find((c) => c.slug === slug);

  if (!data) {
    return (
      <div className="p-8 text-center text-red-500">
        محصول پیدا نشد یا خطا در دریافت اطلاعات!
      </div>
    );
  }
  const productData = await getApiProductCompanies(data.id);

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
