import React from "react"
import { Text, View } from "react-native"
import { useAuth } from "../contexts/AuthContenxt"

export default function Home() {
  const { user } = useAuth()
  console.log(user)

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Home: {user?.name}</Text>
    </View>
  )
}
