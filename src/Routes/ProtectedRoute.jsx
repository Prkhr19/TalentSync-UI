import { Navigate } from 'react-router-dom'
import { getStoredAuthToken, rolesMatch } from '../utils/auth'

const ProtectedRoute = ({ children, allowedRole }) => {
  if (!getStoredAuthToken()) {
    return <Navigate to="/login" />
  }

  const userRole = localStorage.getItem("role")
  if (allowedRole && !rolesMatch(userRole, allowedRole)) {
    const normalizedRole = userRole?.toLowerCase() || 'candidate'
    return <Navigate to={`/${normalizedRole}/dashboard`} />
  }

  return children
}

export default ProtectedRoute

