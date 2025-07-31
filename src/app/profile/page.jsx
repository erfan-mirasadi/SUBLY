"use client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

function UserProfilePage() {
  const router = useRouter();
  useEffect(() => {
    router.push("/profile/account");
  }, []);
  return <div className="flex-1 flex " />;
}

export default UserProfilePage;
