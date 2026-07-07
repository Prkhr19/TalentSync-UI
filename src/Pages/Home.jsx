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
      <main className="bg-[radial-gradient(circle_at_top,_rgba(186,230,253,0.45),_transparent_34%),linear-gradient(180deg,#f8fafc_0%,#eef6fb_100%)] text-slate-900">
        <section className="mx-auto max-w-6xl px-4 py-14 sm:px-6 lg:px-8 lg:py-20">
          <div className="grid items-center gap-12 lg:grid-cols-[1.1fr_0.9fr]">
            <div>
              <span className="inline-flex items-center rounded-full border border-sky-200 bg-sky-50 px-4 py-1 text-sm font-medium text-sky-700">
                Get referred to top companies
              </span>
              <h1 className="mt-6 max-w-2xl text-4xl font-semibold tracking-tight text-slate-950 sm:text-5xl lg:text-6xl">
                Find the right role without the clutter.
              </h1>
              <p className="mt-6 max-w-xl text-base leading-7 text-slate-600 sm:text-lg">
                HireNex brings job seekers and employers together in a simple, focused workspace.
                Search jobs, manage applications, and move through the hiring process with less noise.
              </p>

              <div className="mt-8 flex flex-wrap gap-4">
                <Link
                  to={ROUTES.JOBS}
                  className="inline-flex items-center justify-center rounded-full bg-slate-900 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-slate-900/15 transition hover:-translate-y-0.5 hover:bg-slate-700"
                >
                  Explore Jobs
                </Link>
                <Link
                  to={ROUTES.SIGNUP}
                  className="inline-flex items-center justify-center rounded-full border border-slate-300 bg-white px-6 py-3 text-sm font-semibold text-slate-700 transition hover:border-slate-400 hover:text-slate-950"
                >
                  Create Account
                </Link>
              </div>

              <div className="mt-10 grid gap-4 sm:grid-cols-3">
                {stats.map((stat) => (
                  <div key={stat.label} className="rounded-2xl border border-slate-200 bg-white/80 p-4 shadow-sm backdrop-blur">
                    <div className="text-2xl font-semibold text-slate-950">{stat.value}</div>
                    <div className="mt-1 text-sm text-slate-500">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative">
              <div className="absolute -inset-4 -z-10 rounded-[2rem] bg-gradient-to-br from-sky-200/70 via-white to-emerald-100/80 blur-2xl" />
              <div className="rounded-[2rem] border border-white/80 bg-white/85 p-6 shadow-[0_20px_60px_rgba(15,23,42,0.12)] backdrop-blur">
                <div className="flex items-center justify-between border-b border-slate-200 pb-4">
                  <div>
                    <p className="text-sm font-medium text-slate-500">Today&apos;s hiring snapshot</p>
                    <h2 className="mt-1 text-xl font-semibold text-slate-950">Momentum in one view</h2>
                  </div>
                  <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700">
                    Live
                  </span>
                </div>

                <div className="mt-6 space-y-4">
                  <div className="rounded-2xl bg-slate-950 p-5 text-white">
                    <p className="text-sm text-slate-300">Featured role</p>
                    <h3 className="mt-2 text-lg font-semibold">Frontend Developer</h3>
                    <p className="mt-2 text-sm leading-6 text-slate-300">
                      Create polished user experiences, collaborate with product teams, and help ship
                      meaningful work.
                    </p>
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                      <p className="text-sm font-medium text-slate-500">For candidates</p>
                      <p className="mt-2 text-base font-semibold text-slate-900">Fast, simple applications</p>
                    </div>
                    <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                      <p className="text-sm font-medium text-slate-500">For admins</p>
                      <p className="mt-2 text-base font-semibold text-slate-900">Clear candidate tracking</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-4 pb-16 sm:px-6 lg:px-8">
          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {highlights.map((item) => (
              <article key={item.title} className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md">
                <h3 className="text-lg font-semibold text-slate-950">{item.title}</h3>
                <p className="mt-3 text-sm leading-6 text-slate-600">{item.description}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-4 pb-10 sm:px-6 lg:px-8">
          <div className="rounded-[2rem] bg-slate-900 px-6 py-10 text-white shadow-xl shadow-slate-900/15 sm:px-10">
            <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
              <div>
                <p className="text-sm font-medium text-sky-300">Ready to begin</p>
                <h2 className="mt-2 text-3xl font-semibold tracking-tight sm:text-4xl">
                  Set up your profile and start moving.
                </h2>
                <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-300 sm:text-base">
                  Join HireNex, build a tidy profile, and browse opportunities in a cleaner workflow.
                </p>
              </div>

              <div className="flex flex-wrap gap-3">
                <Link
                  to={ROUTES.SIGNUP}
                  className="inline-flex items-center justify-center rounded-full bg-white px-6 py-3 text-sm font-semibold text-slate-900 transition hover:bg-slate-100"
                >
                  Create Account
                </Link>
                <Link
                  to={ROUTES.JOBS}
                  className="inline-flex items-center justify-center rounded-full border border-slate-700 px-6 py-3 text-sm font-semibold text-white transition hover:border-slate-500 hover:bg-slate-800"
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
  
