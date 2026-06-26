import { Link } from "react-router-dom";

const JobCard = ({ job }) => {
  const postedDate = job.postedAt ? new Date(job.postedAt).toLocaleDateString() : 'Recently'
  const salary = typeof job.salary === 'number' ? job.salary.toLocaleString() : job.salary || 'Not disclosed'
  const jobType = job.jobType || job.jobtype || job.job_type || job.employmentType || job.employment_type
  const formattedJobType = jobType
    ? String(jobType).toLowerCase().split('_').map((word) => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')
    : 'Full Time'

  return (
    <div className="group rounded-[2rem] border border-slate-200 bg-white/90 p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg backdrop-blur">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm font-medium text-slate-500">{job.companyName}</p>
          <h3 className="mt-2 text-xl font-semibold text-slate-950">{job.title}</h3>
        </div>

        <span className="shrink-0 rounded-full bg-sky-50 px-3 py-1 text-xs font-semibold text-sky-700">
          {formattedJobType}
        </span>
      </div>

      <div className="mt-5 space-y-3 text-sm text-slate-600">
        <p className="flex items-center gap-2">
          <span className="text-slate-400">Location:</span>
          <span className="font-medium text-slate-700">{job.location || 'Remote'}</span>
        </p>
        <p className="flex items-center gap-2">
          <span className="text-slate-400">Salary:</span>
          <span className="font-medium text-slate-700">{salary}</span>
        </p>
        <p className="flex items-center gap-2">
          <span className="text-slate-400">Posted:</span>
          <span className="font-medium text-slate-700">{postedDate}</span>
        </p>
      </div>

      <div className="mt-6 flex items-center justify-between border-t border-slate-200 pt-5">
        <p className="text-xs font-medium uppercase tracking-[0.2em] text-slate-400">View details</p>
        <Link
          to={`/job/${job.id}`}
          className="rounded-full bg-slate-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-700"
        >
          Open job
        </Link>
      </div>
    </div>
  );
};

export default JobCard;
