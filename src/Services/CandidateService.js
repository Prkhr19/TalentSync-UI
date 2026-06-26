import api from '../Api/Axios'

export const getCandidateProfile = async () => {
  const response = await api.get('/candidate/profile')
  return response.data?.data || response.data
}

export const updateCandidateProfile = async (profileData, resumeFile) => {
  const formData = new FormData()

  Object.entries(profileData).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== '') {
      formData.append(key, value)
    }
  })

  if (resumeFile) {
    formData.append('resume', resumeFile)
  }

  const response = await api.put('/candidate/profile', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  })
  return response.data
}

export const getApplicationStatus = async () => {
  const response = await api.get('/candidate/applicationStatus')
  return response.data?.data || response.data
}
