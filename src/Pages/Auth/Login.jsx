import { useState } from 'react'
import { login } from '../../Services/AuthService'
import { setAuthSession } from '../../Api/Axios'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import { ROUTES } from '../../Routes/Routes'
import { getLoginErrorMessage } from '../../utils/apiErrors'

const Login = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const sessionMessage = searchParams.get('session') === 'expired'
    ? 'Your session expired. Please log in again.'
    : ''

  const submitHandler = async (e) => {
    e.preventDefault()
    if (!email || !password) {
      setError("Please fill in all fields")
      return;
    } 
    else {setError("")}

    try{
    const loginData = {
      email,
      password
    }

    const { credentials, body } = await login(loginData)
    const { token, role } = credentials
    const payload = body

    const name =
      payload?.name ||
      payload?.fullName ||
      payload?.userName ||
      payload?.username ||
      payload?.admin?.name ||
      payload?.user?.name ||
      payload?.user?.fullName ||
      payload?.data?.name ||
      payload?.data?.fullName ||
      payload?.data?.userName ||
      payload?.data?.user?.name ||
      ''

    const pendingSignupName = localStorage.getItem('pendingSignupEmail') === email
      ? localStorage.getItem('pendingSignupName')
      : ''
    const resolvedName = name || pendingSignupName

    if (!token || !role) {
      throw new Error("Login response did not contain token or role")
    }

    setAuthSession(token, role)
    localStorage.setItem("userEmail", email)
    if (resolvedName) {
      localStorage.setItem("userName", resolvedName);
    }

    localStorage.removeItem('pendingSignupName')
    localStorage.removeItem('pendingSignupEmail')

    if (role === "CANDIDATE") {
      localStorage.setItem("candidateEmail", email);
      if (resolvedName) {
        localStorage.setItem("candidateName", resolvedName);
      }
    }

    if (role === "CANDIDATE") {
      navigate(ROUTES.CANDIDATE_DASHBOARD)
    } else if (role === 'ADMIN') {
      navigate(ROUTES.ADMIN_DASHBOARD)
    } else {
      navigate(ROUTES.HOME)
    }
  } catch (error) {
    setError(getLoginErrorMessage(error))
    console.error('Login error: ', error)
  }

}
  return (
      <main className="min-h-[calc(100vh-72px)] bg-[radial-gradient(circle_at_top,_rgba(186,230,253,0.32),_transparent_34%),linear-gradient(180deg,#f8fafc_0%,#eef6fb_100%)] px-4 py-12 text-slate-900 sm:px-6 lg:px-8 lg:py-16">
        <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
          <section className="max-w-xl">
            <span className="inline-flex items-center rounded-full border border-sky-200 bg-sky-50 px-4 py-1 text-sm font-medium text-sky-700">
              Welcome back to HireNex
            </span>
            <h1 className="mt-6 text-4xl font-semibold tracking-tight text-slate-950 sm:text-5xl">
              Sign in to continue with a calm, focused workspace.
            </h1>
            <p className="mt-5 text-base leading-7 text-slate-600 sm:text-lg">
              Use your account to manage applications, review opportunities, and keep your hiring flow tidy.
            </p>

            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              <div className="rounded-2xl border border-slate-200 bg-white/80 p-4 shadow-sm backdrop-blur">
                <p className="text-sm font-medium text-slate-500">Candidate access</p>
                <p className="mt-2 text-sm leading-6 text-slate-700">Track jobs, applications, and profile updates in one place.</p>
              </div>
              <div className="rounded-2xl border border-slate-200 bg-white/80 p-4 shadow-sm backdrop-blur">
                <p className="text-sm font-medium text-slate-500">Admin access</p>
                <p className="mt-2 text-sm leading-6 text-slate-700">Manage jobs, candidates, applications, and referrals.</p>
              </div>
            </div>
          </section>

          <section className="relative">
            <div className="absolute -inset-4 -z-10 rounded-[2rem] bg-gradient-to-br from-sky-200/70 via-white to-emerald-100/70 blur-2xl" />
            <div className="rounded-[2rem] border border-white/80 bg-white/90 p-6 shadow-[0_20px_60px_rgba(15,23,42,0.12)] backdrop-blur sm:p-8">
              <div className="border-b border-slate-200 pb-5">
                <h2 className="text-2xl font-semibold text-slate-950">Login</h2>
                <p className="mt-2 text-sm leading-6 text-slate-500">
                  Enter your email and password to access your dashboard.
                </p>
              </div>

              {(sessionMessage || error) && (
                <div className="mt-5 rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">
                  {sessionMessage || error}
                </div>
              )}

              <form onSubmit={submitHandler} className="mt-6 space-y-5">
                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-700" htmlFor="email">
                    Email
                  </label>
                  <input
                    id="email"
                    type="email"
                    placeholder="Enter email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-slate-400 focus:bg-white focus:ring-4 focus:ring-sky-100"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-700" htmlFor="password">
                    Password
                  </label>
                  <input
                    id="password"
                    type="password"
                    placeholder="Enter password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-slate-400 focus:bg-white focus:ring-4 focus:ring-sky-100"
                  />
                </div>

                <button
                  type="submit"
                  className="inline-flex w-full items-center justify-center rounded-full bg-slate-900 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-slate-900/15 transition hover:-translate-y-0.5 hover:bg-slate-700"
                >
                  Login
                </button>
              </form>

              <p className="mt-6 text-center text-sm text-slate-600">
                New to HireNex?{' '}
                <Link to={ROUTES.SIGNUP} className="font-semibold text-slate-900 transition hover:text-slate-600">
                  Create an account
                </Link>
              </p>
            </div>
          </section>
        </div>
      </main>
  )
}

export default Login
