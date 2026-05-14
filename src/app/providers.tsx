"use client";

import { SessionProvider } from "next-auth/react";
import { DataProvider } from "./context/DataContext";
import ClientLayout from "./components/ClientLayout";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <DataProvider>
        <ClientLayout>{children}</ClientLayout>
      </DataProvider>
    </SessionProvider>
  );
}