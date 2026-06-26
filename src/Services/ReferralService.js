import api from '../Api/Axios'

export const getAdminReferrals = async () => {
  const response = await api.get('/admin/referrals')
  return response.data
}

export const createReferral = async (referralData) => {
  const response = await api.post('/admin/referrals', referralData)
  return response.data
}

export const getCandidateReferrals = async () => {
  const response = await api.get('/candidate/referrals')
  return response.data
}
