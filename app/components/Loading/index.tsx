import LottieView from "lottie-react-native"
import { ImageBackground, StyleSheet, Text, View } from "react-native"

import FundoLogo from "../../assets/funndo.png"
import animation from "../../assets/Loading.json" // arquivo Lottie

export default function Loading() {
  return (
    <ImageBackground source={FundoLogo} style={styles.fundoImg}>
      <View style={styles.splash}>
        <Text style={styles.logo}>Meu App</Text>

        {/* Lottie Animation */}
        <LottieView source={animation} autoPlay loop style={styles.lottie} />
      </View>
    </ImageBackground>
  )
}

const styles = StyleSheet.create({
  fundoImg: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
    alignItems: "center",
  },
  splash: {
    justifyContent: "center",
    alignItems: "center",
  },
  logo: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 20,
  },
  lottie: {
    width: 150,
    height: 150,
  },
})
