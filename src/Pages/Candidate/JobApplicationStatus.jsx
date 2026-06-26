import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { getApplicationStatus } from '../../Services/CandidateService'
import { ROUTES } from '../../Routes/Routes'

const getStatusLabel = (status) => String(status || 'Pending').toLowerCase().split('_').map((word) => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')

const getStatusTone = (status) => {
  const normalized = String(status || '').toUpperCase()
  if (['SELECTED', 'SHORTLISTED', 'REFERRED'].includes(normalized)) return 'bg-emerald-50 text-emerald-700 border-emerald-200'
  if (normalized === 'REJECTED') return 'bg-rose-50 text-rose-700 border-rose-200'
  if (normalized === 'INTERVIEW') return 'bg-violet-50 text-violet-700 border-violet-200'
  if (normalized === 'SCREENING') return 'bg-sky-50 text-sky-700 border-sky-200'
  if (normalized === 'APPLIED') return 'bg-amber-50 text-amber-700 border-amber-200'
  return 'bg-slate-50 text-slate-700 border-slate-200'
}

const getPostedDate = (date) => {
  if (!date) return 'Recently'
  const parsedDate = new Date(date)
  return Number.isNaN(parsedDate.getTime()) ? date : parsedDate.toLocaleDateString('en-IN')
}

const getCompanyName = (application) => {
  const company = application.company
  const jobCompany = application.job?.company

  return (
    application.companyName ||
    application.company_name ||
    application.employerName ||
    application.adminCompanyName ||
    (typeof company === 'string' ? company : company?.companyName || company?.name) ||
    application.job?.companyName ||
    application.job?.company_name ||
    (typeof jobCompany === 'string' ? jobCompany : jobCompany?.companyName || jobCompany?.name) ||
    'Company not provided'
  )
}

const getJobTitle = (application) =>
  application.title ||
  application.jobTitle ||
  application.position ||
  application.job?.title ||
  'Applied role'

const JobApplicationStatus = () => {
  const [applications, setApplications] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    getApplicationStatus()
      .then((data) => setApplications(Array.isArray(data) ? data : data?.applications || data?.content || []))
      .catch((requestError) => {
        setError('Unable to fetch job applications at this moment.')
        console.error('Error fetching applications: ', requestError)
      })
      .finally(() => setLoading(false))
  }, [])

  const retryFetch = () => {
    setLoading(true)
    setError('')
    getApplicationStatus()
      .then((data) => setApplications(Array.isArray(data) ? data : data?.applications || data?.content || []))
      .catch((requestError) => {
        setError('Unable to fetch job applications at this moment.')
        console.error('Error fetching applications: ', requestError)
      })
      .finally(() => setLoading(false))
  }

  return (
      <main className="min-h-[calc(100vh-72px)] bg-[radial-gradient(circle_at_top,_rgba(186,230,253,0.32),_transparent_34%),linear-gradient(180deg,#f8fafc_0%,#eef6fb_100%)] px-4 py-10 text-slate-900 sm:px-6 lg:px-8 lg:py-14">
        <div className="mx-auto max-w-7xl space-y-8">
          <section className="rounded-[2rem] border border-white/80 bg-white/90 p-7 shadow-[0_20px_60px_rgba(15,23,42,0.10)] backdrop-blur sm:p-8">
            <Link to={ROUTES.CANDIDATE_DASHBOARD} className="inline-flex items-center gap-2 text-sm font-semibold text-slate-500 transition hover:text-slate-900"><span aria-hidden="true">←</span> Candidate dashboard</Link>
            <span className="mt-6 flex w-fit items-center rounded-full border border-sky-200 bg-sky-50 px-4 py-1 text-sm font-medium text-sky-700">Application status</span>
            <div className="mt-5 grid gap-6 lg:grid-cols-[1fr_auto] lg:items-end">
              <div>
                <h1 className="text-4xl font-semibold tracking-tight text-slate-950 sm:text-5xl">Track every application in one place.</h1>
                <p className="mt-4 max-w-2xl text-base leading-7 text-slate-600 sm:text-lg">Review the latest updates for jobs you have applied to and keep your search moving.</p>
              </div>
              {!loading && !error && <div className="rounded-3xl border border-slate-200 bg-slate-50 px-5 py-4"><p className="text-sm font-medium text-slate-500">Total applications</p><p className="mt-1 text-3xl font-semibold text-slate-950">{applications.length}</p></div>}
            </div>
          </section>

          {loading && (
            <section className="grid gap-6 lg:grid-cols-2 xl:grid-cols-3" aria-label="Loading application statuses">
              {[1, 2, 3].map((item) => <div key={item} className="animate-pulse rounded-[2rem] border border-slate-200 bg-white/90 p-6"><div className="h-4 w-1/3 rounded bg-slate-200" /><div className="mt-4 h-7 w-2/3 rounded bg-slate-200" /><div className="mt-6 h-24 rounded-3xl bg-slate-100" /><div className="mt-5 h-28 rounded-3xl bg-slate-100" /></div>)}
            </section>
          )}

          {!loading && error && (
            <section className="rounded-[2rem] border border-rose-200 bg-white/90 p-8 text-center shadow-sm">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-rose-50 text-xl font-semibold text-rose-600">!</div>
              <h2 className="mt-4 text-xl font-semibold text-slate-950">Applications unavailable</h2>
              <p className="mt-2 text-sm text-slate-600">{error}</p>
              <button type="button" onClick={retryFetch} className="mt-6 rounded-full bg-slate-900 px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-700">Try Again</button>
            </section>
          )}

          {!loading && !error && applications.length === 0 && (
            <section className="rounded-[2rem] border border-dashed border-slate-300 bg-white/90 p-10 text-center shadow-sm backdrop-blur">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-sky-50 text-2xl text-sky-700">◎</div>
              <h2 className="mt-5 text-2xl font-semibold text-slate-950">No applications found</h2>
              <p className="mt-3 text-sm leading-6 text-slate-600">Once you apply for a job, its status will appear here.</p>
              <div className="mt-6 flex flex-wrap justify-center gap-3">
                <Link to={ROUTES.JOBS} className="inline-flex items-center justify-center rounded-full bg-slate-900 px-6 py-3 text-sm font-semibold text-white transition hover:bg-slate-700">Browse jobs</Link>
                <Link to={ROUTES.UPDATE_PROFILE} className="inline-flex items-center justify-center rounded-full border border-slate-300 bg-white px-6 py-3 text-sm font-semibold text-slate-700 transition hover:border-slate-400 hover:text-slate-950">Update profile</Link>
              </div>
            </section>
          )}

          {!loading && !error && applications.length > 0 && (
            <section className="grid gap-6 lg:grid-cols-2 xl:grid-cols-3">
              {applications.map((application, index) => (
                <article key={application.applicationId || application.id || index} className="flex h-full flex-col rounded-[2rem] border border-slate-200 bg-white/90 p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md backdrop-blur">
                  <div className="flex items-start justify-between gap-4">
                    <div><p className="text-sm font-medium text-slate-500">{getCompanyName(application)}</p><h2 className="mt-2 text-xl font-semibold text-slate-950">{getJobTitle(application)}</h2></div>
                    <span className={`shrink-0 rounded-full border px-3 py-1 text-xs font-semibold ${getStatusTone(application.status)}`}>{getStatusLabel(application.status)}</span>
                  </div>
                  <div className="mt-5 grid grid-cols-2 gap-3 text-sm">
                    <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4"><p className="text-xs font-medium text-slate-500">Salary</p><p className="mt-2 font-semibold text-slate-900">{typeof application.salary === 'number' ? application.salary.toLocaleString('en-IN') : application.salary || 'Not disclosed'}</p></div>
                    <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4"><p className="text-xs font-medium text-slate-500">Applied</p><p className="mt-2 font-semibold text-slate-900">{getPostedDate(application.appliedAt || application.postedAt)}</p></div>
                  </div>
                  <div className="mt-4 flex-1 rounded-3xl border border-slate-200 bg-slate-50 p-4"><p className="text-sm font-medium text-slate-500">Description</p><p className="mt-2 line-clamp-4 text-sm leading-6 text-slate-700">{application.description || 'No description available.'}</p></div>
                </article>
              ))}
            </section>
          )}
        </div>
      </main>
  )
}

export default JobApplicationStatus
