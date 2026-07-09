import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ROUTES } from '../../Routes/Routes'
import { getSavedJobs, removeSavedJobFromCache } from '../../Services/JobService'
import { formatDate } from '../../utils/formatters'

const formatLabel = (value) => {
  if (!value) return 'Full Time'
  return String(value)
    .toLowerCase()
    .split('_')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')
}

const formatSalary = (salary) => {
  if (salary === null || salary === undefined || salary === '') return 'Not disclosed'
  return typeof salary === 'number' ? salary.toLocaleString('en-IN') : salary
}

const SavedJobs = () => {
  const [savedJobs, setSavedJobs] = useState(() => getSavedJobs())

  const handleRemove = (jobId) => {
    setSavedJobs(removeSavedJobFromCache(jobId))
  }

  return (
    <main className="min-h-[calc(100vh-72px)] bg-[radial-gradient(circle_at_top,_rgba(186,230,253,0.32),_transparent_34%),linear-gradient(180deg,#f8fafc_0%,#eef6fb_100%)] px-4 py-10 text-slate-900 sm:px-6 lg:px-8 lg:py-14">
      <div className="mx-auto max-w-5xl space-y-8">
        <section className="rounded-[2rem] border border-white/80 bg-white/90 p-7 shadow-[0_20px_60px_rgba(15,23,42,0.10)] backdrop-blur sm:p-8">
          <Link
            to={ROUTES.CANDIDATE_DASHBOARD}
            className="inline-flex items-center gap-2 text-sm font-semibold text-slate-500 transition hover:text-slate-900"
          >
            <span aria-hidden="true">←</span> Candidate dashboard
          </Link>
          <span className="mt-6 flex w-fit items-center rounded-full border border-sky-200 bg-sky-50 px-4 py-1 text-sm font-medium text-sky-700">
            Saved jobs
          </span>
          <h1 className="mt-4 text-4xl font-semibold tracking-tight text-slate-950 sm:text-5xl">
            Your saved roles
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-7 text-slate-600 sm:text-lg">
            Jobs you saved are kept here on this device so you can revisit and apply when you are ready.
          </p>
        </section>

        {savedJobs.length === 0 ? (
          <section className="rounded-[2rem] border border-dashed border-slate-300 bg-white/90 p-10 text-center shadow-sm">
            <h2 className="text-2xl font-semibold text-slate-950">No saved jobs yet</h2>
            <p className="mt-3 text-sm text-slate-600">
              Open a job and tap “Save Job” to keep it here for later.
            </p>
            <Link
              to={ROUTES.JOBS}
              className="mt-6 inline-flex rounded-full bg-slate-900 px-6 py-3 text-sm font-semibold text-white transition hover:bg-slate-700"
            >
              Browse Jobs
            </Link>
          </section>
        ) : (
          <section className="grid gap-5 sm:grid-cols-2">
            {savedJobs.map((job) => (
              <article
                key={job.id}
                className="flex min-w-0 flex-col rounded-[2rem] border border-slate-200 bg-white/90 p-6 shadow-sm"
              >
                <div className="min-w-0">
                  <p className="text-sm font-medium text-slate-500">{job.companyName || 'Hiring company'}</p>
                  <h2 className="mt-1 break-words text-xl font-semibold text-slate-950">{job.title}</h2>
                </div>

                <div className="mt-4 grid gap-2 text-sm text-slate-600">
                  <p><span className="text-slate-500">Location:</span> {job.location || 'Remote'}</p>
                  <p><span className="text-slate-500">Salary:</span> {formatSalary(job.salary)}</p>
                  <p><span className="text-slate-500">Type:</span> {formatLabel(job.jobType)}</p>
                  <p><span className="text-slate-500">Saved:</span> {formatDate(job.savedAt)}</p>
                </div>

                <div className="mt-6 flex flex-wrap gap-3">
                  <Link
                    to={ROUTES.JOB_DETAILSBYID.replace(':id', job.id)}
                    className="inline-flex items-center justify-center rounded-full bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-700"
                  >
                    View Details
                  </Link>
                  <Link
                    to={ROUTES.APPLY_JOBS.replace(':jobId', job.id)}
                    className="inline-flex items-center justify-center rounded-full border border-slate-300 bg-white px-5 py-2.5 text-sm font-semibold text-slate-700 transition hover:border-slate-400 hover:text-slate-950"
                  >
                    Apply
                  </Link>
                  <button
                    type="button"
                    onClick={() => handleRemove(job.id)}
                    className="inline-flex items-center justify-center rounded-full border border-rose-200 bg-rose-50 px-5 py-2.5 text-sm font-semibold text-rose-700 transition hover:bg-rose-100"
                  >
                    Remove
                  </button>
                </div>
              </article>
            ))}
          </section>
        )}
      </div>
    </main>
  )
}

export default SavedJobs
