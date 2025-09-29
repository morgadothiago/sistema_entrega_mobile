import AsyncStorage from "@react-native-async-storage/async-storage"
import React, { createContext, ReactNode, useEffect, useState } from "react"
import { api } from "../service/api"
import { User } from "../types/User"

const TOKEN_KEY = "@MyApp:token"
const USER_KEY = "@MyApp:user"

type AuthContextData = {
  user: User | null
  token: string | null
  loading: boolean
  isAuthenticated: boolean
  signIn: (email: string, password: string) => Promise<void>
  signOut: () => Promise<void>
}

export const AuthContext = createContext<AuthContextData>({} as AuthContextData)

type AuthProviderProps = {
  children: ReactNode
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null)
  const [token, setToken] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)

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
        console.error("Erro ao carregar storage:", error)
      } finally {
        setLoading(false)
      }
    }

    loadStorageData()
  }, [])

  async function signIn(email: string, password: string) {
    try {
      const response = await api.post("/auth/login", { email, password })
      const { token, user } = response.data || {}

      if (!token || !user) throw new Error("Resposta inválida do servidor")

      setToken(token)
      setUser(user)
      api.defaults.headers.common["Authorization"] = `Bearer ${token}`

      await AsyncStorage.setItem(TOKEN_KEY, token)
      await AsyncStorage.setItem(USER_KEY, JSON.stringify(user))
    } catch (error) {
      console.error("Erro ao fazer login:", error)
      throw error
    }
  }

  async function signOut() {
    setUser(null)
    setToken(null)
    api.defaults.headers.common["Authorization"] = ""

    await AsyncStorage.removeItem(TOKEN_KEY)
    await AsyncStorage.removeItem(USER_KEY)
  }

  const isAuthenticated = !!user && !!token

  return (
    <AuthContext.Provider
      value={{ user, token, loading, isAuthenticated, signIn, signOut }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = React.useContext(AuthContext)
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
