import api from '../Api/Axios'

export const getCompanies = async () => {
  const response = await api.get('/admin/companies')
  return response.data?.data || response.data
}

export const createCompany = async ({ companyName, location, website, description }) => {
  const response = await api.post('/admin/companies', {
    companyName,
    location,
    website,
    description,
  })
  return response.data
}

export const createJob = async ({ title, description, location, salary, experienceRequired, jobType, companyId }) => {
  const response = await api.post('/admin/jobs', {
    title,
    description,
    location,
    salary: Number(salary),
    experienceRequired,
    jobType,
    companyId: Number(companyId),
  })
  return response.data
}

export const updateJob = async (jobId, { title, description, location, salary, experienceRequired, jobType, companyId }) => {
  const response = await api.put(`/admin/jobs/${jobId}`, {
    title,
    description,
    location,
    salary: Number(salary),
    experienceRequired,
    jobType,
    companyId: Number(companyId),
  })
  return response.data
}

export const updateJobStatus = async (jobId, status) => {
  const response = await api.put(`/admin/jobs/${jobId}/status`, { status })
  return response.data
}

export const patchJobSalary = async (jobId, salary) => {
  const response = await api.patch(`/admin/jobs/${jobId}`, { salary: Number(salary) })
  return response.data
}

const mapCandidateSearchParams = (params = {}) => {
  const mapped = {}

  if (params.skills) mapped.skills = params.skills
  if (params.location) mapped.location = params.location
  if (params.noticePeriod) mapped.noticePeriod = params.noticePeriod
  if (params.experience) {
    const parsedExperience = Number(params.experience)
    mapped.minimumExperience = Number.isNaN(parsedExperience) ? params.experience : parsedExperience
  }
  if (params.preferredLocation) mapped.preferredLocation = params.preferredLocation
  if (params.currentCompany) mapped.currentCompany = params.currentCompany
  if (params.maximumExpectedCTC) mapped.maximumExpectedCTC = Number(params.maximumExpectedCTC)
  if (params.page !== undefined) mapped.page = params.page
  if (params.size !== undefined) mapped.size = params.size
  if (params.sortBy) mapped.sortBy = params.sortBy
  if (params.direction) mapped.direction = params.direction

  return mapped
}

export const getJobApplications = async (jobId) => {
  const response = await api.get(`/admin/jobs/${jobId}/applications`)
  return response.data?.data || response.data
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
  return response.data?.data || response.data
}
