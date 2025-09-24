import React, { useEffect, useState } from "react"
import { StyleSheet } from "react-native"
import Loading from "./components/Loading"
import Signin from "./Signin"

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
    <Signin />
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
})
