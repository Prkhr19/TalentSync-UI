const pickFirst = (...values) => values.find((value) => value !== undefined && value !== null && value !== '')

export const normalizeApplication = (application, jobContext = {}) => {
  const candidate = application.candidate || application.candidateDetails || {}
  const profile = candidate.professionalInformation || candidate.profile || application.professionalInformation || {}
  const resume = application.resume || candidate.resume || {}

  return {
    ...application,
    applicationId: pickFirst(application.applicationId, application.id),
    jobId: pickFirst(application.jobId, application.job?.id, jobContext.id),
    jobTitle: pickFirst(application.jobTitle, application.job?.title, jobContext.title),
    companyName: pickFirst(application.companyName, application.job?.companyName, jobContext.companyName),
    candidateId: pickFirst(application.candidateId, candidate.id, candidate.candidateId),
    candidateName: pickFirst(
      application.candidateName,
      application.name,
      application.fullName,
      candidate.fullName,
      candidate.name,
      profile.fullName,
      profile.name,
      'Candidate'
    ),
    candidateEmail: pickFirst(application.candidateEmail, candidate.email, profile.email),
    status: pickFirst(application.status, application.applicationStatus),
    appliedAt: pickFirst(application.appliedAt, application.createdAt, application.appliedDate),
    appliedSalary: pickFirst(application.appliedSalary, application.salary),
    appliedJobDescription: pickFirst(
      application.appliedJobDescription,
      application.jobDescription,
      application.description
    ),
    resumeUrl: pickFirst(
      application.resumeUrl,
      application.resumePath,
      application.cvUrl,
      candidate.resumeUrl,
      candidate.resumePath,
      profile.resumeUrl,
      resume.resumeUrl,
      resume.secureUrl,
      resume.fileUrl
    ),
  }
}

export const normalizeReferral = (referral) => ({
  ...referral,
  referralId: pickFirst(referral.id, referral.referralId),
  candidateName: pickFirst(
    referral.candidateName,
    referral.fullName,
    referral.candidate?.fullName,
    referral.candidate?.name
  ),
  candidateEmail: pickFirst(referral.candidateEmail, referral.candidate?.email),
  jobTitle: pickFirst(referral.jobTitle, referral.job?.title, referral.application?.jobTitle),
  companyName: pickFirst(referral.companyName, referral.clientCompanyName),
  applicationStatus: pickFirst(
    referral.applicationStatus,
    referral.application?.status,
    referral.jobApplicationStatus
  ),
  status: pickFirst(referral.status, referral.referralStatus),
  referredDate: pickFirst(referral.referredDate, referral.createdAt),
})
