import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { ROUTES } from '../../Routes/Routes'
import { getCandidates, getCandidateById } from '../../Services/AdminService'
import { getJobById } from '../../Services/JobService'

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
  const [candidates, setCandidates] = useState([])
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(true)
  const [openingId, setOpeningId] = useState(null)

  const loadData = () => {
    setLoading(true)
    setError('')

    Promise.all([
      getJobById(jobId).catch(() => null),
      getCandidates({ page: 0, size: 50 }),
    ])
      .then(([jobResponse, candidateResponse]) => {
        setJob(jobResponse?.job || jobResponse)
        const list = Array.isArray(candidateResponse)
          ? candidateResponse
          : candidateResponse?.candidates || candidateResponse?.content || []
        setCandidates(list)
      })
      .catch((requestError) => {
        console.error('Error fetching candidates:', requestError)
        setError('We could not load candidates for this job. Please try again.')
      })
      .finally(() => setLoading(false))
  }

  useEffect(() => {
    let cancelled = false

    const fetchData = async () => {
      setLoading(true)
      setError('')

      try {
        const [jobResponse, candidateResponse] = await Promise.all([
          getJobById(jobId).catch(() => null),
          getCandidates({ page: 0, size: 50 }),
        ])

        if (cancelled) return

        setJob(jobResponse?.job || jobResponse)
        const list = Array.isArray(candidateResponse)
          ? candidateResponse
          : candidateResponse?.candidates || candidateResponse?.content || []
        setCandidates(list)
      } catch (requestError) {
        if (cancelled) return
        console.error('Error fetching candidates:', requestError)
        setError('We could not load candidates for this job. Please try again.')
      } finally {
        if (!cancelled) setLoading(false)
      }
    }

    fetchData()
    return () => {
      cancelled = true
    }
  }, [jobId])

  const handleViewResume = async (candidate) => {
    const candidateId = candidate.candidateId || candidate.id

    if (candidate.resumeUrl) {
      window.open(candidate.resumeUrl, '_blank', 'noopener,noreferrer')
      return
    }

    setOpeningId(candidateId)
    try {
      const detail = await getCandidateById(candidateId)
      const resumeUrl = detail?.resumeUrl
      if (resumeUrl) {
        window.open(resumeUrl, '_blank', 'noopener,noreferrer')
      } else {
        setError('No resume available for this candidate.')
      }
    } catch (requestError) {
      console.error('Error opening resume:', requestError)
      setError('Could not open resume for this candidate.')
    } finally {
      setOpeningId(null)
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
                  Candidate pipeline
                </span>
                <h1 className="mt-4 text-4xl font-semibold tracking-tight text-slate-950 sm:text-5xl">
                  Review candidates
                </h1>
                <p className="mt-4 max-w-2xl text-base leading-7 text-slate-600 sm:text-lg">
                  {job?.title ? `Reviewing candidates for ${job.title}.` : 'Review candidate profiles and open resumes from the admin candidate pool.'}
                </p>
              </div>

              {!loading && !error && (
                <div className="shrink-0 rounded-2xl border border-slate-200 bg-slate-50 px-5 py-4">
                  <p className="text-xs font-medium uppercase tracking-[0.14em] text-slate-500">Candidates</p>
                  <p className="mt-1 text-3xl font-semibold text-slate-950">{candidates.length}</p>
                </div>
              )}
            </div>
          </section>

          {loading && (
            <section className="mt-8 grid gap-5 lg:grid-cols-2" aria-label="Loading candidates">
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
                  <div className="mt-5 h-12 rounded-full bg-slate-200" />
                </div>
              ))}
            </section>
          )}

          {!loading && error && (
            <section className="mt-8 rounded-[2rem] border border-rose-200 bg-white/90 p-8 text-center shadow-sm">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-rose-50 text-xl text-rose-600">!</div>
              <h2 className="mt-4 text-xl font-semibold text-slate-950">Candidates unavailable</h2>
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

          {!loading && !error && candidates.length === 0 && (
            <section className="mt-8 rounded-[2rem] border border-dashed border-slate-300 bg-white/75 p-8 text-center shadow-sm sm:p-12">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-sky-50 text-2xl text-sky-700">◎</div>
              <h2 className="mt-5 text-2xl font-semibold text-slate-950">No candidates found</h2>
              <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-slate-600">
                Candidate profiles will appear here once available in the admin pool.
              </p>
              <Link
                to={ROUTES.ADMIN_CANDIDATES}
                className="mt-6 inline-flex items-center justify-center rounded-full bg-slate-900 px-6 py-3 text-sm font-semibold text-white transition hover:bg-slate-700"
              >
                Search Candidates
              </Link>
            </section>
          )}

          {!loading && !error && candidates.length > 0 && (
            <section className="mt-8 grid gap-5 lg:grid-cols-2">
              {candidates.map((candidate) => {
                const candidateId = candidate.candidateId || candidate.id
                const isOpening = openingId === candidateId

                return (
                  <article
                    key={candidateId}
                    className="flex h-full flex-col rounded-[2rem] border border-white/80 bg-white/90 p-6 shadow-[0_14px_40px_rgba(15,23,42,0.07)] transition hover:shadow-[0_20px_50px_rgba(15,23,42,0.11)] sm:p-7"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex min-w-0 items-center gap-4">
                        <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-slate-900 text-base font-semibold text-white">
                          {getInitials(candidate.fullName || candidate.name)}
                        </div>
                        <div className="min-w-0">
                          <h2 className="truncate text-xl font-semibold text-slate-950">{candidate.fullName || candidate.name || 'Candidate'}</h2>
                          <p className="mt-1 text-sm text-slate-500">{candidate.currentDesignation || 'Profile available'}</p>
                        </div>
                      </div>
                    </div>

                    <div className="mt-6 grid gap-3 sm:grid-cols-2">
                      <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                        <p className="text-xs font-medium uppercase tracking-[0.12em] text-slate-500">Experience</p>
                        <p className="mt-2 text-sm font-semibold leading-6 text-slate-900">{candidate.totalExperience || 'Not provided'}</p>
                      </div>
                      <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                        <p className="text-xs font-medium uppercase tracking-[0.12em] text-slate-500">Location</p>
                        <p className="mt-2 text-sm font-semibold leading-6 text-slate-900">{candidate.preferredLocation || candidate.location || 'Not provided'}</p>
                      </div>
                    </div>

                    <div className="mt-3 flex-1 rounded-2xl border border-slate-200 bg-slate-50 p-4">
                      <p className="text-xs font-medium uppercase tracking-[0.12em] text-slate-500">Skills</p>
                      <p className="mt-2 text-sm leading-6 text-slate-700">
                        {Array.isArray(candidate.skills) ? candidate.skills.join(', ') : candidate.skills || 'Not provided'}
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={() => handleViewResume(candidate)}
                      disabled={isOpening}
                      className="mt-5 inline-flex w-full items-center justify-center rounded-full bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-700 disabled:cursor-wait disabled:opacity-60"
                    >
                      {isOpening ? 'Opening resume…' : 'View Resume'}
                    </button>
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
