import api from '../Api/Axios'

export const getCompanies = async () => {
  const response = await api.get('/admin/companies')
  return response.data?.data || response.data
}

export const createCompany = async (companyData) => {
  const response = await api.post('/admin/companies', {
    companyName: companyData.companyName,
    location: companyData.location,
    website: companyData.website,
    description: companyData.description ?? companyData.companyDescription,
  })
  return response.data
}

export const createJob = async (jobData) => {
  const response = await api.post('/admin/jobs', {
    ...jobData,
    companyId: Number(jobData.companyId),
    salary: Number(jobData.salary),
  })
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

const mapCandidateSearchParams = (params = {}) => {
  const mapped = {}

  if (params.skills) mapped.skills = params.skills
  if (params.location) mapped.location = params.location
  if (params.noticePeriod) mapped.noticePeriod = params.noticePeriod
  if (params.experience) mapped.minimumExperience = params.experience
  if (params.preferredLocation) mapped.preferredLocation = params.preferredLocation
  if (params.currentCompany) mapped.currentCompany = params.currentCompany
  if (params.maximumExpectedCTC) mapped.maximumExpectedCTC = params.maximumExpectedCTC
  if (params.page !== undefined) mapped.page = params.page
  if (params.size !== undefined) mapped.size = params.size
  if (params.sortBy) mapped.sortBy = params.sortBy
  if (params.direction) mapped.direction = params.direction

  return mapped
}

export const getCandidates = async (params = {}) => {
  const response = await api.get('/admin/candidates', { params: mapCandidateSearchParams(params) })
  return response.data
}

export const searchCandidates = async (params = {}) => {
  return getCandidates(params)
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
