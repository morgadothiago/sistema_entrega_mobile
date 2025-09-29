import { toastConfig } from "@/toastConfig"
import { Slot, useRouter } from "expo-router"
import { StatusBar } from "expo-status-bar"
import React, { useEffect } from "react"
import Toast from "react-native-toast-message"
import { AuthProvider, useAuth } from "./contexts/AuthContenxt"

export default function RootLayout() {
  return (
    <AuthProvider>
      <AuthGate />
    </AuthProvider>
  )
}

function AuthGate() {
  const { isAuthenticated, loading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!loading) {
      if (isAuthenticated) {
        router.replace("/(tabs)/Home")
      } else {
        router.replace("/(auth)/Signin")
      }
    }
  }, [isAuthenticated, loading, router])

  if (loading) return null

  return (
    <>
      <StatusBar style="light" />
      <Slot />
      <Toast config={toastConfig} />
    </>
  )
}
