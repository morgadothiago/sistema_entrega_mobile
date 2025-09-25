import { StyleSheet } from "react-native"
import { colors } from "../theme"

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  fundoBg: {
    flex: 1,
  },
  forgotPassword: {
    padding: 20,
  },
  btn: {
    flexDirection: "row",
    alignItems: "center",
    gap: 20,
  },
  btnText: {
    fontSize: 22,
    fontWeight: "bold",
    color: colors.buttons,
  },
})
