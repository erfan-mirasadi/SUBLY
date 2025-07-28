import supabase from "../services/supabase";

/**
 * Send OTP code to a phone number.
 * - If user exists, update only otp_code.
 * - If user does not exist, insert a new row.
 */
export async function sendOTP(phone) {
  const code = Math.floor(1000 + Math.random() * 9000);
  const otp = String(code);

  // Check if user with this phone exists
  const { data: existingUser, error } = await supabase
    .from("user")
    .select("id")
    .eq("phone", phone)
    .maybeSingle();

  if (existingUser) {
    // User exists: update only otp_code
    await supabase.from("user").update({ otp_code: otp }).eq("phone", phone);
  } else {
    // User does not exist: insert new row
    await supabase.from("user").insert({ phone, otp_code: otp });
  }

  // Only log the OTP code sent
  console.log("📱 OTP code sent to", phone, ":", otp);
}

/**
 * Verify OTP code for a phone number.
 * - If code matches, clear otp_code so it can't be reused.
 * - If user is new (no firstName/lastName), return { success: true, needsProfile: true }
 * - If user is complete, return { success: true, needsProfile: false }
 * - If code is wrong, return { success: false }
 */
export async function verifyOTP(phone, code) {
  const { data, error } = await supabase
    .from("user")
    .select("otp_code, name, last_name")
    .eq("phone", phone)
    .limit(1)
    .maybeSingle();

  if (error || !data) {
    console.error("Error fetching user:", error);
    return { success: false };
  }

  // Always compare as string to avoid type mismatch
  if (String(data.otp_code) !== String(code)) {
    return { success: false };
  }

  // OTP is correct: clear otp_code so it can't be reused
  await supabase.from("user").update({ otp_code: null }).eq("phone", phone);

  // Check if user profile is incomplete (no firstName/lastName)
  const needsProfile = !data.name || !data.last_name;
  return { success: true, needsProfile };
}

/**
 * Update user profile (firstName, lastName) by phone number.
 * Returns true if update is successful.
 */
export async function updateUserProfile(phone, name, last_name) {
  const { error } = await supabase
    .from("user")
    .update({ name, last_name })
    .eq("phone", phone);
  return !error;
}

/**
 * Get user by phone number.
 * Returns user data or null if not found.
 */
export async function getUserByPhone(phone) {
  const { data, error } = await supabase
    .from("user")
    .select("*")
    .eq("phone", phone)
    .single();

  if (error || !data) {
    return null;
  }

  return data;
}
