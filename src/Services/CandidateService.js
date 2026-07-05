import api from '../Api/Axios'

export const getCandidateProfile = async () => {
  const response = await api.get('/candidate/profile')
  return response.data?.data || response.data
}

export const getResumeMetadata = async () => {
  const response = await api.get('/candidate/resume')
  return response.data?.data || response.data
}

export const uploadResume = async (resumeFile) => {
  const formData = new FormData()
  formData.append('resume', resumeFile)

  const response = await api.post('/candidate/resume', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  })
  return response.data
}

export const deleteResume = async () => {
  const response = await api.delete('/candidate/resume')
  return response.data
}

const buildProfilePayload = (profileData) => {
  const payload = {
    name: profileData.name,
    phoneNo: profileData.phoneNo,
    skills: profileData.skills,
    experience: profileData.experience || profileData.totalExperience,
    education: profileData.education,
    location: profileData.location,
    linkedInUrl: profileData.linkedInUrl,
    totalExperience: profileData.totalExperience,
    currentCompany: profileData.currentCompany,
    currentDesignation: profileData.currentDesignation,
    highestQualification: profileData.highestQualification || profileData.education,
    graduationYear: profileData.graduationYear ? Number(profileData.graduationYear) : undefined,
    currentCtc: profileData.currentCtc ?? profileData.currentCTC,
    expectedCtc: profileData.expectedCtc ?? profileData.expectedCTC,
    noticePeriod: profileData.noticePeriod,
  }

  return Object.fromEntries(
    Object.entries(payload).filter(([, value]) => value !== undefined && value !== null && value !== '')
  )
}

export const updateCandidateProfile = async (profileData) => {
  const response = await api.put('/candidate/profile', buildProfilePayload(profileData))
  return response.data
}

export const getApplicationStatus = async () => {
  const response = await api.get('/candidate/applicationStatus')
  return response.data?.data || response.data
}
