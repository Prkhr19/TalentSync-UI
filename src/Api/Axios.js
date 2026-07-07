import axios from 'axios'
import { applyAuthHeader, getStoredAuthToken, normalizeAuthRole, normalizeAuthToken } from '../utils/auth'

const AUTH_STORAGE_KEYS = [
  'token',
  'role',
  'userEmail',
  'userName',
  'candidateEmail',
  'candidateName',
  'candidateEducation',
  'candidateSkills',
  'candidateProfileCache',
  'adminCompanyName',
  'adminCompanyLocation',
  'adminCompanyWebsite',
]

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

export const clearAuthSession = () => {
  AUTH_STORAGE_KEYS.forEach((key) => localStorage.removeItem(key))
  delete api.defaults.headers.common.Authorization
}

export const setAuthSession = (token, role) => {
  const normalizedToken = normalizeAuthToken(token)
  const normalizedRole = normalizeAuthRole(role)
  if (!normalizedToken || !normalizedRole) return

  localStorage.setItem('token', normalizedToken)
  localStorage.setItem('role', normalizedRole)
  api.defaults.headers.common.Authorization = `Bearer ${normalizedToken}`
}

const savedToken = getStoredAuthToken()
if (savedToken) {
  localStorage.setItem('token', savedToken)
  api.defaults.headers.common.Authorization = `Bearer ${savedToken}`
}

api.interceptors.request.use(
  (config) => applyAuthHeader(config),
  (error) => Promise.reject(error)
)

api.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error.response?.status
    const requestUrl = error.config?.url || ''
    const isAuthRequest = requestUrl.includes('/auth/login') || requestUrl.includes('/auth/signup')

    if (status === 401 && !isAuthRequest && !error.config?.skipAuthRedirect) {
      clearAuthSession()

      if (!window.location.pathname.startsWith('/login')) {
        window.location.assign('/login?session=expired')
      }
    }

    return Promise.reject(error)
  }
)

export default api
