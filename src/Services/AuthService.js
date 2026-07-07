import api from "../Api/Axios"
import { extractLoginCredentials } from "../utils/auth"

export const login = async (loginData) => {
  const response = await api.post("/auth/login", loginData)
  const body = response.data?.data || response.data
  const credentials = extractLoginCredentials(body)

  if (!credentials.token || !credentials.role) {
    throw new Error("Login response did not contain token or role")
  }

  return { credentials, body }
}

export const signup = async (signupData) => {
  const response = await api.post("/auth/signup", {
    name: signupData.name,
    email: signupData.email,
    password: signupData.password,
  })
  return response.data?.data || response.data
}
