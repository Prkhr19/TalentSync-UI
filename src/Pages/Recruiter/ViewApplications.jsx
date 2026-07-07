import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { ROUTES } from '../../Routes/Routes'
import { getJobApplications } from '../../Services/AdminService'
import { getJobById } from '../../Services/JobService'

const statusOptions = [
  { value: 'APPLIED', label: 'Applied' },
  { value: 'SCREENING', label: 'Screening' },
  { value: 'SHORTLISTED', label: 'Shortlisted' },
  { value: 'REFERRED', label: 'Referred' },
  { value: 'INTERVIEW', label: 'Interview' },
  { value: 'SELECTED', label: 'Selected' },
  { value: 'REJECTED', label: 'Rejected' },
]

const getStatusLabel = (status) => {
  const option = statusOptions.find((item) => item.value === status)
  return option?.label || status || 'Pending'
}

const getStatusStyle = (status) => {
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

const formatDate = (date) => {
  if (!date) return 'Date unavailable'

  const parsedDate = new Date(date)
  if (Number.isNaN(parsedDate.getTime())) return date

  return new Intl.DateTimeFormat('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  }).format(parsedDate)
}

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
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(true)

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
      })
      .catch((requestError) => {
        console.error('Error fetching applications:', requestError)
        setError('We could not load applications for this job. Please try again.')
      })
      .finally(() => setLoading(false))
  }

  useEffect(() => {
    let cancelled = false

    const fetchData = async () => {
      setLoading(true)
      setError('')

      try {
        const [jobResponse, applicationsResponse] = await Promise.all([
          getJobById(jobId).catch(() => null),
          getJobApplications(jobId),
        ])

        if (cancelled) return

        setJob(jobResponse?.job || jobResponse)
        const list = Array.isArray(applicationsResponse)
          ? applicationsResponse
          : applicationsResponse?.applications || applicationsResponse?.content || []
        setApplications(list)
      } catch (requestError) {
        if (cancelled) return
        console.error('Error fetching applications:', requestError)
        setError('We could not load applications for this job. Please try again.')
      } finally {
        if (!cancelled) setLoading(false)
      }
    }

    fetchData()
    return () => {
      cancelled = true
    }
  }, [jobId])

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
                const candidateName = application.name || application.fullName || application.candidateName || 'Candidate'

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
                      <span className={`shrink-0 rounded-full border px-3 py-1 text-xs font-semibold ${getStatusStyle(application.status)}`}>
                        {getStatusLabel(application.status)}
                      </span>
                    </div>

                    <div className="mt-6 grid gap-3 sm:grid-cols-2">
                      <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                        <p className="text-xs font-medium uppercase tracking-[0.12em] text-slate-500">Experience</p>
                        <p className="mt-2 text-sm font-semibold leading-6 text-slate-900">{application.experience || application.totalExperience || 'Not provided'}</p>
                      </div>
                      <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                        <p className="text-xs font-medium uppercase tracking-[0.12em] text-slate-500">Education</p>
                        <p className="mt-2 text-sm font-semibold leading-6 text-slate-900">{application.education || application.highestQualification || 'Not provided'}</p>
                      </div>
                    </div>

                    <div className="mt-3 flex-1 rounded-2xl border border-slate-200 bg-slate-50 p-4">
                      <p className="text-xs font-medium uppercase tracking-[0.12em] text-slate-500">Skills</p>
                      <p className="mt-2 text-sm leading-6 text-slate-700">
                        {Array.isArray(application.skills) ? application.skills.join(', ') : application.skills || 'Not provided'}
                      </p>
                    </div>

                    {application.resumeUrl || application.resumePath ? (
                      <a
                        href={application.resumeUrl || application.resumePath}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-5 inline-flex w-full items-center justify-center rounded-full bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-700"
                      >
                        View Resume
                      </a>
                    ) : (
                      <span className="mt-5 inline-flex w-full items-center justify-center rounded-full border border-slate-200 bg-slate-50 px-5 py-3 text-sm font-medium text-slate-400">
                        Resume unavailable
                      </span>
                    )}
                  </article>
                )
              })}
            </section>
          )}
        </div>
      </main>
  )
}

export default ViewApplications
