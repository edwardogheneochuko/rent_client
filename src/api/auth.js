// Calls to /api/auth. Each returns { user, profile } (except logout).

import api, { unwrap } from './client';

export const getMe = () => unwrap(api.get('/auth/me'));

export const login = (credentials) => unwrap(api.post('/auth/login', credentials));

export const register = (details) => unwrap(api.post('/auth/register', details));

export const logout = () => unwrap(api.post('/auth/logout'));
