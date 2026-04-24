import { NavLink, useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'

const userLinks  = [
  { to: '/user/courses',    label: 'Browse'     },
  { to: '/user/my-courses', label: 'My Courses' },
  { to: '/user/password',   label: 'Password'   },
]

const adminLinks = [
  { to: '/admin/courses',       label: 'My Courses'    },
  { to: '/admin/courses/create', label: 'New Course'   },
  { to: '/admin/password',       label: 'Password'     },
]

export default function Navbar() {
  const { role, logout } = useAuth()
  const navigate         = useNavigate()
  const links            = role === 'admin' ? adminLinks : userLinks

  function handleLogout() {
    logout()
    navigate('/')
  }

  return (
    <nav className="sticky top-0 z-50 bg-bg-surface/80 backdrop-blur border-b border-bg-border">
      <div className="max-w-6xl mx-auto px-6 h-14 flex items-center justify-between">
        {/* Brand */}
        <NavLink
          to={role === 'admin' ? '/admin/courses' : '/user/courses'}
          className="font-display text-gold text-base tracking-tight"
        >
          {role === 'admin' ? '◆ AdminHub' : '◆ CourseHub'}
        </NavLink>

        {/* Links */}
        <div className="flex items-center gap-1">
          {links.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              className={({ isActive }) =>
                `px-3 py-1.5 rounded-lg text-[13px] font-medium transition-colors duration-150 ` +
                (isActive
                  ? 'text-gold bg-gold-subtle'
                  : 'text-ink-secondary hover:text-ink-primary hover:bg-bg-raised')
              }
            >
              {l.label}
            </NavLink>
          ))}

          <button
            onClick={handleLogout}
            className="ml-3 px-3 py-1.5 rounded-lg text-[13px] font-medium
                       text-red-400 hover:bg-red-950/30 transition-colors duration-150"
          >
            Sign out
          </button>
        </div>
      </div>
    </nav>
  )
}
