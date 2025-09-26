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
  footerButtons: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingBottom: 10, // Espaçamento inferior para os botões
  },
  footerBtn: {
    flexDirection: "row",
    backgroundColor: colors.buttons,
    paddingVertical: 14,
    paddingHorizontal: 25,
    borderRadius: 8,
    gap: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  footerBtnText: {
    color: colors.primary,
    fontSize: 16,
    fontWeight: "bold",
  },
})
