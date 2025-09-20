import supabase from "@/src/services/supabase";

export const getCategoryQuery = Object.assign(
  async function getCategoryQuery() {
    const { data, error } = await supabase.from("category").select("*");
    if (error) throw new Error(error.message);
    return data;
  },
  {
    queryKey: ["categories"],
    staleTime: 1000 * 60 * 5,
  }
);

export async function getProductByCategoryQuery(categoryId) {
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
    .eq("category_id", categoryId);

  if (error) {
    console.error("Error fetching product for category:", error);
    throw new Error("Failed to fetch products by category");
  }

  return data;
}
