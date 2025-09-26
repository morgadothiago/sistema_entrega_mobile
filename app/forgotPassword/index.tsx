import { Feather } from "@expo/vector-icons"
import { yupResolver } from "@hookform/resolvers/yup"
import { router, useNavigation } from "expo-router"
import React, { useState } from "react"
import { FormProvider, useForm } from "react-hook-form"
import { ImageBackground, Pressable, Text, View } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"

import FundoBg from "../assets/funndo.png"
import StepIndicator from "../components/StepIndicator"
import { colors } from "../theme"
import Step01 from "./Step01"
import Step02 from "./Step02"
import { styles } from "./styles"

import LottieView from "lottie-react-native"
import { forgotPasswordSchema } from "../schema"
import Step03 from "./Step03"

// Array com os componentes de cada passo para facilitar a renderização e escalabilidade
const stepsComponents = [
  <Step01 key="step01" />,
  <Step02 key="step02" />,
  <Step03 key="step03" />,
]

export default function MultiStepForm() {
  const [currentStep, setCurrentStep] = useState(0) // Começa no índice 0
  const [isLoading, setIsLoading] = useState(false)
  const navigation = useNavigation()

  const methods = useForm({
    // Usar o schema de validação do passo atual
    resolver: yupResolver(forgotPasswordSchema),
    // 'onChange' valida os campos conforme o usuário digita
    mode: "onChange",
  })

  const nextStep = async () => {
    setIsLoading(true)
    // Aciona a validação dos campos do passo atual
    const isValid = await methods.trigger()

    if (isValid) {
      if (isLastStep) {
        // Lógica para finalizar e enviar o formulário
        try {
          await new Promise((resolve) => setTimeout(resolve, 2000))

          console.log("Dados do formulário:", methods.getValues())
        } catch (err) {
          console.log(err)
        }
        return // 🛑 IMPORTANTE: Impede a execução do resto da função
      } else {
        setCurrentStep((prev) => prev + 1)
      }
    }
    setIsLoading(false)
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

          <FormProvider {...methods}>
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
              <Pressable
                style={[styles.footerBtn, isLoading && styles.buttonDisabled]} // Adiciona estilo de desabilitado
                onPress={nextStep}
                disabled={isLoading} // Desabilita o botão durante o loading
              >
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
          </FormProvider>
        </SafeAreaView>

        {isLoading && (
          <View style={styles.loadingOverlay}>
            <LottieView
              source={require("../assets/Delivery Truck | Loading | Exporting-2.json")}
              autoPlay
              loop
              style={styles.cartAnimation}
              resizeMode="contain"
            />
            <Text style={styles.loadingText}>Carregando...</Text>
          </View>
        )}
      </ImageBackground>
    </View>
  )
}
