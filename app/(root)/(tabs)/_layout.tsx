import { Tabs } from "expo-router";

const Layout = () => (
  <Tabs
    initialRouteName="index"
    screenOptions={{
      tabBarActiveTintColor = "white",
    }}
  >
    <Tabs.Screen
      name="home"
      options={{
        title: "Home",
        headerShown: false,
        tabBarActiveTintColor: "white",
      }}
    />
  </Tabs>
);
