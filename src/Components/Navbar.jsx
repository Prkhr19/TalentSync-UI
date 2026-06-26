import { Link, useNavigate } from 'react-router-dom'
import { ROUTES } from '../Routes/Routes'

const Navbar = () => {
  const navigate = useNavigate()
  const token = localStorage.getItem('token')
  const role = localStorage.getItem('role')
  const isLoggedIn = Boolean(token)

  const dashboardPath = role === 'RECRUITER' ? ROUTES.RECRUITER_DASHBOARD : ROUTES.CANDIDATE_DASHBOARD

  const handleLogout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('role')
    localStorage.removeItem('userEmail')
    localStorage.removeItem('userName')
    localStorage.removeItem('candidateEmail')
    localStorage.removeItem('candidateName')
    navigate(ROUTES.LOGIN)
  }

  return (
    <nav className="border-b border-slate-200/80 bg-white/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <Link to={ROUTES.HOME} className="text-lg font-semibold tracking-tight text-slate-900">
          HireHub
        </Link>

        <div className="flex items-center gap-6 text-sm font-medium text-slate-600">
          <Link to={ROUTES.HOME} className="transition hover:text-slate-900">
            Home
          </Link>

          {isLoggedIn ? (
            <>
              <Link to={dashboardPath} className="transition hover:text-slate-900">
                Dashboard
              </Link>
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
