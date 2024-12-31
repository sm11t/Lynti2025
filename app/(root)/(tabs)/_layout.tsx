import {Tabs} from "expo-router";
import {Image, View} from "react-native";

import {icons} from "@/constants";

const TabIcon = ({source, focused}: { source: any; focused: boolean }) => (
    <View className="flex justify-center items-center h-full">
        <Image
            source={source}
            resizeMode="contain"
            style={{
                tintColor: focused ? "#00FF00" : "#A6A6A6", // Highlight selected tab
            }}
            className="w-6 h-6"
        />
    </View>
);

export default function Layout() {
    return (
        <Tabs
            initialRouteName="home"
            screenOptions={{
                tabBarShowLabel: false,
                tabBarStyle: {
                    position: "absolute",
                    bottom: 30, // Slightly raised from the bottom
                    width: "80%", // Set the desired width of the navbar
                    marginHorizontal: "10%", // Ensures it is centered (100% - 70%) / 2
                    backgroundColor: "#1c1c1c", // Razer black
                    borderRadius: 40, // More rounded for a pill-like design
                    height: 60, // Maintain height
                    paddingTop: 8,
                    paddingBottom: 8,
                    justifyContent: "center",
                    shadowColor: "#000",
                    shadowOpacity: 0.25,
                    shadowOffset: {width: 0, height: 4},
                    shadowRadius: 10,
                    elevation: 10, // Add elevation for Android shadows
                },
                tabBarActiveTintColor: "#00FF00", // Razer neon green
                tabBarInactiveTintColor: "#A6A6A6", // Light gray
            }}
        >
            <Tabs.Screen
                name="home"
                options={{
                    title: "Home",
                    headerShown: false,
                    tabBarIcon: ({focused}) => <TabIcon source={icons.home} focused={focused}/>,
                }}
            />
            <Tabs.Screen
                name="rides"
                options={{
                    title: "Rides",
                    headerShown: false,
                    tabBarIcon: ({focused}) => <TabIcon source={icons.list} focused={focused}/>,
                }}
            />
            <Tabs.Screen
                name="chat"
                options={{
                    title: "Chat",
                    headerShown: false,
                    tabBarIcon: ({focused}) => <TabIcon source={icons.chat} focused={focused}/>,
                }}
            />
            <Tabs.Screen
                name="profile"
                options={{
                    title: "Profile",
                    headerShown: false,
                    tabBarIcon: ({focused}) => <TabIcon source={icons.profile} focused={focused}/>,
                }}
            />
        </Tabs>
    );
}
