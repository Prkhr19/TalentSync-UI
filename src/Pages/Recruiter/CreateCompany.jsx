import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ROUTES } from '../../Routes/Routes'
import { createCompany } from '../../Services/AdminService'

const initialCompanyData = {
  companyName: '',
  companyDescription: '',
  location: '',
  website: '',
}

const inputClassName =
  'w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-sky-400 focus:bg-white focus:ring-4 focus:ring-sky-100'

const CreateCompany = () => {
  const [companyData, setCompanyData] = useState(initialCompanyData)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  const isFormIncomplete = Object.values(companyData).some((value) => value.trim() === '')

  const handleChange = (event) => {
    const { name, value } = event.target
    setCompanyData((currentData) => ({ ...currentData, [name]: value }))
    setError('')
    setSuccess('')
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    setError('')
    setSuccess('')

    if (isFormIncomplete) {
      setError('Please complete every field before saving your company profile.')
      return
    }

    setLoading(true)

    try {
      await createCompany(companyData)
      localStorage.setItem('adminCompanyName', companyData.companyName)
      localStorage.setItem('adminCompanyLocation', companyData.location)
      localStorage.setItem('adminCompanyWebsite', companyData.website)
      setSuccess('Your company profile has been saved successfully.')
    } catch (requestError) {
      const status = requestError?.response?.status
      const message =
        requestError?.response?.data?.message ||
        requestError?.response?.data?.error ||
        requestError?.message ||
        'Failed to save the company profile. Please try again.'

      setError(status === 403 ? `Access denied: ${message}` : message)
      console.error('Error creating company:', requestError)
    } finally {
      setLoading(false)
    }
  }

  return (
      <main className="min-h-[calc(100vh-72px)] bg-[radial-gradient(circle_at_top,_rgba(186,230,253,0.32),_transparent_34%),linear-gradient(180deg,#f8fafc_0%,#eef6fb_100%)] px-4 py-10 text-slate-900 sm:px-6 lg:px-8 lg:py-14">
        <div className="mx-auto max-w-7xl">
          <Link
            to={ROUTES.ADMIN_DASHBOARD}
            className="inline-flex items-center gap-2 text-sm font-semibold text-slate-500 transition hover:text-slate-900"
          >
            <span aria-hidden="true">←</span>
            Back to admin dashboard
          </Link>

          <div className="mt-6 grid gap-8 lg:grid-cols-[1fr_360px] lg:items-start">
            <section className="rounded-[2rem] border border-white/80 bg-white/90 p-6 shadow-[0_20px_60px_rgba(15,23,42,0.10)] backdrop-blur sm:p-8">
              <div className="border-b border-slate-200 pb-7">
                <span className="inline-flex items-center rounded-full border border-sky-200 bg-sky-50 px-4 py-1 text-sm font-medium text-sky-700">
                  Company profile
                </span>
                <h1 className="mt-4 text-4xl font-semibold tracking-tight text-slate-950 sm:text-5xl">
                  Manage your company
                </h1>
                <p className="mt-4 max-w-2xl text-base leading-7 text-slate-600">
                  Give candidates a clear picture of your organization before they explore and apply to your open roles.
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
                    <Link to={ROUTES.CREATE_JOB} className="font-semibold underline underline-offset-4">
                      Post a job
                    </Link>
                  </div>
                )}
              </div>

              <form onSubmit={handleSubmit} className="mt-7 space-y-7">
                <fieldset disabled={loading} className="space-y-7 disabled:opacity-70">
                  <div>
                    <label htmlFor="companyName" className="mb-2 block text-sm font-semibold text-slate-700">
                      Company name <span className="text-rose-500">*</span>
                    </label>
                    <input
                      id="companyName"
                      type="text"
                      name="companyName"
                      value={companyData.companyName}
                      onChange={handleChange}
                      placeholder="e.g. Acme Technologies"
                      autoComplete="organization"
                      className={inputClassName}
                    />
                    <p className="mt-2 text-xs text-slate-500">Use the official name candidates will recognize.</p>
                  </div>

                  <div>
                    <div className="mb-2 flex items-center justify-between gap-4">
                      <label htmlFor="companyDescription" className="text-sm font-semibold text-slate-700">
                        Company description <span className="text-rose-500">*</span>
                      </label>
                      <span className="text-xs text-slate-400">{companyData.companyDescription.length} characters</span>
                    </div>
                    <textarea
                      id="companyDescription"
                      name="companyDescription"
                      value={companyData.companyDescription}
                      onChange={handleChange}
                      placeholder="Share what your company does, who you serve, and what makes it a great place to work..."
                      rows={7}
                      className={`${inputClassName} resize-y leading-6`}
                    />
                    <p className="mt-2 text-xs text-slate-500">A concise overview helps applicants understand your mission and culture.</p>
                  </div>

                  <div className="grid gap-5 sm:grid-cols-2">
                    <div>
                      <label htmlFor="location" className="mb-2 block text-sm font-semibold text-slate-700">
                        Headquarters <span className="text-rose-500">*</span>
                      </label>
                      <input
                        id="location"
                        type="text"
                        name="location"
                        value={companyData.location}
                        onChange={handleChange}
                        placeholder="e.g. Mumbai, India"
                        autoComplete="address-level2"
                        className={inputClassName}
                      />
                    </div>

                    <div>
                      <label htmlFor="website" className="mb-2 block text-sm font-semibold text-slate-700">
                        Company website <span className="text-rose-500">*</span>
                      </label>
                      <input
                        id="website"
                        type="text"
                        name="website"
                        value={companyData.website}
                        onChange={handleChange}
                        placeholder="https://yourcompany.com"
                        autoComplete="url"
                        className={inputClassName}
                      />
                    </div>
                  </div>
                </fieldset>

                <div className="flex flex-col-reverse gap-3 border-t border-slate-200 pt-6 sm:flex-row sm:items-center sm:justify-end">
                  <Link
                    to={ROUTES.ADMIN_DASHBOARD}
                    className="inline-flex items-center justify-center rounded-full border border-slate-300 bg-white px-6 py-3 text-sm font-semibold text-slate-700 transition hover:border-slate-400 hover:text-slate-950"
                  >
                    Cancel
                  </Link>
                  <button
                    type="submit"
                    disabled={loading || isFormIncomplete}
                    className="inline-flex items-center justify-center rounded-full bg-slate-900 px-7 py-3 text-sm font-semibold text-white shadow-lg shadow-slate-900/15 transition hover:-translate-y-0.5 hover:bg-slate-700 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:translate-y-0"
                  >
                    {loading ? 'Saving…' : 'Save Company Profile'}
                  </button>
                </div>
              </form>
            </section>

            <aside className="space-y-5 lg:sticky lg:top-6">
              <div className="relative overflow-hidden rounded-[2rem] bg-slate-900 p-7 text-white shadow-[0_20px_60px_rgba(15,23,42,0.16)]">
                <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-sky-400/20 to-transparent" />
                <div className="relative">
                  <p className="text-sm font-medium text-sky-300">Build candidate trust</p>
                  <h2 className="mt-2 text-2xl font-semibold tracking-tight">Tell a clear company story.</h2>
                  <p className="mt-4 text-sm leading-7 text-slate-300">
                    Candidates use your profile to decide whether your team, mission, and opportunities fit their goals.
                  </p>

                  <div className="mt-6 space-y-4">
                    {[
                      'Explain what your company builds or provides.',
                      'Describe the mission and working culture.',
                      'Add a trustworthy website and location.',
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
                <p className="text-sm font-semibold text-slate-950">Ready to start hiring?</p>
                <p className="mt-2 text-sm leading-6 text-slate-600">Once your company is set up, publish an opportunity for candidates.</p>
                <Link to={ROUTES.CREATE_JOB} className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-sky-700 transition hover:text-sky-900">
                  Post a new job <span aria-hidden="true">→</span>
                </Link>
              </div>
            </aside>
          </div>
        </div>
      </main>
  )
}

export default CreateCompany
