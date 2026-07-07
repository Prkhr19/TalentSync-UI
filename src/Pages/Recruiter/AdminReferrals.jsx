import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import { ROUTES } from '../../Routes/Routes'
import { getAdminReferrals, updateReferralStatus } from '../../Services/ReferralService'
import {
  REFERRAL_STATUS_OPTIONS,
  getApplicationStatusLabel,
  getReferralStatusLabel,
} from '../../utils/applicationConstants'
import { getApiErrorMessage } from '../../utils/apiErrors'
import { formatDate } from '../../utils/formatters'

const selectClassName =
  'w-full min-w-[160px] rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 outline-none transition focus:border-slate-400 focus:ring-4 focus:ring-sky-100'

const uniqueReferralStatuses = Array.from(
  new Map(REFERRAL_STATUS_OPTIONS.map((option) => [option.value, option])).values()
)

const AdminReferrals = () => {
  const [referrals, setReferrals] = useState([])
  const [statusDrafts, setStatusDrafts] = useState({})
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState('ALL')
  const [updatingId, setUpdatingId] = useState(null)

  const syncStatusDrafts = (list) => {
    const drafts = {}
    list.forEach((referral) => {
      const id = referral.referralId
      if (id) drafts[id] = referral.status || 'SENT'
    })
    setStatusDrafts(drafts)
  }

  const loadReferrals = () => {
    setLoading(true)
    setError('')

    getAdminReferrals()
      .then((list) => {
        setReferrals(list)
        syncStatusDrafts(list)
      })
      .catch((requestError) => {
        console.error('Error fetching referrals:', requestError)
        setError('Unable to load referral history.')
      })
      .finally(() => setLoading(false))
  }

  useEffect(() => {
    loadReferrals()
  }, [])

  const filteredReferrals = useMemo(() => {
    const query = search.trim().toLowerCase()

    return referrals.filter((referral) => {
      const matchesStatus = statusFilter === 'ALL' || referral.status === statusFilter
      const matchesSearch =
        !query ||
        [
          referral.candidateName,
          referral.candidateEmail,
          referral.jobTitle,
          referral.companyName,
        ]
          .filter(Boolean)
          .some((value) => String(value).toLowerCase().includes(query))

      return matchesStatus && matchesSearch
    })
  }, [referrals, search, statusFilter])

  const handleStatusDraftChange = (referralId, status) => {
    setStatusDrafts((current) => ({ ...current, [referralId]: status }))
  }

  const handleUpdateReferralStatus = async (referralId) => {
    const status = statusDrafts[referralId]
    if (!status) return

    setUpdatingId(referralId)

    try {
      await updateReferralStatus(referralId, status)
      setReferrals((current) =>
        current.map((referral) =>
          referral.referralId === referralId ? { ...referral, status } : referral
        )
      )
      toast.success('Referral status updated successfully.')
    } catch (requestError) {
      toast.error(getApiErrorMessage(requestError, 'Failed to update referral status.'))
    } finally {
      setUpdatingId(null)
    }
  }

  return (
    <main className="min-h-[calc(100vh-72px)] bg-[radial-gradient(circle_at_top,_rgba(186,230,253,0.32),_transparent_34%),linear-gradient(180deg,#f8fafc_0%,#eef6fb_100%)] px-4 py-10 text-slate-900 sm:px-6 lg:px-8 lg:py-14">
      <div className="mx-auto max-w-7xl space-y-8">
        <section className="rounded-[2rem] border border-white/80 bg-white/90 p-7 shadow-[0_20px_60px_rgba(15,23,42,0.10)] backdrop-blur sm:p-8">
          <Link
            to={ROUTES.ADMIN_DASHBOARD}
            className="inline-flex items-center gap-2 text-sm font-semibold text-slate-500 transition hover:text-slate-900"
          >
            <span aria-hidden="true">←</span> Admin dashboard
          </Link>
          <span className="mt-6 flex w-fit items-center rounded-full border border-sky-200 bg-sky-50 px-4 py-1 text-sm font-medium text-sky-700">
            Referrals
          </span>
          <h1 className="mt-4 text-4xl font-semibold tracking-tight text-slate-950 sm:text-5xl">
            Referral management
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-7 text-slate-600 sm:text-lg">
            Track referred candidates and manage referral progress independently from application status.
          </p>
        </section>

        <section className="rounded-[2rem] border border-slate-200 bg-white/90 p-5 shadow-sm sm:p-6">
          <div className="grid gap-4 md:grid-cols-[1fr_220px_auto]">
            <input
              type="search"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search by candidate, email, job, or company"
              className="w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3 text-sm outline-none transition focus:border-slate-400 focus:bg-white focus:ring-4 focus:ring-sky-100"
            />
            <select
              value={statusFilter}
              onChange={(event) => setStatusFilter(event.target.value)}
              className={selectClassName}
            >
              <option value="ALL">All referral statuses</option>
              {uniqueReferralStatuses.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            <button
              type="button"
              onClick={loadReferrals}
              disabled={loading}
              className="rounded-full border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-slate-700 transition hover:border-slate-400 disabled:opacity-60"
            >
              Refresh
            </button>
          </div>
        </section>

        {loading && <p className="text-sm text-slate-500">Loading referrals...</p>}
        {error && (
          <p className="rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">
            {error}
          </p>
        )}

        {!loading && !error && filteredReferrals.length === 0 && (
          <section className="rounded-[2rem] border border-dashed border-slate-300 bg-white/90 p-10 text-center shadow-sm">
            <h2 className="text-2xl font-semibold text-slate-950">No referrals yet</h2>
            <p className="mt-3 text-sm text-slate-600">
              Referrals appear here after you create them from shortlisted applications.
            </p>
            <Link
              to={ROUTES.ADMIN_APPLICATIONS}
              className="mt-6 inline-flex rounded-full bg-slate-900 px-6 py-3 text-sm font-semibold text-white"
            >
              Go to Applications
            </Link>
          </section>
        )}

        {!loading && !error && filteredReferrals.length > 0 && (
          <>
            <div className="hidden overflow-x-auto rounded-[2rem] border border-slate-200 bg-white/90 shadow-sm lg:block">
              <table className="min-w-full divide-y divide-slate-200 text-sm">
                <thead className="bg-slate-50 text-left text-xs font-semibold uppercase tracking-[0.12em] text-slate-500">
                  <tr>
                    <th className="px-5 py-4">Candidate</th>
                    <th className="px-5 py-4">Job</th>
                    <th className="px-5 py-4">Company</th>
                    <th className="px-5 py-4">Referral Status</th>
                    <th className="px-5 py-4">Application Status</th>
                    <th className="px-5 py-4">Referred Date</th>
                    <th className="px-5 py-4">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredReferrals.map((referral) => {
                    const referralId = referral.referralId
                    const selectedStatus = statusDrafts[referralId] ?? referral.status ?? 'SENT'
                    const hasStatusChange = selectedStatus !== referral.status

                    return (
                      <tr key={referralId}>
                        <td className="px-5 py-4">
                          <p className="font-semibold text-slate-950">{referral.candidateName || 'Candidate'}</p>
                          <p className="mt-1 text-xs text-slate-500 break-all">{referral.candidateEmail || 'N/A'}</p>
                        </td>
                        <td className="px-5 py-4 text-slate-700">{referral.jobTitle || 'N/A'}</td>
                        <td className="px-5 py-4 text-slate-700">{referral.companyName || 'N/A'}</td>
                        <td className="px-5 py-4">
                          <select
                            value={selectedStatus}
                            onChange={(event) => handleStatusDraftChange(referralId, event.target.value)}
                            className={selectClassName}
                            disabled={updatingId === referralId}
                          >
                            {uniqueReferralStatuses.map((option) => (
                              <option key={option.value} value={option.value}>
                                {option.label}
                              </option>
                            ))}
                          </select>
                        </td>
                        <td className="px-5 py-4 text-slate-700">
                          {getApplicationStatusLabel(referral.applicationStatus || 'REFERRED')}
                        </td>
                        <td className="px-5 py-4 text-slate-700">{formatDate(referral.referredDate)}</td>
                        <td className="px-5 py-4">
                          <button
                            type="button"
                            onClick={() => handleUpdateReferralStatus(referralId)}
                            disabled={updatingId === referralId || !hasStatusChange}
                            className="rounded-full bg-slate-900 px-4 py-2 text-xs font-semibold text-white transition hover:bg-slate-700 disabled:cursor-not-allowed disabled:opacity-60"
                          >
                            {updatingId === referralId ? 'Saving...' : 'Update Status'}
                          </button>
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>

            <div className="grid gap-5 lg:hidden">
              {filteredReferrals.map((referral) => {
                const referralId = referral.referralId
                const selectedStatus = statusDrafts[referralId] ?? referral.status ?? 'SENT'
                const hasStatusChange = selectedStatus !== referral.status

                return (
                  <article key={referralId} className="rounded-[2rem] border border-slate-200 bg-white/90 p-5 shadow-sm">
                    <h2 className="text-lg font-semibold text-slate-950">{referral.candidateName || 'Candidate'}</h2>
                    <p className="mt-1 text-sm text-slate-500 break-all">{referral.candidateEmail || 'N/A'}</p>
                    <div className="mt-4 grid gap-2 text-sm">
                      <p><span className="text-slate-500">Job:</span> {referral.jobTitle || 'N/A'}</p>
                      <p><span className="text-slate-500">Company:</span> {referral.companyName || 'N/A'}</p>
                      <p><span className="text-slate-500">Application:</span> {getApplicationStatusLabel(referral.applicationStatus || 'REFERRED')}</p>
                      <p><span className="text-slate-500">Referred:</span> {formatDate(referral.referredDate)}</p>
                      <p><span className="text-slate-500">Current referral status:</span> {getReferralStatusLabel(referral.status)}</p>
                    </div>
                    <select
                      value={selectedStatus}
                      onChange={(event) => handleStatusDraftChange(referralId, event.target.value)}
                      className={`${selectClassName} mt-4`}
                      disabled={updatingId === referralId}
                    >
                      {uniqueReferralStatuses.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                    <button
                      type="button"
                      onClick={() => handleUpdateReferralStatus(referralId)}
                      disabled={updatingId === referralId || !hasStatusChange}
                      className="mt-4 w-full rounded-full bg-slate-900 px-4 py-3 text-sm font-semibold text-white disabled:opacity-60"
                    >
                      {updatingId === referralId ? 'Saving...' : 'Update Status'}
                    </button>
                  </article>
                )
              })}
            </div>
          </>
        )}
      </div>
    </main>
  )
}

export default AdminReferrals
