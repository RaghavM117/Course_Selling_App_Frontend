import { createContext, useContext, useState, useEffect } from 'react'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [token, setToken]   = useState(() => localStorage.getItem('token') || null)
  const [role,  setRole]    = useState(() => localStorage.getItem('role')  || null)

  // Keep localStorage in sync whenever state changes
  useEffect(() => {
    if (token) localStorage.setItem('token', token)
    else       localStorage.removeItem('token')
  }, [token])

  useEffect(() => {
    if (role) localStorage.setItem('role', role)
    else      localStorage.removeItem('role')
  }, [role])

  function login(tok, r) {
    setToken(tok)
    setRole(r)
  }

  function logout() {
    setToken(null)
    setRole(null)
  }

  return (
    <AuthContext.Provider value={{ token, role, login, logout, isAuthed: !!token }}>
      {children}
    </AuthContext.Provider>
  )
}

// eslint-disable-next-line react-refresh/only-export-components
export function useAuth() {
  return useContext(AuthContext)
}
