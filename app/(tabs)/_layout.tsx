import { Ionicons } from "@expo/vector-icons"
import { Tabs } from "expo-router"
import React from "react"
import { MyTabBar } from "../components/TabsCustom"

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: "#0da87aff",
      }}
      tabBar={(props) => <MyTabBar {...props} />}
    >
      <Tabs.Screen
        name="Home" // 👈 deve bater com /app/home.tsx
        options={{
          tabBarStyle: {
            display: "none",
          },
          title: "Home",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home-outline" size={size} color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="Entregas"
        options={{
          tabBarIcon: ({ focused }) => (
            <Ionicons
              name="fast-food-outline"
              size={30}
              color={focused ? "#0da87aff" : "#ccc"}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="profile" // 👈 deve bater com /app/profile.tsx
        options={{
          title: "Profile",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="person-outline" size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  )
}
