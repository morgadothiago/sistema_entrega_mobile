import React from "react"

import { ImageBackground } from "expo-image"
import { Pressable, Text, View } from "react-native"
import { styles } from "./styles"

import { Feather } from "@expo/vector-icons"
import { router } from "expo-router"
import { SafeAreaView } from "react-native-safe-area-context"
import FundoBg from "../assets/funndo.png"
import { colors } from "../theme"

export default function forgotPassword() {
  return (
    <View style={styles.container}>
      <ImageBackground source={FundoBg} style={styles.fundoBg}>
        <SafeAreaView style={styles.forgotPassword}>
          <Pressable
            style={styles.btn}
            onPress={() => {
              router.dismissTo("/Signin")
            }}
          >
            <Feather name="arrow-left" size={30} color={colors.buttons} />
            <Text style={styles.btnText}>Voltar</Text>
          </Pressable>
        </SafeAreaView>
      </ImageBackground>
    </View>
  )
}
