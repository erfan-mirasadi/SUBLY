import supabase from "./supabase";

export async function getApiUsers() {
  const { data, error } = await supabase.from("user").select("*");
  if (error) {
    console.error("Error fetching API users:", error);
  }
  return data;
}

export async function createUser(newUser) {
  const { data, error } = await supabase.from("user").insert([newUser]);
  if (error) {
    console.error("User could not be created", error);
    return error;
  }
  return data;
}

export async function deleteUser(id) {
  const { data, error } = await supabase.from("user").delete().eq("id", id);
  if (error) {
    console.error("User could not be deleted", error);
    return error;
  }
  return data;
}

export async function updateUser(id, updatedUser) {
  const { data, error } = await supabase
    .from("user")
    .update(updatedUser)
    .eq("id", id);
  if (error) {
    console.error("User could not be updated", error);
    return error;
  }
  return data;
}
