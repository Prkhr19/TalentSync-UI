import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { ROUTES } from '../../Routes/Routes'
import { getCandidates, searchCandidates, downloadCandidateResume } from '../../Services/AdminService'

const inputClassName =
  'w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-sky-400 focus:bg-white focus:ring-4 focus:ring-sky-100'

const AdminCandidates = () => {
  const [candidates, setCandidates] = useState([])
  const [filters, setFilters] = useState({
    skills: '',
    experience: '',
    location: '',
    noticePeriod: '',
  })
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [downloadingId, setDownloadingId] = useState(null)

  const loadCandidates = (searchFilters = filters) => {
    setLoading(true)
    setError('')

    const hasFilters = Object.values(searchFilters).some((value) => String(value).trim() !== '')
    const request = hasFilters ? searchCandidates(searchFilters) : getCandidates()

    request
      .then((data) => {
        const list = Array.isArray(data) ? data : data?.candidates || data?.content || []
        setCandidates(list)
      })
      .catch((requestError) => {
        console.error('Error fetching candidates:', requestError)
        setError('Unable to load candidates. Please try again.')
      })
      .finally(() => setLoading(false))
  }

  useEffect(() => {
    loadCandidates()
  }, [])

  const handleFilterChange = (event) => {
    const { name, value } = event.target
    setFilters((current) => ({ ...current, [name]: value }))
  }

  const handleSearch = (event) => {
    event.preventDefault()
    loadCandidates(filters)
  }

  const handleDownloadResume = async (candidateId, candidateName) => {
    setDownloadingId(candidateId)
    try {
      const blob = await downloadCandidateResume(candidateId)
      const url = window.URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.href = url
      link.download = `${candidateName || 'candidate'}-resume.pdf`
      document.body.appendChild(link)
      link.click()
      link.remove()
      window.URL.revokeObjectURL(url)
    } catch (requestError) {
      console.error('Error downloading resume:', requestError)
      setError('Could not download resume for this candidate.')
    } finally {
      setDownloadingId(null)
    }
  }

  return (
      <main className="min-h-[calc(100vh-72px)] bg-[radial-gradient(circle_at_top,_rgba(186,230,253,0.32),_transparent_34%),linear-gradient(180deg,#f8fafc_0%,#eef6fb_100%)] px-4 py-10 text-slate-900 sm:px-6 lg:px-8 lg:py-14">
        <div className="mx-auto max-w-7xl space-y-8">
          <section className="rounded-[2rem] border border-white/80 bg-white/90 p-7 shadow-[0_20px_60px_rgba(15,23,42,0.10)] backdrop-blur sm:p-8">
            <Link to={ROUTES.ADMIN_DASHBOARD} className="inline-flex items-center gap-2 text-sm font-semibold text-slate-500 transition hover:text-slate-900">
              <span aria-hidden="true">←</span> Admin dashboard
            </Link>
            <span className="mt-6 flex w-fit items-center rounded-full border border-sky-200 bg-sky-50 px-4 py-1 text-sm font-medium text-sky-700">
              Candidate database
            </span>
            <h1 className="mt-4 text-4xl font-semibold tracking-tight text-slate-950 sm:text-5xl">
              Search and review candidates
            </h1>
            <p className="mt-4 max-w-2xl text-base leading-7 text-slate-600 sm:text-lg">
              Filter by skills, experience, location, and notice period to find the right talent.
            </p>
          </section>

          <section className="rounded-[2rem] border border-slate-200 bg-white/90 p-6 shadow-sm sm:p-8">
            <form onSubmit={handleSearch} className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
              {[
                ['skills', 'Skills'],
                ['experience', 'Experience'],
                ['location', 'Location'],
                ['noticePeriod', 'Notice period'],
              ].map(([name, label]) => (
                <div key={name}>
                  <label className="mb-2 block text-sm font-medium text-slate-700" htmlFor={name}>
                    {label}
                  </label>
                  <input
                    id={name}
                    name={name}
                    value={filters[name]}
                    onChange={handleFilterChange}
                    placeholder={`Filter by ${label.toLowerCase()}`}
                    className={inputClassName}
                  />
                </div>
              ))}
              <div className="md:col-span-2 xl:col-span-4 flex gap-3">
                <button type="submit" className="rounded-full bg-slate-900 px-6 py-3 text-sm font-semibold text-white transition hover:bg-slate-700">
                  Search candidates
                </button>
                <button
                  type="button"
                  onClick={() => {
                    const cleared = { skills: '', experience: '', location: '', noticePeriod: '' }
                    setFilters(cleared)
                    loadCandidates(cleared)
                  }}
                  className="rounded-full border border-slate-300 bg-white px-6 py-3 text-sm font-semibold text-slate-700 transition hover:border-slate-400"
                >
                  Clear filters
                </button>
              </div>
            </form>
          </section>

          {loading && <p className="text-sm text-slate-500">Loading candidates...</p>}
          {error && <p className="rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">{error}</p>}

          {!loading && !error && candidates.length === 0 && (
            <section className="rounded-[2rem] border border-dashed border-slate-300 bg-white/90 p-10 text-center shadow-sm">
              <h2 className="text-2xl font-semibold text-slate-950">No candidates found</h2>
              <p className="mt-3 text-sm text-slate-600">Try adjusting your search filters.</p>
            </section>
          )}

          {!loading && candidates.length > 0 && (
            <section className="grid gap-5 lg:grid-cols-2">
              {candidates.map((candidate) => {
                const candidateId = candidate.candidateId || candidate.id
                return (
                  <article key={candidateId} className="rounded-[2rem] border border-slate-200 bg-white/90 p-6 shadow-sm">
                    <h2 className="text-xl font-semibold text-slate-950">{candidate.name || 'Candidate'}</h2>
                    <p className="mt-1 text-sm text-slate-500">{candidate.currentDesignation || candidate.resumeHeadline || 'Profile available'}</p>
                    <div className="mt-5 grid gap-3 sm:grid-cols-2 text-sm">
                      <div className="rounded-2xl border border-slate-200 bg-slate-50 p-3">
                        <p className="text-xs text-slate-500">Experience</p>
                        <p className="mt-1 font-semibold">{candidate.totalExperience || candidate.experience || 'N/A'}</p>
                      </div>
                      <div className="rounded-2xl border border-slate-200 bg-slate-50 p-3">
                        <p className="text-xs text-slate-500">Location</p>
                        <p className="mt-1 font-semibold">{candidate.preferredLocation || candidate.location || 'N/A'}</p>
                      </div>
                      <div className="rounded-2xl border border-slate-200 bg-slate-50 p-3 sm:col-span-2">
                        <p className="text-xs text-slate-500">Skills</p>
                        <p className="mt-1">{candidate.skills || 'Not provided'}</p>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleDownloadResume(candidateId, candidate.name)}
                      disabled={downloadingId === candidateId}
                      className="mt-5 inline-flex w-full items-center justify-center rounded-full border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-slate-700 transition hover:border-slate-400 disabled:opacity-60"
                    >
                      {downloadingId === candidateId ? 'Downloading...' : 'Download Resume'}
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

export default AdminCandidates
