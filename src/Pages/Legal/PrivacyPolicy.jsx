  import { Link } from 'react-router-dom'
  import { ROUTES } from '../../Routes/Routes'
  import { usePageMeta } from '../../utils/usePageMeta'

  const PrivacyPolicy = () => {
    usePageMeta(
      'Privacy Policy | TalentSync',
      'Learn how TalentSync collects, uses, stores, and protects candidate information for recruitment and referral services.'
    )

    return (
        <main className="min-h-[calc(100vh-72px)] bg-[radial-gradient(circle_at_top,_rgba(186,230,253,0.32),_transparent_34%),linear-gradient(180deg,#f8fafc_0%,#eef6fb_100%)] px-4 py-10 text-slate-900 sm:px-6 lg:px-8 lg:py-14">
          <div className="mx-auto max-w-4xl">
            <section className="rounded-[2rem] border border-white/80 bg-white/90 p-7 shadow-[0_20px_60px_rgba(15,23,42,0.10)] backdrop-blur sm:p-10">
              <span className="inline-flex items-center rounded-full border border-sky-200 bg-sky-50 px-4 py-1 text-sm font-medium text-sky-700">
                Legal
            </span>
            <h1 className="mt-5 text-4xl font-semibold tracking-tight text-slate-950 sm:text-5xl">
              Privacy Policy
            </h1>
            <p className="mt-4 text-sm text-slate-500">Last updated: June 26, 2026</p>
            <p className="mt-6 text-base leading-7 text-slate-600">
              TalentSync is a recruitment consultancy platform. This Privacy Policy explains how we collect,
              use, store, and protect your personal information when you use our services.
            </p>

            <div className="mt-10 space-y-8 text-sm leading-7 text-slate-700 sm:text-base">
              <section>
                <h2 className="text-xl font-semibold text-slate-950">Information We Collect</h2>
                <p className="mt-3">
                  When you create a candidate profile or use TalentSync, we may collect the following information:
                </p>
                <ul className="mt-4 list-disc space-y-2 pl-5">
                  <li>Name</li>
                  <li>Email address</li>
                  <li>Phone number</li>
                  <li>Resume (PDF upload)</li>
                  <li>Skills and experience details</li>
                  <li>Current company and designation</li>
                  <li>Salary information (current CTC and expected CTC)</li>
                  <li>Notice period and preferred location</li>
                  <li>LinkedIn, GitHub, and portfolio URLs</li>
                  <li>Resume headline and education details</li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-slate-950">How We Use Your Information</h2>
                <p className="mt-3">We use the information you provide for the following purposes:</p>
                <ul className="mt-4 list-disc space-y-2 pl-5">
                  <li>Profile creation and maintenance</li>
                  <li>Job matching and opportunity recommendations</li>
                  <li>Candidate screening and evaluation</li>
                  <li>Recruitment referrals to hiring companies and partners</li>
                  <li>Communication regarding applications, referrals, and platform updates</li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-slate-950">Resume Storage</h2>
                <p className="mt-3">
                  Resumes are uploaded securely to TalentSync and stored for recruitment purposes. Your resume
                  is used to assess your qualifications, match you with relevant opportunities, and share your
                  profile with authorized hiring partners when appropriate referrals are made.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-slate-950">Data Sharing</h2>
                <p className="mt-3">
                  Candidate information may be shared only with hiring companies and recruitment partners for
                  relevant job opportunities. We do not sell your personal data. Information is shared solely
                  to facilitate recruitment, referrals, and hiring processes aligned with your profile and
                  career interests.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-slate-950">Security</h2>
                <p className="mt-3">TalentSync takes reasonable measures to protect your data, including:</p>
                <ul className="mt-4 list-disc space-y-2 pl-5">
                  <li>Secure authentication for user accounts</li>
                  <li>Role-based authorization to restrict access to sensitive data</li>
                  <li>HTTPS encryption for data transmitted between your browser and our servers</li>
                  <li>Restricted admin access to candidate records and recruitment workflows</li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-slate-950">Your Rights</h2>
                <p className="mt-3">As a TalentSync candidate, you may:</p>
                <ul className="mt-4 list-disc space-y-2 pl-5">
                  <li>Update your profile information at any time</li>
                  <li>Replace your resume with an updated PDF</li>
                  <li>Request deletion of your profile and associated data</li>
                  <li>Contact TalentSync regarding how your data is collected, used, or stored</li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-slate-950">Contact</h2>
                <p className="mt-3">
                  For privacy-related questions or data requests, please contact us through our{' '}
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

export default PrivacyPolicy
