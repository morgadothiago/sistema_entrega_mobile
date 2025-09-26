// context/AuthContext.tsx

import AsyncStorage from "@react-native-async-storage/async-storage"
import React, { createContext, useContext, useEffect, useState } from "react"
import { api } from "../service/api"

type User = {
  id: string
  name: string
  email: string
}

type AuthContextData = {
  user: User | null
  token: string | null
  loading: boolean
  signIn: (email: string, password: string) => Promise<void>
  signOut: () => Promise<void>
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData)

// 🔑 Chaves do AsyncStorage
const TOKEN_KEY = "@MeuApp:token"
const USER_KEY = "@MeuApp:user"

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [token, setToken] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)

  // Carrega dados do AsyncStorage quando o app inicia
  useEffect(() => {
    async function loadStorageData() {
      try {
        const storagedToken = await AsyncStorage.getItem(TOKEN_KEY)
        const storagedUser = await AsyncStorage.getItem(USER_KEY)

        if (storagedToken && storagedUser) {
          api.defaults.headers.common[
            "Authorization"
          ] = `Bearer ${storagedToken}`
          setToken(storagedToken)
          setUser(JSON.parse(storagedUser))
        }
      } catch (error) {
        console.log("Erro ao carregar storage:", error)
      } finally {
        setLoading(false)
      }
    }

    loadStorageData()
  }, [])

  // Login
  async function signIn(email: string, password: string) {
    try {
      const response = await api.post("/auth/login", { email, password })
      const { token, user } = response.data || {}

      if (!token || !user) {
        throw new Error("Resposta inválida do servidor")
      }

      setToken(token)
      setUser(user)
      api.defaults.headers.common["Authorization"] = `Bearer ${token}`

      // Salvar no AsyncStorage
      await AsyncStorage.setItem(TOKEN_KEY, token)
      await AsyncStorage.setItem(USER_KEY, JSON.stringify(user))
    } catch (error: any) {
      console.error("Erro no signIn:", error)
      throw error
    }
  }

  // Logout
  async function signOut() {
    setUser(null)
    setToken(null)
    api.defaults.headers.common["Authorization"] = ""

    // Remover do AsyncStorage
    await AsyncStorage.removeItem(TOKEN_KEY)
    await AsyncStorage.removeItem(USER_KEY)
  }

  return (
    <AuthContext.Provider value={{ user, token, loading, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  return useContext(AuthContext)
}
