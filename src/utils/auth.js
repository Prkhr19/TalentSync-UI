export const decodeJwtPayload = (token) => {
  if (!token) return {}

  try {
    const encodedPayload = token.split('.')[1]
    if (!encodedPayload) return {}

    const normalizedPayload = encodedPayload.replace(/-/g, '+').replace(/_/g, '/')
    return JSON.parse(decodeURIComponent(escape(atob(normalizedPayload))))
  } catch {
    return {}
  }
}

export const normalizeAuthToken = (token) => {
  if (!token || typeof token !== 'string') return null

  let trimmed = token.trim()
  if (!trimmed) return null

  if (
    (trimmed.startsWith('"') && trimmed.endsWith('"')) ||
    (trimmed.startsWith("'") && trimmed.endsWith("'"))
  ) {
    trimmed = trimmed.slice(1, -1).trim()
  }

  return trimmed.startsWith('Bearer ') ? trimmed.slice(7).trim() : trimmed
}

export const normalizeAuthRole = (role) => {
  const normalized = String(role || '').trim().toUpperCase()
  if (!normalized) return ''
  if (normalized === 'RECRUITER') return 'ADMIN'
  return normalized
}

const readRoleFromJwt = (token) => {
  const payload = decodeJwtPayload(token)
  const claim =
    payload.role ||
    payload.userRole ||
    payload.user_role ||
    payload.authority ||
    payload.authorities

  if (Array.isArray(claim)) {
    const firstRole = claim.find(Boolean)
    return normalizeAuthRole(String(firstRole).replace(/^ROLE_/, ''))
  }

  if (typeof claim === 'string') {
    return normalizeAuthRole(claim.replace(/^ROLE_/, ''))
  }

  return ''
}

export const extractLoginCredentials = (payload = {}) => {
  const nested = payload?.data && typeof payload.data === 'object' ? payload.data : {}
  const merged = { ...payload, ...nested }

  const token = normalizeAuthToken(
    merged.token ||
      merged.accessToken ||
      merged.access_token ||
      merged.jwt ||
      merged.jwtToken
  )

  const role = normalizeAuthRole(
    merged.role ||
      merged.userRole ||
      merged.user_role ||
      readRoleFromJwt(token)
  )

  return { token, role }
}

export const getStoredAuthToken = () => normalizeAuthToken(localStorage.getItem('token'))

export const getAuthHeaders = () => {
  const token = getStoredAuthToken()
  return token ? { Authorization: `Bearer ${token}` } : {}
}

export const isJwtExpired = (token) => {
  const payload = decodeJwtPayload(token)
  if (!payload.exp) return false
  return Date.now() >= payload.exp * 1000
}

export const applyAuthHeader = (config) => {
  const token = getStoredAuthToken()

  if (!config.headers) {
    config.headers = {}
  }

  if (token) {
    if (typeof config.headers.set === 'function') {
      config.headers.set('Authorization', `Bearer ${token}`)
    } else {
      config.headers.Authorization = `Bearer ${token}`
    }
  } else if (typeof config.headers.delete === 'function') {
    config.headers.delete('Authorization')
  } else {
    delete config.headers.Authorization
  }

  return config
}

export const rolesMatch = (actualRole, expectedRole) => {
  return normalizeAuthRole(actualRole) === normalizeAuthRole(expectedRole)
}
