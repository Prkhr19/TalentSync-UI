import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { getJobById } from '../../Services/JobService'
import { ROUTES } from '../../Routes/Routes'

const formatLabel = (value) => {
  if (!value) return 'Full Time'
  return String(value).toLowerCase().split('_').map((word) => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')
}

const getJobType = (job) => job.jobType || job.jobtype || job.job_type || job.employmentType || job.employment_type
const getExperience = (job) => job.experienceRequired || job.experience || job.requiredExperience || job.experience_required

const JobDetails = () => {
  const [job, setJob] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const { id } = useParams()

  useEffect(() => {
    getJobById(id)
      .then((data) => setJob(data?.job || data))
      .catch((requestError) => {
        setError('Failed to fetch job details. Please try again later.')
        console.error('Error fetching job details: ', requestError)
      })
      .finally(() => setLoading(false))
  }, [id])

  const retryFetch = () => {
    setLoading(true)
    setError('')

    getJobById(id)
      .then((data) => setJob(data?.job || data))
      .catch((requestError) => {
        setError('Failed to fetch job details. Please try again later.')
        console.error('Error fetching job details: ', requestError)
      })
      .finally(() => setLoading(false))
  }

  const salary = typeof job?.salary === 'number' ? job.salary.toLocaleString('en-IN') : job?.salary || 'Not disclosed'
  const postedDate = job?.postedAt ? new Date(job.postedAt).toLocaleDateString('en-IN') : 'Recently'

  return (
      <main className="min-h-[calc(100vh-72px)] bg-[radial-gradient(circle_at_top,_rgba(186,230,253,0.32),_transparent_34%),linear-gradient(180deg,#f8fafc_0%,#eef6fb_100%)] px-4 py-10 text-slate-900 sm:px-6 lg:px-8 lg:py-14">
        <div className="mx-auto max-w-7xl">
          <Link to={ROUTES.JOBS} className="inline-flex items-center gap-2 text-sm font-semibold text-slate-500 transition hover:text-slate-900">
            <span aria-hidden="true">←</span> Back to jobs
          </Link>

          {loading && (
            <section className="mt-6 grid animate-pulse gap-8 lg:grid-cols-[1.15fr_0.85fr]" aria-label="Loading job details">
              <div className="rounded-[2rem] border border-slate-200 bg-white/90 p-8">
                <div className="h-6 w-28 rounded-full bg-slate-200" />
                <div className="mt-7 h-5 w-1/4 rounded bg-slate-100" />
                <div className="mt-4 h-12 w-3/4 rounded bg-slate-200" />
                <div className="mt-8 grid gap-4 sm:grid-cols-3">
                  {[1, 2, 3].map((item) => <div key={item} className="h-24 rounded-2xl bg-slate-100" />)}
                </div>
                <div className="mt-8 h-48 rounded-3xl bg-slate-100" />
              </div>
              <div className="h-[420px] rounded-[2rem] bg-slate-800" />
            </section>
          )}

          {!loading && error && (
            <section className="mt-6 rounded-[2rem] border border-rose-200 bg-white/90 p-10 text-center shadow-sm">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-rose-50 text-xl font-semibold text-rose-600">!</div>
              <h1 className="mt-4 text-2xl font-semibold text-slate-950">Job details unavailable</h1>
              <p className="mt-3 text-sm text-slate-600">{error}</p>
              <div className="mt-6 flex flex-wrap justify-center gap-3">
                <button type="button" onClick={retryFetch} className="rounded-full bg-slate-900 px-6 py-3 text-sm font-semibold text-white transition hover:bg-slate-700">Try Again</button>
                <Link to={ROUTES.JOBS} className="rounded-full border border-slate-300 bg-white px-6 py-3 text-sm font-semibold text-slate-700">Browse Other Jobs</Link>
              </div>
            </section>
          )}

          {!loading && !error && !job && (
            <section className="mt-6 rounded-[2rem] border border-dashed border-slate-300 bg-white/90 p-10 text-center shadow-sm">
              <h1 className="text-2xl font-semibold text-slate-950">Job not found</h1>
              <p className="mt-3 text-sm text-slate-600">This opportunity may no longer be available.</p>
              <Link to={ROUTES.JOBS} className="mt-6 inline-flex rounded-full bg-slate-900 px-6 py-3 text-sm font-semibold text-white">Browse Current Jobs</Link>
            </section>
          )}

          {!loading && !error && job && (
            <div className="mt-6 grid gap-8 lg:grid-cols-[1.15fr_0.85fr]">
              <section className="rounded-[2rem] border border-white/80 bg-white/90 p-7 shadow-[0_20px_60px_rgba(15,23,42,0.10)] backdrop-blur sm:p-8">
                <span className="inline-flex items-center rounded-full border border-sky-200 bg-sky-50 px-4 py-1 text-sm font-medium text-sky-700">Job details</span>
                <div className="mt-5">
                  <p className="text-sm font-medium text-slate-500">{job.companyName || 'Hiring company'}</p>
                  <h1 className="mt-2 text-4xl font-semibold tracking-tight text-slate-950 sm:text-5xl">{job.title}</h1>
                  <p className="mt-4 text-base leading-7 text-slate-600 sm:text-lg">Review the role summary, compare the details, and apply when it feels like the right fit.</p>
                </div>

                <div className="mt-8 grid gap-4 sm:grid-cols-3">
                  {[
                    ['Location', job.location || 'Remote'],
                    ['Salary', salary],
                    ['Posted', postedDate],
                  ].map(([label, value]) => (
                    <div key={label} className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                      <p className="text-sm font-medium text-slate-500">{label}</p>
                      <p className="mt-2 text-base font-semibold text-slate-950">{value}</p>
                    </div>
                  ))}
                </div>

                <div className="mt-8 rounded-3xl border border-slate-200 bg-slate-50 p-6">
                  <h2 className="text-xl font-semibold text-slate-950">Role overview</h2>
                  <p className="mt-4 whitespace-pre-line text-sm leading-7 text-slate-700 sm:text-base">{job.description || 'No description available for this job yet.'}</p>
                </div>

                <div className="mt-8 flex flex-wrap gap-3">
                  <Link to={ROUTES.APPLY_JOBS.replace(':jobId', job.id)} className="inline-flex items-center justify-center rounded-full bg-slate-900 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-slate-900/15 transition hover:-translate-y-0.5 hover:bg-slate-700">Apply Now</Link>
                  <Link to={ROUTES.JOBS} className="inline-flex items-center justify-center rounded-full border border-slate-300 bg-white px-6 py-3 text-sm font-semibold text-slate-700 transition hover:border-slate-400 hover:text-slate-950">Back to jobs</Link>
                </div>
              </section>

              <aside className="relative h-fit overflow-hidden rounded-[2rem] border border-white/80 bg-slate-900 p-7 text-white shadow-[0_20px_60px_rgba(15,23,42,0.16)] sm:p-8 lg:sticky lg:top-6">
                <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-sky-400/20 to-transparent" />
                <div className="relative">
                  <p className="text-sm font-medium text-sky-300">Opportunity snapshot</p>
                  <h2 className="mt-2 text-2xl font-semibold tracking-tight sm:text-3xl">Everything important, ready to review.</h2>
                  <div className="mt-6 space-y-4">
                    <div className="rounded-2xl border border-slate-700 bg-white/5 p-4"><p className="text-sm text-slate-300">Company</p><p className="mt-2 text-lg font-semibold">{job.companyName || 'Hiring company'}</p></div>
                    <div className="rounded-2xl border border-slate-700 bg-white/5 p-4"><p className="text-sm text-slate-300">Role type</p><p className="mt-2 text-lg font-semibold">{formatLabel(getJobType(job))}</p></div>
                    {getExperience(job) && <div className="rounded-2xl border border-slate-700 bg-white/5 p-4"><p className="text-sm text-slate-300">Experience</p><p className="mt-2 text-lg font-semibold">{getExperience(job)}</p></div>}
                    <div className="rounded-2xl border border-slate-700 bg-white/5 p-4"><p className="text-sm text-slate-300">Application tip</p><p className="mt-2 text-sm leading-6 text-slate-300">Make sure your candidate profile and resume PDF are current before applying.</p></div>
                  </div>
                </div>
              </aside>
            </div>
          )}
        </div>
      </main>
  )
}

export default JobDetails
