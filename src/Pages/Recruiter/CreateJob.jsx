import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ROUTES } from '../../Routes/Routes'
import { createJob } from '../../Services/AdminService'

const initialJobData = {
  title: '',
  description: '',
  location: '',
  salary: '',
  experienceRequired: '',
  jobType: 'FULL_TIME',
}

const inputClassName =
  'w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-sky-400 focus:bg-white focus:ring-4 focus:ring-sky-100'

const CreateJob = () => {
  const [jobData, setJobData] = useState(initialJobData)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  const isFormIncomplete = Object.values(jobData).some((value) => String(value).trim() === '')

  const handleChange = (event) => {
    const { name, value } = event.target
    setJobData((currentData) => ({ ...currentData, [name]: value }))
    setError('')
    setSuccess('')
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    setError('')
    setSuccess('')

    if (isFormIncomplete) {
      setError('Please complete every field before publishing the job.')
      return
    }

    setLoading(true)

    try {
      await createJob(jobData)
      setSuccess('Your job has been published successfully.')
      setJobData(initialJobData)
    } catch (requestError) {
      const message =
        requestError?.response?.data?.message ||
        requestError?.response?.data?.error ||
        'Failed to publish the job. Please try again.'

      setError(message)
      console.error('Error creating job:', requestError)
    } finally {
      setLoading(false)
    }
  }

  return (
      <main className="min-h-[calc(100vh-72px)] bg-[radial-gradient(circle_at_top,_rgba(186,230,253,0.32),_transparent_34%),linear-gradient(180deg,#f8fafc_0%,#eef6fb_100%)] px-4 py-10 text-slate-900 sm:px-6 lg:px-8 lg:py-14">
        <div className="mx-auto max-w-7xl">
          <Link
            to={ROUTES.VIEW_JOBS}
            className="inline-flex items-center gap-2 text-sm font-semibold text-slate-500 transition hover:text-slate-900"
          >
            <span aria-hidden="true">←</span>
            Back to posted jobs
          </Link>

          <div className="mt-6 grid gap-8 lg:grid-cols-[1fr_360px] lg:items-start">
            <section className="rounded-[2rem] border border-white/80 bg-white/90 p-6 shadow-[0_20px_60px_rgba(15,23,42,0.10)] backdrop-blur sm:p-8">
              <div className="border-b border-slate-200 pb-7">
                <span className="inline-flex items-center rounded-full border border-sky-200 bg-sky-50 px-4 py-1 text-sm font-medium text-sky-700">
                  New opportunity
                </span>
                <h1 className="mt-4 text-4xl font-semibold tracking-tight text-slate-950 sm:text-5xl">
                  Post a new job
                </h1>
                <p className="mt-4 max-w-2xl text-base leading-7 text-slate-600">
                  Share the essentials clearly so the right candidates can understand the role and apply with confidence.
                </p>
              </div>

              <div className="mt-6 space-y-4" aria-live="polite">
                {error && (
                  <div className="flex items-start gap-3 rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">
                    <span className="font-bold" aria-hidden="true">!</span>
                    <p>{error}</p>
                  </div>
                )}

                {success && (
                  <div className="flex flex-col gap-3 rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-4 text-sm text-emerald-800 sm:flex-row sm:items-center sm:justify-between">
                    <p className="font-medium">✓ {success}</p>
                    <Link to={ROUTES.VIEW_JOBS} className="font-semibold underline underline-offset-4">
                      View posted jobs
                    </Link>
                  </div>
                )}
              </div>

              <form onSubmit={handleSubmit} className="mt-7 space-y-7">
                <fieldset disabled={loading} className="space-y-7 disabled:opacity-70">
                  <div>
                    <label htmlFor="title" className="mb-2 block text-sm font-semibold text-slate-700">
                      Job title <span className="text-rose-500">*</span>
                    </label>
                    <input
                      id="title"
                      type="text"
                      name="title"
                      value={jobData.title}
                      onChange={handleChange}
                      placeholder="e.g. Frontend Developer"
                      autoComplete="off"
                      className={inputClassName}
                    />
                    <p className="mt-2 text-xs text-slate-500">Use a familiar title candidates are likely to search for.</p>
                  </div>

                  <div>
                    <div className="mb-2 flex items-center justify-between gap-4">
                      <label htmlFor="description" className="text-sm font-semibold text-slate-700">
                        Job description <span className="text-rose-500">*</span>
                      </label>
                      <span className="text-xs text-slate-400">{jobData.description.length} characters</span>
                    </div>
                    <textarea
                      id="description"
                      name="description"
                      value={jobData.description}
                      onChange={handleChange}
                      placeholder="Describe the role, responsibilities, qualifications, and what makes the opportunity worthwhile..."
                      rows={7}
                      className={`${inputClassName} resize-y leading-6`}
                    />
                  </div>

                  <div className="grid gap-5 sm:grid-cols-2">
                    <div>
                      <label htmlFor="location" className="mb-2 block text-sm font-semibold text-slate-700">
                        Location <span className="text-rose-500">*</span>
                      </label>
                      <input
                        id="location"
                        type="text"
                        name="location"
                        value={jobData.location}
                        onChange={handleChange}
                        placeholder="e.g. Bengaluru or Remote"
                        className={inputClassName}
                      />
                    </div>

                    <div>
                      <label htmlFor="jobType" className="mb-2 block text-sm font-semibold text-slate-700">
                        Employment type <span className="text-rose-500">*</span>
                      </label>
                      <select
                        id="jobType"
                        name="jobType"
                        value={jobData.jobType}
                        onChange={handleChange}
                        className={inputClassName}
                      >
                        <option value="FULL_TIME">Full Time</option>
                        <option value="PART_TIME">Part Time</option>
                        <option value="CONTRACT">Contract</option>
                        <option value="INTERNSHIP">Internship</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid gap-5 sm:grid-cols-2">
                    <div>
                      <label htmlFor="salary" className="mb-2 block text-sm font-semibold text-slate-700">
                        Annual salary <span className="text-rose-500">*</span>
                      </label>
                      <div className="relative">
                        <span className="pointer-events-none absolute inset-y-0 left-4 flex items-center text-sm font-medium text-slate-500">₹</span>
                        <input
                          id="salary"
                          type="number"
                          name="salary"
                          value={jobData.salary}
                          onChange={handleChange}
                          placeholder="600000"
                          min="0"
                          className={`${inputClassName} pl-8`}
                        />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="experienceRequired" className="mb-2 block text-sm font-semibold text-slate-700">
                        Experience required <span className="text-rose-500">*</span>
                      </label>
                      <input
                        id="experienceRequired"
                        type="text"
                        name="experienceRequired"
                        value={jobData.experienceRequired}
                        onChange={handleChange}
                        placeholder="e.g. 2–4 years"
                        className={inputClassName}
                      />
                    </div>
                  </div>
                </fieldset>

                <div className="flex flex-col-reverse gap-3 border-t border-slate-200 pt-6 sm:flex-row sm:items-center sm:justify-end">
                  <Link
                    to={ROUTES.VIEW_JOBS}
                    className="inline-flex items-center justify-center rounded-full border border-slate-300 bg-white px-6 py-3 text-sm font-semibold text-slate-700 transition hover:border-slate-400 hover:text-slate-950"
                  >
                    Cancel
                  </Link>
                  <button
                    type="submit"
                    disabled={loading || isFormIncomplete}
                    className="inline-flex items-center justify-center rounded-full bg-slate-900 px-7 py-3 text-sm font-semibold text-white shadow-lg shadow-slate-900/15 transition hover:-translate-y-0.5 hover:bg-slate-700 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:translate-y-0"
                  >
                    {loading ? 'Publishing…' : 'Publish Job'}
                  </button>
                </div>
              </form>
            </section>

            <aside className="space-y-5 lg:sticky lg:top-6">
              <div className="relative overflow-hidden rounded-[2rem] bg-slate-900 p-7 text-white shadow-[0_20px_60px_rgba(15,23,42,0.16)]">
                <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-sky-400/20 to-transparent" />
                <div className="relative">
                  <p className="text-sm font-medium text-sky-300">Before you publish</p>
                  <h2 className="mt-2 text-2xl font-semibold tracking-tight">Make the role easy to choose.</h2>
                  <div className="mt-6 space-y-4">
                    {[
                      'Use a specific, searchable job title.',
                      'Describe outcomes as well as responsibilities.',
                      'Be transparent about salary and experience.',
                    ].map((tip, index) => (
                      <div key={tip} className="flex items-start gap-3 rounded-2xl border border-slate-700 bg-white/5 p-4">
                        <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-sky-300 text-xs font-bold text-slate-950">
                          {index + 1}
                        </span>
                        <p className="text-sm leading-6 text-slate-300">{tip}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="rounded-[2rem] border border-slate-200 bg-white/90 p-6 shadow-sm">
                <p className="text-sm font-semibold text-slate-950">Need to check existing roles?</p>
                <p className="mt-2 text-sm leading-6 text-slate-600">Review your current listings before creating another one.</p>
                <Link to={ROUTES.VIEW_JOBS} className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-sky-700 transition hover:text-sky-900">
                  View all posted jobs <span aria-hidden="true">→</span>
                </Link>
              </div>
            </aside>
          </div>
        </div>
      </main>
  )
}

export default CreateJob
