import api from '../Api/Axios'

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

const buildProfilePayload = (profileData) => ({
  name: profileData.name,
  phoneNo: profileData.phoneNo,
  skills: profileData.skills,
  experience: profileData.experience,
  education: profileData.education,
  location: profileData.location,
  linkedInUrl: profileData.linkedInUrl,
  totalExperience: profileData.totalExperience,
  currentCompany: profileData.currentCompany,
  currentDesignation: profileData.currentDesignation,
  highestQualification: profileData.highestQualification,
  graduationYear: Number(profileData.graduationYear),
  currentCtc: Number(profileData.currentCTC),
  expectedCtc: Number(profileData.expectedCTC),
  noticePeriod: profileData.noticePeriod,
})

const mapProfileToForm = (profile) => ({
  name: profile.name || '',
  phoneNo: profile.phoneNo || '',
  skills: profile.skills || '',
  experience: profile.experience || '',
  education: profile.education || '',
  location: profile.location || '',
  linkedInUrl: profile.linkedInUrl || '',
  totalExperience: profile.totalExperience || '',
  currentCompany: profile.currentCompany || '',
  currentDesignation: profile.currentDesignation || '',
  highestQualification: profile.highestQualification || '',
  graduationYear: profile.graduationYear ?? '',
  currentCTC: profile.currentCtc ?? '',
  expectedCTC: profile.expectedCtc ?? '',
  noticePeriod: profile.noticePeriod || '',
})

export const updateCandidateProfile = async (profileData) => {
  const response = await api.put('/candidate/profile', buildProfilePayload(profileData))
  return response.data?.data || response.data
}

export { mapProfileToForm }

export const getApplicationStatus = async () => {
  const response = await api.get('/candidate/applicationStatus')
  return response.data?.data || response.data
}
