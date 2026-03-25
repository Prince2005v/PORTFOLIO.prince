"use client";

import * as React from "react";
import dynamic from "next/dynamic";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

// Use dynamic import with ssr: false to only load on the client
const DynamicProvider = dynamic(
  () => import("./WagmiProviderWrapper"),
  { 
    ssr: false,
    loading: () => <>{null}</> 
  }
);

export function Web3Provider({ children }: { children: React.ReactNode }) {
  // Use a mounted check to ensure we only render the DynamicProvider on the client
  const [mounted, setMounted] = React.useState(false);
  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <QueryClientProvider client={queryClient}>
        {children}
      </QueryClientProvider>
    );
  }

  return (
    <DynamicProvider>
      {children}
    </DynamicProvider>
  );
}
