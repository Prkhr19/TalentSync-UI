import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { ROUTES } from '../../Routes/Routes'
import { getAllJobs } from '../../Services/JobService'

const formatLabel = (value) => {
  if (!value) return 'Not specified'

  return String(value)
    .toLowerCase()
    .split('_')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')
}

const formatSalary = (salary) => {
  if (salary === null || salary === undefined || salary === '') return 'Not disclosed'

  const numericSalary = Number(salary)
  return Number.isNaN(numericSalary)
    ? salary
    : new Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency: 'INR',
        maximumFractionDigits: 0,
      }).format(numericSalary)
}

const ViewMyJobs = () => {
  const [jobs, setJobs] = useState([])
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(true)

  const fetchMyJobs = () => {
    getAllJobs()
      .then((data) => {
        const jobList = Array.isArray(data) ? data : data?.jobs || data?.content || []
        setJobs(jobList)
      })
      .catch((requestError) => {
        setError('We could not load your posted jobs. Please try again.')
        console.error('Error fetching job details: ', requestError)
      })
      .finally(() => setLoading(false))
  }

  const retryFetch = () => {
    setLoading(true)
    setError('')
    fetchMyJobs()
  }

  useEffect(() => {
    getAllJobs()
      .then((data) => {
        const jobList = Array.isArray(data) ? data : data?.jobs || data?.content || []
        setJobs(jobList)
      })
      .catch((requestError) => {
        setError('We could not load your posted jobs. Please try again.')
        console.error('Error fetching job details: ', requestError)
      })
      .finally(() => setLoading(false))
  }, [])

  return (
      <main className="min-h-[calc(100vh-72px)] bg-[radial-gradient(circle_at_top,_rgba(186,230,253,0.32),_transparent_34%),linear-gradient(180deg,#f8fafc_0%,#eef6fb_100%)] px-4 py-10 text-slate-900 sm:px-6 lg:px-8 lg:py-14">
        <div className="mx-auto max-w-7xl">
          <section className="rounded-[2rem] border border-white/80 bg-white/90 p-7 shadow-[0_20px_60px_rgba(15,23,42,0.10)] backdrop-blur sm:p-8">
            <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
              <div>
                <Link
                  to={ROUTES.ADMIN_DASHBOARD}
                  className="inline-flex items-center gap-2 text-sm font-semibold text-slate-500 transition hover:text-slate-900"
                >
                  <span aria-hidden="true">←</span>
                  Admin dashboard
                </Link>
                <span className="mt-6 flex w-fit items-center rounded-full border border-sky-200 bg-sky-50 px-4 py-1 text-sm font-medium text-sky-700">
                  Hiring workspace
                </span>
                <h1 className="mt-4 text-4xl font-semibold tracking-tight text-slate-950 sm:text-5xl">
                  Your posted jobs
                </h1>
                <p className="mt-4 max-w-2xl text-base leading-7 text-slate-600 sm:text-lg">
                  Review every open role and jump into its candidate pipeline from one tidy view.
                </p>
              </div>

              <Link
                to={ROUTES.CREATE_JOB}
                className="inline-flex shrink-0 items-center justify-center rounded-full bg-slate-900 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-slate-900/15 transition hover:-translate-y-0.5 hover:bg-slate-700"
              >
                <span className="mr-2 text-lg leading-none" aria-hidden="true">+</span>
                Post New Job
              </Link>
            </div>

            {!loading && !error && jobs.length > 0 && (
              <div className="mt-8 flex flex-wrap items-center gap-3 border-t border-slate-200 pt-6">
                <div className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3">
                  <p className="text-xs font-medium uppercase tracking-[0.14em] text-slate-500">Total postings</p>
                  <p className="mt-1 text-2xl font-semibold text-slate-950">{jobs.length}</p>
                </div>
                <p className="text-sm text-slate-500">
                  Select a job to review the candidates who applied.
                </p>
              </div>
            )}
          </section>

          {loading && (
            <section className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-3" aria-label="Loading jobs">
              {[1, 2, 3].map((item) => (
                <div key={item} className="animate-pulse rounded-[2rem] border border-slate-200 bg-white/90 p-6 shadow-sm">
                  <div className="h-6 w-24 rounded-full bg-slate-200" />
                  <div className="mt-6 h-7 w-2/3 rounded bg-slate-200" />
                  <div className="mt-4 h-4 w-full rounded bg-slate-100" />
                  <div className="mt-2 h-4 w-4/5 rounded bg-slate-100" />
                  <div className="mt-7 h-12 rounded-2xl bg-slate-100" />
                </div>
              ))}
            </section>
          )}

          {!loading && error && (
            <section className="mt-8 rounded-[2rem] border border-rose-200 bg-white/90 p-8 text-center shadow-sm">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-rose-50 text-xl text-rose-600">!</div>
              <h2 className="mt-4 text-xl font-semibold text-slate-950">Jobs unavailable</h2>
              <p className="mt-2 text-sm text-slate-600">{error}</p>
              <button
                type="button"
                onClick={retryFetch}
                className="mt-6 rounded-full bg-slate-900 px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-700"
              >
                Try Again
              </button>
            </section>
          )}

          {!loading && !error && jobs.length === 0 && (
            <section className="mt-8 rounded-[2rem] border border-dashed border-slate-300 bg-white/75 p-8 text-center shadow-sm sm:p-12">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-sky-50 text-3xl text-sky-700">＋</div>
              <h2 className="mt-5 text-2xl font-semibold text-slate-950">No jobs posted yet</h2>
              <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-slate-600">
                Create your first listing to start meeting candidates who are right for your team.
              </p>
              <Link
                to={ROUTES.CREATE_JOB}
                className="mt-6 inline-flex items-center justify-center rounded-full bg-slate-900 px-6 py-3 text-sm font-semibold text-white transition hover:bg-slate-700"
              >
                Create First Job
              </Link>
            </section>
          )}

          {!loading && !error && jobs.length > 0 && (
            <section className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
              {jobs.map((job) => (
                <article
                  key={job.id}
                  className="group flex h-full flex-col overflow-hidden rounded-[2rem] border border-white/80 bg-white/90 shadow-[0_14px_40px_rgba(15,23,42,0.07)] transition hover:-translate-y-1 hover:shadow-[0_20px_50px_rgba(15,23,42,0.12)]"
                >
                  <div className="h-1.5 bg-gradient-to-r from-sky-400 via-cyan-300 to-emerald-300" />
                  <div className="flex flex-1 flex-col p-6">
                    <div className="flex items-start justify-between gap-4">
                      <span className="rounded-full border border-sky-100 bg-sky-50 px-3 py-1 text-xs font-semibold text-sky-700">
                        Job posting
                      </span>
                      {job.status && (
                        <span className="flex items-center gap-2 text-xs font-semibold text-emerald-700">
                          <span className="h-2 w-2 rounded-full bg-emerald-400" />
                          {formatLabel(job.status)}
                        </span>
                      )}
                    </div>

                    <h2 className="mt-5 text-2xl font-semibold tracking-tight text-slate-950">{job.title}</h2>

                    <div className="mt-6 grid flex-1 grid-cols-2 gap-3">
                      <div className="rounded-2xl border border-slate-200 bg-slate-50 p-3">
                        <p className="text-xs font-medium text-slate-500">Location</p>
                        <p className="mt-1 text-sm font-semibold text-slate-900">{job.location || 'Not specified'}</p>
                      </div>
                      <div className="rounded-2xl border border-slate-200 bg-slate-50 p-3">
                        <p className="text-xs font-medium text-slate-500">Salary</p>
                        <p className="mt-1 text-sm font-semibold text-slate-900">{formatSalary(job.salary)}</p>
                      </div>
                    </div>

                    <Link
                      to={`/admin/job/${job.id}/applications`}
                      className="mt-6 inline-flex w-full items-center justify-between rounded-full bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition group-hover:bg-slate-700"
                    >
                      View Applications
                      <span aria-hidden="true">→</span>
                    </Link>
                  </div>
                </article>
              ))}
            </section>
          )}
        </div>
      </main>
  )
}

export default ViewMyJobs
