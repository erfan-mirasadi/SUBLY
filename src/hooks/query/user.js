// src/hooks/query/user.js
import supabase from "@/src/services/supabase";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const useGetCurrentUser = () => {
  return useQuery({
    queryKey: ["getUser"],
    queryFn: async () => {
      if (typeof window === "undefined") return null;
      const userId = localStorage.getItem("sably_user_id");
      if (!userId) throw new Error("User ID not found");
      const { data, error } = await supabase
        .from("users")
        .select("*")
        .eq("id", userId)
        .single();
      if (error) throw new Error(error.message);
      if (!data) return null;
      return data;
    },
    staleTime: 1000 * 60 * 5,
  });
};

export const useUpdateUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (userData) => {
      if (typeof window === "undefined")
        throw new Error("Window not available");

      const userId = localStorage.getItem("sably_user_id");
      if (!userId) throw new Error("User ID not found");

      const { data, error } = await supabase
        .from("users")
        .update(userData)
        .eq("id", userId)
        .select()
        .single();

      if (error) throw new Error(error.message);
      return data;
    },
    onSuccess: (updatedUser) => {
      // کش رو آپدیت کن تا اطلاعات جدید نمایش داده بشه
      queryClient.setQueryData(["getUser"], updatedUser);
    },
    onError: (error) => {
      console.error("خطا در آپدیت اطلاعات:", error);
    },
  });
};
