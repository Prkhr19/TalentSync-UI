import { useEffect, useState } from 'react'
import { getAllJobs, searchJobs } from '../../Services/JobService'
import JobCard from '../../Components/JobCard'

const initialFilters = {
  keyword: '',
  location: '',
  jobType: '',
  company: '',
}

const Jobs = () => {
  const [jobs, setJobs] = useState([])
  const [filters, setFilters] = useState(initialFilters)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(true)

  const loadJobs = (searchFilters = null) => {
    setLoading(true)
    setError('')

    const hasFilters = searchFilters
      ? Object.values(searchFilters).some((value) => String(value).trim() !== '')
      : false

    const request = hasFilters
      ? searchJobs({ ...searchFilters, page: 0, size: 50 })
      : getAllJobs()

    request
      .then((data) => setJobs(Array.isArray(data) ? data : data?.jobs || data?.content || []))
      .catch((requestError) => {
        setError('Failed to fetch jobs. Please try again later.')
        console.error('Error fetching jobs: ', requestError)
      })
      .finally(() => setLoading(false))
  }

  useEffect(() => {
    let cancelled = false

    const fetchJobs = async () => {
      try {
        const data = await getAllJobs()
        if (cancelled) return
        setJobs(Array.isArray(data) ? data : data?.jobs || data?.content || [])
      } catch (requestError) {
        if (cancelled) return
        setError('Failed to fetch jobs. Please try again later.')
        console.error('Error fetching jobs: ', requestError)
      } finally {
        if (!cancelled) setLoading(false)
      }
    }

    fetchJobs()
    return () => {
      cancelled = true
    }
  }, [])

  const handleFilterChange = (event) => {
    const { name, value } = event.target
    setFilters((current) => ({ ...current, [name]: value }))
  }

  const handleSearch = (event) => {
    event.preventDefault()
    loadJobs(filters)
  }

  const handleClear = () => {
    setFilters(initialFilters)
    loadJobs()
  }

  return (
      <main className="min-h-[calc(100vh-72px)] bg-[radial-gradient(circle_at_top,_rgba(186,230,253,0.32),_transparent_34%),linear-gradient(180deg,#f8fafc_0%,#eef6fb_100%)] px-4 py-10 text-slate-900 sm:px-6 lg:px-8 lg:py-14">
        <div className="mx-auto max-w-7xl">
          <section className="rounded-[2rem] border border-white/80 bg-white/90 p-7 shadow-[0_20px_60px_rgba(15,23,42,0.10)] backdrop-blur sm:p-8">
            <span className="inline-flex items-center rounded-full border border-sky-200 bg-sky-50 px-4 py-1 text-sm font-medium text-sky-700">
              Browse jobs
            </span>
            <div className="mt-5 grid gap-6 lg:grid-cols-[1fr_auto] lg:items-end">
              <div>
                <h1 className="text-4xl font-semibold tracking-tight text-slate-950 sm:text-5xl">
                  Discover roles that fit your goals.
                </h1>
                <p className="mt-4 max-w-2xl text-base leading-7 text-slate-600 sm:text-lg">
                  Explore open positions in a clean, easy-to-scan layout and jump into the details when a role feels right.
                </p>
              </div>

              {!loading && !error && (
                <div className="rounded-3xl border border-slate-200 bg-slate-50 px-5 py-4">
                  <p className="text-sm font-medium text-slate-500">Open roles</p>
                  <p className="mt-1 text-3xl font-semibold text-slate-950">{jobs.length}</p>
                </div>
              )}
            </div>

            <form onSubmit={handleSearch} className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
              <input
                type="text"
                name="keyword"
                value={filters.keyword}
                onChange={handleFilterChange}
                placeholder="Keyword e.g. java"
                className="w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3 text-sm outline-none focus:border-sky-400 focus:bg-white"
              />
              <input
                type="text"
                name="location"
                value={filters.location}
                onChange={handleFilterChange}
                placeholder="Location"
                className="w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3 text-sm outline-none focus:border-sky-400 focus:bg-white"
              />
              <select
                name="jobType"
                value={filters.jobType}
                onChange={handleFilterChange}
                className="w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3 text-sm outline-none focus:border-sky-400 focus:bg-white"
              >
                <option value="">All job types</option>
                <option value="FULL_TIME">Full Time</option>
                <option value="PART_TIME">Part Time</option>
                <option value="INTERNSHIP">Internship</option>
                <option value="REMOTE">Remote</option>
                <option value="CONTRACT">Contract</option>
              </select>
              <input
                type="text"
                name="company"
                value={filters.company}
                onChange={handleFilterChange}
                placeholder="Company"
                className="w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3 text-sm outline-none focus:border-sky-400 focus:bg-white"
              />
              <div className="md:col-span-2 xl:col-span-4 flex gap-3">
                <button type="submit" className="rounded-full bg-slate-900 px-6 py-3 text-sm font-semibold text-white transition hover:bg-slate-700">
                  Search jobs
                </button>
                <button type="button" onClick={handleClear} className="rounded-full border border-slate-300 bg-white px-6 py-3 text-sm font-semibold text-slate-700 transition hover:border-slate-400">
                  Clear
                </button>
              </div>
            </form>
          </section>

          {loading && (
            <section className="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-3" aria-label="Loading available jobs">
              {[1, 2, 3, 4, 5, 6].map((item) => (
                <div key={item} className="animate-pulse rounded-[2rem] border border-slate-200 bg-white/90 p-6 shadow-sm">
                  <div className="h-4 w-1/3 rounded bg-slate-200" />
                  <div className="mt-4 h-7 w-2/3 rounded bg-slate-200" />
                  <div className="mt-7 space-y-3">
                    <div className="h-4 rounded bg-slate-100" />
                    <div className="h-4 w-4/5 rounded bg-slate-100" />
                    <div className="h-4 w-3/5 rounded bg-slate-100" />
                  </div>
                  <div className="mt-7 h-10 rounded-full bg-slate-200" />
                </div>
              ))}
            </section>
          )}

          {!loading && error && (
            <section className="mt-8 rounded-[2rem] border border-rose-200 bg-white/90 p-8 text-center shadow-sm">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-rose-50 text-xl font-semibold text-rose-600">!</div>
              <h2 className="mt-4 text-xl font-semibold text-slate-950">Jobs unavailable</h2>
              <p className="mt-2 text-sm text-slate-600">{error}</p>
              <button type="button" onClick={() => loadJobs()} className="mt-6 rounded-full bg-slate-900 px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-700">
                Try Again
              </button>
            </section>
          )}

          {!loading && !error && (
            <section className="mt-8">
              <div className="mb-5">
                <p className="text-sm font-medium text-slate-500">Available opportunities</p>
                <h2 className="mt-1 text-2xl font-semibold text-slate-950">Current job openings</h2>
              </div>

              {jobs.length === 0 ? (
                <div className="rounded-[2rem] border border-dashed border-slate-300 bg-white/90 p-10 text-center shadow-sm backdrop-blur">
                  <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-sky-50 text-2xl text-sky-700">⌕</div>
                  <h3 className="mt-5 text-xl font-semibold text-slate-950">No jobs available right now</h3>
                  <p className="mt-3 text-sm leading-6 text-slate-600">Please check back soon for new opportunities.</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
                  {jobs.map((job) => <JobCard key={job.id} job={job} />)}
                </div>
              )}
            </section>
          )}
        </div>
      </main>
  )
}

export default Jobs
