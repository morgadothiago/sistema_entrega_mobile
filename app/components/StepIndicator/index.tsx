import { Feather } from "@expo/vector-icons"
import React from "react"
import { Text, View } from "react-native"
import { styles } from "../../forgotPassword/styles"
import { colors } from "../../theme"

interface StepIndicatorProps {
  totalSteps: number
  currentStep: number
}

export default function StepIndicator({
  totalSteps,
  currentStep,
}: StepIndicatorProps) {
  // Cria um array com o número de passos para o map
  const steps = Array.from({ length: totalSteps }, (_, i) => i)

  return (
    <View style={styles.stepIndicatorContainer}>
      {steps.map((index) => (
        <React.Fragment key={`step-indicator-${index}`}>
          <View
            style={[
              styles.stepIndicator,
              currentStep === index && styles.stepIndicatorActive,
              currentStep > index && styles.stepIndicatorDone,
            ]}
          >
            {currentStep > index ? (
              <Feather name="check" size={16} color={colors.primary} />
            ) : (
              <Text style={styles.stepIndicatorText}>{index + 1}</Text>
            )}
          </View>
          {index < totalSteps - 1 && (
            <View
              style={[
                styles.stepIndicatorLine,
                currentStep > index && styles.stepIndicatorLineDone,
              ]}
            />
          )}
        </React.Fragment>
      ))}
    </View>
  )
}
