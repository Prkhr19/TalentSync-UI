import { Link } from 'react-router-dom'
import { ROUTES } from '../../Routes/Routes'
import { usePageMeta } from '../../utils/usePageMeta'

const TermsAndConditions = () => {
  usePageMeta(
    'Terms & Conditions | HireNex',
    'Read the Terms and Conditions governing your use of HireNex recruitment and referral services.'
  )

  return (
      <main className="min-h-[calc(100vh-72px)] bg-[radial-gradient(circle_at_top,_rgba(186,230,253,0.32),_transparent_34%),linear-gradient(180deg,#f8fafc_0%,#eef6fb_100%)] px-4 py-10 text-slate-900 sm:px-6 lg:px-8 lg:py-14">
        <div className="mx-auto max-w-4xl">
          <section className="rounded-[2rem] border border-white/80 bg-white/90 p-7 shadow-[0_20px_60px_rgba(15,23,42,0.10)] backdrop-blur sm:p-10">
            <span className="inline-flex items-center rounded-full border border-sky-200 bg-sky-50 px-4 py-1 text-sm font-medium text-sky-700">
              Legal
            </span>
            <h1 className="mt-5 text-4xl font-semibold tracking-tight text-slate-950 sm:text-5xl">
              Terms & Conditions
            </h1>
            <p className="mt-4 text-sm text-slate-500">Last updated: June 26, 2026</p>
            <p className="mt-6 text-base leading-7 text-slate-600">
              By accessing or using HireNex, you agree to the following Terms & Conditions. Please read
              them carefully before creating an account or submitting your profile.
            </p>

            <div className="mt-10 space-y-8 text-sm leading-7 text-slate-700 sm:text-base">
              <section>
                <h2 className="text-xl font-semibold text-slate-950">Accurate Information</h2>
                <p className="mt-3">
                  Users must provide accurate, complete, and up-to-date information in their profiles. This
                  includes personal details, work experience, skills, salary expectations, and resume content.
                  Misleading or false information may result in account suspension or removal.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-slate-950">Recruitment Consultancy</h2>
                <p className="mt-3">
                  HireNex operates as a recruitment consultancy platform. We help candidates build profiles,
                  apply for opportunities, and receive referrals to hiring companies and recruitment partners.
                  HireNex facilitates the hiring process but does not act as the employer.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-slate-950">Referrals and Outcomes</h2>
                <p className="mt-3">
                  Job referrals made through HireNex do not guarantee interviews, shortlisting, or employment.
                  Hiring decisions are made solely by the respective companies and partners. HireNex makes
                  reasonable efforts to match candidates with suitable opportunities but cannot guarantee
                  specific outcomes.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-slate-950">Fraudulent Profiles</h2>
                <p className="mt-3">
                  Profiles that contain fraudulent, misleading, or impersonated information may be removed
                  without notice. HireNex reserves the right to suspend or terminate accounts that violate
                  these terms or misuse the platform.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-slate-950">Platform Use</h2>
                <p className="mt-3">
                  You agree to use HireNex only for lawful recruitment and career-related purposes. You
                  may not attempt to access unauthorized areas of the platform, interfere with system security,
                  or misuse candidate or admin functionality.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-slate-950">Changes to These Terms</h2>
                <p className="mt-3">
                  HireNex may update these Terms & Conditions from time to time. Continued use of the
                  platform after changes are published constitutes acceptance of the updated terms. We
                  encourage users to review this page periodically.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-slate-950">Contact</h2>
                <p className="mt-3">
                  If you have questions about these terms, please reach out through our{' '}
                  <Link to={ROUTES.CONTACT} className="font-semibold text-slate-900 underline underline-offset-4">
                    Contact Us
                  </Link>{' '}
                  page.
                </p>
              </section>
            </div>
          </section>
        </div>
      </main>
  )
}

export default TermsAndConditions
