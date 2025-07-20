import { getApiCompanies } from "@/src/services/ApiCompanies";
// import Componies from "../Componies";
// import ProductSection from "../ProductSection";

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

  return (
    <>
      <div className="overflow-hidden">
        {/* <Componies />
        <ProductSection /> */}
        <div className="max-w-[77.5rem] mx-auto py-22 md:px-10 lg:px-15 xl:max-w-[87.5rem]">
          <h1 className="text-2xl font-bold mb-4">{data.title}</h1>
          <p className="text-lg">{data.description}</p>

          <img
            src={data.image_url}
            alt={data.name}
            className="w-full h-auto mt-4"
          />
          <h2 className="text-xl font-semibold mt-6">Products</h2>
        </div>
      </div>
    </>
  );
}
