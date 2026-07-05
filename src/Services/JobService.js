import api from '../Api/Axios'

export const getAllJobs = async () => {
  const response = await api.get('/jobs')
  return response.data
}

export const getJobById = async (id) => {
  const response = await api.get(`/jobs/${id}`)
  return response.data
}

export const searchJobs = async (searchData) => {
  const response = await api.post('/jobs/search/filter', searchData)
  return response.data
}

export const applyJobs = async (jobId) => {
  const response = await api.post(`/candidate/jobs/${jobId}/apply`)
  return response.data
}

export const saveJob = async (jobId) => {
  const response = await api.post(`/candidate/jobs/${jobId}/saveJob`)
  return response.data
}
