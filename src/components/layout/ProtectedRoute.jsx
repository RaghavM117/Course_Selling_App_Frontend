import { Navigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'

/**
 * <ProtectedRoute role="admin">  — only admins can enter
 * <ProtectedRoute role="user">   — only users can enter
 * <ProtectedRoute>               — any authenticated user
 */
export default function ProtectedRoute({ role, children }) {
  const { isAuthed, role: userRole } = useAuth()

  if (!isAuthed) return <Navigate to="/" replace />
  if (role && userRole !== role) return <Navigate to="/" replace />

  return children
}
