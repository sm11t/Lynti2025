// File: app/_layout.tsx (or wherever your root layout is defined)

import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false, // Default behavior for all screens (optional)
      }}
    >
      <Stack.Screen name="(tabs)" />
      <Stack.Screen
        name="search"
        options={{
          headerShown: false, // Hide the header specifically for the search page
        }}
      />
    </Stack>
  );
}
