import { useMutation, useQuery } from "@tanstack/react-query";
import { useState, useEffect, useMemo } from "react";
import {
  getCartItems,
  addToCart,
  removeCartItems,
  updateCartItemQuantity,
} from "@/src/services/ApiCartItmes";
import { queryClient } from "@/src/services/queryClient";
import { getCurrenciesQuery, convertCartItems } from "../query/currencies";

const getUserId = () => {
  if (typeof window === "undefined") return null;
  return localStorage.getItem("sably_user_id");
};

const getLocalCartItems = (key) => {
  if (typeof window === "undefined") return [];
  try {
    const items = localStorage.getItem(key);
    return items ? JSON.parse(items) : [];
  } catch {
    return [];
  }
};

export const useCartQuery = () => {
  const userId = getUserId();
  return useQuery({
    queryKey: ["cart", userId],
    queryFn: async () => {
      if (!userId) {
        return [];
      }
      try {
        // Fetch cart items and currency rates in parallel for better performance
        const [cartItems, currencies] = await Promise.all([
          getCartItems(userId),
          getCurrenciesQuery(),
        ]);
        const items = Array.isArray(cartItems) ? cartItems : [];

        // Convert all cart item prices to Iranian Rial (IRR) based on region
        // If plan.product_entry.region === "turkey" -> use TRY rate
        // Otherwise -> use USD rate
        return await convertCartItems(items, currencies);
      } catch (error) {
        console.error("Cart query error:", error);
        return [];
      }
    },
    enabled: !!userId,
    staleTime: 5 * 60 * 1000,
    initialData: [],
    retry: 1, // Only retry once to avoid spam
    retryDelay: 1000, // Wait 1 second before retry
  });
};

export const useAddToCartMutation = () => {
  return useMutation({
    mutationFn: async ({ id, user_id, quantity = 1 }) => {
      return await addToCart(user_id, id, quantity);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cart"] });
    },
  });
};

export const useUpdateCartMutation = () => {
  return useMutation({
    mutationFn: async ({ cart_item_id, quantity }) => {
      return await updateCartItemQuantity(cart_item_id, quantity);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cart"] });
    },
  });
};

export const useRemoveCartMutation = () => {
  return useMutation({
    mutationFn: async (cart_item_id) => {
      return await removeCartItems(cart_item_id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cart"] });
    },
  });
};

export const useSyncCartToServerMutation = (key = "cart-items") => {
  return useMutation({
    mutationFn: async (userId) => {
      if (!userId) throw new Error("User ID is required for sync");
      const localItems = getLocalCartItems(key);
      // console.log("Starting sync for user:", userId, "Items:", localItems);

      if (localItems.length === 0) {
        console.log("No items to sync");
        return { message: "No items to sync", synced: 0, total: 0 };
      }

      const results = [];
      const errors = [];

      for (const item of localItems) {
        // console.log("Syncing item:", item);
        try {
          const result = await addToCart(userId, item.id, item.quantity);
          // console.log("Item synced successfully:", result);
          results.push(result);
        } catch (error) {
          console.error("Failed to sync item:", error);
          errors.push({ item: item.id, error: error.message });
        }
      }

      // پاک کردن localStorage اگر حداقل یک آیتم sync شده باشه
      if (results.length > 0) {
        localStorage.removeItem(key);
        // اطمینان از پاک شدن کامل
        try {
          localStorage.setItem(key, JSON.stringify([]));
          localStorage.removeItem(key);
        } catch (e) {
          console.warn("Could not fully clear localStorage:", e);
        }
        // console.log("localStorage cleared after successful sync");
      }

      const syncResult = {
        synced: results.length,
        total: localItems.length,
        errors: errors.length,
        results,
        errorDetails: errors,
      };

      console.log("Sync completed:", syncResult);
      return syncResult;
    },
    onSuccess: () => {
      // Invalidate cart queries to refresh UI
      queryClient.invalidateQueries({ queryKey: ["cart"] });
    },
  });
};

const emitCartChange = (key, data) => {
  if (typeof window !== "undefined") {
    window.dispatchEvent(
      new CustomEvent(`cart-${key}-changed`, {
        detail: data,
      })
    );
  }
};

export function useCart(key) {
  const [cart, setCart] = useState(() => {
    if (typeof window === "undefined") return [];
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : [];
    } catch {
      return [];
    }
  });

  // sync با localStorage وقتی cart تغییر کرد
  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(cart));
    } catch {}
  }, [key, cart]);

  // sync بین تب‌ها (different tabs) - localStorage storage event
  useEffect(() => {
    const handleStorage = (e) => {
      if (e.key === key) {
        try {
          const updated = e.newValue ? JSON.parse(e.newValue) : [];
          setCart(updated);
        } catch {
          setCart([]);
        }
      }
    };
    window.addEventListener("storage", handleStorage);
    return () => window.removeEventListener("storage", handleStorage);
  }, [key]);

  // sync برای همان تب (same tab) - custom events
  useEffect(() => {
    const handleCartChange = (e) => {
      setCart(e.detail);
    };

    window.addEventListener(`cart-${key}-changed`, handleCartChange);
    return () =>
      window.removeEventListener(`cart-${key}-changed`, handleCartChange);
  }, [key]);

  const addItem = (product) => {
    setCart((prev) => {
      const newCart = (() => {
        const existing = prev.find((item) => item.id === product.id);
        if (existing) {
          return prev.map((item) =>
            item.id === product.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          );
        }
        return [...prev, { ...product, quantity: 1 }];
      })();

      // Emit custom event for same-tab sync
      setTimeout(() => emitCartChange(key, newCart), 0);
      return newCart;
    });
  };

  const removeItem = (productId) => {
    setCart((prev) => {
      const newCart = prev
        .map((item) =>
          item.id === productId
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
        .filter((item) => item.quantity > 0);

      // Emit custom event for same-tab sync
      setTimeout(() => emitCartChange(key, newCart), 0);
      return newCart;
    });
  };

  const clearCart = () => {
    setCart([]);
    // Emit custom event for same-tab sync
    setTimeout(() => emitCartChange(key, []), 0);
  };

  const hasItem = (productId) => cart.some((item) => item.id === productId);

  // متغیر محاسبه‌شده برای مجموع quantity
  const totalQuantity = useMemo(
    () => cart.reduce((sum, item) => sum + (item.quantity || 0), 0),
    [cart]
  );

  return { cart, addItem, removeItem, clearCart, hasItem, totalQuantity };
}
