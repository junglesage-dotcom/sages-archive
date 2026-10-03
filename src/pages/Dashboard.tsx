import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Container, Badge, Button, Card, Input, Textarea, Select, SectionHeader, EditorialDivider } from '../components/ui';
import { useApp } from '../context/AppContext';
import { works, events, products, authors } from '../data/store';

export default function Dashboard() {
  const { user, isAuthenticated } = useApp();
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState('overview');

  if (!isAuthenticated) {
    return (
      <Container className="py-20 text-center">
        <h1 className="font-display text-3xl font-semibold text-ink mb-4">Creator Dashboard</h1>
        <p className="text-ink-muted mb-6">Sign in to access your dashboard.</p>
        <Link to="/login"><Button>Sign In</Button></Link>
      </Container>
    );
  }

  const menuItems = [
    { id: 'overview', label: 'Overview' },
    { id: 'works', label: 'My Works' },
    { id: 'editor', label: 'New Work' },
    { id: 'analytics', label: 'Analytics' },
    { id: 'events', label: 'Events' },
    { id: 'products', label: 'Products' },
    { id: 'media', label: 'Media' },
    { id: 'profile', label: 'Profile' },
  ];

  return (
    <div className="min-h-screen bg-parchment/30">
      <Container size="wide" className="py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <aside className="lg:w-64 flex-shrink-0">
            <div className="bg-surface border border-border-light rounded-lg p-4 sticky top-24">
              <div className="flex items-center gap-3 mb-6 pb-4 border-b border-border-light">
                <div className="w-10 h-10 rounded-full bg-oxblood/10 flex items-center justify-center font-display text-lg font-semibold text-oxblood">
                  {user?.displayName.charAt(0)}
                </div>
                <div>
                  <p className="font-medium text-ink text-sm">{user?.displayName}</p>
                  <p className="text-xs text-ink-muted">@{user?.username}</p>
                </div>
              </div>
              <nav className="space-y-1">
                {menuItems.map(item => (
                  <button
                    key={item.id}
                    onClick={() => setActiveSection(item.id)}
                    className={`block w-full text-left px-3 py-2 text-sm rounded transition-colors ${
                      activeSection === item.id
                        ? 'bg-oxblood/5 text-oxblood font-medium'
                        : 'text-ink-light hover:text-ink hover:bg-cream-dark'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </nav>
            </div>
          </aside>

          {/* Main Content */}
          <main className="flex-1 min-w-0">
            {activeSection === 'overview' && <DashboardOverview />}
            {activeSection === 'works' && <DashboardWorks />}
            {activeSection === 'editor' && <DashboardEditor />}
            {activeSection === 'analytics' && <DashboardAnalytics />}
            {activeSection === 'events' && <DashboardEvents />}
            {activeSection === 'products' && <DashboardProducts />}
            {activeSection === 'media' && <DashboardMedia />}
            {activeSection === 'profile' && <DashboardProfile />}
          </main>
        </div>
      </Container>
    </div>
  );
}

function DashboardOverview() {
  const stats = [
    { label: 'Total Views', value: '12,847', change: '+12%' },
    { label: 'Reactions', value: '1,234', change: '+8%' },
    { label: 'Followers', value: '2,847', change: '+23' },
    { label: 'Bookmarks', value: '456', change: '+5%' },
  ];

  return (
    <div>
      <h1 className="font-display text-3xl font-semibold text-ink mb-8">Dashboard</h1>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {stats.map(stat => (
          <Card key={stat.label} className="p-4">
            <p className="text-sm text-ink-muted">{stat.label}</p>
            <p className="text-2xl font-semibold text-ink mt-1">{stat.value}</p>
            <p className="text-xs text-sage mt-1">{stat.change}</p>
          </Card>
        ))}
      </div>

      {/* Recent Works */}
      <h2 className="font-display text-xl font-semibold text-ink mb-4">Recent Works</h2>
      <div className="space-y-3 mb-8">
        {works.slice(0, 4).map(work => (
          <Card key={work.id} className="p-4 flex items-center justify-between">
            <div>
              <Link to={`/works/${work.slug}`} className="font-medium text-ink hover:text-oxblood transition-colors">
                {work.title}
              </Link>
              <div className="flex items-center gap-3 mt-1 text-xs text-ink-muted">
                <Badge variant="outline">{work.type}</Badge>
                <span>{work.viewsCount} views</span>
                <span>{work.reactionsCount} reactions</span>
              </div>
            </div>
            <Badge variant={work.status === 'published' ? 'success' : work.status === 'draft' ? 'default' : 'warning'}>
              {work.status}
            </Badge>
          </Card>
        ))}
      </div>

      {/* Quick Actions */}
      <h2 className="font-display text-xl font-semibold text-ink mb-4">Quick Actions</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card hoverable className="p-6 text-center">
          <div className="text-3xl mb-2">✎</div>
          <p className="font-medium text-ink">New Story</p>
          <p className="text-xs text-ink-muted mt-1">Start writing fiction</p>
        </Card>
        <Card hoverable className="p-6 text-center">
          <div className="text-3xl mb-2">¶</div>
          <p className="font-medium text-ink">New Poem</p>
          <p className="text-xs text-ink-muted mt-1">Write verse</p>
        </Card>
        <Card hoverable className="p-6 text-center">
          <div className="text-3xl mb-2">§</div>
          <p className="font-medium text-ink">New Essay</p>
          <p className="text-xs text-ink-muted mt-1">Share your ideas</p>
        </Card>
      </div>
    </div>
  );
}

function DashboardWorks() {
  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="font-display text-3xl font-semibold text-ink">My Works</h1>
        <Button>New Work</Button>
      </div>

      <div className="space-y-4">
        {works.slice(0, 5).map(work => (
          <Card key={work.id} className="p-5">
            <div className="flex items-start justify-between">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Badge variant="outline">{work.type}</Badge>
                  <Badge variant={work.status === 'published' ? 'success' : 'default'}>{work.status}</Badge>
                </div>
                <h3 className="font-display text-lg font-semibold text-ink">{work.title}</h3>
                <p className="text-sm text-ink-muted mt-1">{work.excerpt.slice(0, 100)}...</p>
                <div className="flex items-center gap-4 mt-3 text-xs text-ink-muted">
                  <span>{work.viewsCount} views</span>
                  <span>{work.reactionsCount} reactions</span>
                  <span>{work.bookmarksCount} bookmarks</span>
                  <span>{work.commentsCount} comments</span>
                  {work.publishedAt && <span>Published {new Date(work.publishedAt).toLocaleDateString()}</span>}
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Link to={`/works/${work.slug}`} className="px-3 py-1.5 text-xs border border-border rounded hover:bg-cream-dark transition-colors">View</Link>
                <button className="px-3 py-1.5 text-xs border border-border rounded hover:bg-cream-dark transition-colors">Edit</button>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}

function DashboardEditor() {
  const [title, setTitle] = useState('');
  const [type, setType] = useState('story');
  const [body, setBody] = useState('');
  const [excerpt, setExcerpt] = useState('');
  const [genres, setGenres] = useState('');
  const [tags, setTags] = useState('');
  const { addNotification } = useApp();

  const handleSave = (status: string) => {
    addNotification({
      type: 'success',
      message: status === 'publish' ? 'Work published successfully!' : 'Draft saved.',
      dismissible: true,
    });
  };

  return (
    <div>
      <h1 className="font-display text-3xl font-semibold text-ink mb-8">New Work</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <Input
            label="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter your title..."
          />
          <Input
            label="Subtitle (optional)"
            placeholder="A subtitle or tagline..."
          />
          <Textarea
            label="Excerpt"
            value={excerpt}
            onChange={(e) => setExcerpt(e.target.value)}
            placeholder="A brief excerpt or summary..."
            className="min-h-[80px]"
          />
          <div>
            <label className="block text-sm font-medium text-ink-light mb-2">Body</label>
            <div className="border border-border rounded-lg overflow-hidden">
              {/* Toolbar */}
              <div className="flex items-center gap-1 p-2 border-b border-border-light bg-parchment/50">
                <button className="px-2 py-1 text-xs border border-border-light rounded hover:bg-cream-dark" title="Bold">B</button>
                <button className="px-2 py-1 text-xs border border-border-light rounded hover:bg-cream-dark italic" title="Italic">I</button>
                <button className="px-2 py-1 text-xs border border-border-light rounded hover:bg-cream-dark" title="Heading">H</button>
                <button className="px-2 py-1 text-xs border border-border-light rounded hover:bg-cream-dark" title="Quote">❝</button>
                <button className="px-2 py-1 text-xs border border-border-light rounded hover:bg-cream-dark" title="Poem line">¶</button>
                <button className="px-2 py-1 text-xs border border-border-light rounded hover:bg-cream-dark" title="Image">◻</button>
                <button className="px-2 py-1 text-xs border border-border-light rounded hover:bg-cream-dark" title="Divider">—</button>
              </div>
              <textarea
                value={body}
                onChange={(e) => setBody(e.target.value)}
                placeholder="Begin writing your work here...

For poetry, use blank lines between stanzas.
For stories and essays, write in paragraphs."
                className="w-full px-4 py-4 min-h-[400px] text-ink placeholder:text-ink-muted outline-none resize-y font-serif text-lg leading-relaxed"
              />
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <Card className="p-5">
            <h3 className="font-medium text-ink mb-4">Publish Settings</h3>
            <div className="space-y-4">
              <Select label="Type" value={type} onChange={(e) => setType(e.target.value)}>
                <option value="story">Story</option>
                <option value="poem">Poem</option>
                <option value="article">Article/Essay</option>
              </Select>
              <Input label="Genres (comma-separated)" value={genres} onChange={(e) => setGenres(e.target.value)} placeholder="Fiction, Literary" />
              <Input label="Tags (comma-separated)" value={tags} onChange={(e) => setTags(e.target.value)} placeholder="identity, migration, memory" />
              <Select label="Content Rating">
                <option value="general">General</option>
                <option value="teen">Teen</option>
                <option value="mature">Mature</option>
              </Select>
              <Select label="Visibility">
                <option value="public">Public</option>
                <option value="unlisted">Unlisted</option>
                <option value="private">Private/Draft</option>
              </Select>
            </div>
          </Card>

          <Card className="p-5">
            <h3 className="font-medium text-ink mb-4">Content Warnings</h3>
            <Input placeholder="Add warnings if applicable..." />
            <p className="text-xs text-ink-muted mt-2">E.g., violence, loss, sensitive themes</p>
          </Card>

          <div className="flex flex-col gap-3">
            <Button onClick={() => handleSave('draft')} variant="outline" className="w-full">Save Draft</Button>
            <Button onClick={() => handleSave('preview')} variant="secondary" className="w-full">Preview</Button>
            <Button onClick={() => handleSave('publish')} className="w-full">Publish</Button>
          </div>
        </div>
      </div>
    </div>
  );
}

function DashboardAnalytics() {
  const metrics = [
    { label: 'Total Views', value: '12,847', data: [40, 55, 45, 60, 75, 65, 80, 70, 85, 90, 78, 95] },
    { label: 'Reactions', value: '1,234', data: [20, 25, 22, 30, 28, 35, 32, 38, 36, 40, 38, 42] },
    { label: 'New Followers', value: '89', data: [5, 8, 6, 10, 7, 12, 9, 11, 8, 14, 10, 15] },
  ];

  return (
    <div>
      <h1 className="font-display text-3xl font-semibold text-ink mb-8">Analytics</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {metrics.map(metric => (
          <Card key={metric.label} className="p-5">
            <p className="text-sm text-ink-muted">{metric.label}</p>
            <p className="text-3xl font-semibold text-ink mt-1">{metric.value}</p>
            {/* Simple bar chart */}
            <div className="flex items-end gap-1 mt-4 h-16">
              {metric.data.map((val, i) => (
                <div
                  key={i}
                  className="flex-1 bg-oxblood/20 rounded-t hover:bg-oxblood/40 transition-colors"
                  style={{ height: `${val}%` }}
                />
              ))}
            </div>
          </Card>
        ))}
      </div>

      <Card className="p-6">
        <h3 className="font-medium text-ink mb-4">Top Performing Works</h3>
        <div className="space-y-3">
          {works.slice(0, 5).sort((a, b) => b.viewsCount - a.viewsCount).map((work, i) => (
            <div key={work.id} className="flex items-center gap-4">
              <span className="text-sm text-ink-muted w-6">{i + 1}.</span>
              <div className="flex-1">
                <p className="text-sm font-medium text-ink">{work.title}</p>
                <p className="text-xs text-ink-muted">{work.type} · {work.readingTime} min</p>
              </div>
              <div className="text-right">
                <p className="text-sm font-medium text-ink">{work.viewsCount.toLocaleString()}</p>
                <p className="text-xs text-ink-muted">views</p>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}

function DashboardEvents() {
  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="font-display text-3xl font-semibold text-ink">My Events</h1>
        <Button>Create Event</Button>
      </div>

      <div className="space-y-4">
        {events.slice(0, 2).map(event => (
          <Card key={event.id} className="p-5">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="font-medium text-ink">{event.title}</h3>
                <p className="text-sm text-ink-muted mt-1">
                  {new Date(event.startAt).toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })}
                  {' · '}{new Date(event.startAt).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}
                </p>
                <p className="text-sm text-ink-muted mt-1">{event.venue || 'Online'}</p>
                <div className="flex items-center gap-3 mt-2 text-xs text-ink-muted">
                  <span>{event.rsvpCount} RSVP'd</span>
                  {event.capacity && <span>{event.capacity - event.rsvpCount} spots left</span>}
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button className="px-3 py-1.5 text-xs border border-border rounded hover:bg-cream-dark transition-colors">Edit</button>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}

function DashboardProducts() {
  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="font-display text-3xl font-semibold text-ink">My Products</h1>
        <Button>New Product</Button>
      </div>

      <div className="space-y-4">
        {products.slice(0, 2).map(product => (
          <Card key={product.id} className="p-5">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="font-medium text-ink">{product.title}</h3>
                <p className="text-sm text-ink-muted mt-1">{product.type.replace('_', ' ')}</p>
                <div className="flex items-center gap-3 mt-2 text-xs text-ink-muted">
                  <span className="font-medium text-ink">{product.free ? 'Free' : `₦${product.price.toLocaleString()}`}</span>
                  <span>{product.salesCount} sales</span>
                </div>
              </div>
              <button className="px-3 py-1.5 text-xs border border-border rounded hover:bg-cream-dark transition-colors">Edit</button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}

function DashboardMedia() {
  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="font-display text-3xl font-semibold text-ink">Media Library</h1>
        <Button>Upload</Button>
      </div>

      <Card className="p-8 border-dashed border-2 text-center">
        <div className="text-4xl mb-4 text-ink-muted">◻</div>
        <p className="text-ink-muted mb-2">Drag and drop files here, or click to upload</p>
        <p className="text-xs text-ink-muted">Supports JPG, PNG, WebP. Max 10MB per file.</p>
      </Card>

      <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 mt-6">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="aspect-square bg-cream-dark rounded-lg flex items-center justify-center">
            <span className="text-ink-muted text-2xl">◻</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function DashboardProfile() {
  const { user } = useApp();
  return (
    <div>
      <h1 className="font-display text-3xl font-semibold text-ink mb-8">Profile Settings</h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card className="p-6">
          <h3 className="font-medium text-ink mb-4">Personal Information</h3>
          <div className="space-y-4">
            <Input label="Display Name" defaultValue={user?.displayName} />
            <Input label="Username" defaultValue={user?.username} />
            <Input label="Email" defaultValue={user?.email} type="email" />
            <Textarea label="Bio" placeholder="Tell readers about yourself..." defaultValue="" />
            <Input label="Website" placeholder="https://..." />
            <Button>Save Changes</Button>
          </div>
        </Card>

        <div className="space-y-6">
          <Card className="p-6">
            <h3 className="font-medium text-ink mb-4">Social Links</h3>
            <div className="space-y-4">
              <Input label="Telegram" placeholder="https://t.me/..." />
              <Input label="WhatsApp Channel" placeholder="https://whatsapp.com/channel/..." />
              <Input label="Twitter/X" placeholder="https://twitter.com/..." />
              <Input label="Instagram" placeholder="https://instagram.com/..." />
              <Button variant="outline">Save Links</Button>
            </div>
          </Card>

          <Card className="p-6">
            <h3 className="font-medium text-ink mb-4">Telegram Integration</h3>
            <p className="text-sm text-ink-muted mb-4">Link your Telegram account to receive notifications and interact with the Sage's Archive bot.</p>
            <Button variant="outline">Link Telegram Account</Button>
          </Card>

          <Card className="p-6">
            <h3 className="font-medium text-ink mb-4">Notification Preferences</h3>
            <div className="space-y-3">
              {['New followers', 'Comments on my works', 'Event reminders', 'Publication updates', 'Sales notifications'].map(pref => (
                <label key={pref} className="flex items-center justify-between">
                  <span className="text-sm text-ink-light">{pref}</span>
                  <input type="checkbox" defaultChecked className="w-4 h-4 rounded border-border text-oxblood focus:ring-oxblood" />
                </label>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
