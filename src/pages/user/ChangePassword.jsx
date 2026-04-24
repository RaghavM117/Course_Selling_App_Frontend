import { useState } from 'react'
import { useAuth } from '../../context/AuthContext'
import { adminChangePassword, userChangePassword } from '../../api/courseApi'
import FormField from '../../components/ui/FormField'
import { ButtonSpinner } from '../../components/ui/Spinner'
import Toast from '../../components/ui/Toast'

export default function ChangePassword() {
  const { role }  = useAuth()
  const [form, setForm]       = useState({ oldPassword: '', newPassword: '', confirmPassword: '' })
  const [loading, setLoading] = useState(false)
  const [toast, setToast]     = useState(null)
  const [errors, setErrors]   = useState({})

  const update = (k) => (e) => {
    setForm((f) => ({ ...f, [k]: e.target.value }))
    setErrors((er) => ({ ...er, [k]: '' }))
  }

  function validate() {
    const e = {}
    if (!form.oldPassword)   e.oldPassword = 'Required'
    if (!form.newPassword)   e.newPassword = 'Required'
    if (form.newPassword.length < 6) e.newPassword = 'Minimum 6 characters'
    if (form.newPassword !== form.confirmPassword) e.confirmPassword = 'Passwords do not match'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  async function handleSubmit(e) {
    e.preventDefault()
    if (!validate()) return
    setLoading(true)
    try {
      const payload = { oldPassword: form.oldPassword, newPassword: form.newPassword }
      role === 'admin'
        ? await adminChangePassword(payload)
        : await userChangePassword(payload)
      setToast({ type: 'success', message: 'Password updated successfully.' })
      setForm({ oldPassword: '', newPassword: '', confirmPassword: '' })
    } catch (err) {
      setToast({ type: 'error', message: err.message })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-md mx-auto px-6 py-10">
      <div className="mb-8 animate-fade-up">
        <h1 className="font-display text-3xl font-bold text-ink-primary tracking-tight">
          Change Password
        </h1>
        <p className="text-ink-muted text-sm mt-1">Update your account password.</p>
      </div>

      <div className="card animate-fade-up" style={{ animationDelay: '60ms' }}>
        <form onSubmit={handleSubmit} noValidate>
          <FormField label="Current Password" error={errors.oldPassword}>
            <input
              className="input-field"
              type="password"
              value={form.oldPassword}
              onChange={update('oldPassword')}
              placeholder="••••••••"
            />
          </FormField>

          <FormField label="New Password" error={errors.newPassword}>
            <input
              className="input-field"
              type="password"
              value={form.newPassword}
              onChange={update('newPassword')}
              placeholder="••••••••"
            />
          </FormField>

          <FormField label="Confirm New Password" error={errors.confirmPassword}>
            <input
              className="input-field"
              type="password"
              value={form.confirmPassword}
              onChange={update('confirmPassword')}
              placeholder="••••••••"
            />
          </FormField>

          <button
            type="submit"
            className="btn-primary w-full py-3 mt-2 flex items-center justify-center gap-2"
            disabled={loading}
          >
            {loading && <ButtonSpinner />}
            Update Password
          </button>
        </form>
      </div>

      {toast && (
        <Toast type={toast.type} message={toast.message} onClose={() => setToast(null)} />
      )}
    </div>
  )
}
