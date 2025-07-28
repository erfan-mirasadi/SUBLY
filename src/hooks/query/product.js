import { useQuery } from '@tanstack/react-query'
import supabase from '../../services/supabase'

export const getProductsQuery = Object.assign(
    async function getProductsQuery() {
      const { data, error } = await supabase
        .from('product')
        .select(`*, product_entry(*, product_plans(*))`)
      if (error) throw new Error(error.message)
      return data
    },
    {
      queryKey: ['products'],
      staleTime: 1000 * 60 * 5,
    }
)

export const getProductCategoriesQuery = Object.assign(
  async function getProductCategoriesQuery() {
    const categories = [
      { id: 33, title: "AI Programs" },
      { id: 30, title: "MEDIA" },
      { id: 31, title: "Social Media" },
    ];

    const results = await Promise.all(
      categories.map(async (cat) => {
        const { data, error } = await supabase
          .from("product")
          .select(`*, product_entry(*, product_plans(*))`)
          .eq("category_id", cat.id);

        if (error) throw new Error(error.message);

        return { ...cat, products: data };
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