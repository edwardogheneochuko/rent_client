// Top navigation bar. On phones the links fold into a menu button.

import { useEffect, useState } from 'react';
import { Link, NavLink, useLocation, useNavigate } from 'react-router';

import { useAuth } from '../../context/AuthContext';
import { CloseIcon, HomeIcon, MenuIcon, UserIcon } from '../icons';

const NAV_LINKS = [
  { to: '/listings', label: 'Find a home' },
  { to: '/scams', label: 'Scam check' },
  { to: '/insights', label: 'Rent prices' },
];

// Active links get green text; NavLink passes { isActive } to className
const navLinkClass = ({ isActive }) =>
  `rounded-lg px-3 py-2 text-sm font-medium ${
    isActive ? 'bg-brand-50 text-brand-700' : 'text-gray-700 hover:bg-gray-100'
  }`;

export default function Header() {
  const { user, loading, logout } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  // Close the mobile menu whenever the page changes
  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  async function handleLogout() {
    await logout();
    navigate('/');
  }

  const accountLinks = user ? (
    <>
      <NavLink to="/dashboard" className={navLinkClass}>
        Dashboard
      </NavLink>
      {user.role === 'admin' && (
        <NavLink to="/admin" className={navLinkClass}>
          Moderation
        </NavLink>
      )}
      <button type="button" onClick={handleLogout} className="btn btn-ghost justify-start px-3 py-2 font-medium">
        Sign out
      </button>
    </>
  ) : (
    <>
      <Link to="/login" className="btn btn-ghost">
        Sign in
      </Link>
      <Link to="/register" className="btn btn-primary">
        Sign up
      </Link>
    </>
  );

  return (
    <header className="sticky top-0 z-30 border-b border-gray-200 bg-white/95 backdrop-blur">
      <div className="container-page flex h-16 items-center justify-between gap-4">
        <Link to="/" className="flex items-center gap-2 font-bold text-gray-900">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-600 text-white">
            <HomeIcon className="h-5 w-5" />
          </span>
          <span>
            RentRight <span className="text-brand-600">Naija</span>
          </span>
        </Link>

        {/* Desktop navigation */}
        <nav className="hidden items-center gap-1 md:flex" aria-label="Main">
          {NAV_LINKS.map((link) => (
            <NavLink key={link.to} to={link.to} className={navLinkClass}>
              {link.label}
            </NavLink>
          ))}
        </nav>
        <div className="hidden items-center gap-2 md:flex">
          {user && (
            <span className="flex items-center gap-1 text-sm text-gray-600">
              <UserIcon className="h-4 w-4" />
              {user.name.split(' ')[0]}
            </span>
          )}
          {/* Hide auth buttons until we know if the user is signed in, to avoid a flash */}
          {!loading && accountLinks}
        </div>

        {/* Mobile menu button */}
        <button
          type="button"
          className="btn btn-ghost p-2 md:hidden"
          onClick={() => setMenuOpen((open) => !open)}
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
        >
          {menuOpen ? <CloseIcon className="h-6 w-6" /> : <MenuIcon className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile menu panel */}
      {menuOpen && (
        <nav id="mobile-menu" className="border-t border-gray-200 bg-white md:hidden" aria-label="Main">
          <div className="container-page flex flex-col gap-1 py-3">
            {NAV_LINKS.map((link) => (
              <NavLink key={link.to} to={link.to} className={navLinkClass}>
                {link.label}
              </NavLink>
            ))}
            <div className="my-2 border-t border-gray-100" />
            {user && <p className="px-3 pb-1 text-sm text-gray-500">Signed in as {user.name}</p>}
            {!loading && <div className="flex flex-col gap-2">{accountLinks}</div>}
          </div>
        </nav>
      )}
    </header>
  );
}
