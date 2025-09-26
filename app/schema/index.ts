import * as yup from "yup"

export const loginSchema = yup.object().shape({
  email: yup.string().email("Email inválido").required("Email é obrigatório"),
  password: yup.string().min(6).required("Senha é obrigatória"),
})

export const forgotPasswordSchema = yup.object().shape({
  email: yup.string().email("Email inválido").required("Email é obrigatório"),
})
