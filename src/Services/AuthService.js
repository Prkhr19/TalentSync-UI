import api from "../Api/Axios"

export const login = async (loginData) => {
  const response = await api.post("/auth/login", loginData)
  return response.data?.data || response.data
}

export const signup = async (signupData) => {
  const response = await api.post("/auth/signup", {
    name: signupData.name,
    email: signupData.email,
    password: signupData.password,
  })
  return response.data?.data || response.data
}
