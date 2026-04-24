/**
 * CourseCard
 * Props:
 *  course      — course object
 *  badge       — string label (optional)
 *  badgeColor  — 'gold' | 'green'
 *  actions     — array of { label, onClick, variant: 'primary'|'outline'|'danger' }
 *  index       — for staggered animation delay
 */
export default function CourseCard({ course, badge, badgeColor = 'gold', actions = [], index = 0 }) {
  const delay = `${index * 60}ms`

  const badgeClass =
    badgeColor === 'green'
      ? 'bg-emerald-950/60 text-emerald-400 border border-emerald-900/40'
      : 'bg-gold-subtle text-gold border border-gold/20'

  const btnClass = {
    primary: 'btn-primary',
    outline: 'btn-outline',
    danger:  'btn-danger',
  }

  return (
    <div
      className="bg-bg-raised border border-bg-border rounded-xl p-5 flex flex-col gap-3
                 hover:border-bg-border/80 transition-all duration-200 animate-fade-up"
      style={{ animationDelay: delay, animationFillMode: 'both' }}
    >
      {/* Badge */}
      {badge && (
        <span className={`self-start text-[11px] font-semibold px-2.5 py-0.5 rounded-full tracking-wide ${badgeClass}`}>
          {badge}
        </span>
      )}

      {/* Title + description */}
      <div className="flex-1">
        <h3 className="font-semibold text-ink-primary text-[15px] mb-1 leading-snug line-clamp-2">
          {course.title}
        </h3>
        <p className="text-ink-secondary text-[13px] leading-relaxed line-clamp-3">
          {course.description || 'No description provided.'}
        </p>
      </div>

      {/* Price + actions */}
      <div className="flex items-center justify-between pt-1 border-t border-bg-border">
        <span className="font-display text-gold text-lg font-bold tracking-tight">
          ₹{course.price}
        </span>
        {actions.length > 0 && (
          <div className="flex gap-2">
            {actions.map((a) => (
              <button
                key={a.label}
                className={btnClass[a.variant] || 'btn-outline'}
                onClick={() => a.onClick(course)}
              >
                {a.label}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
