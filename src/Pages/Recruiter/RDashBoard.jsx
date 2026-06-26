import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ROUTES } from '../../Routes/Routes'

const getAdminName = () => {
  const storedName = localStorage.getItem('userName')
  if (storedName) return storedName

  try {
    const token = localStorage.getItem('token') || ''
    const encodedPayload = token.split('.')[1]
    const normalizedPayload = encodedPayload.replace(/-/g, '+').replace(/_/g, '/')
    const payload = JSON.parse(decodeURIComponent(escape(atob(normalizedPayload))))
    const tokenName = payload.name || payload.fullName || payload.userName || payload.username

    if (tokenName) {
      localStorage.setItem('userName', tokenName)
      return tokenName
    }
  } catch {
    // The login flow stores the name when the token does not contain profile data.
  }

  return 'Admin'
}

const RDashBoard = () => {
  const [activeSlide, setActiveSlide] = useState(0)

  const adminName = getAdminName()
  const adminEmail = localStorage.getItem('userEmail') || 'Add your account email'

  const companySlides = [
    {
      title: 'Account overview',
      content: `Name: ${adminName}\nEmail: ${adminEmail}\nRole: Admin`,
    },
    {
      title: 'Hiring workspace',
      content: 'Create a company profile, publish open roles, and keep every application organized in one place.',
    },
    {
      title: 'Hiring goal',
      content: 'Build a clear candidate pipeline and move the right people from application to offer with confidence.',
    },
  ]

  const summaryCards = [
    { label: 'Company profile', value: 'Ready' },
    { label: 'Active jobs', value: 'View all' },
    { label: 'Hiring flow', value: 'On track' },
  ]

  const quickActions = [
    {
      number: '01',
      title: 'Create company profile',
      description: 'Add the company details candidates need before you publish a role.',
      path: ROUTES.CREATE_COMPANY,
      action: 'Set up company',
    },
    {
      number: '02',
      title: 'Post your next opening',
      description: 'Create a focused job listing and start building your candidate pipeline.',
      path: ROUTES.CREATE_JOB,
      action: 'Create job',
    },
    {
      number: '03',
      title: 'Review jobs and applicants',
      description: 'Open your published jobs to review and manage incoming applications.',
      path: ROUTES.VIEW_JOBS,
      action: 'View jobs',
    },
    {
      number: '04',
      title: 'Browse candidate database',
      description: 'Search and filter candidates by skills, experience, and location.',
      path: ROUTES.ADMIN_CANDIDATES,
      action: 'View candidates',
    },
    {
      number: '05',
      title: 'Track referrals',
      description: 'Review referral history and monitor candidate placements.',
      path: ROUTES.ADMIN_REFERRALS,
      action: 'View referrals',
    },
  ]

  const goToPrevious = () => {
    setActiveSlide((current) => (current === 0 ? companySlides.length - 1 : current - 1))
  }

  const goToNext = () => {
    setActiveSlide((current) => (current === companySlides.length - 1 ? 0 : current + 1))
  }

  return (
      <main className="min-h-[calc(100vh-72px)] bg-[radial-gradient(circle_at_top,_rgba(186,230,253,0.32),_transparent_34%),linear-gradient(180deg,#f8fafc_0%,#eef6fb_100%)] px-4 py-10 text-slate-900 sm:px-6 lg:px-8 lg:py-14">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[320px_1fr]">
          <aside className="rounded-[2rem] border border-white/80 bg-white/90 p-6 shadow-[0_20px_60px_rgba(15,23,42,0.10)] backdrop-blur lg:sticky lg:top-6 lg:h-fit">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-sky-700">Admin profile</p>
            <h2 className="mt-3 text-2xl font-semibold text-slate-950">{adminName}</h2>
            <p className="mt-1 truncate text-sm text-slate-500">{adminEmail}</p>

            <div className="mt-6 rounded-3xl border border-slate-200 bg-slate-50 p-4">
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium text-slate-600">Workspace</p>
                <p className="text-xs font-semibold text-slate-500">
                  {activeSlide + 1}/{companySlides.length}
                </p>
              </div>

              <div className="mt-4 min-h-[150px] rounded-2xl border border-slate-200 bg-white p-4">
                <h3 className="text-base font-semibold text-slate-900">{companySlides[activeSlide].title}</h3>
                <p className="mt-2 whitespace-pre-line text-sm leading-6 text-slate-600">
                  {companySlides[activeSlide].content}
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
              to={ROUTES.ADMIN_SETTINGS}
              className="mt-5 inline-flex w-full items-center justify-center rounded-full border border-slate-300 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:border-slate-400 hover:text-slate-950"
            >
              Manage Settings
            </Link>
          </aside>

          <div className="space-y-8">
            <section className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr] lg:items-stretch">
              <div className="rounded-[2rem] border border-white/80 bg-white/90 p-7 shadow-[0_20px_60px_rgba(15,23,42,0.10)] backdrop-blur sm:p-8">
                <span className="inline-flex items-center rounded-full border border-sky-200 bg-sky-50 px-4 py-1 text-sm font-medium text-sky-700">
                  Admin dashboard
                </span>
                <h1 className="mt-5 text-4xl font-semibold tracking-tight text-slate-950 sm:text-5xl">
                  Build your hiring pipeline in one calm workspace.
                </h1>
                <p className="mt-4 max-w-2xl text-base leading-7 text-slate-600 sm:text-lg">
                  Publish opportunities, review candidates, and keep every open role moving without the clutter.
                </p>

                <div className="mt-8 flex flex-wrap gap-3">
                  <Link
                    to={ROUTES.CREATE_JOB}
                    className="inline-flex items-center justify-center rounded-full bg-slate-900 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-slate-900/15 transition hover:-translate-y-0.5 hover:bg-slate-700"
                  >
                    Post a Job
                  </Link>
                  <Link
                    to={ROUTES.VIEW_JOBS}
                    className="inline-flex items-center justify-center rounded-full border border-slate-300 bg-white px-6 py-3 text-sm font-semibold text-slate-700 transition hover:border-slate-400 hover:text-slate-950"
                  >
                    View My Jobs
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

              <div className="relative overflow-hidden rounded-[2rem] border border-white/80 bg-slate-900 p-7 text-white shadow-[0_20px_60px_rgba(15,23,42,0.16)] sm:p-8">
                <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-sky-400/20 to-transparent" />
                <div className="relative">
                  <p className="text-sm font-medium text-sky-300">Today&apos;s focus</p>
                  <h2 className="mt-2 text-2xl font-semibold tracking-tight sm:text-3xl">
                    Keep your candidate pipeline moving.
                  </h2>
                  <p className="mt-4 text-sm leading-7 text-slate-300 sm:text-base">
                    Clear job listings and timely application reviews create a better hiring experience for everyone.
                  </p>

                  <div className="mt-6 space-y-4">
                    <div className="rounded-2xl border border-slate-700 bg-white/5 p-4">
                      <div className="flex items-center justify-between gap-4">
                        <p className="text-sm text-slate-300">Hiring setup</p>
                        <p className="text-sm font-semibold text-emerald-300">Ready to grow</p>
                      </div>
                      <div className="mt-3 h-2 rounded-full bg-slate-700">
                        <div className="h-2 w-3/4 rounded-full bg-gradient-to-r from-sky-300 to-emerald-300" />
                      </div>
                      <p className="mt-3 text-sm text-slate-300">Complete your company profile, then publish a role.</p>
                    </div>

                    <div className="grid gap-3 sm:grid-cols-2">
                      <div className="rounded-2xl border border-slate-700 bg-white/5 p-4">
                        <p className="text-sm text-slate-300">Next action</p>
                        <p className="mt-2 text-lg font-semibold">Review applicants</p>
                      </div>
                      <div className="rounded-2xl border border-slate-700 bg-white/5 p-4">
                        <p className="text-sm text-slate-300">Candidate care</p>
                        <p className="mt-2 text-lg font-semibold">Respond on time</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            <section className="rounded-[2rem] border border-slate-200 bg-white/90 p-7 shadow-sm backdrop-blur sm:p-8">
              <p className="text-sm font-medium text-slate-500">Quick actions</p>
              <h2 className="mt-1 text-2xl font-semibold text-slate-950">What would you like to do?</h2>

              <div className="mt-6 grid gap-4 xl:grid-cols-3">
                {quickActions.map((item) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    className="group flex h-full flex-col rounded-2xl border border-slate-200 bg-slate-50 p-5 transition hover:-translate-y-1 hover:border-sky-200 hover:bg-white hover:shadow-lg hover:shadow-slate-900/5"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-semibold tracking-[0.18em] text-sky-700">{item.number}</span>
                      <span className="text-lg text-slate-400 transition group-hover:translate-x-1 group-hover:text-slate-900">→</span>
                    </div>
                    <h3 className="mt-5 text-lg font-semibold text-slate-950">{item.title}</h3>
                    <p className="mt-2 flex-1 text-sm leading-6 text-slate-600">{item.description}</p>
                    <p className="mt-5 text-sm font-semibold text-slate-900">{item.action}</p>
                  </Link>
                ))}
              </div>
            </section>
          </div>
        </div>
      </main>
  )
}

export default RDashBoard
