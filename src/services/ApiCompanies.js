import supabase from "./supabase";

export async function getApiCompanies() {
  const { data, error } = await supabase.from("company").select("*");
  if (error) {
    console.error("Error fetching companies:", error);
  }
  return data;
}
