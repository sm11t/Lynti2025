import {Stack} from "expo-router";

export default function RootLayout() {
    return (
        <Stack
            screenOptions={{
                headerShown: false, // Default behavior for all screens (optional)
            }}
        >
            <Stack.Screen name="(tabs)"/>
            <Stack.Screen
                name="search"
                options={{
                    headerShown: false, // Hide the header specifically for search page
                }}
            />
        </Stack>
    );
}
