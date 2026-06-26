import { Link, useNavigate } from 'react-router-dom'
import { ROUTES } from '../Routes/Routes'

const adminLinks = [
  { label: 'Dashboard', path: ROUTES.ADMIN_DASHBOARD },
  { label: 'Jobs', path: ROUTES.VIEW_JOBS },
  { label: 'Candidates', path: ROUTES.ADMIN_CANDIDATES },
  { label: 'Applications', path: ROUTES.ADMIN_APPLICATIONS },
  { label: 'Referrals', path: ROUTES.ADMIN_REFERRALS },
  { label: 'Settings', path: ROUTES.ADMIN_SETTINGS },
]

const Navbar = () => {
  const navigate = useNavigate()
  const token = localStorage.getItem('token')
  const role = localStorage.getItem('role')
  const isLoggedIn = Boolean(token)
  const isAdmin = role === 'ADMIN'
  const isCandidate = role === 'CANDIDATE'

  const dashboardPath = isAdmin ? ROUTES.ADMIN_DASHBOARD : ROUTES.CANDIDATE_DASHBOARD

  const handleLogout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('role')
    localStorage.removeItem('userEmail')
    localStorage.removeItem('userName')
    localStorage.removeItem('candidateEmail')
    localStorage.removeItem('candidateName')
    localStorage.removeItem('candidateEducation')
    localStorage.removeItem('candidateSkills')
    localStorage.removeItem('adminCompanyName')
    localStorage.removeItem('adminCompanyLocation')
    localStorage.removeItem('adminCompanyWebsite')
    navigate(ROUTES.LOGIN)
  }

  return (
    <nav className="border-b border-slate-200/80 bg-white/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <Link to={ROUTES.HOME} className="text-lg font-semibold tracking-tight text-slate-900">
          TalentSync
        </Link>

        <div className="flex items-center gap-4 text-sm font-medium text-slate-600 sm:gap-6">
          <Link to={ROUTES.HOME} className="transition hover:text-slate-900">
            Home
          </Link>

          {isLoggedIn && isAdmin && (
            <div className="hidden items-center gap-4 lg:flex">
              {adminLinks.map((link) => (
                <Link key={link.path} to={link.path} className="transition hover:text-slate-900">
                  {link.label}
                </Link>
              ))}
            </div>
          )}

          {isLoggedIn ? (
            <>
              <Link to={dashboardPath} className="transition hover:text-slate-900 lg:hidden">
                Dashboard
              </Link>
              {isCandidate && (
                <Link to={ROUTES.CANDIDATE_REFERRALS} className="hidden transition hover:text-slate-900 sm:inline">
                  Referrals
                </Link>
              )}
              <button
                type="button"
                onClick={handleLogout}
                className="rounded-full bg-slate-900 px-4 py-2 text-white transition hover:bg-slate-700"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to={ROUTES.LOGIN} className="transition hover:text-slate-900">
                Login
              </Link>
              <Link
                to={ROUTES.SIGNUP}
                className="rounded-full bg-slate-900 px-4 py-2 text-white transition hover:bg-slate-700"
              >
                Get Started
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  )
}

export default Navbar
