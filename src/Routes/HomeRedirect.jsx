import { Navigate } from 'react-router-dom'
import Home from '../Pages/Home'
import { ROUTES } from './Routes'

const HomeRedirect = () => {
  const token = localStorage.getItem('token')
  const role = localStorage.getItem('role')

  if (!token) {
    return <Home />
  }

  if (role === 'ADMIN') {
    return <Navigate to={ROUTES.ADMIN_DASHBOARD} replace />
  }

  if (role === 'CANDIDATE') {
    return <Navigate to={ROUTES.CANDIDATE_DASHBOARD} replace />
  }

  return <Home />
}

export default HomeRedirect
