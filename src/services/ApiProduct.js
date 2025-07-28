import supabase from "./supabase";

export async function getApiProducts() {
  const { data, error } = await supabase
    .from("product")
    .select(`*, product_entry(*, product_plans(*))`);
  if (error) {
    console.error("Error fetching products:", error);
  }
  return data;
}
