import { useState } from 'react'
import { getAllCourses, purchaseCourse } from '../../api/courseApi'
import { useAsync } from '../../hooks/useAsync'
import CourseCard from '../../components/ui/CourseCard'
import { SkeletonGrid } from '../../components/ui/Spinner'
import EmptyState from '../../components/ui/EmptyState'
import Toast from '../../components/ui/Toast'

export default function BrowseCourses() {
  const { data, loading, error } = useAsync(() => getAllCourses(), [])
  const [toast, setToast]        = useState(null)   // { type, message }
  const [buying, setBuying]      = useState(null)   // courseId being purchased

  const courses = data?.courses || []

  async function handlePurchase(course) {
    setBuying(course._id)
    try {
      await purchaseCourse(course._id)
      setToast({ type: 'success', message: `"${course.title}" purchased!` })
    } catch (err) {
      setToast({ type: 'error', message: err.message })
    } finally {
      setBuying(null)
    }
  }

  return (
    <div className="max-w-6xl mx-auto px-6 py-10">

      {/* Header */}
      <div className="mb-8 animate-fade-up">
        <h1 className="font-display text-3xl font-bold text-ink-primary tracking-tight mb-1">
          Browse Courses
        </h1>
        {!loading && (
          <p className="text-ink-muted text-sm">
            {courses.length} course{courses.length !== 1 ? 's' : ''} available
          </p>
        )}
      </div>

      {/* States */}
      {loading && <SkeletonGrid count={6} />}

      {error && (
        <div className="card text-center text-red-400 text-sm animate-fade-in">
          Failed to load courses — {error}
        </div>
      )}

      {!loading && !error && courses.length === 0 && (
        <EmptyState
          icon="◇"
          title="No courses yet"
          subtitle="Check back soon — instructors are publishing new content."
        />
      )}

      {!loading && !error && courses.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {courses.map((course, i) => (
            <CourseCard
              key={course._id}
              course={course}
              index={i}
              actions={[
                {
                  label: buying === course._id ? 'Buying…' : 'Purchase',
                  variant: 'primary',
                  onClick: () => handlePurchase(course),
                },
              ]}
            />
          ))}
        </div>
      )}

      {/* Toast */}
      {toast && (
        <Toast
          type={toast.type}
          message={toast.message}
          onClose={() => setToast(null)}
        />
      )}
    </div>
  )
}
