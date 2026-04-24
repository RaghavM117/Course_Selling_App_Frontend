import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { adminSignin, adminSignup, userSignin, userSignup } from '../../api/courseApi'
import FormField from '../../components/ui/FormField'
import { ButtonSpinner } from '../../components/ui/Spinner'

export default function AuthPage() {
  const { role }      = useParams()          // 'user' | 'admin'
  const navigate      = useNavigate()
  const { login }     = useAuth()
  const [mode, setMode]       = useState('signin')  // 'signin' | 'signup'
  const [loading, setLoading] = useState(false)
  const [error, setError]     = useState('')

  const [form, setForm] = useState({
    firstName: '', lastName: '', email: '', password: '',
  })

  const update = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }))

  const isAdmin = role === 'admin'

  async function handleSubmit(e) {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      let res
      if (mode === 'signup') {
        res = isAdmin
          ? await adminSignup(form)
          : await userSignup(form)
      } else {
        const creds = { email: form.email, password: form.password }
        res = isAdmin
          ? await adminSignin(creds)
          : await userSignin(creds)
      }
      const token = res.data?.token
      login(token, role)
      navigate(isAdmin ? '/admin/courses' : '/user/courses', { replace: true })
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  function toggleMode() {
    setMode((m) => (m === 'signin' ? 'signup' : 'signin'))
    setError('')
  }

  return (
    <div className="min-h-screen bg-bg-base flex items-center justify-center px-4">

      {/* Glow */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2
                        w-[400px] h-[400px] rounded-full bg-gold/5 blur-[100px]" />
      </div>

      <div className="relative w-full max-w-[420px] animate-fade-up">

        {/* Back */}
        <button
          onClick={() => navigate('/')}
          className="mb-6 text-ink-muted text-[13px] hover:text-ink-secondary
                     transition-colors flex items-center gap-1.5"
        >
          ← Back
        </button>

        {/* Header */}
        <div className="mb-7">
          <p className="text-[11px] uppercase tracking-[0.2em] text-gold mb-2 font-medium">
            {isAdmin ? 'Instructor Portal' : 'Student Portal'}
          </p>
          <h1 className="font-display text-3xl font-bold text-ink-primary tracking-tight">
            {mode === 'signin' ? 'Welcome back' : 'Create account'}
          </h1>
        </div>

        {/* Card */}
        <div className="card">
          <form onSubmit={handleSubmit} noValidate>

            {/* Error */}
            {error && (
              <div className="mb-4 px-4 py-3 rounded-lg bg-red-950/50 border border-red-900/40
                              text-red-400 text-[13px] animate-fade-in">
                {error}
              </div>
            )}

            {/* Signup-only fields */}
            {mode === 'signup' && (
              <div className="grid grid-cols-2 gap-3">
                <FormField label="First Name">
                  <input
                    className="input-field"
                    value={form.firstName}
                    onChange={update('firstName')}
                    placeholder="Alex"
                    required
                  />
                </FormField>
                <FormField label="Last Name">
                  <input
                    className="input-field"
                    value={form.lastName}
                    onChange={update('lastName')}
                    placeholder="Chen"
                    required
                  />
                </FormField>
              </div>
            )}

            <FormField label="Email">
              <input
                className="input-field"
                type="email"
                value={form.email}
                onChange={update('email')}
                placeholder="you@example.com"
                required
              />
            </FormField>

            <FormField label="Password">
              <input
                className="input-field"
                type="password"
                value={form.password}
                onChange={update('password')}
                placeholder="••••••••"
                required
              />
            </FormField>

            <button
              type="submit"
              className="btn-primary w-full py-3 mt-1 flex items-center justify-center gap-2"
              disabled={loading}
            >
              {loading && <ButtonSpinner />}
              {mode === 'signin' ? 'Sign in' : 'Create account'}
            </button>
          </form>

          {/* Toggle mode */}
          <p className="mt-5 text-center text-[13px] text-ink-muted">
            {mode === 'signin' ? "Don't have an account? " : 'Already have one? '}
            <button
              onClick={toggleMode}
              className="text-gold hover:underline transition-all"
            >
              {mode === 'signin' ? 'Sign up' : 'Sign in'}
            </button>
          </p>
        </div>
      </div>
    </div>
  )
}
