import { useState } from 'react'
import { usePageMeta } from '../../utils/usePageMeta'

const inputClassName =
  'w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-sky-400 focus:bg-white focus:ring-4 focus:ring-sky-100'

const Contact = () => {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' })
  const [submitted, setSubmitted] = useState(false)

  usePageMeta(
    'Contact Us | TalentSync',
    'Get in touch with TalentSync for support, partnerships, privacy requests, and recruitment enquiries.'
  )

  const handleChange = (event) => {
    const { name, value } = event.target
    setFormData((current) => ({ ...current, [name]: value }))
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    setSubmitted(true)
  }

  return (
      <main className="min-h-[calc(100vh-72px)] bg-[radial-gradient(circle_at_top,_rgba(186,230,253,0.32),_transparent_34%),linear-gradient(180deg,#f8fafc_0%,#eef6fb_100%)] px-4 py-10 text-slate-900 sm:px-6 lg:px-8 lg:py-14">
        <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
          <section className="rounded-[2rem] border border-white/80 bg-white/90 p-7 shadow-[0_20px_60px_rgba(15,23,42,0.10)] backdrop-blur sm:p-8">
            <span className="inline-flex items-center rounded-full border border-sky-200 bg-sky-50 px-4 py-1 text-sm font-medium text-sky-700">
              Contact
            </span>
            <h1 className="mt-5 text-4xl font-semibold tracking-tight text-slate-950 sm:text-5xl">
              Get in touch with TalentSync
            </h1>
            <p className="mt-4 text-base leading-7 text-slate-600">
              Reach out for support, partnership enquiries, privacy requests, or questions about referrals
              and applications.
            </p>

            <div className="mt-8 space-y-4">
              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
                <p className="text-sm font-medium text-slate-500">Business email</p>
                <a href="mailto:talentsync.contact@gmail.com" className="mt-2 block text-base font-semibold text-slate-900">
                  talentsync.contact@gmail.com
                </a>
              </div>

              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
                <p className="text-sm font-medium text-slate-500">Contact numbers</p>
                <a href="tel:+916265152390" className="mt-2 block text-base font-semibold text-slate-900">
                  +91 6265152390
                </a>
                <a href="tel:+917898135344" className="mt-2 block text-base font-semibold text-slate-900">
                  +91 7898135344
                </a>
              </div>

              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
                <p className="text-sm font-medium text-slate-500">LinkedIn</p>
                <a
                  href="https://www.linkedin.com/in/prakhar-shri"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-2 block text-base font-semibold text-slate-900"
                >
                  linkedin.com/in/prakhar-shri
                </a>
              </div>

              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
                <p className="text-sm font-medium text-slate-500">Business hours</p>
                <p className="mt-2 text-sm leading-6 text-slate-700">Monday – Saturday: 9:00 AM – 7:00 PM IST</p>
                <p className="text-sm leading-6 text-slate-700">Sunday: Closed</p>
              </div>
            </div>
          </section>

          <section className="rounded-[2rem] border border-white/80 bg-white/90 p-7 shadow-[0_20px_60px_rgba(15,23,42,0.10)] backdrop-blur sm:p-8">
            <h2 className="text-2xl font-semibold text-slate-950">Send us a message</h2>
            <p className="mt-2 text-sm leading-6 text-slate-500">
              This form is for UI demonstration. Messages are not yet sent to a backend service.
            </p>

            {submitted ? (
              <div className="mt-6 rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-4 text-sm text-emerald-700">
                Thank you for your message. We will get back to you during business hours.
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="mt-6 space-y-5">
                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-700" htmlFor="name">
                    Name
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Your name"
                    className={inputClassName}
                    required
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-700" htmlFor="email">
                    Email
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="your@email.com"
                    className={inputClassName}
                    required
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-700" htmlFor="subject">
                    Subject
                  </label>
                  <input
                    id="subject"
                    name="subject"
                    type="text"
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder="How can we help?"
                    className={inputClassName}
                    required
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-700" htmlFor="message">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Write your message here..."
                    rows={6}
                    className={`${inputClassName} resize-y leading-6`}
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="inline-flex w-full items-center justify-center rounded-full bg-slate-900 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-slate-900/15 transition hover:-translate-y-0.5 hover:bg-slate-700"
                >
                  Send Message
                </button>
              </form>
            )}
          </section>
        </div>
      </main>
  )
}

export default Contact
