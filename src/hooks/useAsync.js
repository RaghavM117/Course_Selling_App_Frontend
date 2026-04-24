import { useState, useEffect, useCallback } from 'react'

/**
 * useAsync(asyncFn, deps)
 * Runs asyncFn on mount (and whenever deps change).
 * Returns { data, loading, error, refetch }
 *
 * Usage:
 *   const { data, loading, error, refetch } = useAsync(() => getAllCourses(), [])
 */
export function useAsync(asyncFn, deps = []) {
  const [data,    setData]    = useState(null)
  const [loading, setLoading] = useState(true)
  const [error,   setError]   = useState(null)

  const run = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const res = await asyncFn()
      setData(res.data)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps)

  useEffect(() => { run() }, [run])

  return { data, loading, error, refetch: run }
}
