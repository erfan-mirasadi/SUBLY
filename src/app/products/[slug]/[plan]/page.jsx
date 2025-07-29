// src/app/products/[slug]/[plan]/page.jsx
import { getProductsQuery } from "@/src/hooks/query/product";

import Section from "@/src/components/section/Section";
import { notFound } from "next/navigation";
import SingleProduct from "../SingleProduct";
import Price2 from "@/src/components/productPrice/Price2";

export default async function ProductPlanPage({ params }) {
  const { slug, plan } = await params;
  const products = await getProductsQuery();
  const data = products?.find((p) => p.slug === slug);
  // Extract all available plans for this product
  const allPlanTitles = Array.from(
    new Set(
      data.product_entry
        ?.flatMap((entry) => entry.product_plans.map((plan) => plan.title))
        .filter(Boolean) || []
    )
  );
  const planExists = allPlanTitles.some(
    (title) => title.toLowerCase() === plan.toLowerCase()
  );
  if (!data || !planExists) notFound();

  return (
    <Section
      className="overflow-hidden lg:pt-0 pt-[6rem] lg:translate-y-[5.25rem] -mt-[5.25rem]"
      id="roadmap"
      crosses
      crossesOffset="lg:translate-y-[5.25rem]"
      customPaddings
    >
      <SingleProduct product={data} />
      <Price2
        productEntry={data.product_entry || []}
        productInfo={data}
        currentPlan={plan}
        productSlug={slug}
      />
    </Section>
  );
}

// Generate static params for all product/plan combinations
export async function generateStaticParams() {
  const products = await getProductsQuery();
  const params = [];

  products?.forEach((product) => {
    const allPlanTitles = Array.from(
      new Set(
        product.product_entry
          ?.flatMap((entry) => entry.product_plans.map((plan) => plan.title))
          .filter(Boolean) || []
      )
    );

    allPlanTitles.forEach((planTitle) => {
      params.push({
        slug: product.slug,
        plan: planTitle.toLowerCase(),
      });
    });
  });

  return params;
}

// Generate metadata for each plan page
export async function generateMetadata({ params }) {
  const { slug, plan } = await params;
  const products = await getProductsQuery();
  const data = products?.find((p) => p.slug === slug);

  if (!data) {
    return {
      title: "Product Not Found",
    };
  }

  const planTitle = plan.charAt(0).toUpperCase() + plan.slice(1);

  return {
    title: `SUBLY | ${data.title} - ${planTitle} Plan  `,
    description: `Get ${data.title} with ${planTitle} plan. ${
      data.caption || data.description || ""
    }`,
    openGraph: {
      title: `${data.title} - ${planTitle} Plan`,
      description: `Get ${data.title} with ${planTitle} plan`,
      images: data.image_small_url ? [data.image_small_url] : [],
    },
    alternates: {
      canonical: `/products/${slug}/${plan}`,
    },
  };
}
