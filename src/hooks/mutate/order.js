import { useMutation } from "@tanstack/react-query";
import { queryClient } from "@/src/services/queryClient";
import { createOrder, fetchCartWithDetails } from "@/src/services/ApiOrders";

export const useCreateOrder = (user_id) => {
  return useMutation({
    mutationFn: async () => {
      const cart = await fetchCartWithDetails(user_id);
      if (!cart.length) throw new Error("سبد خرید خالی است");
      return await createOrder(user_id, cart);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cart"] });
      // اگر خواستی: کاربر رو به صفحه درگاه پرداخت ببری
    },
  });
};
