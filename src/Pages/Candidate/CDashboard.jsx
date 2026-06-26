import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { ROUTES } from '../../Routes/Routes'

const CDashboard = () => {
  const summaryCards = [
    { label: 'Profile readiness', value: 'High' },
    { label: 'Open applications', value: '03' },
    { label: 'Recommended jobs', value: '12' },
  ]

  const nextSteps = [
    'Finish your profile to improve visibility with hiring teams.',
    'Apply to two new roles today to keep momentum going.',
    'Check application status for any pending responses.',
  ]

  const [activeSlide, setActiveSlide] = useState(0)

  const candidateName = localStorage.getItem('candidateName') || 'Candidate'
  const candidateEducation = localStorage.getItem('candidateEducation') || 'Add your education in Update Profile'
  const candidateSkills = localStorage.getItem('candidateSkills') || 'Add your skills in Update Profile'

  const profileSlides = useMemo(
    () => [
      {
        title: 'Profile overview',
        content: `Name: ${candidateName}\nEducation: ${candidateEducation}\nSkills: ${candidateSkills}`,
      },
      {
        title: 'Top strengths',
        content: 'Frontend development, responsive UI building, and strong collaboration across product and engineering.',
      },
      {
        title: 'Current goal',
        content: 'Actively searching for product-focused roles with growth opportunities and meaningful user impact.',
      },
    ],
    [candidateEducation, candidateName, candidateSkills]
  )

  const goToPrevious = () => {
    setActiveSlide((prev) => (prev === 0 ? profileSlides.length - 1 : prev - 1))
  }

  const goToNext = () => {
    setActiveSlide((prev) => (prev === profileSlides.length - 1 ? 0 : prev + 1))
  }

  return (
      <main className="min-h-[calc(100vh-72px)] bg-[radial-gradient(circle_at_top,_rgba(186,230,253,0.32),_transparent_34%),linear-gradient(180deg,#f8fafc_0%,#eef6fb_100%)] px-4 py-10 text-slate-900 sm:px-6 lg:px-8 lg:py-14">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[320px_1fr]">
          <aside className="rounded-[2rem] border border-white/80 bg-white/90 p-6 shadow-[0_20px_60px_rgba(15,23,42,0.10)] backdrop-blur lg:sticky lg:top-6 lg:h-fit">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-sky-700">My profile</p>
            <h2 className="mt-3 text-2xl font-semibold text-slate-950">{candidateName}</h2>

            <div className="mt-6 rounded-3xl border border-slate-200 bg-slate-50 p-4">
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium text-slate-600">Slider</p>
                <p className="text-xs font-semibold text-slate-500">
                  {activeSlide + 1}/{profileSlides.length}
                </p>
              </div>

              <div className="mt-4 min-h-[130px] rounded-2xl border border-slate-200 bg-white p-4">
                <h3 className="text-base font-semibold text-slate-900">{profileSlides[activeSlide].title}</h3>
                <p className="mt-2 whitespace-pre-line text-sm leading-6 text-slate-600">
                  {profileSlides[activeSlide].content}
                </p>
              </div>

              <div className="mt-4 grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={goToPrevious}
                  className="rounded-full border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition hover:border-slate-400 hover:text-slate-950"
                >
                  Previous
                </button>
                <button
                  type="button"
                  onClick={goToNext}
                  className="rounded-full bg-slate-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-700"
                >
                  Next
                </button>
              </div>
            </div>

            <Link
              to={ROUTES.UPDATE_PROFILE}
              className="mt-5 inline-flex w-full items-center justify-center rounded-full border border-slate-300 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:border-slate-400 hover:text-slate-950"
            >
              Edit Profile
            </Link>
          </aside>

          <div className="space-y-8">
            <section className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr] lg:items-stretch">
              <div className="rounded-[2rem] border border-white/80 bg-white/90 p-7 shadow-[0_20px_60px_rgba(15,23,42,0.10)] backdrop-blur sm:p-8">
                <span className="inline-flex items-center rounded-full border border-sky-200 bg-sky-50 px-4 py-1 text-sm font-medium text-sky-700">
                  Candidate dashboard
                </span>
                <h1 className="mt-5 text-4xl font-semibold tracking-tight text-slate-950 sm:text-5xl">
                  Manage your job search in one calm workspace.
                </h1>
                <p className="mt-4 max-w-2xl text-base leading-7 text-slate-600 sm:text-lg">
                  Keep your profile ready, track progress, and explore new roles without the clutter.
                </p>

                <div className="mt-8 flex flex-wrap gap-3">
                  <Link
                    to={ROUTES.JOBS}
                    className="inline-flex items-center justify-center rounded-full bg-slate-900 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-slate-900/15 transition hover:-translate-y-0.5 hover:bg-slate-700"
                  >
                    Browse Jobs
                  </Link>
                  <Link
                    to={ROUTES.UPDATE_PROFILE}
                    className="inline-flex items-center justify-center rounded-full border border-slate-300 bg-white px-6 py-3 text-sm font-semibold text-slate-700 transition hover:border-slate-400 hover:text-slate-950"
                  >
                    Update Profile
                  </Link>
                  <Link
                    to={ROUTES.CANDIDATE_REFERRALS}
                    className="inline-flex items-center justify-center rounded-full border border-slate-300 bg-white px-6 py-3 text-sm font-semibold text-slate-700 transition hover:border-slate-400 hover:text-slate-950"
                  >
                    View Referrals
                  </Link>
                </div>

                <div className="mt-8 grid gap-4 sm:grid-cols-3">
                  {summaryCards.map((card) => (
                    <div key={card.label} className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                      <p className="text-sm font-medium text-slate-500">{card.label}</p>
                      <p className="mt-2 text-2xl font-semibold text-slate-950">{card.value}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="relative rounded-[2rem] border border-white/80 bg-slate-900 p-7 text-white shadow-[0_20px_60px_rgba(15,23,42,0.16)] sm:p-8">
                <div className="absolute inset-x-0 top-0 h-24 rounded-t-[2rem] bg-gradient-to-b from-sky-400/20 to-transparent" />
                <div className="relative">
                  <p className="text-sm font-medium text-sky-300">Today&apos;s focus</p>
                  <h2 className="mt-2 text-2xl font-semibold tracking-tight sm:text-3xl">
                    Stay visible and move faster.
                  </h2>
                  <p className="mt-4 text-sm leading-7 text-slate-300 sm:text-base">
                    A complete profile and active applications help you stay ready for the right opportunity.
                  </p>

                  <div className="mt-6 space-y-4">
                    <div className="rounded-2xl border border-slate-700 bg-white/5 p-4">
                      <p className="text-sm text-slate-300">Profile strength</p>
                      <div className="mt-3 h-2 rounded-full bg-slate-700">
                        <div className="h-2 w-[82%] rounded-full bg-gradient-to-r from-sky-300 to-emerald-300" />
                      </div>
                      <p className="mt-3 text-sm text-slate-300">82% complete</p>
                    </div>

                    <div className="grid gap-3 sm:grid-cols-2">
                      <div className="rounded-2xl border border-slate-700 bg-white/5 p-4">
                        <p className="text-sm text-slate-300">Next review</p>
                        <p className="mt-2 text-lg font-semibold">Pending applications</p>
                      </div>
                      <div className="rounded-2xl border border-slate-700 bg-white/5 p-4">
                        <p className="text-sm text-slate-300">Job discovery</p>
                        <p className="mt-2 text-lg font-semibold">Fresh roles this week</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            <section className="rounded-[2rem] border border-slate-200 bg-white/90 p-7 shadow-sm backdrop-blur sm:p-8">
              <p className="text-sm font-medium text-slate-500">Next steps</p>
              <h2 className="mt-1 text-2xl font-semibold text-slate-950">What to do now</h2>

              <div className="mt-6 space-y-4">
                {nextSteps.map((step, index) => (
                  <div key={step} className="flex items-start gap-4 rounded-2xl border border-slate-200 bg-slate-50 p-4">
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-slate-900 text-sm font-semibold text-white">
                      {index + 1}
                    </div>
                    <p className="pt-1 text-sm leading-6 text-slate-700">{step}</p>
                  </div>
                ))}
              </div>
            </section>
          </div>
        </div>
      </main>
  )
}

export default CDashboard
