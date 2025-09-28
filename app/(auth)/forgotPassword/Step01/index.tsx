import React from "react"
import { Controller, useFormContext } from "react-hook-form"
import { Text, View } from "react-native"

import Input from "@/app/components/Input"
import { styles } from "./styles"

export default function Step01() {
  // Conecta-se ao formulário do componente pai
  const {
    control,
    formState: { errors },
  } = useFormContext()

  return (
    <View style={styles.containerStep01}>
      <Text style={styles.label}>Digite seu e-mail:</Text>
      <Controller
        control={control}
        name="email"
        render={({ field: { onChange, onBlur, value } }) => (
          <Input
            icon="mail"
            placeholder="seu@email.com"
            placeholderTextColor="#aaa"
            autoCapitalize="none"
            autoCorrect={false}
            keyboardType="email-address"
            value={value}
            onChangeText={onChange}
            onBlur={onBlur}
            containerStyle={styles.input}
          />
        )}
      />
      {errors.email && (
        <Text style={styles.error}>{errors.email.message as string}</Text>
      )}
    </View>
  )
}
