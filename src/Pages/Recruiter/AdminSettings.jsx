import { Link } from 'react-router-dom'
import { ROUTES } from '../../Routes/Routes'

const AdminSettings = () => {
  const companyName = localStorage.getItem('adminCompanyName') || 'Not configured'
  const companyLocation = localStorage.getItem('adminCompanyLocation') || 'Not configured'
  const companyWebsite = localStorage.getItem('adminCompanyWebsite') || 'Not configured'
  const adminEmail = localStorage.getItem('userEmail') || 'Not available'
  const adminName = localStorage.getItem('userName') || 'Admin'

  return (
      <main className="min-h-[calc(100vh-72px)] bg-[radial-gradient(circle_at_top,_rgba(186,230,253,0.32),_transparent_34%),linear-gradient(180deg,#f8fafc_0%,#eef6fb_100%)] px-4 py-10 text-slate-900 sm:px-6 lg:px-8 lg:py-14">
        <div className="mx-auto max-w-4xl space-y-8">
          <section className="rounded-[2rem] border border-white/80 bg-white/90 p-7 shadow-[0_20px_60px_rgba(15,23,42,0.10)] backdrop-blur sm:p-8">
            <Link to={ROUTES.ADMIN_DASHBOARD} className="inline-flex items-center gap-2 text-sm font-semibold text-slate-500 transition hover:text-slate-900">
              <span aria-hidden="true">←</span> Admin dashboard
            </Link>
            <span className="mt-6 flex w-fit items-center rounded-full border border-sky-200 bg-sky-50 px-4 py-1 text-sm font-medium text-sky-700">
              Settings
            </span>
            <h1 className="mt-4 text-4xl font-semibold tracking-tight text-slate-950 sm:text-5xl">
              Workspace settings
            </h1>
            <p className="mt-4 text-base leading-7 text-slate-600">
              Review account details and manage your company profile.
            </p>
          </section>

          <section className="rounded-[2rem] border border-slate-200 bg-white/90 p-6 shadow-sm sm:p-8">
            <h2 className="text-xl font-semibold text-slate-950">Account</h2>
            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                <p className="text-xs text-slate-500">Name</p>
                <p className="mt-1 font-semibold">{adminName}</p>
              </div>
              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                <p className="text-xs text-slate-500">Email</p>
                <p className="mt-1 font-semibold">{adminEmail}</p>
              </div>
            </div>
          </section>

          <section className="rounded-[2rem] border border-slate-200 bg-white/90 p-6 shadow-sm sm:p-8">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h2 className="text-xl font-semibold text-slate-950">Company profile</h2>
                <p className="mt-2 text-sm text-slate-600">Update the company information shown to candidates.</p>
              </div>
              <Link
                to={ROUTES.CREATE_COMPANY}
                className="inline-flex items-center justify-center rounded-full bg-slate-900 px-6 py-3 text-sm font-semibold text-white transition hover:bg-slate-700"
              >
                Edit company profile
              </Link>
            </div>
            <div className="mt-5 grid gap-4 sm:grid-cols-3">
              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                <p className="text-xs text-slate-500">Company</p>
                <p className="mt-1 font-semibold">{companyName}</p>
              </div>
              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                <p className="text-xs text-slate-500">Location</p>
                <p className="mt-1 font-semibold">{companyLocation}</p>
              </div>
              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                <p className="text-xs text-slate-500">Website</p>
                <p className="mt-1 font-semibold">{companyWebsite}</p>
              </div>
            </div>
          </section>
        </div>
      </main>
  )
}

export default AdminSettings
