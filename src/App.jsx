import { Route, Routes } from 'react-router-dom'
import Home from './Pages/Home'
import Login from './Pages/Auth/Login'
import Signup from './Pages/Auth/Signup'
import { ROUTES } from './Routes/Routes.js'
import CDashboard from './Pages/Candidate/CDashboard'
import RDashBoard from './Pages/Recruiter/RDashBoard.jsx'
import JobDetails from './Pages/Job/JobDetails'
import ProtectedRoute from './Routes/ProtectedRoute'
import CandidateUpdateProfile from './Pages/Candidate/CandidateUpdateProfile'
import Jobs from './Pages/Job/Jobs'
import JobApplicationStatus from './Pages/Candidate/JobApplicationStatus.jsx'
import CreateCompany from './Pages/Recruiter/CreateCompany.jsx'
import CreateJob from './Pages/Recruiter/CreateJob.jsx'
import ApplyJobs from './Pages/Job/ApplyJobs.jsx'
import ViewMyJobs from './Pages/Recruiter/ViewMyJobs.jsx'
import ViewApplications from './Pages/Recruiter/ViewApplications.jsx'


const App = () => {
  return (
    <Routes>
      <Route path={ROUTES.HOME} element={<Home />} />
      <Route path={ROUTES.LOGIN} element={<Login />} />
      <Route path={ROUTES.SIGNUP} element={<Signup />} />
      <Route path={ROUTES.CANDIDATE_DASHBOARD} element={<ProtectedRoute allowedRole='CANDIDATE'><CDashboard /></ProtectedRoute>} />
      <Route path={ROUTES.RECRUITER_DASHBOARD} element={<ProtectedRoute allowedRole='RECRUITER'><RDashBoard /></ProtectedRoute>} />
      <Route path="/jobs" element={<Jobs />} />
      <Route path={ROUTES.JOB_DETAILSBYID} element={<JobDetails />} />
      <Route path={ROUTES.UPDATE_PROFILE} element={<ProtectedRoute allowedRole="CANDIDATE"><CandidateUpdateProfile /></ProtectedRoute>} />
      <Route path={ROUTES.APPPLICATION_STATUS} element={<ProtectedRoute allowedRole='CANDIDATE'><JobApplicationStatus/></ProtectedRoute>} />
      <Route path={ROUTES.APPLY_JOBS} element={<ProtectedRoute allowedRole='CANDIDATE'><ApplyJobs /></ProtectedRoute>} />
      <Route path={ROUTES.CREATE_COMPANY} element={<ProtectedRoute allowedRole='RECRUITER'><CreateCompany /></ProtectedRoute>} />
      <Route path={ROUTES.CREATE_JOB} element={<ProtectedRoute allowedRole='RECRUITER'><CreateJob /></ProtectedRoute>} />
      <Route path={ROUTES.VIEW_JOBS} element={<ProtectedRoute allowedRole='RECRUITER'><ViewMyJobs /></ProtectedRoute>} />
      <Route path={ROUTES.JOB_APPLICATIONS} element={<ProtectedRoute allowedRole='RECRUITER'><ViewApplications /></ProtectedRoute>} />
    
    </Routes>
  )
}

export default App
