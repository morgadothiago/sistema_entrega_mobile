import React, { useEffect, useState } from "react"
import { StyleSheet, Text, View } from "react-native"
import Loading from "./components/Loading"

export default function App() {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 3000)
    return () => clearTimeout(timer)
  }, [])

  return loading ? (
    // Splash Screen
    <Loading />
  ) : (
    // Tela principal
    <View style={styles.container}>
      <Text>Bem-vindo ao App!</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
})
