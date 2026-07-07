import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { getApplicationStatus } from '../../Services/CandidateService'
import { ROUTES } from '../../Routes/Routes'
import { getApplicationStatusLabel, getApplicationStatusStyle } from '../../utils/applicationConstants'

const JobApplicationStatus = () => {
  const [applications, setApplications] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const loadApplications = () => {
    setLoading(true)
    setError('')

    getApplicationStatus()
      .then((data) => setApplications(Array.isArray(data) ? data : data?.applications || data?.content || []))
      .catch((requestError) => {
        const message = requestError.response?.status === 401
          ? 'Your session expired. Please log in again.'
          : 'Unable to fetch job applications at this moment.'
        setError(message)
        console.error('Error fetching applications: ', requestError)
      })
      .finally(() => setLoading(false))
  }

  useEffect(() => {
    loadApplications()
  }, [])

  return (
    <main className="min-h-[calc(100vh-72px)] bg-[radial-gradient(circle_at_top,_rgba(186,230,253,0.32),_transparent_34%),linear-gradient(180deg,#f8fafc_0%,#eef6fb_100%)] px-4 py-10 text-slate-900 sm:px-6 lg:px-8 lg:py-14">
      <div className="mx-auto max-w-7xl space-y-8">
        <section className="rounded-[2rem] border border-white/80 bg-white/90 p-7 shadow-[0_20px_60px_rgba(15,23,42,0.10)] backdrop-blur sm:p-8">
          <Link to={ROUTES.CANDIDATE_DASHBOARD} className="inline-flex items-center gap-2 text-sm font-semibold text-slate-500 transition hover:text-slate-900">
            <span aria-hidden="true">←</span> Candidate dashboard
          </Link>
          <span className="mt-6 flex w-fit items-center rounded-full border border-sky-200 bg-sky-50 px-4 py-1 text-sm font-medium text-sky-700">
            Application status
          </span>
          <div className="mt-5 grid gap-6 lg:grid-cols-[1fr_auto] lg:items-end">
            <div>
              <h1 className="text-4xl font-semibold tracking-tight text-slate-950 sm:text-5xl">
                Track your application progress
              </h1>
              <p className="mt-4 max-w-2xl text-base leading-7 text-slate-600 sm:text-lg">
                View the current status of jobs you have applied to. Referral management is handled by the admin team.
              </p>
            </div>
            {!loading && !error && (
              <div className="rounded-3xl border border-slate-200 bg-slate-50 px-5 py-4">
                <p className="text-sm font-medium text-slate-500">Total applications</p>
                <p className="mt-1 text-3xl font-semibold text-slate-950">{applications.length}</p>
              </div>
            )}
          </div>
        </section>

        {loading && (
          <section className="grid gap-6 lg:grid-cols-2 xl:grid-cols-3" aria-label="Loading application statuses">
            {[1, 2, 3].map((item) => (
              <div key={item} className="animate-pulse rounded-[2rem] border border-slate-200 bg-white/90 p-6">
                <div className="h-4 w-1/3 rounded bg-slate-200" />
                <div className="mt-4 h-7 w-2/3 rounded bg-slate-200" />
                <div className="mt-6 h-16 rounded-3xl bg-slate-100" />
              </div>
            ))}
          </section>
        )}

        {!loading && error && (
          <section className="rounded-[2rem] border border-rose-200 bg-white/90 p-8 text-center shadow-sm">
            <h2 className="text-xl font-semibold text-slate-950">Applications unavailable</h2>
            <p className="mt-2 text-sm text-slate-600">{error}</p>
            <button
              type="button"
              onClick={loadApplications}
              className="mt-6 rounded-full bg-slate-900 px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-700"
            >
              Try Again
            </button>
          </section>
        )}

        {!loading && !error && applications.length === 0 && (
          <section className="rounded-[2rem] border border-dashed border-slate-300 bg-white/90 p-10 text-center shadow-sm backdrop-blur">
            <h2 className="text-2xl font-semibold text-slate-950">No applications found</h2>
            <p className="mt-3 text-sm leading-6 text-slate-600">Once you apply for a job, its status will appear here.</p>
            <div className="mt-6 flex flex-wrap justify-center gap-3">
              <Link to={ROUTES.JOBS} className="inline-flex items-center justify-center rounded-full bg-slate-900 px-6 py-3 text-sm font-semibold text-white transition hover:bg-slate-700">
                Browse jobs
              </Link>
              <Link to={ROUTES.UPDATE_PROFILE} className="inline-flex items-center justify-center rounded-full border border-slate-300 bg-white px-6 py-3 text-sm font-semibold text-slate-700 transition hover:border-slate-400">
                Update profile
              </Link>
            </div>
          </section>
        )}

        {!loading && !error && applications.length > 0 && (
          <section className="grid gap-6 lg:grid-cols-2 xl:grid-cols-3">
            {applications.map((application, index) => {
              const jobTitle = application.jobTitle || application.description || 'Applied role'
              const companyName = application.companyName || application.message || application.company || 'Company not specified'

              return (
                <article
                  key={application.applicationId || application.id || index}
                  className="flex h-full flex-col rounded-[2rem] border border-slate-200 bg-white/90 p-6 shadow-sm backdrop-blur"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="text-sm font-medium text-slate-500">{companyName}</p>
                      <h2 className="mt-2 text-xl font-semibold text-slate-950">{jobTitle}</h2>
                    </div>
                    <span className={`shrink-0 rounded-full border px-3 py-1 text-xs font-semibold ${getApplicationStatusStyle(application.status)}`}>
                      {getApplicationStatusLabel(application.status)}
                    </span>
                  </div>

                  <div className="mt-6 rounded-2xl border border-slate-200 bg-slate-50 p-4">
                    <p className="text-xs font-medium uppercase tracking-[0.12em] text-slate-500">Current status</p>
                    <p className="mt-2 text-lg font-semibold text-slate-900">
                      {getApplicationStatusLabel(application.status)}
                    </p>
                  </div>
                </article>
              )
            })}
          </section>
        )}
      </div>
    </main>
  )
}

export default JobApplicationStatus
