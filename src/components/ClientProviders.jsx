"use client";
import { QueryClientProvider } from "@tanstack/react-query";
import { SessionProvider } from "next-auth/react";
import { queryClient } from "../services/queryClient";

export default function ClientProviders({ children }) {
  return (
    <SessionProvider>
      <QueryClientProvider client={queryClient}>
      {children}
      </QueryClientProvider>
    </SessionProvider>
  );
}
