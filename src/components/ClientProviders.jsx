"use client";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "../services/queryClient";

export default function ClientProviders({ children }) {
  return (
      <QueryClientProvider client={queryClient}>
        {children}
      </QueryClientProvider>
  );
}
