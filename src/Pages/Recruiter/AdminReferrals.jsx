import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { ROUTES } from '../../Routes/Routes'
import { getAdminReferrals } from '../../Services/ReferralService'

const formatDate = (date) => {
  if (!date) return 'Date unavailable'
  const parsedDate = new Date(date)
  return Number.isNaN(parsedDate.getTime()) ? date : parsedDate.toLocaleDateString('en-IN')
}

const AdminReferrals = () => {
  const [referrals, setReferrals] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    getAdminReferrals()
      .then((data) => {
        const list = Array.isArray(data) ? data : data?.referrals || data?.content || []
        setReferrals(list)
      })
      .catch((requestError) => {
        console.error('Error fetching referrals:', requestError)
        setError('Unable to load referral history.')
      })
      .finally(() => setLoading(false))
  }, [])

  return (
      <main className="min-h-[calc(100vh-72px)] bg-[radial-gradient(circle_at_top,_rgba(186,230,253,0.32),_transparent_34%),linear-gradient(180deg,#f8fafc_0%,#eef6fb_100%)] px-4 py-10 text-slate-900 sm:px-6 lg:px-8 lg:py-14">
        <div className="mx-auto max-w-7xl space-y-8">
          <section className="rounded-[2rem] border border-white/80 bg-white/90 p-7 shadow-[0_20px_60px_rgba(15,23,42,0.10)] backdrop-blur sm:p-8">
            <Link to={ROUTES.ADMIN_DASHBOARD} className="inline-flex items-center gap-2 text-sm font-semibold text-slate-500 transition hover:text-slate-900">
              <span aria-hidden="true">←</span> Admin dashboard
            </Link>
            <span className="mt-6 flex w-fit items-center rounded-full border border-sky-200 bg-sky-50 px-4 py-1 text-sm font-medium text-sky-700">
              Referrals
            </span>
            <h1 className="mt-4 text-4xl font-semibold tracking-tight text-slate-950 sm:text-5xl">
              Referral history
            </h1>
            <p className="mt-4 max-w-2xl text-base leading-7 text-slate-600 sm:text-lg">
              Track candidates referred to companies and monitor referral outcomes.
            </p>
          </section>

          {loading && <p className="text-sm text-slate-500">Loading referrals...</p>}
          {error && <p className="rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">{error}</p>}

          {!loading && !error && referrals.length === 0 && (
            <section className="rounded-[2rem] border border-dashed border-slate-300 bg-white/90 p-10 text-center shadow-sm">
              <h2 className="text-2xl font-semibold text-slate-950">No referrals yet</h2>
              <p className="mt-3 text-sm text-slate-600">Referral records will appear here once created.</p>
            </section>
          )}

          {!loading && referrals.length > 0 && (
            <section className="grid gap-5 lg:grid-cols-2">
              {referrals.map((referral, index) => (
                <article key={referral.id || referral.referralId || index} className="rounded-[2rem] border border-slate-200 bg-white/90 p-6 shadow-sm">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h2 className="text-xl font-semibold text-slate-950">{referral.companyName || 'Company not specified'}</h2>
                      <p className="mt-1 text-sm text-slate-500">{referral.contactName || 'Contact not specified'}</p>
                    </div>
                    <span className="rounded-full border border-indigo-200 bg-indigo-50 px-3 py-1 text-xs font-semibold text-indigo-700">
                      {referral.status || 'REFERRED'}
                    </span>
                  </div>
                  <div className="mt-5 grid gap-3 sm:grid-cols-2 text-sm">
                    <div className="rounded-2xl border border-slate-200 bg-slate-50 p-3">
                      <p className="text-xs text-slate-500">Referral date</p>
                      <p className="mt-1 font-semibold">{formatDate(referral.referredDate || referral.createdAt)}</p>
                    </div>
                    <div className="rounded-2xl border border-slate-200 bg-slate-50 p-3">
                      <p className="text-xs text-slate-500">Contact email</p>
                      <p className="mt-1 font-semibold">{referral.contactEmail || 'N/A'}</p>
                    </div>
                  </div>
                  {referral.remarks && (
                    <p className="mt-4 rounded-2xl border border-slate-200 bg-slate-50 p-4 text-sm text-slate-700">{referral.remarks}</p>
                  )}
                </article>
              ))}
            </section>
          )}
        </div>
      </main>
  )
}

export default AdminReferrals
