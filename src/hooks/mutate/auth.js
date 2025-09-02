"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import supabase from "@/src/services/supabase";
import { useRouter } from "next/navigation";

export function useSendOtp() {
  return useMutation({
    mutationFn: async (phone) => {
      const { data, error } = await supabase.rpc("generate_otp", {
        phone_number: phone,
      });
      if (error) throw error;
      console.log(`OTP sent to ${data[0].otp_code}`);
      return data;
    },
  });
}

export function useVerifyOtp() {
  return useMutation({
    mutationFn: async ({ phone, code }) => {
      // 1️⃣ چک کردن OTP
      const { data, error } = await supabase.rpc("verify_otp", {
        phone_number: phone,
        code,
      });
      if (error) throw error;

      const result = data?.[0];
      if (!result?.success) {
        throw new Error("OTP verification failed");
      }

      const fakeEmail = `${phone}@gmail.com`;
      const password = phone;

      // 2️⃣ تلاش برای لاگین
      let { data: signInData, error: signInError } =
        await supabase.auth.signInWithPassword({
          email: fakeEmail,
          password,
        });

      // Ignore credential errors - we'll handle signup if needed
      if (
        signInError &&
        signInError.status !== 400 &&
        !signInError.message?.includes("Invalid login credentials")
      ) {
        throw signInError;
      }

      let finalSession = signInData?.session;

      // 3️⃣ اگر کاربر وجود نداشت → SignUp
      if (!finalSession) {
        const { data: signUpData, error: signUpError } =
          await supabase.auth.signUp({
            email: fakeEmail,
            password,
            phone,
            options: { data: { phone } },
          });

        if (signUpError) throw signUpError;

        const newUser = signUpData?.user;

        // 3.5️⃣ ثبت در جدول users با همون id که Supabase داده
        if (newUser) {
          const { error: insertError } = await supabase.from("users").insert({
            id: newUser.id, // همون id‌ی که Supabase داده
            phone: phone,
            name: "", // یا هر چیزی که داری
          });

          if (insertError) throw insertError;
        }

        // 4️⃣ دوباره SignIn بعد از SignUp
        const { data: newSignInData, error: secondSignInError } =
          await supabase.auth.signInWithPassword({
            email: fakeEmail,
            password,
          });

        if (secondSignInError) throw secondSignInError;

        finalSession = newSignInData.session;
      }

      if (!finalSession?.access_token) {
        throw new Error("Authentication failed: No access token received");
      }

      // ✅ ذخیره JWT
      localStorage.setItem("subly_access_token", finalSession.access_token);
      localStorage.setItem("subly_user_id", finalSession.user.id);

      return {
        ...result,
        session: finalSession,
        user: finalSession.user,
      };
    },
  });
}

export function useLogout() {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: async () => {
      // clear local storage
      localStorage.removeItem("subly_access_token");
      localStorage.removeItem("subly_user_id");

      // sign out from Supabase Auth
      const { error } = await supabase.auth.signOut();
      if (error) throw error;

      return true;
    },
    onSuccess: () => {
      // clear the query cache
      queryClient.clear();

      // redirect to home page with full reload to reset all states
      window.location.href = "/";
    },
    onError: (error) => {
      console.error("خطا در خروج:", error);
      // clear the query cache and redirect to home page
      queryClient.clear();
      window.location.href = "/";
    },
  });
}
