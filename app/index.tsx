import { Slot } from "expo-router"
import React, { useEffect, useState } from "react"
import { SafeAreaProvider } from "react-native-safe-area-context"
import Loading from "./components/Loading"
import { useAuth } from "./contexts/AuthContenxt" // ✅ corrigido
export default function App() {
  const [splashLoading, setSplashLoading] = useState(true)
  const { loading: authLoading } = useAuth()

  useEffect(() => {
    const timer = setTimeout(() => setSplashLoading(false), 2500)
    return () => clearTimeout(timer)
  }, [])

  // Se splash ou auth estiver carregando, mostra Loading
  if (splashLoading || authLoading) {
    return <Loading />
  }

  // Senão, renderiza as rotas
  return (
    <SafeAreaProvider>
      <Slot />
    </SafeAreaProvider>
  )
}
