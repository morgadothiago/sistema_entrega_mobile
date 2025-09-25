import { router } from "expo-router"
import React from "react"

import { Pressable, Text, View } from "react-native"
import { useAuth } from "../contexts/AuthContenxt"

export default function Home() {
  const { user, token } = useAuth()

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text>Tela Home</Text>
      <Text>Usuario: {user?.email}</Text>
      <Text>Token: {token}</Text>
      <Pressable onPress={() => router.back()}>
        <Text>Voltar</Text>
      </Pressable>
    </View>
  )
}
