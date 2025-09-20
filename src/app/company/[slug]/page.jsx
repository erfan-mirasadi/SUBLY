import Categories from "../Categories";
import ProductSection from "../ProductSection";
import Section from "@/src/components/section/Section";
import {
  getCompanyQuery,
  getProductByCompanyQuery,
} from "@/src/hooks/query/company";

export default async function ComponyPage({ params }) {
  const { slug } = await params;
  const company = await getCompanyQuery();
  const matchedCompany = company?.find((c) => c.slug === slug);
  const productData = await getProductByCompanyQuery(matchedCompany.id);

  return (
    <Section
      className="overflow-hidden lg:pt-0 pt-[6rem] lg:translate-y-[5.25rem] -mt-[5.25rem]"
      id="roadmap"
      crosses
      crossesOffset="lg:translate-y-[5.25rem]"
      customPaddings
    >
      <Categories item={matchedCompany} />
      <ProductSection item={productData} />
    </Section>
  );
}
