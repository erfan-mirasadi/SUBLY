import supabase from "./supabase";

export async function getApiCurrencies() {
  const { data, error } = await supabase.from("currencies").select("*");
  if (error) {
    console.error("Error fetching API currencies:", error);
  }
  return data;
}
