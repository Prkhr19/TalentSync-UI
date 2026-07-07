import { useEffect, useState } from 'react'

const initialForm = {
  companyName: '',
  contactName: '',
  contactEmail: '',
  remarks: '',
  referredDate: '',
  followUpDate: '',
  interviewDate: '',
  joiningDate: '',
}

const inputClassName =
  'w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-slate-400 focus:bg-white focus:ring-4 focus:ring-sky-100'

const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)

const CreateReferralModal = ({ application, isOpen, isSubmitting, onClose, onSubmit }) => {
  const [form, setForm] = useState(initialForm)
  const [error, setError] = useState('')

  useEffect(() => {
    if (isOpen) {
      setForm(initialForm)
      setError('')
    }
  }, [isOpen, application?.applicationId])

  if (!isOpen || !application) return null

  const handleChange = (event) => {
    setForm((current) => ({ ...current, [event.target.name]: event.target.value }))
    setError('')
  }

  const handleSubmit = (event) => {
    event.preventDefault()

    if (!form.companyName.trim()) {
      setError('Company name is required.')
      return
    }

    if (!form.contactName.trim()) {
      setError('Contact name is required.')
      return
    }

    if (!form.contactEmail.trim()) {
      setError('Contact email is required.')
      return
    }

    if (!isValidEmail(form.contactEmail.trim())) {
      setError('Please enter a valid contact email address.')
      return
    }

    if (form.remarks.trim().length > 500) {
      setError('Remarks must be 500 characters or fewer.')
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
      referredDate: form.referredDate || undefined,
      followUpDate: form.followUpDate || undefined,
      interviewDate: form.interviewDate || undefined,
      joiningDate: form.joiningDate || undefined,
    })
  }

  const handleClose = () => {
    if (isSubmitting) return
    setForm(initialForm)
    setError('')
    onClose()
  }

  return (
    <div className="fixed inset-0 z-[100] flex items-start justify-center overflow-y-auto bg-slate-900/50 px-4 py-8 sm:items-center sm:py-10">
      <div className="my-auto w-full max-w-lg max-h-[calc(100vh-5rem)] overflow-y-auto rounded-[2rem] border border-white/80 bg-white p-6 shadow-2xl sm:p-8">
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
              Company Name *
            </label>
            <input
              id="companyName"
              name="companyName"
              value={form.companyName}
              onChange={handleChange}
              placeholder="ABC Pvt Ltd"
              className={inputClassName}
              disabled={isSubmitting}
              required
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700" htmlFor="contactName">
              Contact Name *
            </label>
            <input
              id="contactName"
              name="contactName"
              value={form.contactName}
              onChange={handleChange}
              placeholder="Jane HR"
              className={inputClassName}
              disabled={isSubmitting}
              required
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700" htmlFor="contactEmail">
              Contact Email *
            </label>
            <input
              id="contactEmail"
              name="contactEmail"
              type="email"
              value={form.contactEmail}
              onChange={handleChange}
              placeholder="jane.hr@abc.com"
              className={inputClassName}
              disabled={isSubmitting}
              required
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700" htmlFor="remarks">
              Remarks
            </label>
            <textarea
              id="remarks"
              name="remarks"
              value={form.remarks}
              onChange={handleChange}
              rows={3}
              maxLength={500}
              placeholder="Strong backend candidate"
              className={inputClassName}
              disabled={isSubmitting}
            />
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {[
              ['referredDate', 'Referred Date'],
              ['followUpDate', 'Follow-up Date'],
              ['interviewDate', 'Interview Date'],
              ['joiningDate', 'Joining Date'],
            ].map(([name, label]) => (
              <div key={name}>
                <label className="mb-2 block text-sm font-medium text-slate-700" htmlFor={name}>
                  {label}
                </label>
                <input
                  type="date"
                  id={name}
                  name={name}
                  value={form[name]}
                  onChange={handleChange}
                  className={inputClassName}
                  disabled={isSubmitting}
                />
              </div>
            ))}
          </div>

          <p className="text-xs text-slate-500">
            Referred date defaults to today on the server if left empty. Application status will be set to REFERRED on success.
          </p>

          <div className="sticky bottom-0 -mx-6 flex flex-col-reverse gap-3 border-t border-slate-200 bg-white px-6 pb-1 pt-4 sm:-mx-8 sm:flex-row sm:justify-end sm:px-8">
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
