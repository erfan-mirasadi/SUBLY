// // src/app/products/[slug]/page.jsx
// import { getProductsQuery } from "@/src/hooks/query/product";
// import SingleProduct from "./SingleProduct";
// import Price from "./components/Price";
// import Section from "@/src/components/section/Section";

// export default async function ProductPage({ params }) {
//   const { slug } = await params;
//   const products = await getProductsQuery();
//   const data = products?.find((p) => p.slug === slug);

//   return (
//     <Section
//       className="overflow-hidden lg:pt-0 pt-[6rem] lg:translate-y-[5.25rem] -mt-[5.25rem]"
//       id="roadmap"
//       crosses
//       crossesOffset="lg:translate-y-[5.25rem]"
//       customPaddings
//     >
//       <SingleProduct product={data} />
//       <Price productEntry={data.product_entry || []} productInfo={data} />
//     </Section>
//   );
// }

// src/app/products/[slug]/page.jsx - Redirect to default plan
import { getProductsQuery } from "@/src/hooks/query/product";
import { redirect, notFound } from "next/navigation";

export default async function ProductPage({ params }) {
  const { slug } = await params;
  const products = await getProductsQuery();
  const data = products?.find((p) => p.slug === slug);

  if (!data) {
    notFound();
  }

  // Extract all available plans for this product
  const allPlanTitles = Array.from(
    new Set(
      data.product_entry
        ?.flatMap((entry) => entry.product_plans.map((plan) => plan.title))
        .filter(Boolean) || []
    )
  );

  // Redirect to the first available plan
  const defaultPlan = allPlanTitles[0]?.toLowerCase();

  if (defaultPlan) {
    redirect(`/products/${slug}/${defaultPlan}`);
  } else {
    // If no plans available, show the old page structure
    // You can import and show the old SingleProduct + Price components here
    notFound();
  }
}
