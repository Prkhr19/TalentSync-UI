import { Navigate } from 'react-router-dom'
const ProtectedRoute = ({ children, allowedRole }) => {
  if (!localStorage.getItem("token")) {
    return <Navigate to="/login" />
  }

  const userRole = localStorage.getItem("role")
  if (allowedRole && userRole !== allowedRole) {
    return <Navigate to={`/${userRole.toLowerCase()}/dashboard`} />
  }

  return children
}

export default ProtectedRoute

