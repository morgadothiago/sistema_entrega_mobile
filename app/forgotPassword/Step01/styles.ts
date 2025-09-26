import { colors } from "@/app/theme" // seu arquivo de cores
import { Platform, StyleSheet } from "react-native"

export const styles = StyleSheet.create({
  containerStep01: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  label: {
    fontSize: 18,
    marginBottom: 10,
    color: colors.buttons,
  },
  input: {
    width: "100%",
    padding: 14,
    borderWidth: 1,
    borderColor: colors.buttons,
    height: Platform.OS === "ios" ? 50 : 60,
    borderRadius: 10,
    marginBottom: 15,
    backgroundColor: colors.primary,
    color: "#333",
  },
  stepIndicatorContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginVertical: 20,
  },
  stepIndicator: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: "#ccc",
    marginHorizontal: 5,
  },
  stepIndicatorActive: {
    backgroundColor: colors.primary,
  },
  error: {
    width: "100%",
    padding: 5,
    borderRadius: 5,
    color: "red",
    marginBottom: 5,
    fontSize: 18,
    fontWeight: "bold",
  },
})
