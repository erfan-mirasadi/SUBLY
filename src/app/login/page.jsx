"use client";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import AuthForm from "@/src/components/auth/AuthForm";

export default function LoginPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "loading") return;
    if (session?.user) {
      router.replace("/userProfile");
    }
  }, [session, status, router]);

  if (status === "loading" || session?.user) return null;

  return <AuthForm />;
}
