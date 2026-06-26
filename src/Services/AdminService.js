import api from '../Api/Axios'

export const createCompany = async (companyData) => {
  const response = await api.post('/admin/company', companyData)
  return response.data
}

export const createJob = async (jobData) => {
  const response = await api.post('/admin/jobs', jobData)
  return response.data
}

export const getAdminJobs = async () => {
  const response = await api.get('/admin/jobs')
  return response.data
}

export const jobApplicationsByJobId = async (jobId) => {
  const response = await api.get(`/admin/job/${jobId}/applications`)
  return response.data
}

export const updateApplicationStatus = async (applicationId, status) => {
  const response = await api.patch(`/admin/application/${applicationId}/status`, { status })
  return response.data
}

export const getCandidates = async (params = {}) => {
  const response = await api.get('/admin/candidates', { params })
  return response.data
}

export const searchCandidates = async (params = {}) => {
  const response = await api.get('/admin/candidates/search', { params })
  return response.data
}

export const getCandidateById = async (candidateId) => {
  const response = await api.get(`/admin/candidates/${candidateId}`)
  return response.data
}

export const downloadCandidateResume = async (candidateId) => {
  const response = await api.get(`/admin/candidates/${candidateId}/resume`, {
    responseType: 'blob',
  })
  return response.data
}
