import supabase from "./supabase";

export async function getUser() {
  let { data: user, error } = await supabase.from("pricing").select("*");
  if (error) {
    console.log(error);
    throw new Error("ye jaye kar milange");
  }
  return user;
}
