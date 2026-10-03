import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import { Layout } from './components/Layout';

// Pages
import Home from './pages/Home';
import Latest from './pages/Latest';
import { Discover, Stories, Poetry, Articles, GenrePage, AuthorsPage, CollectionsPage, SearchPage } from './pages/Discover';
import ReadWork from './pages/Read';
import AuthorProfile from './pages/Author';
import Dashboard from './pages/Dashboard';
import Admin from './pages/Admin';
import { Login, Register } from './pages/Auth';
import { EventsPage, EventDetail, CommunitiesPage, CommunityDetail, StorePage, ProductDetail } from './pages/Sections';
import { Terms, Privacy, Guidelines, Copyright, AccessibilityStatement, About, Contact, Library } from './pages/Legal';
import Account from './pages/Account';

function NotFound() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <div className="text-center">
        <p className="font-display text-8xl font-light text-oxblood/20 mb-4">404</p>
        <h1 className="font-display text-3xl font-semibold text-ink mb-4">Page not found</h1>
        <p className="text-ink-muted mb-8 max-w-md mx-auto">
          The page you're looking for doesn't exist or has been moved. Perhaps you'd like to explore the archive instead?
        </p>
        <a href="/" className="inline-flex items-center px-6 py-3 bg-oxblood text-white font-medium rounded-lg hover:bg-oxblood-dark transition-colors">
          Return Home
        </a>
      </div>
    </div>
  );
}

function App() {
  return (
    <AppProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            {/* Public pages */}
            <Route path="/" element={<Home />} />
            <Route path="/latest" element={<Latest />} />
            <Route path="/discover" element={<Discover />} />
            <Route path="/stories" element={<Stories />} />
            <Route path="/poetry" element={<Poetry />} />
            <Route path="/articles" element={<Articles />} />
            <Route path="/genres" element={<GenrePage />} />
            <Route path="/genres/:slug" element={<GenrePage />} />
            <Route path="/tags/:slug" element={<GenrePage />} />
            <Route path="/authors" element={<AuthorsPage />} />
            <Route path="/authors/:username" element={<AuthorProfile />} />
            <Route path="/collections" element={<CollectionsPage />} />
            <Route path="/collections/:slug" element={<CollectionsPage />} />
            <Route path="/series/:slug" element={<Discover />} />
            <Route path="/works/:slug" element={<ReadWork />} />
            <Route path="/search" element={<SearchPage />} />

            {/* Events */}
            <Route path="/events" element={<EventsPage />} />
            <Route path="/events/:slug" element={<EventDetail />} />

            {/* Communities */}
            <Route path="/communities" element={<CommunitiesPage />} />
            <Route path="/communities/:slug" element={<CommunityDetail />} />

            {/* Store */}
            <Route path="/store" element={<StorePage />} />
            <Route path="/store/:slug" element={<ProductDetail />} />

            {/* Auth */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/forgot-password" element={<Login />} />

            {/* User pages */}
            <Route path="/dashboard/*" element={<Dashboard />} />
            <Route path="/library" element={<Library />} />
            <Route path="/account" element={<Account />} />
            <Route path="/notifications" element={<Dashboard />} />

            {/* Admin */}
            <Route path="/admin/*" element={<Admin />} />

            {/* Legal & Info */}
            <Route path="/terms" element={<Terms />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/guidelines" element={<Guidelines />} />
            <Route path="/copyright" element={<Copyright />} />
            <Route path="/accessibility" element={<AccessibilityStatement />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />

            {/* 404 */}
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AppProvider>
  );
}

export default App;
