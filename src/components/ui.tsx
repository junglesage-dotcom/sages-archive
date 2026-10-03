import React, { type ButtonHTMLAttributes, type InputHTMLAttributes, type ReactNode, type SelectHTMLAttributes } from 'react';
import { Link } from 'react-router-dom';

// Button
export function Button({ children, variant = 'primary', size = 'md', className = '', ...props }: ButtonHTMLAttributes<HTMLButtonElement> & { variant?: 'primary' | 'secondary' | 'ghost' | 'outline' | 'danger'; size?: 'sm' | 'md' | 'lg' }) {
  const base = 'inline-flex items-center justify-center font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-oxblood disabled:opacity-50 disabled:cursor-not-allowed';
  const variants = {
    primary: 'bg-oxblood text-white hover:bg-oxblood-dark',
    secondary: 'bg-ink text-cream hover:bg-ink-light',
    ghost: 'text-ink hover:bg-cream-dark',
    outline: 'border border-border text-ink hover:bg-cream-dark',
    danger: 'bg-error text-white hover:bg-red-800',
  };
  const sizes = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg',
  };
  return (
    <button className={`${base} ${variants[variant]} ${sizes[size]} ${className}`} {...props}>
      {children}
    </button>
  );
}

// Input
export function Input({ label, error, className = '', id, ...props }: InputHTMLAttributes<HTMLInputElement> & { label?: string; error?: string }) {
  const inputId = id || props.name;
  return (
    <div className="space-y-1">
      {label && <label htmlFor={inputId} className="block text-sm font-medium text-ink-light">{label}</label>}
      <input
        id={inputId}
        className={`w-full px-3 py-2 border border-border rounded bg-surface text-ink placeholder:text-ink-muted focus:border-oxblood focus:ring-1 focus:ring-oxblood outline-none transition-colors ${error ? 'border-error' : ''} ${className}`}
        {...props}
      />
      {error && <p className="text-sm text-error" role="alert">{error}</p>}
    </div>
  );
}

// Textarea
export function Textarea({ label, error, className = '', id, ...props }: React.TextareaHTMLAttributes<HTMLTextAreaElement> & { label?: string; error?: string }) {
  const inputId = id || props.name;
  return (
    <div className="space-y-1">
      {label && <label htmlFor={inputId} className="block text-sm font-medium text-ink-light">{label}</label>}
      <textarea
        id={inputId}
        className={`w-full px-3 py-2 border border-border rounded bg-surface text-ink placeholder:text-ink-muted focus:border-oxblood focus:ring-1 focus:ring-oxblood outline-none transition-colors resize-y min-h-[100px] ${error ? 'border-error' : ''} ${className}`}
        {...props}
      />
      {error && <p className="text-sm text-error" role="alert">{error}</p>}
    </div>
  );
}

// Select
export function Select({ label, children, className = '', id, ...props }: SelectHTMLAttributes<HTMLSelectElement> & { label?: string }) {
  const selectId = id || props.name;
  return (
    <div className="space-y-1">
      {label && <label htmlFor={selectId} className="block text-sm font-medium text-ink-light">{label}</label>}
      <select
        id={selectId}
        className={`w-full px-3 py-2 border border-border rounded bg-surface text-ink focus:border-oxblood focus:ring-1 focus:ring-oxblood outline-none transition-colors ${className}`}
        {...props}
      >
        {children}
      </select>
    </div>
  );
}

