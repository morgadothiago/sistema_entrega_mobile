import { Slot } from "expo-router"
import React, { useEffect, useState } from "react"
import { SafeAreaProvider } from "react-native-safe-area-context"
import Loading from "./components/Loading"
import { useAuth } from "./contexts/AuthContenxt"; // ✅ corrigido
export default function App() {
  const [splashLoading, setSplashLoading] = useState(true)
  const { loading: authLoading, user } = useAuth()

  useEffect(() => {
    // Garante que o splash fique visível pelo menos 2,5s
    const timer = setTimeout(() => setSplashLoading(false), 2500)
    return () => clearTimeout(timer)
  }, [])

  // Enquanto splash ou autenticação estão carregando, mostra Loading
  if (splashLoading || authLoading) {
    return <Loading />
  }

  // Após carregar, renderiza as rotas
  return (
    <SafeAreaProvider>
      <Slot />
    </SafeAreaProvider>
  )
}
