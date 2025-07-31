"use client";

import { useMutation } from "@tanstack/react-query";
import supabase from "@/src/services/supabase";

export function useSendOtp() {
  return useMutation({
    mutationFn: async (phone) => {
      const { data, error } = await supabase.rpc("generate_otp", { phone_number: phone });
      if (error) throw error;
      console.log(data);
      return data;
    },
  });
}

export function useVerifyOtp() {
  return useMutation({
    mutationFn: async ({ phone, code }) => {
      // مرحله ۱: چک کردن OTP
      const { data, error } = await supabase.rpc("verify_otp", {
        phone_number: phone,
        code,
      });
      if (error) throw error;

      const result = data[0];
      if (!result.success) return { success: false };

      // ایمیل فیک
      const fakeEmail = `${phone}@gmail.com`;
      const password = phone;

      // تلاش برای لاگین
      let { data: signInData } = await supabase.auth.signInWithPassword({
        email: fakeEmail,
        password,
      });

      // اگر کاربر وجود نداشت، SignUp و بعد دوباره SignIn
      if (!signInData.session) {
        const { error: signUpError } = await supabase.auth.signUp({
          email: fakeEmail,
          password,
          phone,
          options: { data: { phone } },
        });
        if (signUpError) throw signUpError;

        const { data: newSignInData, error: signInError } =
          await supabase.auth.signInWithPassword({
            email: fakeEmail,
            password,
          });
        if (signInError) throw signInError;

        signInData = newSignInData;
      }

      // ✅ ذخیره JWT توی localStorage
      if (signInData.session?.access_token) {
        localStorage.setItem(
          "subly_access_token",
          signInData.session.access_token
        );
      }

      return {
        ...result,
        session: signInData.session,
        user: signInData.user,
      };
    },
  });
}



  
  