// Badge
export function Badge({ children, variant = 'default', className = '' }: { children: ReactNode; variant?: 'default' | 'primary' | 'success' | 'warning' | 'error' | 'outline'; className?: string }) {
  const variants = {
    default: 'bg-cream-dark text-ink-muted',
    primary: 'bg-oxblood/10 text-oxblood',
    success: 'bg-sage/10 text-sage',
    warning: 'bg-gold/10 text-gold',
    error: 'bg-error/10 text-error',
    outline: 'border border-border text-ink-muted',
  };
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 text-xs font-medium rounded-full ${variants[variant]} ${className}`}>
      {children}
    </span>
  );
}

// Card
export function Card({ children, className = '', hoverable = false }: { children: ReactNode; className?: string; hoverable?: boolean }) {
  return (
    <div className={`bg-surface border border-border-light rounded-lg ${hoverable ? 'hover:border-border hover:shadow-sm transition-all cursor-pointer' : ''} ${className}`}>
      {children}
    </div>
  );
}

// Work Card
export function WorkCard({ work, className = '' }: { work: any; className?: string }) {
  const typeLabel = { story: 'Story', poem: 'Poem', article: 'Essay', collection: 'Collection', series: 'Series' };
  return (
    <Link to={`/works/${work.slug}`} className={`block group ${className}`}>
      <article className="bg-surface border border-border-light rounded-lg p-6 hover:border-border hover:shadow-sm transition-all">
        <div className="flex items-center gap-2 mb-3">
          <Badge variant="primary">{typeLabel[work.type as keyof typeof typeLabel]}</Badge>
          <span className="text-xs text-ink-muted">{work.readingTime} min read</span>
        </div>
        <h3 className="font-display text-xl font-semibold text-ink group-hover:text-oxblood transition-colors mb-2">
          {work.title}
        </h3>
        {work.subtitle && (
          <p className="text-sm text-ink-muted italic mb-2">{work.subtitle}</p>
        )}
        <p className="text-ink-light text-sm line-clamp-3 mb-4">{work.excerpt}</p>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-full bg-cream-dark flex items-center justify-center text-xs font-medium text-ink-muted">
              {work.author.displayName.charAt(0)}
            </div>
            <span className="text-sm text-ink-light">{work.author.displayName}</span>
          </div>
          <div className="flex items-center gap-3 text-xs text-ink-muted">
            <span>{work.reactionsCount} reactions</span>
            <span>{work.commentsCount} comments</span>
          </div>
        </div>
      </article>
    </Link>
  );
}

// Author Card
export function AuthorCard({ author, className = '' }: { author: any; className?: string }) {
  return (
    <Link to={`/authors/${author.username}`} className={`block group ${className}`}>
      <div className="bg-surface border border-border-light rounded-lg p-5 text-center hover:border-border hover:shadow-sm transition-all">
        <div className="w-16 h-16 rounded-full bg-cream-dark mx-auto mb-3 flex items-center justify-center">
          <span className="font-display text-2xl font-semibold text-oxblood">{author.displayName.charAt(0)}</span>
        </div>
        <h3 className="font-display text-lg font-semibold text-ink group-hover:text-oxblood transition-colors">
          {author.displayName}
        </h3>
        {author.verified && <Badge variant="success" className="mt-1">Verified</Badge>}
        <p className="text-sm text-ink-muted mt-2 line-clamp-2">{author.bio}</p>
        <div className="flex items-center justify-center gap-4 mt-3 text-xs text-ink-muted">
          <span>{author.worksCount} works</span>
          <span>{author.followersCount} followers</span>
        </div>
      </div>
    </Link>
  );
}

// Event Card
export function EventCard({ event, className = '' }: { event: any; className?: string }) {
  const date = new Date(event.startAt);
  const month = date.toLocaleDateString('en-US', { month: 'short' });
  const day = date.getDate();
  return (
    <Link to={`/events/${event.slug}`} className={`block group ${className}`}>
      <div className="bg-surface border border-border-light rounded-lg p-5 hover:border-border hover:shadow-sm transition-all flex gap-4">
        <div className="flex-shrink-0 w-14 h-14 bg-oxblood/10 rounded-lg flex flex-col items-center justify-center">
          <span className="text-xs text-oxblood font-medium uppercase">{month}</span>
          <span className="text-lg font-bold text-oxblood">{day}</span>
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="font-display text-lg font-semibold text-ink group-hover:text-oxblood transition-colors truncate">
            {event.title}
          </h3>
          <p className="text-sm text-ink-muted mt-1">{event.venue || 'Online'}</p>
          <div className="flex items-center gap-3 mt-2 text-xs text-ink-muted">
            <span>{event.rsvpCount} RSVP'd</span>
            {event.capacity && <span>{event.capacity - event.rsvpCount} spots left</span>}
          </div>
        </div>
      </div>
    </Link>
  );
}

// Section Header
export function SectionHeader({ title, subtitle, action, className = '' }: { title: string; subtitle?: string; action?: ReactNode; className?: string }) {
  return (
    <div className={`flex items-end justify-between mb-8 ${className}`}>
      <div>
        <h2 className="font-display text-3xl font-semibold text-ink">{title}</h2>
        {subtitle && <p className="text-ink-muted mt-1">{subtitle}</p>}
      </div>
      {action}
    </div>
  );
}

// Editorial Divider
export function EditorialDivider({ ornament = '◆' }: { ornament?: string }) {
  return (
    <div className="editorial-divider">
      <span className="editorial-divider-ornament">{ornament}</span>
    </div>
  );
}

// Loading Skeleton
export function Skeleton({ className = '' }: { className?: string }) {
  return <div className={`animate-pulse bg-cream-dark rounded ${className}`} />;
}

// Empty State
export function EmptyState({ title, description, action }: { title: string; description?: string; action?: ReactNode }) {
  return (
    <div className="text-center py-16">
      <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-cream-dark flex items-center justify-center">
        <span className="text-2xl text-ink-muted">◇</span>
      </div>
      <h3 className="font-display text-xl font-semibold text-ink mb-2">{title}</h3>
      {description && <p className="text-ink-muted mb-6 max-w-md mx-auto">{description}</p>}
      {action}
    </div>
  );
}

// Toast/Notification
export function Toast({ notification, onDismiss }: { notification: any; onDismiss: () => void }) {
  const colors = {
    info: 'bg-surface border-border text-ink',
    success: 'bg-sage/10 border-sage/30 text-sage',
    warning: 'bg-gold/10 border-gold/30 text-warning',
    error: 'bg-error/10 border-error/30 text-error',
  };
  return (
    <div className={`flex items-center gap-3 px-4 py-3 rounded-lg border shadow-sm ${colors[notification.type as keyof typeof colors]} animate-fade-in`} role="alert">
      <p className="flex-1 text-sm">{notification.message}</p>
      {notification.dismissible && (
        <button onClick={onDismiss} className="text-ink-muted hover:text-ink" aria-label="Dismiss">
          ✕
        </button>
      )}
    </div>
  );
}

// Pagination
export function Pagination({ currentPage, totalPages, onPageChange }: { currentPage: number; totalPages: number; onPageChange: (page: number) => void }) {
  if (totalPages <= 1) return null;
  return (
    <nav aria-label="Pagination" className="flex items-center justify-center gap-2 mt-8">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="px-3 py-1.5 text-sm border border-border rounded hover:bg-cream-dark disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Previous
      </button>
      <span className="text-sm text-ink-muted">
        Page {currentPage} of {totalPages}
      </span>
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="px-3 py-1.5 text-sm border border-border rounded hover:bg-cream-dark disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Next
      </button>
    </nav>
  );
}

// Container
export function Container({ children, className = '', size = 'default' }: { children: ReactNode; className?: string; size?: 'narrow' | 'default' | 'wide' | 'full' }) {
  const sizes = {
    narrow: 'max-w-2xl',
    default: 'max-w-6xl',
    wide: 'max-w-7xl',
    full: 'max-w-full',
  };
  return (
    <div className={`${sizes[size]} mx-auto px-4 sm:px-6 lg:px-8 ${className}`}>
      {children}
    </div>
  );
}

// Page Header
export function PageHeader({ title, subtitle, breadcrumb }: { title: string; subtitle?: string; breadcrumb?: { label: string; to?: string }[] }) {
  return (
    <header className="border-b border-border-light py-8 mb-8">
      <Container>
        {breadcrumb && (
          <nav aria-label="Breadcrumb" className="mb-4">
            <ol className="flex items-center gap-2 text-sm text-ink-muted">
              {breadcrumb.map((item, i) => (
                <li key={i} className="flex items-center gap-2">
                  {i > 0 && <span>/</span>}
                  {item.to ? (
                    <Link to={item.to} className="hover:text-oxblood transition-colors">{item.label}</Link>
                  ) : (
                    <span className="text-ink">{item.label}</span>
                  )}
                </li>
              ))}
            </ol>
          </nav>
        )}
        <h1 className="font-display text-4xl md:text-5xl font-semibold text-ink">{title}</h1>
        {subtitle && <p className="text-lg text-ink-muted mt-2 max-w-2xl">{subtitle}</p>}
      </Container>
    </header>
  );
}
