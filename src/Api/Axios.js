import axios from 'axios'

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
  localStorage.setItem('token', token)
  localStorage.setItem('role', role)
  api.defaults.headers.common.Authorization = `Bearer ${token}`
}

const savedToken = localStorage.getItem('token')
if (savedToken) {
  api.defaults.headers.common.Authorization = `Bearer ${savedToken}`
}

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token')

    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }

    return config
  },
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
