import Axios from "axios"
import { Platform } from "react-native"

const localhost =
  Platform.OS === "ios" ? "http://localhost:3001" : "http://10.0.2.2:3001"

const api = Axios.create({
  baseURL: localhost,
})

async function login(data: { email: string; password: string }) {
  try {
    const response = await api.post("/auth/login", data, {
      headers: {
        "User-Agent": "MeuApp/1.0", // pode não ser aceito no RN
        "X-User-Agent": "MeuApp/1.0", // alternativa recomendada
      },
    })

    console.log("Aqui e a resposta do api -> ", response.data)
    console.log(response.headers)
    return response.data
  } catch (error) {
    console.error("Erro no login:", error)
    throw error
  }
}

// Intercepta respostas de erro
api.interceptors.response.use(
  (response) => response, // se deu certo, só retorna
  (error) => {
    if (error.response) {
      // Erro da API (status code 4xx ou 5xx)
      console.log("Erro da API:", error.response.data)

      // exemplo: se for 401, deslogar usuário
      if (error.response.status === 401) {
        console.log(error.response.data.message)
        // aqui você pode limpar token, redirecionar login, etc
      }
    } else if (error.request) {
      // Nenhuma resposta do servidor
      console.log("Sem resposta do servidor:", error.request)
    } else {
      // Erro inesperado
      console.log("Erro inesperado:", error.message)
    }

    // importante: sempre rejeitar de novo para não "esconder" o erro
    return Promise.reject(error)
  }
)

export { api, login }
