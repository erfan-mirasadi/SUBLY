// import supabase from "./supabase";

// export async function getApiCategories() {
//   const { data, error } = await supabase.from("category").select("*");
//   if (error) {
//     console.error("Error fetching categories:", error);
//   }
//   return data;
// }

// export async function getApiProductCategories(categoryId) {
//   const { data, error } = await supabase
//     .from("product")
//     .select(
//       `
//       *,
//       product_entry (
//         *,
//         product_plans (*)
//       )
//     `
//     )
//     .eq("category_id", categoryId);

//   if (error) {
//     console.error("Error fetching product for category:", error);
//   }

//   return data;
// }
