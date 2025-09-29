import React, { useEffect, useState } from "react"
import { StyleSheet } from "react-native"
import { SafeAreaProvider } from "react-native-safe-area-context"
import Signin from "./(auth)/Signin"

import TabsLayout from "./(tabs)/_layout"
import Loading from "./components/Loading"
import { useAuth } from "./contexts/AuthContenxt"

export default function App() {
  const [loading, setLoading] = useState(true)
  const { isAuthenticated } = useAuth()

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 3000)
    return () => clearTimeout(timer)
  }, [])

  return loading ? (
    // Splash Screen
    <Loading />
  ) : (
    // Tela principal
    <SafeAreaProvider>
      {isAuthenticated ? <TabsLayout /> : <Signin />}
      {/*  */}
    </SafeAreaProvider>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
})
