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

const SAVED_JOBS_CACHE_KEY = 'candidateSavedJobs'

export const getSavedJobs = () => {
  try {
    const cached = localStorage.getItem(SAVED_JOBS_CACHE_KEY)
    const list = cached ? JSON.parse(cached) : []
    return Array.isArray(list) ? list : []
  } catch {
    return []
  }
}

export const addSavedJobToCache = (job) => {
  if (!job?.id) return getSavedJobs()

  const existing = getSavedJobs().filter((saved) => String(saved.id) !== String(job.id))
  const entry = {
    id: job.id,
    title: job.title || 'Untitled role',
    companyName: job.companyName || '',
    location: job.location || '',
    salary: job.salary ?? null,
    jobType: job.jobType || job.jobtype || '',
    savedAt: new Date().toISOString(),
  }

  const updated = [entry, ...existing]
  localStorage.setItem(SAVED_JOBS_CACHE_KEY, JSON.stringify(updated))
  return updated
}

export const removeSavedJobFromCache = (jobId) => {
  const updated = getSavedJobs().filter((saved) => String(saved.id) !== String(jobId))
  localStorage.setItem(SAVED_JOBS_CACHE_KEY, JSON.stringify(updated))
  return updated
}

export const isJobSaved = (jobId) => {
  return getSavedJobs().some((saved) => String(saved.id) === String(jobId))
}
