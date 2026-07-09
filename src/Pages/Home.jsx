import { Link } from 'react-router-dom'
import { ROUTES } from '../Routes/Routes'

const highlights = [
  {
    title: 'Create a strong profile',
    description: 'Showcase your experience, skills, and goals in one polished place.',
  },
  {
    title: 'Apply with confidence',
    description: 'Discover roles that fit your background and send applications faster.',
  },
  {
    title: 'Track every step',
    description: 'Keep tabs on application progress without losing important updates.',
  },
  {
    title: 'Admin-friendly tools',
    description: 'Post jobs and manage candidates with a workspace that stays organized.',
  },
]

const stats = [
  { value: '1k+', label: 'Active candidates' },
  { value: '250+', label: 'Live opportunities' },
  { value: '98%', label: 'Profile completion' },
]

const Home = () => {
  return (
      <main className="bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(167,139,250,0.35),transparent),radial-gradient(ellipse_60%_40%_at_100%_0%,rgba(251,191,36,0.12),transparent),radial-gradient(ellipse_50%_30%_at_0%_100%,rgba(99,102,241,0.15),transparent),linear-gradient(180deg,#faf8ff_0%,#f5f3ff_45%,#fff7ed_100%)] text-zinc-900">
        <section className="mx-auto max-w-6xl px-4 py-14 sm:px-6 lg:px-8 lg:py-20">
          <div className="grid items-center gap-12 lg:grid-cols-[1.1fr_0.9fr]">
            <div>
              <span className="inline-flex items-center rounded-full border border-violet-200/80 bg-violet-50/90 px-4 py-1 text-sm font-medium text-violet-800">
                Get referred to top companies
              </span>
              <h1 className="mt-6 max-w-2xl text-4xl font-semibold tracking-tight text-zinc-950 sm:text-5xl lg:text-6xl">
                Find the right role{' '}
                <span className="bg-gradient-to-r from-violet-700 via-indigo-600 to-violet-600 bg-clip-text text-transparent">
                  without the clutter.
                </span>
              </h1>
              <p className="mt-6 max-w-xl text-base leading-7 text-zinc-600 sm:text-lg">
                HireNex brings job seekers and employers together in a simple, focused workspace.
                Search jobs, manage applications, and move through the hiring process with less noise.
              </p>

              <div className="mt-8 flex flex-wrap gap-4">
                <Link
                  to={ROUTES.JOBS}
                  className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-violet-600 to-indigo-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-violet-500/25 transition hover:-translate-y-0.5 hover:from-violet-700 hover:to-indigo-700"
                >
                  Explore Jobs
                </Link>
                <Link
                  to={ROUTES.SIGNUP}
                  className="inline-flex items-center justify-center rounded-full border border-violet-200 bg-white/90 px-6 py-3 text-sm font-semibold text-violet-900 transition hover:border-violet-300 hover:bg-violet-50"
                >
                  Create Account
                </Link>
              </div>

              <div className="mt-10 grid gap-4 sm:grid-cols-3">
                {stats.map((stat) => (
                  <div
                    key={stat.label}
                    className="rounded-2xl border border-violet-100/80 bg-white/70 p-4 shadow-sm shadow-violet-100/50 backdrop-blur"
                  >
                    <div className="text-2xl font-semibold text-violet-950">{stat.value}</div>
                    <div className="mt-1 text-sm text-zinc-500">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative">
              <div className="absolute -inset-4 -z-10 rounded-[2rem] bg-gradient-to-br from-violet-300/50 via-fuchsia-100/40 to-amber-100/60 blur-2xl" />
              <div className="rounded-[2rem] border border-white/90 bg-white/80 p-6 shadow-[0_20px_60px_rgba(91,33,182,0.12)] backdrop-blur">
                <div className="flex items-center justify-between border-b border-violet-100 pb-4">
                  <div>
                    <p className="text-sm font-medium text-zinc-500">Today&apos;s hiring snapshot</p>
                    <h2 className="mt-1 text-xl font-semibold text-zinc-950">Momentum in one view</h2>
                  </div>
                  <span className="rounded-full bg-amber-50 px-3 py-1 text-xs font-semibold text-amber-800 ring-1 ring-amber-200/80">
                    Live
                  </span>
                </div>

                <div className="mt-6 space-y-4">
                  <div className="rounded-2xl bg-gradient-to-br from-violet-950 via-indigo-950 to-violet-900 p-5 text-white shadow-inner">
                    <p className="text-sm text-violet-200">Featured role</p>
                    <h3 className="mt-2 text-lg font-semibold">Frontend Developer</h3>
                    <p className="mt-2 text-sm leading-6 text-violet-100/90">
                      Create polished user experiences, collaborate with product teams, and help ship
                      meaningful work.
                    </p>
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="rounded-2xl border border-violet-100 bg-violet-50/50 p-4">
                      <p className="text-sm font-medium text-violet-600">For candidates</p>
                      <p className="mt-2 text-base font-semibold text-zinc-900">Fast, simple applications</p>
                    </div>
                    <div className="rounded-2xl border border-amber-100 bg-amber-50/40 p-4">
                      <p className="text-sm font-medium text-amber-800/80">For admins</p>
                      <p className="mt-2 text-base font-semibold text-zinc-900">Clear candidate tracking</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-4 pb-16 sm:px-6 lg:px-8">
          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {highlights.map((item, index) => (
              <article
                key={item.title}
                className={`rounded-3xl border bg-white/80 p-6 shadow-sm backdrop-blur transition hover:-translate-y-1 hover:shadow-md ${
                  index % 2 === 0
                    ? 'border-violet-100 hover:border-violet-200 hover:shadow-violet-100/40'
                    : 'border-indigo-100 hover:border-indigo-200 hover:shadow-indigo-100/40'
                }`}
              >
                <h3 className="text-lg font-semibold text-zinc-950">{item.title}</h3>
                <p className="mt-3 text-sm leading-6 text-zinc-600">{item.description}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-4 pb-10 sm:px-6 lg:px-8">
          <div className="rounded-[2rem] bg-gradient-to-br from-violet-900 via-indigo-900 to-violet-950 px-6 py-10 text-white shadow-xl shadow-violet-900/20 sm:px-10">
            <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
              <div>
                <p className="text-sm font-medium text-amber-200/90">Ready to begin</p>
                <h2 className="mt-2 text-3xl font-semibold tracking-tight sm:text-4xl">
                  Set up your profile and start moving.
                </h2>
                <p className="mt-4 max-w-2xl text-sm leading-7 text-violet-100/90 sm:text-base">
                  Join HireNex, build a tidy profile, and browse opportunities in a cleaner workflow.
                </p>
              </div>

              <div className="flex flex-wrap gap-3">
                <Link
                  to={ROUTES.SIGNUP}
                  className="inline-flex items-center justify-center rounded-full bg-white px-6 py-3 text-sm font-semibold text-violet-900 transition hover:bg-violet-50"
                >
                  Create Account
                </Link>
                <Link
                  to={ROUTES.JOBS}
                  className="inline-flex items-center justify-center rounded-full border border-violet-400/50 bg-violet-800/30 px-6 py-3 text-sm font-semibold text-white transition hover:border-violet-300 hover:bg-violet-800/50"
                >
                  Browse Jobs
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
  )
}

export default Home
