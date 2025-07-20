import supabase from "./supabase";

export async function getApiCategories() {
  const { data, error } = await supabase.from("category").select("*");
  if (error) {
    console.error("Error fetching categories:", error);
  }
  return data;
}
