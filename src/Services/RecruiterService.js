import api from '../Api/Axios'

export const createCompany= async (companyData) => {
    const response = await api.post('/recruiter/company', companyData)
    return response.data
}

export const createJob=   async (jobData) => {
    const response = await api.post('/recruiter/jobs', jobData)
    return response.data
}

export const myJobs = async () => {
    const response = await api.get('/recruiter/myJobs')
    return response.data
}

export const jobApplicationsByJobId = async (jobId) => {
    const response = await api.get(`/recruiter/job/${jobId}/applications`)
    return response.data
}

export const updateApplicationStatus = async (applicationId, status) => {
    const response = await api.patch(`/recruiter/application/${applicationId}/status`, { status })
    return response.data
}

