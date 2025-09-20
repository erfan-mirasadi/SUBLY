import supabase from "@/src/services/supabase";

export const getCompanyQuery = Object.assign(
  async function getCompanyQuery() {
    const { data, error } = await supabase.from("company").select("*");
    if (error) throw new Error(error.message);
    return data;
  },
  {
    queryKey: ["companies"],
    staleTime: 1000 * 60 * 5, // 5 دقیقه کش بمونه
  }
);

export async function getProductByCompanyQuery(companyId) {
  const { data, error } = await supabase
    .from("product")
    .select(
      `
      *,
      product_entry (
        *,
        product_plans (*)
      )
    `
    )
    .eq("company_id", companyId);

  if (error) {
    console.error("❌ خطا در دریافت محصولات شرکت:", error.message);
    return [];
  }

  return data;
}
