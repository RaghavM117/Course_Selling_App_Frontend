import { useState } from 'react'
import { useNavigate, useLocation, useParams } from 'react-router-dom'
import { createCourse, editCourse } from '../../api/courseApi'
import FormField from '../../components/ui/FormField'
import { ButtonSpinner } from '../../components/ui/Spinner'
import Toast from '../../components/ui/Toast'

export default function CourseForm() {
  const navigate   = useNavigate()
  const location   = useLocation()
  const { id }     = useParams()

  // When editing, navigate passes course via location.state
  const existing   = location.state?.course
  const isEdit     = !!existing

  const [form, setForm] = useState({
    title:       existing?.title       || '',
    description: existing?.description || '',
    price:       existing?.price       || '',
    imageUrl:    existing?.imageUrl    || '',
  })

  const [errors,  setErrors]  = useState({})
  const [loading, setLoading] = useState(false)
  const [toast,   setToast]   = useState(null)

  const update = (k) => (e) => {
    setForm((f) => ({ ...f, [k]: e.target.value }))
    setErrors((er) => ({ ...er, [k]: '' }))
  }

  function validate() {
    const e = {}
    if (!form.title.trim())    e.title = 'Title is required'
    if (!form.price)           e.price = 'Price is required'
    if (isNaN(Number(form.price)) || Number(form.price) < 0)
      e.price = 'Enter a valid price'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  async function handleSubmit(e) {
    e.preventDefault()
    if (!validate()) return
    setLoading(true)
    try {
      const payload = { ...form, price: Number(form.price) }
      isEdit
        ? await editCourse(id, payload)
        : await createCourse(payload)

      setToast({
        type:    'success',
        message: isEdit ? 'Course updated!' : 'Course created!',
      })

      // Navigate back after short delay so toast is visible
      setTimeout(() => navigate('/admin/courses'), 1200)
    } catch (err) {
      setToast({ type: 'error', message: err.message })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-lg mx-auto px-6 py-10">

      {/* Header */}
      <div className="mb-8 animate-fade-up">
        <button
          onClick={() => navigate('/admin/courses')}
          className="text-ink-muted text-[13px] hover:text-ink-secondary
                     transition-colors flex items-center gap-1.5 mb-5"
        >
          ← Back to Courses
        </button>
        <h1 className="font-display text-3xl font-bold text-ink-primary tracking-tight">
          {isEdit ? 'Edit Course' : 'Create Course'}
        </h1>
        <p className="text-ink-muted text-sm mt-1">
          {isEdit ? 'Update the details below.' : 'Fill in the details to publish a new course.'}
        </p>
      </div>

      {/* Form card */}
      <div className="card animate-fade-up" style={{ animationDelay: '60ms' }}>
        <form onSubmit={handleSubmit} noValidate>

          <FormField label="Course Title" error={errors.title}>
            <input
              className="input-field"
              value={form.title}
              onChange={update('title')}
              placeholder="e.g. Complete React Bootcamp"
            />
          </FormField>

          <FormField label="Description">
            <textarea
              className="input-field resize-none"
              rows={4}
              value={form.description}
              onChange={update('description')}
              placeholder="What will students learn from this course?"
            />
          </FormField>

          <FormField label="Price (₹)" error={errors.price}>
            <input
              className="input-field"
              type="number"
              min="0"
              value={form.price}
              onChange={update('price')}
              placeholder="e.g. 999"
            />
          </FormField>

          <FormField label="Cover Image URL (optional)">
            <input
              className="input-field"
              value={form.imageUrl}
              onChange={update('imageUrl')}
              placeholder="https://..."
            />
          </FormField>

          {/* Preview image if URL provided */}
          {form.imageUrl && (
            <div className="mb-4 rounded-lg overflow-hidden border border-bg-border h-36">
              <img
                src={form.imageUrl}
                alt="Preview"
                className="w-full h-full object-cover"
                onError={(e) => { e.target.style.display = 'none' }}
              />
            </div>
          )}

          <div className="flex gap-3 pt-1">
            <button
              type="button"
              className="btn-outline flex-1 py-2.5"
              onClick={() => navigate('/admin/courses')}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn-primary flex-1 py-2.5 flex items-center justify-center gap-2"
              disabled={loading}
            >
              {loading && <ButtonSpinner />}
              {isEdit ? 'Save Changes' : 'Publish Course'}
            </button>
          </div>
        </form>
      </div>

      {toast && (
        <Toast type={toast.type} message={toast.message} onClose={() => setToast(null)} />
      )}
    </div>
  )
}
