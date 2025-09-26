import { StyleSheet } from "react-native"
import { colors } from "../theme"

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    justifyContent: "space-between",
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
  stepIndicatorContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 20,
  },
  stepIndicator: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: "#ccc",
    justifyContent: "center",
    alignItems: "center",
  },
  stepIndicatorActive: {
    backgroundColor: colors.buttons, // cor do step ativo
  },
  stepIndicatorDone: {
    backgroundColor: colors.buttons,
  },
  stepIndicatorText: {
    color: colors.primary,
    fontWeight: "bold",
  },
  stepIndicatorLine: {
    height: 2,
    width: 40, // Largura da linha entre os passos
    backgroundColor: "#ccc",
  },
  stepIndicatorLineDone: {
    backgroundColor: colors.buttons,
  },
  stepContent: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  // Estilos para os componentes de cada passo
  stepContainer: {
    width: "100%",
    alignItems: "center",
    paddingHorizontal: 20,
  },
})
