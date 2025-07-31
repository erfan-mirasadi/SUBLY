import { useState, useRef } from "react";

// Local storage key for cart items
const CART_STORAGE_KEY = "subly_cart_items";

// Global sync flag to prevent multiple syncs
let syncInProgress = false;
let syncedUsers = new Set();

// Helper functions for localStorage
const getLocalCartItems = () => {
  if (typeof window === "undefined") return [];
  try {
    const items = localStorage.getItem(CART_STORAGE_KEY);
    return items ? JSON.parse(items) : [];
  } catch (error) {
    // console.error("Error reading cart from localStorage:", error);
    return [];
  }
};

const setLocalCartItems = (items) => {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
  } catch (error) {
    // console.error("Error saving cart to localStorage:", error);
  }
};

export function useCart() {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true); // Start with loading true
  const hasSyncedRef = useRef(false);
  const fetchTriggeredRef = useRef(false);
  const syncTriggeredRef = useRef(false);
  const lastCountRef = useRef(0);

  // Fetch cart items from server or localStorage
  const fetchCartItems = async () => {
    if (session?.user?.id) {
      // User is logged in - fetch from server
      setLoading(true);
      try {
        const response = await fetch(`/api/cart?user_id=${session.user.id}`);
        const data = await response.json();
        // console.log("📥 Server cart data:", data);
        setCartItems(data || []);
      } catch (error) {
        // console.error("❌ Error fetching cart items:", error);
        setCartItems([]);
      } finally {
        setLoading(false);
      }
    } else if (status === "unauthenticated") {
      // User is definitely not logged in - get from localStorage
      setLoading(true);
      try {
        const localItems = getLocalCartItems();
        // console.log("📥 Local cart data:", localItems);
        setCartItems(localItems);
      } catch (error) {
        // console.error("❌ Error reading local cart:", error);
        setCartItems([]);
      } finally {
        setLoading(false);
      }
    }
    // If status is "loading", we keep loading state true
  };

  // Add item to cart (localStorage or server)
  const addToCart = async (plan_id, quantity = 1, plan = null) => {
    // console.log("➕ addToCart called", {
    //   plan_id,
    //   quantity,
    //   userId: session?.user?.id,
    // });

    if (session?.user?.id) {
      // User is logged in - add to server
      try {
        const response = await fetch("/api/cart", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            user_id: session.user.id,
            plan_id,
            quantity,
          }),
        });

        if (response.ok) {
          // console.log("✅ Added to server cart successfully");
          await fetchCartItems(); // Refresh cart items
          return true;
        }
        // console.log("❌ Failed to add to server cart");
        return false;
      } catch (error) {
        // console.error("❌ Error adding to cart:", error);
        return false;
      }
    } else {
      // User is not logged in - add to localStorage
      const currentItems = getLocalCartItems();
      // console.log("📦 Current local items:", currentItems);

      // Check for same plan_id
      const existingItemIndex = currentItems.findIndex(
        (item) => item.plan_id === plan_id
      );

      if (existingItemIndex >= 0) {
        // Update existing item quantity
        currentItems[existingItemIndex].quantity += quantity;
        // console.log("📝 Updated existing item quantity");
      } else {
        // Add new item with full plan information
        const newItem = {
          id: Date.now(), // Temporary ID for localStorage
          plan_id,
          quantity,
          plan: {
            ...plan,
            // Add nested structure to match server response
            product_entry: {
              model: plan.model || "",
              product: {
                id: plan.product_id,
                title: plan.product_title,
                image_small_url: plan.product_image,
                caption: plan.product_caption,
              },
            },
          },
        };
        currentItems.push(newItem);
        // console.log("➕ Added new item to local cart:", newItem);
      }

      setLocalCartItems(currentItems);
      setCartItems(currentItems);
      // console.log("💾 Saved to localStorage:", currentItems);
      return true;
    }
  };

  // Remove item from cart
  const removeFromCart = async (cart_item_id) => {
    // console.log("🗑️ removeFromCart called", {
    //   cart_item_id,
    //   userId: session?.user?.id,
    // });

    if (session?.user?.id) {
      // User is logged in - remove from server
      try {
        const response = await fetch(`/api/cart?cart_item_id=${cart_item_id}`, {
          method: "DELETE",
        });

        if (response.ok) {
          // console.log("✅ Removed from server cart successfully");
          await fetchCartItems(); // Refresh cart items
          return true;
        }
        // console.log("❌ Failed to remove from server cart");
        return false;
      } catch (error) {
        // console.error("❌ Error removing from cart:", error);
        return false;
      }
    } else {
      // User is not logged in - remove from localStorage
      const currentItems = getLocalCartItems();
      const updatedItems = currentItems.filter(
        (item) => item.id !== cart_item_id
      );
      setLocalCartItems(updatedItems);
      setCartItems(updatedItems);
      // console.log("🗑️ Removed from local cart");
      return true;
    }
  };

  // Sync localStorage cart to server after login
  const syncLocalCartToServer = async () => {
    // console.log("🔄 syncLocalCartToServer called", {
    //   userId: session?.user?.id,
    // });

    if (!session?.user?.id) {
      // console.log("❌ No user ID, skipping sync");
      return;
    }

    // Prevent multiple syncs
    if (
      syncInProgress ||
      hasSyncedRef.current ||
      syncedUsers.has(session.user.id)
    ) {
      // console.log(
      //   "🛑 Sync already in progress or completed for user:",
      //   session.user.id
      // );
      return;
    }

    const localItems = getLocalCartItems();
    // console.log("📦 Local items to sync:", localItems);

    if (localItems.length === 0) {
      // console.log("📭 No local items to sync");
      hasSyncedRef.current = true;
      syncedUsers.add(session.user.id);
      return;
    }

    try {
      syncInProgress = true;
      // console.log("🚀 Starting sync process...");
      localStorage.removeItem(CART_STORAGE_KEY);
      // Add all local items to server
      // setTimeout(async () => {
      for (const item of localItems) {
        // console.log("📤 Syncing item:", item);
        const response = await fetch("/api/cart", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            user_id: session.user.id,
            plan_id: item.plan_id,
            quantity: item.quantity,
          }),
        });

        if (!response.ok) {
          // console.error("❌ Failed to sync item:", item, response.statusText);
        } else {
          // console.log("✅ Successfully synced item:", item);
        }
      }
      // }, 0); // Simulate delay for batch processing

      // Clear localStorage after successful sync

      // console.log("🗑️ Cleared localStorage");

      // Mark as synced
      hasSyncedRef.current = true;
      syncedUsers.add(session.user.id);

      // Refresh cart items from server
      // console.log("✅ Sync completed successfully");
    } catch (error) {
      // console.error("❌ Error syncing local cart to server:", error);
    } finally {
      syncInProgress = false;
    }
  };

  const getCartItemsCount = () => {
    const count = cartItems.reduce(
      (total, item) => total + (item.quantity || 1),
      0
    );

    // Only log when count actually changes
    if (count !== lastCountRef.current) {
      // console.log(
      //   "📊 Cart items count changed:",
      //   lastCountRef.current,
      //   "→",
      //   count
      // );
      lastCountRef.current = count;
    }

    return count;
  };

  return {
    cartItems,
    loading,
    addToCart,
    removeFromCart,
    fetchCartItems,
    getCartItemsCount,
  };
}
