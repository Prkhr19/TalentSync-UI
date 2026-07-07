import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import CreateReferralModal from '../../Components/CreateReferralModal'
import { ROUTES } from '../../Routes/Routes'
import { getJobApplications, updateApplicationStatus } from '../../Services/AdminService'
import { createReferral } from '../../Services/ReferralService'
import { getJobById } from '../../Services/JobService'
import {
  APPLICATION_STATUS_OPTIONS,
  getApplicationStatusLabel,
  getApplicationStatusStyle,
} from '../../utils/applicationConstants'
import { getApiErrorMessage } from '../../utils/apiErrors'
import { formatDate } from '../../utils/formatters'

const selectClassName =
  'w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-slate-400 focus:ring-4 focus:ring-sky-100'

const getInitials = (name) => {
  if (!name) return 'CA'

  return name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part.charAt(0).toUpperCase())
    .join('')
}

const ViewApplications = () => {
  const { jobId } = useParams()
  const [job, setJob] = useState(null)
  const [applications, setApplications] = useState([])
  const [statusDrafts, setStatusDrafts] = useState({})
  const [savingId, setSavingId] = useState(null)
  const [referralTarget, setReferralTarget] = useState(null)
  const [creatingReferral, setCreatingReferral] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(true)

  const syncStatusDrafts = (list) => {
    const drafts = {}
    list.forEach((application) => {
      const id = application.applicationId || application.id
      if (id) {
        drafts[id] = application.status || 'APPLIED'
      }
    })
    setStatusDrafts(drafts)
  }

  const loadData = () => {
    setLoading(true)
    setError('')

    Promise.all([
      getJobById(jobId).catch(() => null),
      getJobApplications(jobId),
    ])
      .then(([jobResponse, applicationsResponse]) => {
        setJob(jobResponse?.job || jobResponse)
        const list = Array.isArray(applicationsResponse)
          ? applicationsResponse
          : applicationsResponse?.applications || applicationsResponse?.content || []
        setApplications(list)
        syncStatusDrafts(list)
      })
      .catch((requestError) => {
        console.error('Error fetching applications:', requestError)
        setError('We could not load applications for this job. Please try again.')
      })
      .finally(() => setLoading(false))
  }

  useEffect(() => {
    loadData()
  }, [jobId])

  const handleStatusChange = (applicationId, status) => {
    setStatusDrafts((current) => ({ ...current, [applicationId]: status }))
  }

  const handleSaveStatus = async (applicationId) => {
    const status = statusDrafts[applicationId]
    if (!status) return

    setSavingId(applicationId)

    try {
      await updateApplicationStatus(applicationId, status)
      setApplications((current) =>
        current.map((application) =>
          (application.applicationId || application.id) === applicationId
            ? { ...application, status }
            : application
        )
      )
      toast.success('Application status updated successfully.')
    } catch (requestError) {
      toast.error(getApiErrorMessage(requestError, 'Failed to update application status. Please try again.'))
      console.error('Error updating application status:', requestError)
    } finally {
      setSavingId(null)
    }
  }

  const handleCreateReferral = async (referralData) => {
    if (!referralTarget) return

    const applicationId = referralTarget.applicationId || referralTarget.id
    if (!applicationId) {
      toast.error('Application ID is missing. Please refresh and try again.')
      return
    }

    setCreatingReferral(true)

    try {
      await createReferral(applicationId, referralData)

      setApplications((current) =>
        current.map((application) =>
          (application.applicationId || application.id) === applicationId
            ? { ...application, status: 'REFERRED' }
            : application
        )
      )
      setStatusDrafts((current) => ({ ...current, [applicationId]: 'REFERRED' }))
      setReferralTarget(null)
      toast.success('Referral created. Application status is now REFERRED.')
    } catch (requestError) {
      toast.error(getApiErrorMessage(requestError, 'Failed to create referral.'))
      console.error('Create referral failed:', {
        applicationId,
        url: `/admin/applications/${applicationId}/referrals`,
        error: requestError.response?.data || requestError.message,
      })
    } finally {
      setCreatingReferral(false)
    }
  }

  return (
      <main className="min-h-[calc(100vh-72px)] bg-[radial-gradient(circle_at_top,_rgba(186,230,253,0.32),_transparent_34%),linear-gradient(180deg,#f8fafc_0%,#eef6fb_100%)] px-4 py-10 text-slate-900 sm:px-6 lg:px-8 lg:py-14">
        <div className="mx-auto max-w-7xl">
          <section className="rounded-[2rem] border border-white/80 bg-white/90 p-7 shadow-[0_20px_60px_rgba(15,23,42,0.10)] backdrop-blur sm:p-8">
            <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
              <div>
                <Link
                  to={ROUTES.VIEW_JOBS}
                  className="inline-flex items-center gap-2 text-sm font-semibold text-slate-500 transition hover:text-slate-900"
                >
                  <span aria-hidden="true">←</span>
                  Back to posted jobs
                </Link>
                <span className="mt-6 flex w-fit items-center rounded-full border border-sky-200 bg-sky-50 px-4 py-1 text-sm font-medium text-sky-700">
                  Application pipeline
                </span>
                <h1 className="mt-4 text-4xl font-semibold tracking-tight text-slate-950 sm:text-5xl">
                  Review applications
                </h1>
                <p className="mt-4 max-w-2xl text-base leading-7 text-slate-600 sm:text-lg">
                  {job?.title
                    ? `Applications submitted for ${job.title}.`
                    : 'Review candidates who applied to this job.'}
                </p>
                <Link
                  to={ROUTES.ADMIN_APPLICATIONS}
                  className="mt-4 inline-flex text-sm font-semibold text-sky-700 underline underline-offset-4"
                >
                  View all applications
                </Link>
              </div>

              {!loading && !error && (
                <div className="shrink-0 rounded-2xl border border-slate-200 bg-slate-50 px-5 py-4">
                  <p className="text-xs font-medium uppercase tracking-[0.14em] text-slate-500">Applications</p>
                  <p className="mt-1 text-3xl font-semibold text-slate-950">{applications.length}</p>
                </div>
              )}
            </div>
          </section>

          {loading && (
            <section className="mt-8 grid gap-5 lg:grid-cols-2" aria-label="Loading applications">
              {[1, 2, 3, 4].map((item) => (
                <div key={item} className="animate-pulse rounded-[2rem] border border-slate-200 bg-white/90 p-6 shadow-sm">
                  <div className="flex gap-4">
                    <div className="h-14 w-14 rounded-2xl bg-slate-200" />
                    <div className="flex-1">
                      <div className="h-6 w-1/2 rounded bg-slate-200" />
                      <div className="mt-3 h-4 w-1/3 rounded bg-slate-100" />
                    </div>
                  </div>
                  <div className="mt-6 h-24 rounded-2xl bg-slate-100" />
                </div>
              ))}
            </section>
          )}

          {!loading && error && (
            <section className="mt-8 rounded-[2rem] border border-rose-200 bg-white/90 p-8 text-center shadow-sm">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-rose-50 text-xl text-rose-600">!</div>
              <h2 className="mt-4 text-xl font-semibold text-slate-950">Applications unavailable</h2>
              <p className="mt-2 text-sm text-slate-600">{error}</p>
              <button
                type="button"
                onClick={loadData}
                className="mt-6 rounded-full bg-slate-900 px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-700"
              >
                Try Again
              </button>
            </section>
          )}

          {!loading && !error && applications.length === 0 && (
            <section className="mt-8 rounded-[2rem] border border-dashed border-slate-300 bg-white/75 p-8 text-center shadow-sm sm:p-12">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-sky-50 text-2xl text-sky-700">◎</div>
              <h2 className="mt-5 text-2xl font-semibold text-slate-950">No applications yet</h2>
              <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-slate-600">
                Candidates have not applied for this role yet. New applications will appear here automatically.
              </p>
              <Link
                to={ROUTES.VIEW_JOBS}
                className="mt-6 inline-flex items-center justify-center rounded-full bg-slate-900 px-6 py-3 text-sm font-semibold text-white transition hover:bg-slate-700"
              >
                Return to My Jobs
              </Link>
            </section>
          )}

          {!loading && !error && applications.length > 0 && (
            <section className="mt-8 grid gap-5 lg:grid-cols-2">
              {applications.map((application) => {
                const applicationId = application.applicationId || application.id
                const candidateName = application.candidateName || application.name || application.fullName || 'Candidate'
                const selectedStatus = statusDrafts[applicationId] ?? application.status ?? 'APPLIED'
                const isReferred = application.status === 'REFERRED'
                const canCreateReferral = application.status === 'SHORTLISTED'
                const hasStatusChange = selectedStatus !== application.status

                return (
                  <article
                    key={applicationId}
                    className="flex h-full flex-col rounded-[2rem] border border-white/80 bg-white/90 p-6 shadow-[0_14px_40px_rgba(15,23,42,0.07)] transition hover:shadow-[0_20px_50px_rgba(15,23,42,0.11)] sm:p-7"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex min-w-0 items-center gap-4">
                        <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-slate-900 text-base font-semibold text-white">
                          {getInitials(candidateName)}
                        </div>
                        <div className="min-w-0">
                          <h2 className="truncate text-xl font-semibold text-slate-950">{candidateName}</h2>
                          <p className="mt-1 text-sm text-slate-500">Applied {formatDate(application.appliedAt)}</p>
                        </div>
                      </div>
                      <span className={`shrink-0 rounded-full border px-3 py-1 text-xs font-semibold ${getApplicationStatusStyle(application.status)}`}>
                        {getApplicationStatusLabel(application.status)}
                      </span>
                    </div>

                    <div className="mt-6 grid gap-3 sm:grid-cols-2">
                      <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                        <p className="text-xs font-medium uppercase tracking-[0.12em] text-slate-500">Candidate ID</p>
                        <p className="mt-2 text-sm font-semibold leading-6 text-slate-900">{application.candidateId || 'Not available'}</p>
                      </div>
                      <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                        <p className="text-xs font-medium uppercase tracking-[0.12em] text-slate-500">Candidate Email</p>
                        <p className="mt-2 text-sm font-semibold leading-6 text-slate-900 break-all">{application.candidateEmail || 'Not available'}</p>
                      </div>
                    </div>

                    <div className="mt-3 flex-1 rounded-2xl border border-slate-200 bg-slate-50 p-4">
                      <p className="text-xs font-medium uppercase tracking-[0.12em] text-slate-500">Applied Job Description</p>
                      <p className="mt-2 text-sm leading-6 text-slate-700">
                        {application.appliedJobDescription || 'Not available'}
                      </p>
                    </div>

                    <div className="mt-3 grid gap-3 sm:grid-cols-2">
                      <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                        <p className="text-xs font-medium uppercase tracking-[0.12em] text-slate-500">Applied Salary</p>
                        <p className="mt-2 text-sm font-semibold leading-6 text-slate-900">
                          {application.appliedSalary !== undefined && application.appliedSalary !== null
                            ? `₹${Number(application.appliedSalary).toLocaleString('en-IN')}`
                            : 'Not available'}
                        </p>
                      </div>
                      <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                        <p className="text-xs font-medium uppercase tracking-[0.12em] text-slate-500">Job Title</p>
                        <p className="mt-2 text-sm font-semibold leading-6 text-slate-900">{application.jobTitle || job?.title || 'Not available'}</p>
                      </div>
                    </div>

                    <div className="mt-5 rounded-2xl border border-slate-200 bg-slate-50 p-4">
                      <label
                        className="mb-2 block text-xs font-medium uppercase tracking-[0.12em] text-slate-500"
                        htmlFor={`status-${applicationId}`}
                      >
                        Update application status
                      </label>

                      {isReferred ? (
                        <p className="text-sm text-slate-600">
                          This application has been referred. Manage referral progress from the Referrals page.
                        </p>
                      ) : (
                        <>
                          <select
                            id={`status-${applicationId}`}
                            value={selectedStatus}
                            onChange={(event) => handleStatusChange(applicationId, event.target.value)}
                            className={selectClassName}
                            disabled={savingId === applicationId}
                          >
                            {APPLICATION_STATUS_OPTIONS.map((option) => (
                              <option key={option.value} value={option.value}>
                                {option.label}
                              </option>
                            ))}
                          </select>
                          <button
                            type="button"
                            onClick={() => handleSaveStatus(applicationId)}
                            disabled={savingId === applicationId || !hasStatusChange}
                            className="mt-3 inline-flex w-full items-center justify-center rounded-full bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-700 disabled:cursor-not-allowed disabled:opacity-60"
                          >
                            {savingId === applicationId ? 'Saving...' : 'Update Status'}
                          </button>
                          {!canCreateReferral && application.status !== 'REFERRED' && (
                            <p className="mt-3 text-xs text-slate-500">
                              Set status to Shortlisted and save to enable referral creation.
                            </p>
                          )}
                        </>
                      )}

                      {canCreateReferral && (
                        <button
                          type="button"
                          onClick={() => setReferralTarget({ ...application, applicationId })}
                          className="mt-3 inline-flex w-full items-center justify-center rounded-full border border-indigo-200 bg-indigo-50 px-5 py-3 text-sm font-semibold text-indigo-700 transition hover:bg-indigo-100"
                        >
                          Create Referral
                        </button>
                      )}
                    </div>
                  </article>
                )
              })}
            </section>
          )}
        </div>

        <CreateReferralModal
          application={referralTarget}
          isOpen={Boolean(referralTarget)}
          isSubmitting={creatingReferral}
          onClose={() => setReferralTarget(null)}
          onSubmit={handleCreateReferral}
        />
      </main>
  )
}

export default ViewApplications
