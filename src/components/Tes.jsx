import supabase from "../services/supabase";

export default async function Instruments() {
  let { data: user, error } = await supabase.from("user").select("name");
  console.log({ user });
  console.log({ error });
  return <div>sgdgdgdgdgfdgdgdgdgdgdgdgf</div>;
}
