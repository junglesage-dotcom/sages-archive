import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Container, PageHeader, Button, Card, Badge, EditorialDivider } from '../components/ui';
import { events, communities, products, getEventBySlug, getCommunityBySlug, getProductBySlug } from '../data/store';
import { useApp } from '../context/AppContext';

// Events Page
export function EventsPage() {
  return (
    <div>
      <PageHeader
        title="Events"
        subtitle="Readings, workshops, poetry meetings, and literary gatherings"
        breadcrumb={[{ label: 'Home', to: '/' }, { label: 'Events' }]}
      />
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {events.map(event => (
            <Link key={event.id} to={`/events/${event.slug}`} className="block group">
              <Card className="p-6 hover:border-border transition-all h-full">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-14 h-14 bg-oxblood/10 rounded-lg flex flex-col items-center justify-center">
                    <span className="text-xs text-oxblood font-medium uppercase">
                      {new Date(event.startAt).toLocaleDateString('en-US', { month: 'short' })}
                    </span>
                    <span className="text-lg font-bold text-oxblood">
                      {new Date(event.startAt).getDate()}
                    </span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-display text-lg font-semibold text-ink group-hover:text-oxblood transition-colors">
                      {event.title}
                    </h3>
                    <p className="text-sm text-ink-muted mt-1">
                      {new Date(event.startAt).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}
                    </p>
                    <p className="text-sm text-ink-muted mt-1">{event.venue || 'Online'}</p>
                    <div className="flex items-center gap-3 mt-3 text-xs text-ink-muted">
                      <span>{event.rsvpCount} RSVP'd</span>
                      {event.capacity && <span>{event.capacity - event.rsvpCount} spots left</span>}
                    </div>
                    <div className="mt-3">
                      <Badge variant="outline">by {event.organizer.displayName}</Badge>
                    </div>
                  </div>
                </div>
              </Card>
            </Link>
          ))}
        </div>
      </Container>
    </div>
  );
}

