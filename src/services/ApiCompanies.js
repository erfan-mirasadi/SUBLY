import supabase from "./supabase";

export async function getApiCompanies() {
  const { data, error } = await supabase.from("company").select("*");
  if (error) {
    console.error("Error fetching companies:", error);
  }
  return data;
}

export async function getApiProductCompanies(companyId) {
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
    console.error("Error fetching product for company:", error);
  }

  return data;
}
