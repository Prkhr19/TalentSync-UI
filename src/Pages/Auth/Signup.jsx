import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { signup } from '../../Services/AuthService'
import { Link } from 'react-router-dom'
import { ROUTES } from '../../Routes/Routes'
import { getApiErrorMessage } from '../../utils/apiErrors'

const Signup = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const submitHandler = async (e) => {
    e.preventDefault()

    if (!name || !email || !password) {
      setError('Please fill in all fields')
      return
    }

    setError('')

    try {
      const signupData = {
        name,
        email,
        password,
      }
      await signup(signupData)
      localStorage.setItem('pendingSignupName', name)
      localStorage.setItem('pendingSignupEmail', email)
      navigate(ROUTES.LOGIN)
    } catch (requestError) {
      setError(getApiErrorMessage(requestError, 'Signup failed. Please try again.'))
      console.error('Signup error: ', requestError)
    }
  }

  return (
      <main className="min-h-[calc(100vh-72px)] bg-[radial-gradient(circle_at_top,_rgba(186,230,253,0.32),_transparent_34%),linear-gradient(180deg,#f8fafc_0%,#eef6fb_100%)] px-4 py-12 text-slate-900 sm:px-6 lg:px-8 lg:py-16">
        <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
          <section className="max-w-xl">
            <span className="inline-flex items-center rounded-full border border-sky-200 bg-sky-50 px-4 py-1 text-sm font-medium text-sky-700">
              Join HireNex today
            </span>
            <h1 className="mt-6 text-4xl font-semibold tracking-tight text-slate-950 sm:text-5xl">
              Create a clean profile and start your hiring journey.
            </h1>
            <p className="mt-5 text-base leading-7 text-slate-600 sm:text-lg">
              Set up your candidate account once, then move through applications and profile updates in a calm,
              organized space.
            </p>

            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              <div className="rounded-2xl border border-slate-200 bg-white/80 p-4 shadow-sm backdrop-blur">
                <p className="text-sm font-medium text-slate-500">Candidate setup</p>
                <p className="mt-2 text-sm leading-6 text-slate-700">Create your profile and apply to jobs with clarity.</p>
              </div>
              <div className="rounded-2xl border border-slate-200 bg-white/80 p-4 shadow-sm backdrop-blur">
                <p className="text-sm font-medium text-slate-500">Application tracking</p>
                <p className="mt-2 text-sm leading-6 text-slate-700">Follow every application and referral update in one place.</p>
              </div>
            </div>
          </section>

          <section className="relative">
            <div className="absolute -inset-4 -z-10 rounded-[2rem] bg-gradient-to-br from-sky-200/70 via-white to-emerald-100/70 blur-2xl" />
            <div className="rounded-[2rem] border border-white/80 bg-white/90 p-6 shadow-[0_20px_60px_rgba(15,23,42,0.12)] backdrop-blur sm:p-8">
              <div className="border-b border-slate-200 pb-5">
                <h2 className="text-2xl font-semibold text-slate-950">Sign up</h2>
                <p className="mt-2 text-sm leading-6 text-slate-500">
                  Create your candidate account on HireNex.
                </p>
              </div>

              {error && (
                <div className="mt-5 rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">
                  {error}
                </div>
              )}

              <form onSubmit={submitHandler} className="mt-6 space-y-5">
                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-700" htmlFor="name">
                    Name
                  </label>
                  <input
                    id="name"
                    type="text"
                    placeholder="Enter name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-slate-400 focus:bg-white focus:ring-4 focus:ring-sky-100"
                  />
                </div>

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
                  Sign Up
                </button>
              </form>

              <p className="mt-6 text-center text-sm text-slate-600">
                Already have an account?{' '}
                <Link to={ROUTES.LOGIN} className="font-semibold text-slate-900 transition hover:text-slate-600">
                  Login
                </Link>
              </p>
            </div>
          </section>
        </div>
      </main>
  )
}

export default Signup
