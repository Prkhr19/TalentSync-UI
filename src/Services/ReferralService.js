import api from '../Api/Axios'

export const getAdminReferrals = async () => {
  const response = await api.get('/admin/referrals')
  return response.data
}

export const getReferralsByApplication = async (applicationId) => {
  const response = await api.get(`/admin/applications/${applicationId}/referrals`)
  return response.data
}

export const createReferral = async (applicationId, referralData) => {
  const response = await api.post(`/admin/applications/${applicationId}/referrals`, referralData)
  return response.data
}

export const getReferralById = async (referralId) => {
  const response = await api.get(`/admin/referrals/${referralId}`)
  return response.data
}

export const updateReferral = async (referralId, referralData) => {
  const response = await api.put(`/admin/referrals/${referralId}`, referralData)
  return response.data
}

export const updateReferralStatus = async (referralId, status) => {
  const response = await api.put(`/admin/referrals/${referralId}/status`, { status })
  return response.data
}

export const deleteReferral = async (referralId) => {
  const response = await api.delete(`/admin/referrals/${referralId}`)
  return response.data
}
