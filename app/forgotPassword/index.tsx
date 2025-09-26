import { Feather } from "@expo/vector-icons"
import { router, useNavigation } from "expo-router"
import React, { useState } from "react"
import { ImageBackground, Pressable, Text, View } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"

import FundoBg from "../assets/funndo.png"
import StepIndicator from "../components/StepIndicator"
import { colors } from "../theme"
import Step01 from "./Step01"
import Step02 from "./Step02"
import { styles } from "./styles"

// Array com os componentes de cada passo para facilitar a renderização e escalabilidade
const stepsComponents = [<Step01 key="step01" />, <Step02 key="step02" />]

export default function MultiStepForm() {
  const [currentStep, setCurrentStep] = useState(0) // Começa no índice 0
  const navigation = useNavigation()

  const nextStep = () => {
    if (currentStep < stepsComponents.length - 1) {
      setCurrentStep((prev) => prev + 1)
    } else {
      // Lógica para finalizar o formulário, ex: navegar para outra tela
      // Exemplo: navegar para a home
    }
  }

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1)
    }
  }

  const isLastStep = currentStep === stepsComponents.length - 1

  return (
    <View style={styles.container}>
      <ImageBackground source={FundoBg} style={styles.fundoBg}>
        <SafeAreaView style={[styles.forgotPassword, { flex: 1 }]}>
          {/* Botão Voltar para página anterior */}
          {navigation.canGoBack() && (
            <Pressable style={styles.btn} onPress={() => router.back()}>
              <Feather name="arrow-left" size={30} color={colors.buttons} />
              <Text style={styles.btnText}>Voltar</Text>
            </Pressable>
          )}

          <StepIndicator
            totalSteps={stepsComponents.length}
            currentStep={currentStep}
          />

          {/* Conteúdo do Step */}
          <View style={styles.content}>{stepsComponents[currentStep]}</View>

          {/* Botões de Navegação entre Steps */}
          <View style={styles.footerButtons}>
            {currentStep > 0 && (
              <Pressable style={styles.footerBtn} onPress={prevStep}>
                <Feather name="arrow-left" size={20} color={colors.primary} />
                <Text style={styles.footerBtnText}>Anterior</Text>
              </Pressable>
            )}
            <Pressable style={styles.footerBtn} onPress={nextStep}>
              {isLastStep ? (
                <>
                  <Text style={styles.footerBtnText}>Finalizar</Text>
                  <Feather name="check" size={20} color={colors.primary} />
                </>
              ) : (
                <>
                  <Text style={styles.footerBtnText}>Próximo</Text>
                  <Feather
                    name="arrow-right"
                    size={20}
                    color={colors.primary}
                  />
                </>
              )}
            </Pressable>
          </View>
        </SafeAreaView>
      </ImageBackground>
    </View>
  )
}
