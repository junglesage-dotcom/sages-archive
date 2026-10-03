import React, { useState } from 'react';
import { Link, NavLink, Outlet, useLocation } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { Container, Toast } from './ui';

// Logo SVG Component
function Logo({ className = '' }: { className?: string }) {
  return (
    <Link to="/" className={`flex items-center gap-2 ${className}`} aria-label="Sage's Archive — Home">
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <rect x="2" y="4" width="12" height="24" rx="1" stroke="currentColor" strokeWidth="1.5" fill="none" />
        <rect x="18" y="4" width="12" height="24" rx="1" stroke="currentColor" strokeWidth="1.5" fill="none" />
        <path d="M14 8 L16 6 L18 8" stroke="currentColor" strokeWidth="1.5" fill="none" />
        <path d="M14 24 L16 26 L18 24" stroke="currentColor" strokeWidth="1.5" fill="none" />
        <path d="M6 10 L10 10 M6 13 L10 13 M6 16 L9 16" stroke="currentColor" strokeWidth="1" opacity="0.5" />
        <path d="M22 10 L26 10 M22 13 L26 13 M22 16 L25 16" stroke="currentColor" strokeWidth="1" opacity="0.5" />
      </svg>
      <span className="font-display text-xl font-semibold tracking-tight">Sage's Archive</span>
    </Link>
  );
}

// Navigation Links
const navLinks = [
  { to: '/discover', label: 'Discover' },
  { to: '/latest', label: 'Latest' },
  { to: '/stories', label: 'Stories' },
  { to: '/poetry', label: 'Poetry' },
  { to: '/articles', label: 'Articles' },
  { to: '/events', label: 'Events' },
  { to: '/store', label: 'Store' },
  { to: '/communities', label: 'Communities' },
];

