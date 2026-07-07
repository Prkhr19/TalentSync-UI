export const APPLICATION_STATUS_OPTIONS = [
  { value: 'APPLIED', label: 'Applied' },
  { value: 'SCREENING', label: 'Screening' },
  { value: 'SHORTLISTED', label: 'Shortlisted' },
  { value: 'INTERVIEW', label: 'Interview' },
  { value: 'SELECTED', label: 'Selected' },
  { value: 'REJECTED', label: 'Rejected' },
]

export const REFERRAL_STATUS_OPTIONS = [
  { value: 'SENT', label: 'Sent' },
  { value: 'ACKNOWLEDGED', label: 'Acknowledged' },
  { value: 'INTERVIEW_SCHEDULED', label: 'Interview Scheduled' },
  { value: 'CLOSED', label: 'Closed' },
  { value: 'REJECTED', label: 'Rejected' },
  // Backend enum fallbacks
  { value: 'REFERRED', label: 'Referred' },
  { value: 'CONTACT_ACKNOWLEDGED', label: 'Contact Acknowledged' },
  { value: 'INTERVIEW_COMPLETED', label: 'Interview Completed' },
  { value: 'OFFER_RECEIVED', label: 'Offer Received' },
  { value: 'JOINED', label: 'Joined' },
]

export const getApplicationStatusLabel = (status) => {
  const option = APPLICATION_STATUS_OPTIONS.find((item) => item.value === status)
  if (option) return option.label
  if (status === 'REFERRED') return 'Referred'
  return status || 'Pending'
}

export const getReferralStatusLabel = (status) => {
  const option = REFERRAL_STATUS_OPTIONS.find((item) => item.value === status)
  return option?.label || status || 'Pending'
}

export const getApplicationStatusStyle = (status) => {
  const styles = {
    APPLIED: 'border-amber-200 bg-amber-50 text-amber-700',
    SCREENING: 'border-sky-200 bg-sky-50 text-sky-700',
    SHORTLISTED: 'border-cyan-200 bg-cyan-50 text-cyan-700',
    REFERRED: 'border-indigo-200 bg-indigo-50 text-indigo-700',
    INTERVIEW: 'border-violet-200 bg-violet-50 text-violet-700',
    SELECTED: 'border-emerald-200 bg-emerald-50 text-emerald-700',
    REJECTED: 'border-rose-200 bg-rose-50 text-rose-700',
  }
  return styles[status] || styles.APPLIED
}
