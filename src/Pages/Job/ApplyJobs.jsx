import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { applyJobs } from '../../Services/JobService'
import Mainlayout from '../../layouts/Mainlayout'
import { ROUTES } from '../../Routes/Routes'

const ApplyJobs = () => {
    const { jobId } = useParams()
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)
    const [success, setSuccess] = useState("")

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (!jobId) {
            setError("Job ID is required")
            return
        }

        setError("")
        setSuccess("")

        setLoading(true)
        try {
            await applyJobs(jobId)
            setSuccess("Your application was submitted successfully.")
        } catch (error) {
            console.error("Error applying for job:", error)
            setError(error?.response?.data?.message || "Failed to apply for job")
        } finally {
            setLoading(false)
        }
    }

    return (
    <Mainlayout>
        <main className="min-h-[calc(100vh-72px)] bg-[radial-gradient(circle_at_top,_rgba(186,230,253,0.32),_transparent_34%),linear-gradient(180deg,#f8fafc_0%,#eef6fb_100%)] px-4 py-10 text-slate-900 sm:px-6 lg:px-8 lg:py-14">
            <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[1fr_0.9fr] lg:items-start">
                <section className="rounded-[2rem] border border-white/80 bg-white/90 p-7 shadow-[0_20px_60px_rgba(15,23,42,0.10)] backdrop-blur sm:p-8">
                    <span className="inline-flex items-center rounded-full border border-sky-200 bg-sky-50 px-4 py-1 text-sm font-medium text-sky-700">
                        Apply to job
                    </span>
                    <h1 className="mt-5 text-4xl font-semibold tracking-tight text-slate-950 sm:text-5xl">
                        Submit your application with one click.
                    </h1>
                    <p className="mt-4 max-w-2xl text-base leading-7 text-slate-600 sm:text-lg">
                        You are applying for job ID <span className="font-semibold text-slate-900">{jobId}</span>. Review the role details, then confirm your application below.
                    </p>

                    {error && (
                        <div className="mt-6 rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">
                            {error}
                        </div>
                    )}

                    {success && (
                        <div className="mt-6 flex flex-col gap-3 rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-4 text-sm text-emerald-700 sm:flex-row sm:items-center sm:justify-between">
                            <span className="font-medium">✓ {success}</span>
                            <Link to={ROUTES.APPPLICATION_STATUS} className="font-semibold underline underline-offset-4">
                                Track application
                            </Link>
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="mt-6 space-y-5">
                        <div className="rounded-3xl border border-slate-200 bg-slate-50 p-5">
                            <p className="text-sm font-medium text-slate-500">Application note</p>
                            <p className="mt-2 text-sm leading-6 text-slate-700">
                                Your profile, resume, and account details will be used for this application.
                            </p>
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="inline-flex w-full items-center justify-center rounded-full bg-slate-900 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-slate-900/15 transition hover:-translate-y-0.5 hover:bg-slate-700 disabled:cursor-not-allowed disabled:opacity-70"
                        >
                            {loading ? "Applying..." : "Apply Now"}
                        </button>
                    </form>
                </section>

                <aside className="relative overflow-hidden rounded-[2rem] border border-white/80 bg-slate-900 p-7 text-white shadow-[0_20px_60px_rgba(15,23,42,0.16)] sm:p-8">
                    <div className="absolute inset-x-0 top-0 h-24 rounded-t-[2rem] bg-gradient-to-b from-sky-400/20 to-transparent" />
                    <div className="relative">
                        <p className="text-sm font-medium text-sky-300">Application checklist</p>
                        <h2 className="mt-2 text-2xl font-semibold tracking-tight sm:text-3xl">
                            Keep your profile ready before you submit.
                        </h2>

                        <div className="mt-6 space-y-4">
                            <div className="rounded-2xl border border-slate-700 bg-white/5 p-4">
                                <p className="text-sm text-slate-300">1. Profile</p>
                                <p className="mt-2 text-sm leading-6 text-slate-300">Make sure your name, skills, and education are updated.</p>
                            </div>
                            <div className="rounded-2xl border border-slate-700 bg-white/5 p-4">
                                <p className="text-sm text-slate-300">2. Resume</p>
                                <p className="mt-2 text-sm leading-6 text-slate-300">Use a resume link that recruiters can open easily.</p>
                            </div>
                            <div className="rounded-2xl border border-slate-700 bg-white/5 p-4">
                                <p className="text-sm text-slate-300">3. Submit</p>
                                <p className="mt-2 text-sm leading-6 text-slate-300">Apply when you are ready and keep an eye on application status.</p>
                            </div>
                        </div>
                    </div>
                </aside>
            </div>
        </main>
    </Mainlayout>
  )
}

export default ApplyJobs

