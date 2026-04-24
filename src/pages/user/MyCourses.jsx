import { getUserCourses } from '../../api/courseApi'
import { useAsync } from '../../hooks/useAsync'
import CourseCard from '../../components/ui/CourseCard'
import { SkeletonGrid } from '../../components/ui/Spinner'
import EmptyState from '../../components/ui/EmptyState'
import { useNavigate } from 'react-router-dom'

export default function MyCourses() {
  const { data, loading, error } = useAsync(() => getUserCourses(), [])
  const navigate = useNavigate()

  const courses = data?.purchasedCourses || []

  return (
    <div className="max-w-6xl mx-auto px-6 py-10">

      {/* Header */}
      <div className="mb-8 animate-fade-up">
        <h1 className="font-display text-3xl font-bold text-ink-primary tracking-tight mb-1">
          My Courses
        </h1>
        {!loading && (
          <p className="text-ink-muted text-sm">
            {courses.length} course{courses.length !== 1 ? 's' : ''} enrolled
          </p>
        )}
      </div>

      {loading && <SkeletonGrid count={3} />}

      {error && (
        <div className="card text-center text-red-400 text-sm animate-fade-in">
          Failed to load — {error}
        </div>
      )}

      {!loading && !error && courses.length === 0 && (
        <EmptyState
          icon="◈"
          title="No courses yet"
          subtitle="Purchase a course to start learning."
          action={{ label: 'Browse Courses', onClick: () => navigate('/user/courses') }}
        />
      )}

      {!loading && !error && courses.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {courses.map((course, i) => (
            <CourseCard
              key={course._id}
              course={course}
              badge="Enrolled"
              badgeColor="green"
              index={i}
            />
          ))}
        </div>
      )}
    </div>
  )
}
