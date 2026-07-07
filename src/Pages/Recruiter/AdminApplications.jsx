import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import CreateReferralModal from '../../Components/CreateReferralModal'
import { ROUTES } from '../../Routes/Routes'
import { getAllApplications, updateApplicationStatus } from '../../Services/AdminService'
import { createReferral } from '../../Services/ReferralService'
import {
  APPLICATION_STATUS_OPTIONS,
  getApplicationStatusLabel,
  getApplicationStatusStyle,
} from '../../utils/applicationConstants'
import { formatDate } from '../../utils/formatters'

const selectClassName =
  'w-full min-w-[140px] rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 outline-none transition focus:border-slate-400 focus:ring-4 focus:ring-sky-100'

const AdminApplications = () => {
  const [applications, setApplications] = useState([])
  const [statusDrafts, setStatusDrafts] = useState({})
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState('ALL')
  const [updatingId, setUpdatingId] = useState(null)
  const [referralTarget, setReferralTarget] = useState(null)
  const [creatingReferral, setCreatingReferral] = useState(false)

  const syncStatusDrafts = (list) => {
    const drafts = {}
    list.forEach((application) => {
      const id = application.applicationId
      if (id) drafts[id] = application.status || 'APPLIED'
    })
    setStatusDrafts(drafts)
  }

  const loadApplications = () => {
    setLoading(true)
    setError('')

    getAllApplications()
      .then((list) => {
        setApplications(list)
        syncStatusDrafts(list)
      })
      .catch((requestError) => {
        console.error('Error loading applications:', requestError)
        setError('Unable to load applications. Please try again.')
      })
      .finally(() => setLoading(false))
  }

  useEffect(() => {
    loadApplications()
  }, [])

  const filteredApplications = useMemo(() => {
    const query = search.trim().toLowerCase()

    return applications.filter((application) => {
      const matchesStatus = statusFilter === 'ALL' || application.status === statusFilter
      const matchesSearch =
        !query ||
        [
          application.candidateName,
          application.candidateEmail,
          application.jobTitle,
          application.companyName,
        ]
          .filter(Boolean)
          .some((value) => String(value).toLowerCase().includes(query))

      return matchesStatus && matchesSearch
    })
  }, [applications, search, statusFilter])

  const handleStatusDraftChange = (applicationId, status) => {
    setStatusDrafts((current) => ({ ...current, [applicationId]: status }))
  }

  const handleUpdateStatus = async (applicationId) => {
    const status = statusDrafts[applicationId]
    if (!status) return

    setUpdatingId(applicationId)

    try {
      await updateApplicationStatus(applicationId, status)
      setApplications((current) =>
        current.map((application) =>
          application.applicationId === applicationId ? { ...application, status } : application
        )
      )
      toast.success('Application status updated successfully.')
    } catch (requestError) {
      const message =
        requestError.response?.data?.message ||
        requestError.response?.data?.error ||
        'Failed to update application status.'
      toast.error(message)
    } finally {
      setUpdatingId(null)
    }
  }

  const handleCreateReferral = async (referralData) => {
    if (!referralTarget) return

    setCreatingReferral(true)

    try {
      await createReferral(referralTarget.applicationId, referralData)
      setApplications((current) =>
        current.map((application) =>
          application.applicationId === referralTarget.applicationId
            ? { ...application, status: 'REFERRED' }
            : application
        )
      )
      setStatusDrafts((current) => ({
        ...current,
        [referralTarget.applicationId]: 'REFERRED',
      }))
      setReferralTarget(null)
      toast.success('Referral created. Application status is now REFERRED.')
    } catch (requestError) {
      const message =
        requestError.response?.data?.message ||
        requestError.response?.data?.error ||
        'Failed to create referral.'
      toast.error(message)
    } finally {
      setCreatingReferral(false)
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
            Applications
          </span>
          <h1 className="mt-4 text-4xl font-semibold tracking-tight text-slate-950 sm:text-5xl">
            Application management
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-7 text-slate-600 sm:text-lg">
            Review all job applications, update statuses, and create referrals for shortlisted candidates.
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
              <option value="ALL">All statuses</option>
              {[...APPLICATION_STATUS_OPTIONS, { value: 'REFERRED', label: 'Referred' }].map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            <button
              type="button"
              onClick={loadApplications}
              disabled={loading}
              className="rounded-full border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-slate-700 transition hover:border-slate-400 disabled:opacity-60"
            >
              Refresh
            </button>
          </div>
        </section>

        {loading && <p className="text-sm text-slate-500">Loading applications...</p>}
        {error && (
          <p className="rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">
            {error}
          </p>
        )}

        {!loading && !error && filteredApplications.length === 0 && (
          <section className="rounded-[2rem] border border-dashed border-slate-300 bg-white/90 p-10 text-center shadow-sm">
            <h2 className="text-2xl font-semibold text-slate-950">No applications found</h2>
            <p className="mt-3 text-sm text-slate-600">
              Applications will appear here once candidates apply to your jobs.
            </p>
          </section>
        )}

        {!loading && !error && filteredApplications.length > 0 && (
          <>
            <div className="hidden overflow-x-auto rounded-[2rem] border border-slate-200 bg-white/90 shadow-sm lg:block">
              <table className="min-w-full divide-y divide-slate-200 text-sm">
                <thead className="bg-slate-50 text-left text-xs font-semibold uppercase tracking-[0.12em] text-slate-500">
                  <tr>
                    <th className="px-5 py-4">Candidate</th>
                    <th className="px-5 py-4">Job</th>
                    <th className="px-5 py-4">Company</th>
                    <th className="px-5 py-4">Status</th>
                    <th className="px-5 py-4">Applied</th>
                    <th className="px-5 py-4">Resume</th>
                    <th className="px-5 py-4">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredApplications.map((application) => {
                    const applicationId = application.applicationId
                    const selectedStatus = statusDrafts[applicationId] ?? application.status ?? 'APPLIED'
                    const isReferred = application.status === 'REFERRED'
                    const canCreateReferral = application.status === 'SHORTLISTED'
                    const hasStatusChange = selectedStatus !== application.status

                    return (
                      <tr key={applicationId} className="align-top">
                        <td className="px-5 py-4">
                          <p className="font-semibold text-slate-950">{application.candidateName}</p>
                          <p className="mt-1 text-xs text-slate-500 break-all">{application.candidateEmail || 'N/A'}</p>
                        </td>
                        <td className="px-5 py-4 text-slate-700">{application.jobTitle || 'N/A'}</td>
                        <td className="px-5 py-4 text-slate-700">{application.companyName || 'N/A'}</td>
                        <td className="px-5 py-4">
                          {isReferred ? (
                            <span className={`inline-flex rounded-full border px-3 py-1 text-xs font-semibold ${getApplicationStatusStyle('REFERRED')}`}>
                              {getApplicationStatusLabel('REFERRED')}
                            </span>
                          ) : (
                            <select
                              value={selectedStatus}
                              onChange={(event) => handleStatusDraftChange(applicationId, event.target.value)}
                              className={selectClassName}
                              disabled={updatingId === applicationId}
                            >
                              {APPLICATION_STATUS_OPTIONS.map((option) => (
                                <option key={option.value} value={option.value}>
                                  {option.label}
                                </option>
                              ))}
                            </select>
                          )}
                        </td>
                        <td className="px-5 py-4 text-slate-700">{formatDate(application.appliedAt)}</td>
                        <td className="px-5 py-4">
                          {application.resumeUrl ? (
                            <a
                              href={application.resumeUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="font-semibold text-sky-700 underline underline-offset-4"
                            >
                              View
                            </a>
                          ) : (
                            <span className="text-slate-400">Unavailable</span>
                          )}
                        </td>
                        <td className="px-5 py-4">
                          <div className="flex flex-col gap-2">
                            {!isReferred && (
                              <button
                                type="button"
                                onClick={() => handleUpdateStatus(applicationId)}
                                disabled={updatingId === applicationId || !hasStatusChange}
                                className="rounded-full bg-slate-900 px-4 py-2 text-xs font-semibold text-white transition hover:bg-slate-700 disabled:cursor-not-allowed disabled:opacity-60"
                              >
                                {updatingId === applicationId ? 'Updating...' : 'Update Status'}
                              </button>
                            )}
                            {canCreateReferral && (
                              <button
                                type="button"
                                onClick={() => setReferralTarget(application)}
                                className="rounded-full border border-indigo-200 bg-indigo-50 px-4 py-2 text-xs font-semibold text-indigo-700 transition hover:bg-indigo-100"
                              >
                                Create Referral
                              </button>
                            )}
                          </div>
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>

            <div className="grid gap-5 lg:hidden">
              {filteredApplications.map((application) => {
                const applicationId = application.applicationId
                const selectedStatus = statusDrafts[applicationId] ?? application.status ?? 'APPLIED'
                const isReferred = application.status === 'REFERRED'
                const canCreateReferral = application.status === 'SHORTLISTED'
                const hasStatusChange = selectedStatus !== application.status

                return (
                  <article key={applicationId} className="rounded-[2rem] border border-slate-200 bg-white/90 p-5 shadow-sm">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <h2 className="text-lg font-semibold text-slate-950">{application.candidateName}</h2>
                        <p className="mt-1 text-sm text-slate-500 break-all">{application.candidateEmail}</p>
                      </div>
                      <span className={`rounded-full border px-3 py-1 text-xs font-semibold ${getApplicationStatusStyle(application.status)}`}>
                        {getApplicationStatusLabel(application.status)}
                      </span>
                    </div>
                    <div className="mt-4 grid gap-3 text-sm">
                      <p><span className="text-slate-500">Job:</span> {application.jobTitle || 'N/A'}</p>
                      <p><span className="text-slate-500">Company:</span> {application.companyName || 'N/A'}</p>
                      <p><span className="text-slate-500">Applied:</span> {formatDate(application.appliedAt)}</p>
                    </div>
                    {!isReferred ? (
                      <select
                        value={selectedStatus}
                        onChange={(event) => handleStatusDraftChange(applicationId, event.target.value)}
                        className={`${selectClassName} mt-4`}
                        disabled={updatingId === applicationId}
                      >
                        {APPLICATION_STATUS_OPTIONS.map((option) => (
                          <option key={option.value} value={option.value}>
                            {option.label}
                          </option>
                        ))}
                      </select>
                    ) : null}
                    <div className="mt-4 flex flex-col gap-2">
                      {!isReferred && (
                        <button
                          type="button"
                          onClick={() => handleUpdateStatus(applicationId)}
                          disabled={updatingId === applicationId || !hasStatusChange}
                          className="rounded-full bg-slate-900 px-4 py-3 text-sm font-semibold text-white disabled:opacity-60"
                        >
                          {updatingId === applicationId ? 'Updating...' : 'Update Status'}
                        </button>
                      )}
                      {canCreateReferral && (
                        <button
                          type="button"
                          onClick={() => setReferralTarget(application)}
                          className="rounded-full border border-indigo-200 bg-indigo-50 px-4 py-3 text-sm font-semibold text-indigo-700"
                        >
                          Create Referral
                        </button>
                      )}
                      {application.resumeUrl ? (
                        <a
                          href={application.resumeUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="rounded-full border border-slate-300 px-4 py-3 text-center text-sm font-semibold text-slate-700"
                        >
                          View Resume
                        </a>
                      ) : null}
                    </div>
                  </article>
                )
              })}
            </div>
          </>
        )}
      </div>

      <CreateReferralModal
        application={referralTarget}
        isOpen={Boolean(referralTarget)}
        isSubmitting={creatingReferral}
        onClose={() => setReferralTarget(null)}
        onSubmit={handleCreateReferral}
      />
    </main>
  )
}

export default AdminApplications
