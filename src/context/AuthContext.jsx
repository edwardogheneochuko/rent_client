// Keeps track of who is signed in and shares it with the whole app.
//
// Any component can call:
//   const { user, profile, loading, login, register, logout } = useAuth();
//
// The login token lives in an httpOnly cookie that JavaScript can't read,
// so on page load we ask the server "who am I?" (GET /api/auth/me).

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import * as authApi from '../api/auth';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null); // Agent/Landlord profile, if any
  const [loading, setLoading] = useState(true); // true until we know if signed in

  // Save the { user, profile } the API sends back after login/register/me
  const applySession = useCallback((data) => {
    setUser(data?.user || null);
    setProfile(data?.profile || null);
    return data?.user;
  }, []);

  // On first load, check for an existing session
  useEffect(() => {
    authApi
      .getMe()
      .then(applySession)
      .catch(() => applySession(null)) // 401 just means "not signed in"
      .finally(() => setLoading(false));
  }, [applySession]);

  const login = useCallback(
    async (credentials) => applySession(await authApi.login(credentials)),
    [applySession]
  );

  const register = useCallback(
    async (details) => applySession(await authApi.register(details)),
    [applySession]
  );

  const logout = useCallback(async () => {
    try {
      await authApi.logout();
    } finally {
      // Clear local state even if the request failed
      applySession(null);
    }
  }, [applySession]);

  // useMemo stops every consumer re-rendering when nothing changed
  const value = useMemo(
    () => ({ user, profile, loading, login, register, logout }),
    [user, profile, loading, login, register, logout]
  );

  // React 19: a context can be rendered directly as a provider
  return <AuthContext value={value}>{children}</AuthContext>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used inside <AuthProvider>');
  }
  return context;
}
