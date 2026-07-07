import api from '../Api/Axios'
import { normalizeReferral } from '../utils/normalizers'

export const getAdminReferrals = async () => {
  const response = await api.get('/admin/referrals')
  const payload = response.data?.data || response.data
  const list = Array.isArray(payload) ? payload : payload?.referrals || payload?.content || []
  return list.map(normalizeReferral)
}

export const getReferralsByApplication = async (applicationId) => {
  const response = await api.get(`/admin/applications/${applicationId}/referrals`)
  const payload = response.data?.data || response.data
  const list = Array.isArray(payload) ? payload : payload?.referrals || payload?.content || []
  return list.map(normalizeReferral)
}

export const createReferral = async (applicationId, referralData) => {
  const response = await api.post(`/admin/applications/${applicationId}/referrals`, referralData)
  return response.data?.data || response.data
}

export const getReferralById = async (referralId) => {
  const response = await api.get(`/admin/referrals/${referralId}`)
  return normalizeReferral(response.data?.data || response.data)
}

export const updateReferral = async (referralId, referralData) => {
  const response = await api.put(`/admin/referrals/${referralId}`, referralData)
  return response.data?.data || response.data
}

export const updateReferralStatus = async (referralId, status) => {
  const response = await api.patch(`/admin/referrals/${referralId}/status`, { status })
  return response.data?.data || response.data
}

export const deleteReferral = async (referralId) => {
  const response = await api.delete(`/admin/referrals/${referralId}`)
  return response.data?.data || response.data
}
