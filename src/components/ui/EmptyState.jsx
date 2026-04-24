export default function EmptyState({ icon = '◇', title, subtitle, action }) {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center animate-fade-in">
      <span className="text-4xl text-ink-muted mb-4">{icon}</span>
      <h3 className="text-ink-primary font-semibold text-base mb-1">{title}</h3>
      {subtitle && <p className="text-ink-muted text-sm mb-5">{subtitle}</p>}
      {action && (
        <button className="btn-primary" onClick={action.onClick}>
          {action.label}
        </button>
      )}
    </div>
  )
}
