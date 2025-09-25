// context/AuthContext.tsx
import * as SecureStore from "expo-secure-store"
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

// Chaves padronizadas do SecureStore
const TOKEN_KEY = "token"
const USER_KEY = "user"

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [token, setToken] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)

  // 🔹 Helpers para SecureStore
  async function saveItem(key: string, value: string) {
    await SecureStore.setItemAsync(key, value)
  }

  async function getItem(key: string) {
    return await SecureStore.getItemAsync(key)
  }

  async function removeItem(key: string) {
    await SecureStore.deleteItemAsync(key)
  }

  // Carrega token e usuário do SecureStore ao iniciar o app
  useEffect(() => {
    async function loadStorageData() {
      try {
        const storagedToken = await getItem(TOKEN_KEY)
        const storagedUser = await getItem(USER_KEY)

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

      await saveItem(TOKEN_KEY, token)
      await saveItem(USER_KEY, JSON.stringify(user))
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
    await removeItem(TOKEN_KEY)
    await removeItem(USER_KEY)
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
