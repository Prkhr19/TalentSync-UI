import { Route, Routes } from 'react-router-dom'
import Mainlayout from './layouts/Mainlayout'
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
import AdminCandidates from './Pages/Recruiter/AdminCandidates.jsx'
import AdminApplications from './Pages/Recruiter/AdminApplications.jsx'
import AdminReferrals from './Pages/Recruiter/AdminReferrals.jsx'
import AdminSettings from './Pages/Recruiter/AdminSettings.jsx'
import CandidateReferrals from './Pages/Candidate/CandidateReferrals.jsx'
import PrivacyPolicy from './Pages/Legal/PrivacyPolicy.jsx'
import TermsAndConditions from './Pages/Legal/TermsAndConditions.jsx'
import Contact from './Pages/Legal/Contact.jsx'

const App = () => {
  return (
    <Routes>
      <Route element={<Mainlayout />}>
        <Route path={ROUTES.HOME} element={<Home />} />
        <Route path={ROUTES.LOGIN} element={<Login />} />
        <Route path={ROUTES.SIGNUP} element={<Signup />} />
        <Route path={ROUTES.PRIVACY_POLICY} element={<PrivacyPolicy />} />
        <Route path={ROUTES.TERMS_AND_CONDITIONS} element={<TermsAndConditions />} />
        <Route path={ROUTES.CONTACT} element={<Contact />} />
        <Route path={ROUTES.CANDIDATE_DASHBOARD} element={<ProtectedRoute allowedRole="CANDIDATE"><CDashboard /></ProtectedRoute>} />
        <Route path={ROUTES.ADMIN_DASHBOARD} element={<ProtectedRoute allowedRole="ADMIN"><RDashBoard /></ProtectedRoute>} />
        <Route path="/jobs" element={<Jobs />} />
        <Route path={ROUTES.JOB_DETAILSBYID} element={<JobDetails />} />
        <Route path={ROUTES.UPDATE_PROFILE} element={<ProtectedRoute allowedRole="CANDIDATE"><CandidateUpdateProfile /></ProtectedRoute>} />
        <Route path={ROUTES.APPPLICATION_STATUS} element={<ProtectedRoute allowedRole="CANDIDATE"><JobApplicationStatus /></ProtectedRoute>} />
        <Route path={ROUTES.CANDIDATE_REFERRALS} element={<ProtectedRoute allowedRole="CANDIDATE"><CandidateReferrals /></ProtectedRoute>} />
        <Route path={ROUTES.APPLY_JOBS} element={<ProtectedRoute allowedRole="CANDIDATE"><ApplyJobs /></ProtectedRoute>} />
        <Route path={ROUTES.CREATE_COMPANY} element={<ProtectedRoute allowedRole="ADMIN"><CreateCompany /></ProtectedRoute>} />
        <Route path={ROUTES.CREATE_JOB} element={<ProtectedRoute allowedRole="ADMIN"><CreateJob /></ProtectedRoute>} />
        <Route path={ROUTES.VIEW_JOBS} element={<ProtectedRoute allowedRole="ADMIN"><ViewMyJobs /></ProtectedRoute>} />
        <Route path={ROUTES.JOB_APPLICATIONS} element={<ProtectedRoute allowedRole="ADMIN"><ViewApplications /></ProtectedRoute>} />
        <Route path={ROUTES.ADMIN_CANDIDATES} element={<ProtectedRoute allowedRole="ADMIN"><AdminCandidates /></ProtectedRoute>} />
        <Route path={ROUTES.ADMIN_APPLICATIONS} element={<ProtectedRoute allowedRole="ADMIN"><AdminApplications /></ProtectedRoute>} />
        <Route path={ROUTES.ADMIN_REFERRALS} element={<ProtectedRoute allowedRole="ADMIN"><AdminReferrals /></ProtectedRoute>} />
        <Route path={ROUTES.ADMIN_SETTINGS} element={<ProtectedRoute allowedRole="ADMIN"><AdminSettings /></ProtectedRoute>} />
      </Route>
    </Routes>
  )
}

export default App
