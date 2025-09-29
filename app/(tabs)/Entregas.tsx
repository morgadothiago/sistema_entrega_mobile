import React from "react"
import { Text, TouchableOpacity, View } from "react-native"
import { useAuth } from "../contexts/AuthContenxt"

export default function Deliverys() {
  const { signOut } = useAuth()
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Deliverys</Text>
      <TouchableOpacity onPress={() => signOut()}>
        <Text>Logout</Text>
      </TouchableOpacity>
    </View>
  )
}
