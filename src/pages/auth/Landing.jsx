import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { useEffect } from 'react'

export default function Landing() {
  const navigate    = useNavigate()
  const { isAuthed, role } = useAuth()

  // Already logged in — redirect to their dashboard
  useEffect(() => {
    if (isAuthed) {
      navigate(role === 'admin' ? '/admin/courses' : '/user/courses', { replace: true })
    }
  }, [isAuthed, role, navigate])

  return (
    <div className="min-h-screen bg-bg-base flex flex-col items-center justify-center px-6">
      {/* Subtle background glow */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2
                        w-[600px] h-[600px] rounded-full
                        bg-gold/5 blur-[120px]" />
      </div>

      <div className="relative text-center max-w-xl animate-fade-up">
        <p className="text-[11px] uppercase tracking-[0.2em] text-gold mb-5 font-medium">
          Course Platform
        </p>

        <h1 className="font-display text-5xl font-bold text-ink-primary leading-tight
                       tracking-tight mb-4">
          Learn without<br />limits
        </h1>

        <p className="text-ink-secondary text-base mb-10 leading-relaxed">
          Browse expert-led courses, level up your skills,<br />
          or publish your knowledge to the world.
        </p>

        <div className="flex gap-3 justify-center">
          <button
            className="btn-primary px-8 py-3 text-[15px]"
            onClick={() => navigate('/auth/user')}
          >
            I'm a Student
          </button>
          <button
            className="btn-outline px-8 py-3 text-[15px]"
            onClick={() => navigate('/auth/admin')}
          >
            I'm an Instructor
          </button>
        </div>
      </div>

      {/* Floating dots decoration */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex gap-2 opacity-20">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="w-1 h-1 rounded-full bg-gold" />
        ))}
      </div>
    </div>
  )
}