// Event Detail Page
export function EventDetail() {
  const { slug } = useParams();
  const event = getEventBySlug(slug || '');
  const { isAuthenticated, addNotification } = useApp();
  const [rsvpd, setRsvpd] = useState(false);

  if (!event) {
    return (
      <Container className="py-20 text-center">
        <h1 className="font-display text-3xl font-semibold text-ink mb-4">Event not found</h1>
        <Link to="/events" className="text-oxblood hover:text-oxblood-dark font-medium">← Back to events</Link>
      </Container>
    );
  }

  const handleRSVP = () => {
    if (!isAuthenticated) {
      addNotification({ type: 'warning', message: 'Please sign in to RSVP.', dismissible: true });
      return;
    }
    setRsvpd(!rsvpd);
    addNotification({ type: 'success', message: rsvpd ? 'RSVP cancelled.' : 'You\'re registered!', dismissible: true });
  };

  const handleICSExport = () => {
    const ics = `BEGIN:VCALENDAR
VERSION:2.0
BEGIN:VEVENT
DTSTART:${new Date(event.startAt).toISOString().replace(/[-:]/g, '').split('.')[0]}Z
DTEND:${new Date(event.endAt).toISOString().replace(/[-:]/g, '').split('.')[0]}Z
SUMMARY:${event.title}
DESCRIPTION:${event.description}
LOCATION:${event.venue || 'Online'}
END:VEVENT
END:VCALENDAR`;
    const blob = new Blob([ics], { type: 'text/calendar' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${event.slug}.ics`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div>
      <div className="border-b border-border-light py-12">
        <Container>
          <nav className="mb-6 text-sm text-ink-muted">
            <Link to="/" className="hover:text-oxblood transition-colors">Home</Link>
            <span className="mx-2">/</span>
            <Link to="/events" className="hover:text-oxblood transition-colors">Events</Link>
          </nav>

          <div className="flex flex-col md:flex-row gap-8">
            <div className="flex-1">
              <Badge variant="primary" className="mb-4">
                {event.onlineUrl ? 'Online Event' : 'In Person'}
              </Badge>
              <h1 className="font-display text-4xl font-semibold text-ink mb-4">{event.title}</h1>
              <div className="flex items-center gap-4 text-sm text-ink-muted mb-6">
                <span>Organized by {event.organizer.displayName}</span>
                {event.communityId && <span>· Community Event</span>}
              </div>
            </div>

            <div className="md:w-64 flex-shrink-0">
              <Card className="p-5">
                <div className="text-center mb-4">
                  <div className="text-4xl font-bold text-oxblood">{new Date(event.startAt).getDate()}</div>
                  <div className="text-sm text-ink-muted">
                    {new Date(event.startAt).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                  </div>
                  <div className="text-sm text-ink-muted mt-1">
                    {new Date(event.startAt).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })} — {new Date(event.endAt).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}
                  </div>
                </div>
                <div className="space-y-3 text-sm">
                  {event.venue && <p className="text-ink-light">{event.venue}</p>}
                  <p className="text-ink-muted">{event.rsvpCount} attending{event.capacity ? ` of ${event.capacity}` : ''}</p>
                </div>
                <div className="mt-4 space-y-2">
                  <Button onClick={handleRSVP} className="w-full" variant={rsvpd ? 'outline' : 'primary'}>
                    {rsvpd ? 'Cancel RSVP' : 'RSVP Now'}
                  </Button>
                  <button onClick={handleICSExport} className="w-full px-4 py-2 text-sm border border-border rounded-lg text-ink-light hover:bg-cream-dark transition-colors">
                    Add to Calendar
                  </button>
                </div>
              </Card>
            </div>
          </div>
        </Container>
      </div>

      <Container className="py-8">
        <div className="max-w-3xl">
          <h2 className="font-display text-2xl font-semibold text-ink mb-4">About this event</h2>
          <div className="prose-sage text-base">
            {event.description.split('\n').map((p, i) => <p key={i}>{p}</p>)}
          </div>

          <EditorialDivider />

          {/* Share */}
          <div className="flex items-center gap-4">
            <span className="text-sm text-ink-muted">Share:</span>
            <a href={`https://t.me/share/url?url=${encodeURIComponent(window.location.href)}&text=${encodeURIComponent(event.title)}`} target="_blank" rel="noopener noreferrer" className="text-sm text-oxblood hover:text-oxblood-dark">Telegram</a>
            <a href={`https://wa.me/?text=${encodeURIComponent(event.title + ' ' + window.location.href)}`} target="_blank" rel="noopener noreferrer" className="text-sm text-oxblood hover:text-oxblood-dark">WhatsApp</a>
            <button onClick={() => { navigator.clipboard.writeText(window.location.href); }} className="text-sm text-oxblood hover:text-oxblood-dark">Copy Link</button>
          </div>
        </div>
      </Container>
    </div>
  );
}

// Communities Page
export function CommunitiesPage() {
  return (
    <div>
      <PageHeader
        title="Communities"
        subtitle="Literary groups, writing collectives, and creative communities"
        breadcrumb={[{ label: 'Home', to: '/' }, { label: 'Communities' }]}
      />
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {communities.map(community => (
            <Link key={community.id} to={`/communities/${community.slug}`} className="block group">
              <Card className="p-6 hover:border-border transition-all h-full">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-lg bg-oxblood/10 flex items-center justify-center flex-shrink-0">
                    <span className="font-display text-xl font-semibold text-oxblood">{community.name.charAt(0)}</span>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <h3 className="font-display text-lg font-semibold text-ink group-hover:text-oxblood transition-colors">
                        {community.name}
                      </h3>
                      {community.verified && <Badge variant="success">Verified</Badge>}
                    </div>
                    <p className="text-sm text-ink-muted mt-2 line-clamp-2">{community.description}</p>
                    <div className="flex items-center gap-4 mt-3 text-xs text-ink-muted">
                      <span>{community.memberCount} members</span>
                      <span>{community.representatives.length} representative{community.representatives.length !== 1 ? 's' : ''}</span>
                    </div>
                  </div>
                </div>
              </Card>
            </Link>
          ))}
        </div>
      </Container>
    </div>
  );
}

// Community Detail Page
export function CommunityDetail() {
  const { slug } = useParams();
  const community = getCommunityBySlug(slug || '');
  const { isAuthenticated, addNotification } = useApp();

  if (!community) {
    return (
      <Container className="py-20 text-center">
        <h1 className="font-display text-3xl font-semibold text-ink mb-4">Community not found</h1>
        <Link to="/communities" className="text-oxblood hover:text-oxblood-dark font-medium">← Browse communities</Link>
      </Container>
    );
  }

  return (
    <div>
      <div className="border-b border-border-light py-12">
        <Container>
          <nav className="mb-6 text-sm text-ink-muted">
            <Link to="/" className="hover:text-oxblood transition-colors">Home</Link>
            <span className="mx-2">/</span>
            <Link to="/communities" className="hover:text-oxblood transition-colors">Communities</Link>
          </nav>

          <div className="flex items-start gap-6">
            <div className="w-16 h-16 rounded-lg bg-oxblood/10 flex items-center justify-center flex-shrink-0">
              <span className="font-display text-3xl font-semibold text-oxblood">{community.name.charAt(0)}</span>
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-3">
                <h1 className="font-display text-3xl font-semibold text-ink">{community.name}</h1>
                {community.verified && <Badge variant="success">Verified</Badge>}
              </div>
              <p className="text-ink-light mt-3 max-w-2xl">{community.description}</p>
              <div className="flex items-center gap-6 mt-4 text-sm text-ink-muted">
                <span>{community.memberCount} members</span>
                <span>Joined {new Date(community.createdAt).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}</span>
              </div>
              <div className="flex items-center gap-3 mt-4">
                {isAuthenticated ? (
                  <Button onClick={() => addNotification({ type: 'success', message: 'You joined the community!', dismissible: true })}>
                    Join Community
                  </Button>
                ) : (
                  <Link to="/login"><Button>Join Community</Button></Link>
                )}
                {community.externalLinks.map((link, i) => (
                  <a key={i} href={link.url} target="_blank" rel="noopener noreferrer" className="px-4 py-2 border border-border rounded-lg text-sm text-ink-light hover:text-oxblood transition-colors">
                    {link.label}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </Container>
      </div>

      <Container className="py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <h2 className="font-display text-xl font-semibold text-ink mb-4">Representatives</h2>
            <div className="space-y-3">
              {community.representatives.map(rep => (
                <Link key={rep.id} to={`/authors/${rep.username}`} className="flex items-center gap-3 p-3 rounded-lg hover:bg-cream-dark transition-colors">
                  <div className="w-10 h-10 rounded-full bg-cream-dark flex items-center justify-center font-display text-lg font-semibold text-oxblood">
                    {rep.displayName.charAt(0)}
                  </div>
                  <div>
                    <p className="font-medium text-ink">{rep.displayName}</p>
                    <p className="text-xs text-ink-muted">@{rep.username}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          <div>
            <h2 className="font-display text-xl font-semibold text-ink mb-4">Links</h2>
            <div className="space-y-2">
              {community.externalLinks.map((link, i) => (
                <a key={i} href={link.url} target="_blank" rel="noopener noreferrer" className="block p-3 border border-border-light rounded-lg text-sm text-oxblood hover:bg-cream-dark transition-colors">
                  {link.label} →
                </a>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}

// Store Page
export function StorePage() {
  return (
    <div>
      <PageHeader
        title="Store"
        subtitle="Digital books, poetry collections, and creative works for purchase"
        breadcrumb={[{ label: 'Home', to: '/' }, { label: 'Store' }]}
      />
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map(product => (
            <Link key={product.id} to={`/store/${product.slug}`} className="block group">
              <Card className="overflow-hidden hover:border-border transition-all h-full">
                {/* Cover placeholder */}
                <div className="aspect-[3/4] bg-gradient-to-br from-ink/5 to-ink/10 flex items-center justify-center">
                  <div className="text-center p-6">
                    <span className="font-display text-2xl font-semibold text-ink/40">{product.title.charAt(0)}</span>
                  </div>
                </div>
                <div className="p-5">
                  <Badge variant={product.free ? 'success' : 'primary'} className="mb-2">
                    {product.free ? 'Free' : `₦${product.price.toLocaleString()}`}
                  </Badge>
                  <h3 className="font-display text-lg font-semibold text-ink group-hover:text-oxblood transition-colors">
                    {product.title}
                  </h3>
                  <p className="text-sm text-ink-muted mt-1">by {product.author.displayName}</p>
                  <p className="text-sm text-ink-light mt-2 line-clamp-2">{product.description}</p>
                  <div className="flex items-center justify-between mt-4 text-xs text-ink-muted">
                    <span>{product.type.replace(/_/g, ' ')}</span>
                    <span>{product.salesCount} sold</span>
                  </div>
                </div>
              </Card>
            </Link>
          ))}
        </div>
      </Container>
    </div>
  );
}

// Product Detail Page
export function ProductDetail() {
  const { slug } = useParams();
  const product = getProductBySlug(slug || '');
  const { isAuthenticated, addNotification } = useApp();

  if (!product) {
    return (
      <Container className="py-20 text-center">
        <h1 className="font-display text-3xl font-semibold text-ink mb-4">Product not found</h1>
        <Link to="/store" className="text-oxblood hover:text-oxblood-dark font-medium">← Back to store</Link>
      </Container>
    );
  }

  const handlePurchase = () => {
    if (!isAuthenticated) {
      addNotification({ type: 'warning', message: 'Please sign in to purchase.', dismissible: true });
      return;
    }
    addNotification({ type: 'success', message: product.free ? 'Added to your library!' : 'Proceeding to checkout...', dismissible: true });
  };

  return (
    <div>
      <div className="border-b border-border-light py-12">
        <Container>
          <nav className="mb-6 text-sm text-ink-muted">
            <Link to="/" className="hover:text-oxblood transition-colors">Home</Link>
            <span className="mx-2">/</span>
            <Link to="/store" className="hover:text-oxblood transition-colors">Store</Link>
          </nav>

          <div className="flex flex-col md:flex-row gap-8">
            {/* Cover */}
            <div className="md:w-72 flex-shrink-0">
              <div className="aspect-[3/4] bg-gradient-to-br from-ink/5 to-ink/10 rounded-lg flex items-center justify-center">
                <span className="font-display text-6xl font-semibold text-ink/20">{product.title.charAt(0)}</span>
              </div>
            </div>

            {/* Info */}
            <div className="flex-1">
              <Badge variant={product.free ? 'success' : 'primary'} className="mb-3">
                {product.free ? 'Free' : `₦${product.price.toLocaleString()}`}
              </Badge>
              <h1 className="font-display text-3xl md:text-4xl font-semibold text-ink mb-2">{product.title}</h1>
              <Link to={`/authors/${product.author.username}`} className="text-ink-light hover:text-oxblood transition-colors">
                by {product.author.displayName}
              </Link>

              <div className="mt-6 space-y-4">
                <p className="text-ink-light leading-relaxed">{product.description}</p>

                <div className="flex items-center gap-4 text-sm text-ink-muted">
                  <span>{product.type.replace(/_/g, ' ')}</span>
                  <span>·</span>
                  <span>{product.salesCount} sold</span>
                </div>

                <div className="flex items-center gap-3 pt-4">
                  <Button onClick={handlePurchase} size="lg">
                    {product.free ? 'Get Free' : `Buy — ₦${product.price.toLocaleString()}`}
                  </Button>
                  <button className="px-4 py-3 border border-border rounded-lg text-sm text-ink-light hover:bg-cream-dark transition-colors">
                    Add to Wishlist
                  </button>
                </div>

                <p className="text-xs text-ink-muted pt-2">
                  Secure payment processing. Digital delivery. Refund policy applies.
                </p>
              </div>
            </div>
          </div>
        </Container>
      </div>

      <Container className="py-8">
        <div className="max-w-3xl">
          <h2 className="font-display text-2xl font-semibold text-ink mb-4">Preview</h2>
          {product.preview ? (
            <div className="prose-sage text-base border border-border-light rounded-lg p-6 bg-parchment/30">
              {product.preview.split('\n').map((p, i) => <p key={i}>{p}</p>)}
            </div>
          ) : (
            <p className="text-ink-muted">No preview available. Purchase to access the full work.</p>
          )}
        </div>
      </Container>
    </div>
  );
}
