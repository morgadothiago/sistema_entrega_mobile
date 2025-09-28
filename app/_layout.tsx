import { toastConfig } from "@/toastConfig"
import { Stack } from "expo-router"
import { StatusBar } from "expo-status-bar"
import React from "react"
import Toast from "react-native-toast-message"
import { AuthProvider } from "./contexts/AuthContenxt"

export default function RootLayout() {
  return (
    <AuthProvider>
      <StatusBar style="light" />
      <Stack screenOptions={{ headerShown: false }}>
        {/* Esse stack vai controlar qual fluxo mostrar */}
        <Stack.Screen name="(auth)" />
        <Stack.Screen name="(tabs)" />
      </Stack>
      <Toast config={toastConfig} />
    </AuthProvider>
  )
}
