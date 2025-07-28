import SingleProduct from "./SingleProduct";
import Price from "./components/Price";
import Section from "@/src/components/section/Section";
import { getApiProducts } from "@/src/services/ApiProduct";

export default async function ProductPage({ params }) {
  // Await params for Next.js 14+ dynamic routes
  const { slug } = await params;

  // Fetch all products and find the one with the matching slug
  const products = await getApiProducts();
  const data = products?.find((p) => p.slug === slug);

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
      <SingleProduct product={data} />
      <Price productEntry={data.product_entry || []} productInfo={data} />
    </Section>
  );
}
