import { useState } from 'react'

const initialForm = {
  companyName: '',
  contactName: '',
  contactEmail: '',
  remarks: '',
}

const inputClassName =
  'w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-slate-400 focus:bg-white focus:ring-4 focus:ring-sky-100'

const CreateReferralModal = ({ application, isOpen, isSubmitting, onClose, onSubmit }) => {
  const [form, setForm] = useState(initialForm)
  const [error, setError] = useState('')

  if (!isOpen || !application) return null

  const handleChange = (event) => {
    setForm((current) => ({ ...current, [event.target.name]: event.target.value }))
    setError('')
  }

  const handleSubmit = (event) => {
    event.preventDefault()

    if (!form.companyName.trim() || !form.contactName.trim() || !form.contactEmail.trim()) {
      setError('Company, recruiter name, and recruiter email are required.')
      return
    }

    const confirmed = window.confirm(
      `Create a referral for ${application.candidateName} to ${form.companyName.trim()}?`
    )
    if (!confirmed) return

    onSubmit({
      companyName: form.companyName.trim(),
      contactName: form.contactName.trim(),
      contactEmail: form.contactEmail.trim(),
      remarks: form.remarks.trim() || undefined,
    })
  }

  const handleClose = () => {
    if (isSubmitting) return
    setForm(initialForm)
    setError('')
    onClose()
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 px-4 py-8">
      <div className="w-full max-w-lg rounded-[2rem] border border-white/80 bg-white p-6 shadow-2xl sm:p-8">
        <div className="border-b border-slate-200 pb-4">
          <h2 className="text-2xl font-semibold text-slate-950">Create Referral</h2>
          <p className="mt-2 text-sm text-slate-600">
            Refer {application.candidateName} for {application.jobTitle || 'this role'}.
          </p>
        </div>

        {error && (
          <p className="mt-4 rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">
            {error}
          </p>
        )}

        <form onSubmit={handleSubmit} className="mt-5 space-y-4">
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700" htmlFor="companyName">
              Company
            </label>
            <input
              id="companyName"
              name="companyName"
              value={form.companyName}
              onChange={handleChange}
              placeholder="Client company name"
              className={inputClassName}
              disabled={isSubmitting}
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700" htmlFor="contactName">
              Recruiter Name
            </label>
            <input
              id="contactName"
              name="contactName"
              value={form.contactName}
              onChange={handleChange}
              placeholder="HR or recruiter contact"
              className={inputClassName}
              disabled={isSubmitting}
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700" htmlFor="contactEmail">
              Recruiter Email
            </label>
            <input
              id="contactEmail"
              name="contactEmail"
              type="email"
              value={form.contactEmail}
              onChange={handleChange}
              placeholder="contact@company.com"
              className={inputClassName}
              disabled={isSubmitting}
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700" htmlFor="remarks">
              Notes
            </label>
            <textarea
              id="remarks"
              name="remarks"
              value={form.remarks}
              onChange={handleChange}
              rows={3}
              maxLength={500}
              placeholder="Optional referral notes"
              className={inputClassName}
              disabled={isSubmitting}
            />
          </div>

          <div className="flex flex-col-reverse gap-3 pt-2 sm:flex-row sm:justify-end">
            <button
              type="button"
              onClick={handleClose}
              disabled={isSubmitting}
              className="rounded-full border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-slate-700 transition hover:border-slate-400 disabled:opacity-60"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="rounded-full bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-700 disabled:opacity-60"
            >
              {isSubmitting ? 'Creating...' : 'Create Referral'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default CreateReferralModal
