import { useEffect, useState } from 'react'
import { getCandidateProfile, updateCandidateProfile } from '../../Services/CandidateService'
import { Link } from 'react-router-dom'
import { ROUTES } from '../../Routes/Routes'

const initialProfileData = {
  name: '',
  phoneNo: '',
  skills: '',
  education: '',
  location: '',
  currentCompany: '',
  currentDesignation: '',
  totalExperience: '',
  currentCTC: '',
  expectedCTC: '',
  noticePeriod: '',
  preferredLocation: '',
  linkedInUrl: '',
  githubUrl: '',
  portfolioUrl: '',
  resumeHeadline: '',
}

const inputClassName =
  'w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-slate-400 focus:bg-white focus:ring-4 focus:ring-sky-100'

const CandidateUpdateProfile = () => {
  const [profileData, setProfileData] = useState(initialProfileData)
  const [resumeFile, setResumeFile] = useState(null)
  const [existingResumeName, setExistingResumeName] = useState('')
  const [loading, setLoading] = useState(false)
  const [loadingProfile, setLoadingProfile] = useState(true)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  useEffect(() => {
    getCandidateProfile()
      .then((data) => {
        const profile = data?.profile || data
        if (profile) {
          setProfileData((current) => ({
            ...current,
            name: profile.name || '',
            phoneNo: profile.phoneNo || profile.phone || '',
            skills: profile.skills || '',
            education: profile.education || '',
            location: profile.location || '',
            currentCompany: profile.currentCompany || '',
            currentDesignation: profile.currentDesignation || '',
            totalExperience: profile.totalExperience ?? profile.experience ?? '',
            currentCTC: profile.currentCTC ?? '',
            expectedCTC: profile.expectedCTC ?? '',
            noticePeriod: profile.noticePeriod || '',
            preferredLocation: profile.preferredLocation || '',
            linkedInUrl: profile.linkedInUrl || '',
            githubUrl: profile.githubUrl || '',
            portfolioUrl: profile.portfolioUrl || '',
            resumeHeadline: profile.resumeHeadline || '',
          }))
          setExistingResumeName(profile.resumeFileName || profile.resumeName || '')
        }
      })
      .catch((requestError) => {
        console.error('Error loading profile:', requestError)
      })
      .finally(() => setLoadingProfile(false))
  }, [])

  const handleChange = (e) => {
    setProfileData({ ...profileData, [e.target.name]: e.target.value })
    setError('')
    setSuccess('')
  }

  const handleFileChange = (e) => {
    const file = e.target.files?.[0]
    if (!file) return

    if (file.type !== 'application/pdf') {
      setError('Please upload a PDF resume.')
      return
    }

    setResumeFile(file)
    setError('')
    setSuccess('')
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setSuccess('')

    const requiredFields = ['name', 'phoneNo', 'skills', 'education', 'location', 'resumeHeadline']
    const missingField = requiredFields.find((field) => !String(profileData[field] || '').trim())

    if (missingField) {
      setError('Please fill in all required fields.')
      return
    }

    if (!resumeFile && !existingResumeName) {
      setError('Please upload your resume as a PDF.')
      return
    }

    setLoading(true)
    try {
      await updateCandidateProfile(profileData, resumeFile)
      localStorage.setItem('candidateName', profileData.name)
      localStorage.setItem('candidateEducation', profileData.education)
      localStorage.setItem('candidateSkills', profileData.skills)
      if (resumeFile) {
        setExistingResumeName(resumeFile.name)
        setResumeFile(null)
      }
      setSuccess('Your profile has been updated successfully.')
    } catch (requestError) {
      const message =
        requestError.response?.data?.message ||
        requestError.response?.data?.error ||
        requestError.message ||
        'Failed to update profile. Please try again later.'
      setError(message)
      console.error('Error updating profile: ', requestError.response || requestError)
    } finally {
      setLoading(false)
    }
  }

  return (
      <main className="min-h-[calc(100vh-72px)] bg-[radial-gradient(circle_at_top,_rgba(186,230,253,0.32),_transparent_34%),linear-gradient(180deg,#f8fafc_0%,#eef6fb_100%)] px-4 py-10 text-slate-900 sm:px-6 lg:px-8 lg:py-14">
        <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
          <section className="rounded-[2rem] border border-white/80 bg-white/90 p-7 shadow-[0_20px_60px_rgba(15,23,42,0.10)] backdrop-blur sm:p-8">
            <span className="inline-flex items-center rounded-full border border-sky-200 bg-sky-50 px-4 py-1 text-sm font-medium text-sky-700">
              Candidate profile
            </span>
            <h1 className="mt-5 text-4xl font-semibold tracking-tight text-slate-950 sm:text-5xl">
              Keep your profile polished and ready.
            </h1>
            <p className="mt-4 max-w-2xl text-base leading-7 text-slate-600 sm:text-lg">
              A complete profile helps hiring teams understand your background quickly and improves your
              chances of being referred.
            </p>

            <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
                <p className="text-sm font-medium text-slate-500">What to include</p>
                <ul className="mt-3 space-y-2 text-sm leading-6 text-slate-700">
                  <li>Current company, designation, and experience</li>
                  <li>CTC, notice period, and preferred location</li>
                  <li>A PDF resume and professional links</li>
                </ul>
              </div>

              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
                <p className="text-sm font-medium text-slate-500">Quick links</p>
                <div className="mt-3 flex flex-wrap gap-3">
                  <Link
                    to={ROUTES.CANDIDATE_DASHBOARD}
                    className="inline-flex items-center justify-center rounded-full border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition hover:border-slate-400 hover:text-slate-950"
                  >
                    Back to dashboard
                  </Link>
                  <Link
                    to={ROUTES.APPPLICATION_STATUS}
                    className="inline-flex items-center justify-center rounded-full bg-slate-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-700"
                  >
                    View applications
                  </Link>
                </div>
              </div>
            </div>
          </section>

          <section className="relative rounded-[2rem] border border-white/80 bg-white/90 p-7 shadow-[0_20px_60px_rgba(15,23,42,0.10)] backdrop-blur sm:p-8">
            <div className="absolute -inset-4 -z-10 rounded-[2rem] bg-gradient-to-br from-sky-200/70 via-white to-emerald-100/70 blur-2xl" />

            <div className="relative border-b border-slate-200 pb-5">
              <h2 className="text-2xl font-semibold text-slate-950">Update your profile</h2>
              <p className="mt-2 text-sm leading-6 text-slate-500">
                Fill in the fields below and upload your resume PDF.
              </p>
            </div>

            {loadingProfile && (
              <p className="relative mt-5 text-sm text-slate-500">Loading profile...</p>
            )}

            {error && (
              <div className="relative mt-5 rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">
                {error}
              </div>
            )}

            {success && (
              <div className="relative mt-5 flex items-center justify-between gap-4 rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700">
                <span>✓ {success}</span>
                <Link to={ROUTES.CANDIDATE_DASHBOARD} className="font-semibold underline underline-offset-4">
                  View dashboard
                </Link>
              </div>
            )}

            <form onSubmit={handleSubmit} className="relative mt-6 space-y-5">
              <div className="grid gap-5 md:grid-cols-2">
                {[
                  ['name', 'Name', 'text', 'Enter name'],
                  ['phoneNo', 'Phone number', 'text', 'Enter phone number'],
                  ['location', 'Location', 'text', 'Enter location'],
                  ['resumeHeadline', 'Resume headline', 'text', 'Short professional headline'],
                  ['currentCompany', 'Current company', 'text', 'Enter current company'],
                  ['currentDesignation', 'Current designation', 'text', 'Enter designation'],
                  ['totalExperience', 'Total experience (years)', 'text', 'e.g. 3'],
                  ['currentCTC', 'Current CTC', 'text', 'e.g. 800000'],
                  ['expectedCTC', 'Expected CTC', 'text', 'e.g. 1000000'],
                  ['noticePeriod', 'Notice period', 'text', 'e.g. 30 days'],
                  ['preferredLocation', 'Preferred location', 'text', 'Enter preferred location'],
                  ['linkedInUrl', 'LinkedIn URL', 'url', 'https://linkedin.com/in/...'],
                  ['githubUrl', 'GitHub URL', 'url', 'https://github.com/...'],
                  ['portfolioUrl', 'Portfolio URL', 'url', 'https://...'],
                ].map(([name, label, type, placeholder]) => (
                  <div key={name}>
                    <label className="mb-2 block text-sm font-medium text-slate-700" htmlFor={name}>
                      {label}
                    </label>
                    <input
                      type={type}
                      id={name}
                      name={name}
                      value={profileData[name]}
                      onChange={handleChange}
                      placeholder={placeholder}
                      className={inputClassName}
                    />
                  </div>
                ))}

                <div className="md:col-span-2">
                  <label className="mb-2 block text-sm font-medium text-slate-700" htmlFor="skills">
                    Skills
                  </label>
                  <input
                    type="text"
                    id="skills"
                    name="skills"
                    value={profileData.skills}
                    onChange={handleChange}
                    placeholder="Enter skills, separated by commas"
                    className={inputClassName}
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="mb-2 block text-sm font-medium text-slate-700" htmlFor="education">
                    Education
                  </label>
                  <input
                    type="text"
                    id="education"
                    name="education"
                    value={profileData.education}
                    onChange={handleChange}
                    placeholder="Enter education"
                    className={inputClassName}
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="mb-2 block text-sm font-medium text-slate-700" htmlFor="resume">
                    Resume (PDF)
                  </label>
                  <input
                    type="file"
                    id="resume"
                    accept="application/pdf"
                    onChange={handleFileChange}
                    className="w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3 text-sm text-slate-700 file:mr-4 file:rounded-full file:border-0 file:bg-slate-900 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-white"
                  />
                  {existingResumeName && (
                    <p className="mt-2 text-xs text-slate-500">Current resume: {existingResumeName}</p>
                  )}
                  {resumeFile && (
                    <p className="mt-2 text-xs text-emerald-700">Selected: {resumeFile.name}</p>
                  )}
                </div>
              </div>

              <div className="pt-1">
                <button
                  type="submit"
                  disabled={loading || loadingProfile}
                  className="inline-flex w-full items-center justify-center rounded-full bg-slate-900 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-slate-900/15 transition hover:-translate-y-0.5 hover:bg-slate-700 disabled:cursor-not-allowed disabled:opacity-70"
                >
                  {loading ? 'Updating...' : 'Save Profile'}
                </button>
              </div>
            </form>
          </section>
        </div>
      </main>
  )
}

export default CandidateUpdateProfile
