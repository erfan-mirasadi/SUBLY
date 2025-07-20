import supabase from "../services/supabase";

// src/lib/auth.js
export async function sendOTP(phone) {
  const code = Math.floor(100000 + Math.random() * 900000);

  await supabase.from("user").upsert({
    phone,
    otp_code: String(code),
  });

  console.log("📱 کد تأیید برای", phone, "ارسال شد:", code); // فعلاً فقط لاگ
}
