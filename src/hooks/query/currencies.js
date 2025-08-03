import supabase from "../../services/supabase";

// Fetch currency exchange rates from database
export const getCurrenciesQuery = Object.assign(
  async function getCurrenciesQuery() {
    const { data: currencies, error } = await supabase
      .from("currencies")
      .select("name, price");

    if (error) throw new Error(error.message);

    return currencies.reduce((acc, cur) => {
      acc[cur.name] = cur.price;
      return acc;
    }, {});
  },
  {
    queryKey: ["currencies"],
    staleTime: 1000 * 60 * 5,
  }
);

// Convert product prices to Iranian Rial (used in product.js)
// Each product entry has a region that determines the exchange rate
export const convertProductPrices = async (products, currencyMap = null) => {
  if (!products || !Array.isArray(products)) return [];

  try {
    const currencies = currencyMap || (await getCurrenciesQuery());

    return products.map((product) => {
      const updatedEntries = product.product_entry?.map((entry) => {
        const region = entry.region?.toLowerCase() || "global";
        const rate =
          region === "turkey" ? currencies["TRY"] : currencies["USD"];

        const updatedPlans = entry.product_plans?.map((plan) => ({
          ...plan,
          price: plan.price * rate,
          discount_price: (plan.discount_price || 0) * rate,
        }));

        return { ...entry, product_plans: updatedPlans };
      });

      return { ...product, product_entry: updatedEntries };
    });
  } catch (error) {
    console.error("Error converting product prices:", error);
    return products; // Return original products if conversion fails
  }
};

// Convert cart item prices to Iranian Rial (used in cart.js)
// Cart items have nested structure: item.plan.product_entry.region
export const convertCartItems = async (cartItems, currencyMap = null) => {
  if (!cartItems || !Array.isArray(cartItems)) return [];

  try {
    const currencies = currencyMap || (await getCurrenciesQuery());

    return cartItems.map((item) => {
      // Get region from cart item structure: plan.product_entry.region
      const region =
        item.plan?.product_entry?.region?.toLowerCase() || "global";
      const rate = region === "turkey" ? currencies["TRY"] : currencies["USD"];

      // Convert direct item prices
      const updatedItem = {
        ...item,
        price: item.price ? item.price * rate : item.price,
        discount_price: item.discount_price
          ? item.discount_price * rate
          : item.discount_price,
        old_price: item.old_price ? item.old_price * rate : item.old_price,
      };

      // Convert plan prices if they exist
      if (item.plan) {
        updatedItem.plan = {
          ...item.plan,
          price: item.plan.price ? item.plan.price * rate : item.plan.price,
          discount_price: item.plan.discount_price
            ? item.plan.discount_price * rate
            : item.plan.discount_price,
        };
      }

      return updatedItem;
    });
  } catch (error) {
    console.error("Error converting cart items:", error);
    return cartItems; // Return original items if conversion fails
  }
};
