import supabase from "../../services/supabase";
import { getCurrenciesQuery, convertProductPrices } from "./currencies";

// کوئری گرفتن محصولات
export const getProductsQuery = Object.assign(
  async function getProductsQuery() {
    const [{ data: products, error }, currencyMap] = await Promise.all([
      supabase.from("product").select(`*, product_entry(*, product_plans(*))`),
      getCurrenciesQuery(),
    ]);

    if (error) throw new Error(error.message);

    return convertProductPrices(products, currencyMap);
  },
  {
    queryKey: ["products"],
    staleTime: 1000 * 60 * 5,
  }
);

// کوئری گرفتن محصولات براساس دسته‌بندی
export const getProductCategoriesQuery = Object.assign(
  async function getProductCategoriesQuery() {
    const categories = [
      { id: 33, title: "AI" },
      { id: 30, title: "MEDIA" },
      { id: 31, title: "Social Media" },
    ];

    const currencyMap = await getCurrenciesQuery();

    const results = await Promise.all(
      categories.map(async (cat) => {
        const { data: products, error } = await supabase
          .from("product")
          .select(`*, product_entry(*, product_plans(*))`)
          .eq("category_id", cat.id);

        if (error) throw new Error(error.message);

        const updatedProducts = await convertProductPrices(
          products,
          currencyMap
        );
        return { ...cat, products: updatedProducts };
      })
    );

    return results;
  },
  {
    queryKey: ["product-categories"],
    queryFn: () => getProductCategoriesQuery(),
    staleTime: 1000 * 60 * 5,
  }
);

// کوئری گرفتن محصولات فیلتر شده
export const getFilteredProductsQuery = Object.assign(
  async function getFilteredProductsQuery() {
    // مرحله ۱: گرفتن محصولات
    const { data: products, error } = await supabase
      .from("product")
      .select(`*, product_entry(*, product_plans(*))`);

    if (error) throw new Error(error.message);

    // مرحله ۲: گرفتن نرخ ارز
    const currencyMap = await getCurrenciesQuery();

    // مرحله ۳: تبدیل قیمت‌ها به تومان
    const updatedProducts = await convertProductPrices(products, currencyMap);

    // مرحله ۴: فیلتر کردن محصولات با کلمات کلیدی خاص
    const keywords = [
      "apple music",
      "spotify",
      "nuke",
      "youtube",
      "apple",
      "chatgpt",
    ];
    const filtered = updatedProducts.filter((product) => {
      const title = product.title?.toLowerCase() || "";
      return keywords.some((key) => title.includes(key));
    });

    // مرحله ۵: محدود کردن تعداد محصولات
    return filtered.slice(0, 12);
  },
  {
    queryKey: ["filtered-products"],
    queryFn: () => getFilteredProductsQuery(),
    staleTime: 1000 * 60 * 5,
  }
);
