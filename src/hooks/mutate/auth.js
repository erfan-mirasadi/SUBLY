"use client";

import { useMutation } from "@tanstack/react-query";
import supabase from "@/src/services/supabase";

export function useSendOtp() {
  return useMutation({
    mutationFn: async (phone) => {
      const { data, error } = await supabase.rpc("generate_otp", { phone_number: phone });
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

      // فقط اگر خطا چیز دیگه‌ای غیر از invalid_credentials بود → throw کن
      if (signInError && signInError.code !== "invalid_credentials") {
        throw signInError;
      }

      let finalSession = signInData?.session;

      // 3️⃣ اگر کاربر وجود نداشت → SignUp
      if (!finalSession) {
        const { error: signUpError } = await supabase.auth.signUp({
          email: fakeEmail,
          password,
          phone,
          options: { data: { phone } },
        });
        if (signUpError) throw signUpError;

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

      return {
        ...result,
        session: finalSession,
        user: finalSession.user,
      };
    },
  });
}
