import { useQuery } from "@tanstack/react-query";
import supabase from "@/src/services/supabase";

// Fetch user orders with order items
export async function fetchUserOrders(user_id) {
  if (!user_id) return [];

  const { data, error } = await supabase
    .from("order")
    .select(
      `
      *,
      order_items (
        *,
        plan:plan_id (
          *,
          product_entry (
            *,
            product (*)
          )
        )
      )
    `
    )
    .eq("user_id", user_id)
    .order("created_at", { ascending: false });

  if (error) throw new Error(error.message);
  return data || [];
}

export const useUserOrders = (user_id) => {
  return useQuery({
    queryKey: ["orders", user_id],
    queryFn: () => fetchUserOrders(user_id),
    enabled: !!user_id,
  });
};
