import { Routes, Route, Navigate } from 'react-router-dom'
import { useAuth } from './context/AuthContext'

// Layout
import Navbar          from './components/layout/Navbar'
import ProtectedRoute  from './components/layout/ProtectedRoute'

// Pages
import Landing         from './pages/auth/Landing'
import AuthPage        from './pages/auth/AuthPage'
import BrowseCourses   from './pages/user/BrowseCourses'
import MyCourses       from './pages/user/MyCourses'
import ChangePassword  from './pages/user/ChangePassword'
import AdminCourses    from './pages/admin/AdminCourses'
import CourseForm      from './pages/admin/CourseForm'

export default function App() {
  const { isAuthed } = useAuth()

  return (
    <div className="min-h-screen bg-bg-base">
      {/* Navbar only when logged in */}
      {isAuthed && <Navbar />}

      <Routes>
        {/* ── Public ───────────────────────────────────── */}
        <Route path="/"               element={<Landing />} />
        <Route path="/auth/:role"     element={<AuthPage />} />

        {/* ── User ─────────────────────────────────────── */}
        <Route
          path="/user/courses"
          element={
            <ProtectedRoute role="user">
              <BrowseCourses />
            </ProtectedRoute>
          }
        />
        <Route
          path="/user/my-courses"
          element={
            <ProtectedRoute role="user">
              <MyCourses />
            </ProtectedRoute>
          }
        />
        <Route
          path="/user/password"
          element={
            <ProtectedRoute role="user">
              <ChangePassword />
            </ProtectedRoute>
          }
        />

        {/* ── Admin ────────────────────────────────────── */}
        <Route
          path="/admin/courses"
          element={
            <ProtectedRoute role="admin">
              <AdminCourses />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/courses/create"
          element={
            <ProtectedRoute role="admin">
              <CourseForm />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/courses/edit/:id"
          element={
            <ProtectedRoute role="admin">
              <CourseForm />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/password"
          element={
            <ProtectedRoute role="admin">
              <ChangePassword />
            </ProtectedRoute>
          }
        />

        {/* ── Fallback ─────────────────────────────────── */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  )
}
