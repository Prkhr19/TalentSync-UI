import api from "../Api/Axios"

export const login = async (loginData) => {
  const response = await api.post("/auth/login", loginData)
  return response.data?.data || response.data
}

export const signup = async (signupData) => {
  const response = await api.post("/auth/signup", {
    ...signupData,
    role: "CANDIDATE",
  })
  return response.data?.data || response.data
}
