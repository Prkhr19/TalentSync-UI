import api from '../Api/Axios'
import { getStoredAuthToken, isJwtExpired } from '../utils/auth'
import { normalizeReferral } from '../utils/normalizers'

const createAuthError = (message) => {
  const authError = new Error(message)
  authError.response = { status: 401, data: { error: message } }
  return authError
}

const assertAuthenticatedRequest = () => {
  const token = getStoredAuthToken()
  if (!token) {
    throw createAuthError('Authentication required. Please log in again as admin.')
  }

  if (isJwtExpired(token)) {
    throw createAuthError('Your session has expired. Please log in again as admin.')
  }

  return token
}

const buildReferralPayload = (referralData) => {
  const payload = {
    companyName: referralData.companyName?.trim(),
    contactName: referralData.contactName?.trim(),
    contactEmail: referralData.contactEmail?.trim(),
  }

  if (referralData.remarks?.trim()) {
    payload.remarks = referralData.remarks.trim()
  }

  if (referralData.referredDate) {
    payload.referredDate = referralData.referredDate
  }

  if (referralData.followUpDate) {
    payload.followUpDate = referralData.followUpDate
  }

  return payload
}

export const getAdminReferrals = async () => {
  const response = await api.get('/admin/referrals')
  const payload = response.data?.data || response.data
  const list = Array.isArray(payload) ? payload : payload?.referrals || payload?.content || []
  return list.map(normalizeReferral)
}

export const getReferralsByApplication = async (applicationId) => {
  const response = await api.get(`/admin/applications/${applicationId}/referrals`, {
    skipAuthRedirect: true,
  })
  const payload = response.data?.data || response.data
  const list = Array.isArray(payload) ? payload : payload?.referrals || payload?.content || []
  return list.map(normalizeReferral)
}

export const createReferral = async (applicationId, referralData) => {
  if (!applicationId) {
    throw new Error('Application ID is required to create a referral.')
  }

  assertAuthenticatedRequest()

  const response = await api.post(
    `/admin/applications/${applicationId}/referrals`,
    buildReferralPayload(referralData),
    { skipAuthRedirect: true }
  )
  return response.data?.data || response.data
}

export const getReferralById = async (referralId) => {
  const response = await api.get(`/admin/referrals/${referralId}`)
  return normalizeReferral(response.data?.data || response.data)
}

export const updateReferral = async (referralId, referralData) => {
  const response = await api.put(`/admin/referrals/${referralId}`, buildReferralPayload(referralData))
  return response.data?.data || response.data
}

export const updateReferralStatus = async (referralId, status) => {
  const response = await api.patch(
    `/admin/referrals/${referralId}/status`,
    { status },
    { skipAuthRedirect: true }
  )
  return response.data?.data || response.data
}

export const deleteReferral = async (referralId) => {
  const response = await api.delete(`/admin/referrals/${referralId}`)
  return response.data?.data || response.data
}

export { buildReferralPayload }
