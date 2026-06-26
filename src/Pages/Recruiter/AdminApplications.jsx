import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { ROUTES } from '../../Routes/Routes'
import { getAdminJobs } from '../../Services/AdminService'

const AdminApplications = () => {
  const [jobs, setJobs] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    getAdminJobs()
      .then((data) => {
        const jobList = Array.isArray(data) ? data : data?.jobs || data?.content || []
        setJobs(jobList)
      })
      .catch((requestError) => {
        console.error('Error fetching jobs:', requestError)
        setError('Unable to load applications workspace.')
      })
      .finally(() => setLoading(false))
  }, [])

  return (
      <main className="min-h-[calc(100vh-72px)] bg-[radial-gradient(circle_at_top,_rgba(186,230,253,0.32),_transparent_34%),linear-gradient(180deg,#f8fafc_0%,#eef6fb_100%)] px-4 py-10 text-slate-900 sm:px-6 lg:px-8 lg:py-14">
        <div className="mx-auto max-w-7xl space-y-8">
          <section className="rounded-[2rem] border border-white/80 bg-white/90 p-7 shadow-[0_20px_60px_rgba(15,23,42,0.10)] backdrop-blur sm:p-8">
            <Link to={ROUTES.ADMIN_DASHBOARD} className="inline-flex items-center gap-2 text-sm font-semibold text-slate-500 transition hover:text-slate-900">
              <span aria-hidden="true">←</span> Admin dashboard
            </Link>
            <span className="mt-6 flex w-fit items-center rounded-full border border-sky-200 bg-sky-50 px-4 py-1 text-sm font-medium text-sky-700">
              Applications
            </span>
            <h1 className="mt-4 text-4xl font-semibold tracking-tight text-slate-950 sm:text-5xl">
              Manage application pipelines
            </h1>
            <p className="mt-4 max-w-2xl text-base leading-7 text-slate-600 sm:text-lg">
              Select a job to review candidates and update their application status.
            </p>
          </section>

          {loading && <p className="text-sm text-slate-500">Loading jobs...</p>}
          {error && <p className="rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">{error}</p>}

          {!loading && !error && jobs.length === 0 && (
            <section className="rounded-[2rem] border border-dashed border-slate-300 bg-white/90 p-10 text-center shadow-sm">
              <h2 className="text-2xl font-semibold text-slate-950">No jobs available</h2>
              <p className="mt-3 text-sm text-slate-600">Post a job first to start receiving applications.</p>
              <Link to={ROUTES.CREATE_JOB} className="mt-6 inline-flex rounded-full bg-slate-900 px-6 py-3 text-sm font-semibold text-white">
                Create job
              </Link>
            </section>
          )}

          {!loading && jobs.length > 0 && (
            <section className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
              {jobs.map((job) => (
                <article key={job.id} className="rounded-[2rem] border border-slate-200 bg-white/90 p-6 shadow-sm">
                  <p className="text-sm text-slate-500">{job.companyName || 'Company'}</p>
                  <h2 className="mt-2 text-xl font-semibold text-slate-950">{job.title}</h2>
                  <p className="mt-3 text-sm text-slate-600">{job.location || 'Location not specified'}</p>
                  <Link
                    to={`/admin/job/${job.id}/applications`}
                    className="mt-6 inline-flex w-full items-center justify-center rounded-full bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-700"
                  >
                    Review applications
                  </Link>
                </article>
              ))}
            </section>
          )}
        </div>
      </main>
  )
}

export default AdminApplications
