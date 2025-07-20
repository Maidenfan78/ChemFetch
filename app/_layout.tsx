// app/_layout.tsx             ←  be sure the file is named exactly like this
import { Stack } from "expo-router";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useRef } from "react";

export default function RootLayout() {
  // 1️⃣  create the client once
  const queryClient = useRef(new QueryClient()).current;

  return (
    <SafeAreaProvider>
      <QueryClientProvider client={queryClient}>
        <Stack screenOptions={{ headerShown: false }} />
        <StatusBar style="light" />
      </QueryClientProvider>
    </SafeAreaProvider>
  );
}
