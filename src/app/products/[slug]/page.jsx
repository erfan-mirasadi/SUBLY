import { getProductsQuery } from "@/src/hooks/query/product";

import Section from "@/src/components/section/Section";
import { notFound, redirect } from "next/navigation";
import HeroSection from "./HeroSection";
// import SecondSection from "./SecondSection";
// import ThirdSection from "./ThirdSection";
import PriceSection from "./PriceSection";
import ProductInfo from "./ProductInfo";

export default async function ProductPlanPage({ params, searchParams }) {
  const { slug } = await params;
  const { plan } = await searchParams;

  const products = await getProductsQuery();
  const data = products?.find((p) => p.slug === slug);

  if (!data) {
    notFound();
  }

  // Find the first available plan if no plan is specified
  if (!plan) {
    const firstAvailablePlan = data.product_entry
      ?.flatMap((entry) =>
        entry.product_plans?.filter((plan) => plan.is_available !== false)
      )
      ?.sort((a, b) => parseInt(a.title) - parseInt(b.title))[0]; // Sort by duration and get first

    if (firstAvailablePlan) {
      redirect(`/products/${slug}?index=0&plan=${firstAvailablePlan.title}`);
    } else {
      notFound(); // No available plans
    }
  }

  // Extract all available plans for this product
  // const allPlanTitles = Array.from(
  //   new Set(
  //     data.product_entry
  //       ?.flatMap((entry) => entry.product_plans.map((plan) => plan.title))
  //       .filter(Boolean) || []
  //   )
  // );
  // const planExists = allPlanTitles.some(
  //   (title) => title.toLowerCase() === plan.toLowerCase()
  // );
  // if (!data || !planExists) notFound();

  return (
    <Section
      className="overflow-hidden lg:pt-0 pt-[6rem] lg:translate-y-[5.25rem] -mt-[4.6rem]"
      id="roadmap"
      crosses
      crossesOffset="lg:translate-y-[5.25rem]"
      customPaddings
    >
      <HeroSection product={data} />
      {/* <SecondSection product={data} /> */}
      {/* <ThirdSection /> */}
      <PriceSection params={slug} data={data} plan={plan} />

      <ProductInfo data={data} plan={plan} />
    </Section>
  );
}

// Generate static params for all product/plan combinations
// export async function generateStaticParams() {
//   const products = await getProductsQuery();
//   const params = [];

//   products?.forEach((product) => {
//     const allPlanTitles = Array.from(
//       new Set(
//         product.product_entry
//           ?.flatMap((entry) => entry.product_plans.map((plan) => plan.title))
//           .filter(Boolean) || []
//       )
//     );

//     // allPlanTitles.forEach((planTitle) => {
//     //   params.push({
//     //     slug: product.slug,
//     //     plan: planTitle.toLowerCase(),
//     //   });
//     // });
//   });

//   return params;
// }

// Generate metadata for each plan page
// export async function generateMetadata({ params }) {
//   const { slug, plan } = await params;
//   const products = await getProductsQuery();
//   const data = products?.find((p) => p.slug === slug);

//   if (!data) {
//     return {
//       title: "Product Not Found",
//     };
//   }

//   const planTitle = plan.charAt(0).toUpperCase() + plan.slice(1);

//   return {
//     title: `SABLY | ${data.title} - ${planTitle} Plan  `,
//     description: `Get ${data.title} with ${planTitle} plan. ${
//       data.caption || data.description || ""
//     }`,
//     openGraph: {
//       title: `${data.title} - ${planTitle} Plan`,
//       description: `Get ${data.title} with ${planTitle} plan`,
//       images: data.image_small_url ? [data.image_small_url] : [],
//     },
//     alternates: {
//       canonical: `/products/${slug}/${plan}`,
//     },
//   };
// }