export function Layout() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const { user, isAuthenticated, theme, toggleTheme, notifications, dismissNotification, logout } = useApp();
  const location = useLocation();

  return (
    <div className={`min-h-screen flex flex-col ${theme === 'dark' ? 'theme-dark' : ''}`}>
      {/* Skip link */}
      <a href="#main-content" className="skip-link">Skip to main content</a>

      {/* Header */}
      <header className="sticky top-0 z-50 bg-cream/95 backdrop-blur-sm border-b border-border-light" role="banner">
        <Container size="wide">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Logo />

            {/* Desktop Nav */}
            <nav className="hidden lg:flex items-center gap-1" aria-label="Main navigation">
              {navLinks.map(link => (
                <NavLink
                  key={link.to}
                  to={link.to}
                  className={({ isActive }) =>
                    `px-3 py-2 text-sm font-medium rounded transition-colors ${
                      isActive
                        ? 'text-oxblood bg-oxblood/5'
                        : 'text-ink-light hover:text-ink hover:bg-cream-dark'
                    }`
                  }
                >
                  {link.label}
                </NavLink>
              ))}
            </nav>

            {/* Right actions */}
            <div className="flex items-center gap-2">
              {/* Search */}
              <button
                onClick={() => setSearchOpen(!searchOpen)}
                className="p-2 text-ink-muted hover:text-ink rounded transition-colors"
                aria-label="Search"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" />
                </svg>
              </button>

              {/* Theme toggle */}
              <button
                onClick={toggleTheme}
                className="p-2 text-ink-muted hover:text-ink rounded transition-colors"
                aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
              >
                {theme === 'light' ? (
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
                  </svg>
                ) : (
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="5" /><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
                  </svg>
                )}
              </button>

              {/* Auth */}
              {isAuthenticated ? (
                <div className="hidden sm:flex items-center gap-2">
                  <Link
                    to="/dashboard"
                    className="px-3 py-1.5 text-sm font-medium text-ink-light hover:text-ink rounded transition-colors"
                  >
                    Dashboard
                  </Link>
                  <Link
                    to="/library"
                    className="px-3 py-1.5 text-sm font-medium text-ink-light hover:text-ink rounded transition-colors"
                  >
                    Library
                  </Link>
                  <div className="relative group">
                    <button className="w-8 h-8 rounded-full bg-oxblood/10 flex items-center justify-center text-sm font-medium text-oxblood">
                      {user?.displayName.charAt(0)}
                    </button>
                    <div className="absolute right-0 top-full mt-1 w-48 bg-surface border border-border-light rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
                      <div className="p-3 border-b border-border-light">
                        <p className="text-sm font-medium text-ink">{user?.displayName}</p>
                        <p className="text-xs text-ink-muted">@{user?.username}</p>
                      </div>
                      <div className="p-1">
                        <Link to="/account" className="block px-3 py-2 text-sm text-ink-light hover:bg-cream-dark rounded">Account</Link>
                        <Link to="/dashboard" className="block px-3 py-2 text-sm text-ink-light hover:bg-cream-dark rounded">Dashboard</Link>
                        {user?.role === 'admin' && <Link to="/admin" className="block px-3 py-2 text-sm text-ink-light hover:bg-cream-dark rounded">Admin</Link>}
                        <button onClick={logout} className="block w-full text-left px-3 py-2 text-sm text-ink-light hover:bg-cream-dark rounded">Sign out</button>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="hidden sm:flex items-center gap-2">
                  <Link to="/login" className="px-3 py-1.5 text-sm font-medium text-ink-light hover:text-ink rounded transition-colors">
                    Sign in
                  </Link>
                  <Link to="/register" className="px-4 py-1.5 text-sm font-medium bg-oxblood text-white rounded hover:bg-oxblood-dark transition-colors">
                    Join
                  </Link>
                </div>
              )}

              {/* Mobile menu button */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden p-2 text-ink-muted hover:text-ink rounded"
                aria-label="Toggle menu"
                aria-expanded={mobileMenuOpen}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  {mobileMenuOpen ? (
                    <path d="M18 6L6 18M6 6l12 12" />
                  ) : (
                    <path d="M3 12h18M3 6h18M3 18h18" />
                  )}
                </svg>
              </button>
            </div>
          </div>

          {/* Search bar */}
          {searchOpen && (
            <div className="pb-4 animate-fade-in">
              <form onSubmit={(e) => { e.preventDefault(); if (searchQuery.trim()) { window.location.href = `/search?q=${encodeURIComponent(searchQuery)}`; } }} role="search">
                <input
                  type="search"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search works, authors, genres..."
                  className="w-full px-4 py-3 border border-border rounded-lg bg-surface text-ink placeholder:text-ink-muted focus:border-oxblood focus:ring-1 focus:ring-oxblood outline-none"
                  autoFocus
                  aria-label="Search"
                />
              </form>
            </div>
          )}
        </Container>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-border-light bg-cream animate-fade-in">
            <nav className="px-4 py-4 space-y-1" aria-label="Mobile navigation">
              {navLinks.map(link => (
                <NavLink
                  key={link.to}
                  to={link.to}
                  onClick={() => setMobileMenuOpen(false)}
                  className={({ isActive }) =>
                    `block px-3 py-2.5 text-base font-medium rounded ${
                      isActive ? 'text-oxblood bg-oxblood/5' : 'text-ink-light hover:text-ink hover:bg-cream-dark'
                    }`
                  }
                >
                  {link.label}
                </NavLink>
              ))}
              <hr className="border-border-light my-3" />
              {isAuthenticated ? (
                <>
                  <Link to="/dashboard" onClick={() => setMobileMenuOpen(false)} className="block px-3 py-2.5 text-base font-medium text-ink-light hover:text-ink rounded">Dashboard</Link>
                  <Link to="/library" onClick={() => setMobileMenuOpen(false)} className="block px-3 py-2.5 text-base font-medium text-ink-light hover:text-ink rounded">Library</Link>
                  <Link to="/account" onClick={() => setMobileMenuOpen(false)} className="block px-3 py-2.5 text-base font-medium text-ink-light hover:text-ink rounded">Account</Link>
                  <button onClick={() => { logout(); setMobileMenuOpen(false); }} className="block w-full text-left px-3 py-2.5 text-base font-medium text-ink-light hover:text-ink rounded">Sign out</button>
                </>
              ) : (
                <>
                  <Link to="/login" onClick={() => setMobileMenuOpen(false)} className="block px-3 py-2.5 text-base font-medium text-ink-light hover:text-ink rounded">Sign in</Link>
                  <Link to="/register" onClick={() => setMobileMenuOpen(false)} className="block px-3 py-2.5 text-base font-medium text-oxblood rounded">Join Sage's Archive</Link>
                </>
              )}
            </nav>
          </div>
        )}
      </header>

      {/* Main content */}
      <main id="main-content" className="flex-1" role="main">
        <Outlet />
      </main>

      {/* Notifications */}
      {notifications.length > 0 && (
        <div className="fixed bottom-4 right-4 z-50 space-y-2 max-w-sm" aria-live="polite">
          {notifications.map(n => (
            <Toast key={n.id} notification={n} onDismiss={() => dismissNotification(n.id)} />
          ))}
        </div>
      )}

      {/* Footer */}
      <footer className="border-t border-border-light bg-parchment mt-16" role="contentinfo">
        <Container size="wide">
          <div className="py-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Brand */}
            <div className="lg:col-span-1">
              <Link to="/" className="flex items-center gap-2 mb-4">
                <svg width="24" height="24" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                  <rect x="2" y="4" width="12" height="24" rx="1" stroke="currentColor" strokeWidth="1.5" fill="none" />
                  <rect x="18" y="4" width="12" height="24" rx="1" stroke="currentColor" strokeWidth="1.5" fill="none" />
                  <path d="M14 8 L16 6 L18 8" stroke="currentColor" strokeWidth="1.5" fill="none" />
                  <path d="M14 24 L16 26 L18 24" stroke="currentColor" strokeWidth="1.5" fill="none" />
                </svg>
                <span className="font-display text-lg font-semibold">Sage's Archive</span>
              </Link>
              <p className="text-sm text-ink-muted leading-relaxed">
                A digital literary archive and contemporary creative publishing platform. Discover stories, poetry, and essays from voices worldwide.
              </p>
              <div className="flex items-center gap-4 mt-4">
                <a href="https://t.me/sagesarchive" className="text-ink-muted hover:text-oxblood transition-colors text-sm" target="_blank" rel="noopener noreferrer">Telegram</a>
                <a href="https://whatsapp.com/channel/sagesarchive" className="text-ink-muted hover:text-oxblood transition-colors text-sm" target="_blank" rel="noopener noreferrer">WhatsApp</a>
              </div>
            </div>

            {/* Discover */}
            <div>
              <h3 className="font-medium text-ink mb-3 text-sm uppercase tracking-wider">Discover</h3>
              <ul className="space-y-2">
                <li><Link to="/stories" className="text-sm text-ink-muted hover:text-oxblood transition-colors">Stories</Link></li>
                <li><Link to="/poetry" className="text-sm text-ink-muted hover:text-oxblood transition-colors">Poetry</Link></li>
                <li><Link to="/articles" className="text-sm text-ink-muted hover:text-oxblood transition-colors">Articles & Essays</Link></li>
                <li><Link to="/authors" className="text-sm text-ink-muted hover:text-oxblood transition-colors">Authors</Link></li>
                <li><Link to="/genres" className="text-sm text-ink-muted hover:text-oxblood transition-colors">Genres</Link></li>
                <li><Link to="/collections" className="text-sm text-ink-muted hover:text-oxblood transition-colors">Collections</Link></li>
              </ul>
            </div>

            {/* Community */}
            <div>
              <h3 className="font-medium text-ink mb-3 text-sm uppercase tracking-wider">Community</h3>
              <ul className="space-y-2">
                <li><Link to="/communities" className="text-sm text-ink-muted hover:text-oxblood transition-colors">Communities</Link></li>
                <li><Link to="/events" className="text-sm text-ink-muted hover:text-oxblood transition-colors">Events</Link></li>
                <li><Link to="/store" className="text-sm text-ink-muted hover:text-oxblood transition-colors">Store</Link></li>
                <li><Link to="/about" className="text-sm text-ink-muted hover:text-oxblood transition-colors">About</Link></li>
                <li><Link to="/contact" className="text-sm text-ink-muted hover:text-oxblood transition-colors">Contact</Link></li>
              </ul>
            </div>

            {/* Legal */}
            <div>
              <h3 className="font-medium text-ink mb-3 text-sm uppercase tracking-wider">Legal</h3>
              <ul className="space-y-2">
                <li><Link to="/terms" className="text-sm text-ink-muted hover:text-oxblood transition-colors">Terms of Service</Link></li>
                <li><Link to="/privacy" className="text-sm text-ink-muted hover:text-oxblood transition-colors">Privacy Policy</Link></li>
                <li><Link to="/copyright" className="text-sm text-ink-muted hover:text-oxblood transition-colors">Copyright Policy</Link></li>
                <li><Link to="/guidelines" className="text-sm text-ink-muted hover:text-oxblood transition-colors">Community Guidelines</Link></li>
                <li><Link to="/accessibility" className="text-sm text-ink-muted hover:text-oxblood transition-colors">Accessibility</Link></li>
              </ul>
            </div>
          </div>

          {/* Bottom bar */}
          <div className="border-t border-border-light py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-sm text-ink-muted">© 2025 Sage's Archive. All rights reserved.</p>
            <p className="text-xs text-ink-muted">Built with care for literature, preservation, and creative freedom.</p>
          </div>
        </Container>
      </footer>
    </div>
  );
}
