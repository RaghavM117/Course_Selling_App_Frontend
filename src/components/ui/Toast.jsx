import { useEffect, useState } from 'react'

/**
 * <Toast type="success|error" message="..." onClose={fn} />
 * Auto-dismisses after 3 s.
 */
export default function Toast({ type = 'success', message, onClose }) {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    // Trigger enter animation
    const t1 = setTimeout(() => setVisible(true), 10)
    // Auto close
    const t2 = setTimeout(() => {
      setVisible(false)
      setTimeout(onClose, 300)
    }, 3000)
    return () => { clearTimeout(t1); clearTimeout(t2) }
  }, [onClose])

  const base =
    'fixed bottom-6 right-6 z-50 flex items-center gap-3 px-4 py-3 rounded-xl ' +
    'border text-sm font-medium shadow-xl transition-all duration-300 '

  const styles =
    type === 'success'
      ? 'bg-emerald-950/90 border-emerald-800/50 text-emerald-300'
      : 'bg-red-950/90 border-red-800/50 text-red-300'

  const icon = type === 'success' ? '✓' : '✕'

  return (
    <div
      className={base + styles}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(12px)',
      }}
    >
      <span className="text-base">{icon}</span>
      {message}
    </div>
  )
}
