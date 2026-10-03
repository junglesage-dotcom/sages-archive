import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Container, Card, Badge, Button, Input } from '../components/ui';
import { useApp } from '../context/AppContext';
import { works, authors, events, products, communities } from '../data/store';

export default function Admin() {
  const { user, isAuthenticated } = useApp();
  const [activeSection, setActiveSection] = useState('overview');

  if (!isAuthenticated) {
    return (
      <Container className="py-20 text-center">
        <h1 className="font-display text-3xl font-semibold text-ink mb-4">Admin Panel</h1>
        <p className="text-ink-muted mb-6">Sign in with admin privileges to access this area.</p>
        <Link to="/login"><Button>Sign In</Button></Link>
      </Container>
    );
  }

  const menuItems = [
    { id: 'overview', label: 'Overview' },
    { id: 'users', label: 'Users' },
    { id: 'works', label: 'Works' },
    { id: 'moderation', label: 'Moderation' },
    { id: 'events', label: 'Events' },
    { id: 'store', label: 'Store & Orders' },
    { id: 'communities', label: 'Communities' },
    { id: 'audit', label: 'Audit Log' },
    { id: 'settings', label: 'Settings' },
  ];

  return (
    <div className="min-h-screen bg-parchment/30">
      <Container size="wide" className="py-8">
        <div className="flex items-center gap-4 mb-8">
          <h1 className="font-display text-3xl font-semibold text-ink">Admin Panel</h1>
          <Badge variant="error">Admin</Badge>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <aside className="lg:w-56 flex-shrink-0">
            <nav className="bg-surface border border-border-light rounded-lg p-3 space-y-1 sticky top-24">
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
          </aside>

          {/* Content */}
          <main className="flex-1 min-w-0">
            {activeSection === 'overview' && <AdminOverview />}
            {activeSection === 'users' && <AdminUsers />}
            {activeSection === 'works' && <AdminWorks />}
            {activeSection === 'moderation' && <AdminModeration />}
            {activeSection === 'events' && <AdminEvents />}
            {activeSection === 'store' && <AdminStore />}
            {activeSection === 'communities' && <AdminCommunities />}
            {activeSection === 'audit' && <AdminAudit />}
            {activeSection === 'settings' && <AdminSettings />}
          </main>
        </div>
      </Container>
    </div>
  );
}

function AdminOverview() {
  const stats = [
    { label: 'Total Users', value: '2,847', change: '+124 this week' },
    { label: 'Published Works', value: '456', change: '+18 this week' },
    { label: 'Active Communities', value: '23', change: '+2 this month' },
    { label: 'Pending Reports', value: '7', change: '3 urgent' },
    { label: 'Revenue (NGN)', value: '₦2,340,000', change: '+15% this month' },
    { label: 'Events', value: '12', change: '3 upcoming' },
  ];

  return (
    <div>
      <h2 className="font-display text-2xl font-semibold text-ink mb-6">Platform Overview</h2>
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
        {stats.map(stat => (
          <Card key={stat.label} className="p-4">
            <p className="text-sm text-ink-muted">{stat.label}</p>
            <p className="text-2xl font-semibold text-ink mt-1">{stat.value}</p>
            <p className="text-xs text-sage mt-1">{stat.change}</p>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-5">
          <h3 className="font-medium text-ink mb-4">Recent Reports</h3>
          <div className="space-y-3">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="flex items-center justify-between p-3 bg-parchment/50 rounded-lg">
                <div>
                  <p className="text-sm text-ink">Report #{1000 + i}</p>
                  <p className="text-xs text-ink-muted">Harassment · 2 hours ago</p>
                </div>
                <Badge variant="warning">Pending</Badge>
              </div>
            ))}
          </div>
        </Card>

        <Card className="p-5">
          <h3 className="font-medium text-ink mb-4">System Health</h3>
          <div className="space-y-3">
            {[
              { label: 'API', status: 'Operational' },
              { label: 'Database', status: 'Operational' },
              { label: 'Storage', status: 'Operational' },
              { label: 'Telegram Bot', status: 'Operational' },
              { label: 'Payment Gateway', status: 'Degraded' },
            ].map(item => (
              <div key={item.label} className="flex items-center justify-between p-3 bg-parchment/50 rounded-lg">
                <span className="text-sm text-ink">{item.label}</span>
                <Badge variant={item.status === 'Operational' ? 'success' : 'warning'}>{item.status}</Badge>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}

function AdminUsers() {
  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="font-display text-2xl font-semibold text-ink">Users</h2>
        <Input placeholder="Search users..." className="max-w-xs" />
      </div>
      <Card className="overflow-hidden">
        <table className="w-full">
          <thead className="bg-parchment/50 border-b border-border-light">
            <tr>
              <th className="text-left px-4 py-3 text-xs font-medium text-ink-muted uppercase">User</th>
              <th className="text-left px-4 py-3 text-xs font-medium text-ink-muted uppercase">Role</th>
              <th className="text-left px-4 py-3 text-xs font-medium text-ink-muted uppercase">Status</th>
              <th className="text-left px-4 py-3 text-xs font-medium text-ink-muted uppercase">Joined</th>
              <th className="text-right px-4 py-3 text-xs font-medium text-ink-muted uppercase">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border-light">
            {authors.slice(0, 5).map(author => (
              <tr key={author.id} className="hover:bg-parchment/30">
                <td className="px-4 py-3">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-cream-dark flex items-center justify-center text-xs font-medium text-ink-muted">
                      {author.displayName.charAt(0)}
                    </div>
                    <div>
                      <p className="text-sm font-medium text-ink">{author.displayName}</p>
                      <p className="text-xs text-ink-muted">@{author.username}</p>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-3"><Badge variant="outline">creator</Badge></td>
                <td className="px-4 py-3"><Badge variant="success">active</Badge></td>
                <td className="px-4 py-3 text-sm text-ink-muted">{new Date(author.joinedAt).toLocaleDateString()}</td>
                <td className="px-4 py-3 text-right">
                  <button className="text-xs text-oxblood hover:text-oxblood-dark">Manage</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </div>
  );
}

function AdminWorks() {
  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="font-display text-2xl font-semibold text-ink">Works</h2>
        <div className="flex items-center gap-2">
          <select className="text-sm border border-border rounded px-2 py-1.5">
            <option>All statuses</option>
            <option>Published</option>
            <option>Pending Review</option>
            <option>Draft</option>
          </select>
        </div>
      </div>
      <div className="space-y-3">
        {works.map(work => (
          <Card key={work.id} className="p-4 flex items-center justify-between">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <Badge variant="outline">{work.type}</Badge>
                <Badge variant={work.status === 'published' ? 'success' : 'warning'}>{work.status}</Badge>
              </div>
              <p className="text-sm font-medium text-ink">{work.title}</p>
              <p className="text-xs text-ink-muted">by {work.author.displayName} · {work.viewsCount} views</p>
            </div>
            <div className="flex items-center gap-2">
              <button className="px-2 py-1 text-xs border border-border rounded hover:bg-cream-dark">View</button>
              <button className="px-2 py-1 text-xs border border-border rounded hover:bg-cream-dark">Moderate</button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}

function AdminModeration() {
  const reports = [
    { id: 1, type: 'harassment', target: 'Comment on "The Last Train to Shibuya"', reporter: 'reader_42', status: 'pending', created: '2 hours ago' },
    { id: 2, type: 'spam', target: 'User profile: spam_account', reporter: 'auto_detect', status: 'pending', created: '5 hours ago' },
    { id: 3, type: 'copyright', target: 'Work: "Untitled Poem"', reporter: 'author_12', status: 'under_review', created: '1 day ago' },
    { id: 4, type: 'hate_speech', target: 'Comment on "Digital Monuments"', reporter: 'reader_89', status: 'resolved', created: '2 days ago' },
  ];

  return (
    <div>
      <h2 className="font-display text-2xl font-semibold text-ink mb-6">Moderation Queue</h2>
      <div className="space-y-3">
        {reports.map(report => (
          <Card key={report.id} className="p-4">
            <div className="flex items-start justify-between">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <Badge variant={report.status === 'pending' ? 'warning' : report.status === 'under_review' ? 'primary' : 'success'}>
                    {report.status.replace('_', ' ')}
                  </Badge>
                  <Badge variant="outline">{report.type.replace('_', ' ')}</Badge>
                </div>
                <p className="text-sm font-medium text-ink">{report.target}</p>
                <p className="text-xs text-ink-muted mt-1">Reported by {report.reporter} · {report.created}</p>
              </div>
              <div className="flex items-center gap-2">
                <Button size="sm" variant="outline">Review</Button>
                {report.status !== 'resolved' && (
                  <Button size="sm" variant="danger">Action</Button>
                )}
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}

function AdminEvents() {
  return (
    <div>
      <h2 className="font-display text-2xl font-semibold text-ink mb-6">Events Management</h2>
      <div className="space-y-3">
        {events.map(event => (
          <Card key={event.id} className="p-4 flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-ink">{event.title}</p>
              <p className="text-xs text-ink-muted">
                {new Date(event.startAt).toLocaleDateString()} · {event.venue || 'Online'} · {event.rsvpCount} RSVPs
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant="success">Approved</Badge>
              <button className="px-2 py-1 text-xs border border-border rounded hover:bg-cream-dark">Manage</button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}

function AdminStore() {
  return (
    <div>
      <h2 className="font-display text-2xl font-semibold text-ink mb-6">Store & Orders</h2>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <Card className="p-4">
          <p className="text-sm text-ink-muted">Total Revenue</p>
          <p className="text-xl font-semibold text-ink">₦2,340,000</p>
        </Card>
        <Card className="p-4">
          <p className="text-sm text-ink-muted">Orders</p>
          <p className="text-xl font-semibold text-ink">277</p>
        </Card>
        <Card className="p-4">
          <p className="text-sm text-ink-muted">Products</p>
          <p className="text-xl font-semibold text-ink">{products.length}</p>
        </Card>
        <Card className="p-4">
          <p className="text-sm text-ink-muted">Pending Payouts</p>
          <p className="text-xl font-semibold text-ink">₦450,000</p>
        </Card>
      </div>
      <Card className="p-5">
        <h3 className="font-medium text-ink mb-4">Recent Orders</h3>
        <div className="space-y-2">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="flex items-center justify-between p-3 bg-parchment/50 rounded-lg">
              <div>
                <p className="text-sm text-ink">Order #{2000 + i}</p>
                <p className="text-xs text-ink-muted">{products[i % products.length].title}</p>
              </div>
              <div className="text-right">
                <p className="text-sm font-medium text-ink">₦{products[i % products.length].price.toLocaleString()}</p>
                <Badge variant="success">Paid</Badge>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}

function AdminCommunities() {
  return (
    <div>
      <h2 className="font-display text-2xl font-semibold text-ink mb-6">Communities</h2>
      <div className="space-y-3">
        {communities.map(community => (
          <Card key={community.id} className="p-4 flex items-center justify-between">
            <div>
              <div className="flex items-center gap-2">
                <p className="text-sm font-medium text-ink">{community.name}</p>
                {community.verified && <Badge variant="success">Verified</Badge>}
              </div>
              <p className="text-xs text-ink-muted">{community.memberCount} members · Created {new Date(community.createdAt).toLocaleDateString()}</p>
            </div>
            <button className="px-2 py-1 text-xs border border-border rounded hover:bg-cream-dark">Manage</button>
          </Card>
        ))}
      </div>
    </div>
  );
}

function AdminAudit() {
  const logs = [
    { action: 'user.role_changed', actor: 'admin_01', target: 'user_42', detail: 'reader → creator', time: '10 min ago' },
    { action: 'work.published', actor: 'auth-001', target: 'work-007', detail: '"The Architecture of Solitude"', time: '2 hours ago' },
    { action: 'moderation.report_resolved', actor: 'mod_01', target: 'report_42', detail: 'Action: content removed', time: '3 hours ago' },
    { action: 'payment.refund_issued', actor: 'system', target: 'order_1234', detail: '₦4,500 refunded', time: '5 hours ago' },
    { action: 'telegram.account_linked', actor: 'user_89', target: 'telegram_123456', detail: 'Account linked', time: '6 hours ago' },
    { action: 'product.created', actor: 'auth-004', target: 'prod_003', detail: '"Letters to No One: A Chapbook"', time: '1 day ago' },
    { action: 'user.suspended', actor: 'admin_01', target: 'user_spam', detail: 'Reason: spam', time: '1 day ago' },
  ];

  return (
    <div>
      <h2 className="font-display text-2xl font-semibold text-ink mb-6">Audit Log</h2>
      <Card className="overflow-hidden">
        <div className="divide-y divide-border-light">
          {logs.map((log, i) => (
            <div key={i} className="p-4 flex items-center gap-4">
              <div className="w-2 h-2 rounded-full bg-oxblood/50 flex-shrink-0" />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-mono text-ink">{log.action}</p>
                <p className="text-xs text-ink-muted">
                  by {log.actor} → {log.target}: {log.detail}
                </p>
              </div>
              <span className="text-xs text-ink-muted whitespace-nowrap">{log.time}</span>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}

function AdminSettings() {
  return (
    <div>
      <h2 className="font-display text-2xl font-semibold text-ink mb-6">Platform Settings</h2>
      <div className="space-y-6">
        <Card className="p-6">
          <h3 className="font-medium text-ink mb-4">General</h3>
          <div className="space-y-4 max-w-lg">
            <Input label="Site Name" defaultValue="Sage's Archive" />
            <Input label="Site URL" defaultValue="https://sagesarchive.com" />
            <Input label="Contact Email" defaultValue="hello@sagesarchive.com" />
          </div>
        </Card>

        <Card className="p-6">
          <h3 className="font-medium text-ink mb-4">Feature Flags</h3>
          <div className="space-y-3">
            {[
              { label: 'Payments', enabled: true },
              { label: 'Telegram Bot', enabled: true },
              { label: 'WhatsApp Integration', enabled: true },
              { label: 'Comments', enabled: true },
              { label: 'Events', enabled: true },
              { label: 'PWA', enabled: true },
              { label: 'Advanced Search', enabled: false },
              { label: 'Recommendations', enabled: false },
            ].map(flag => (
              <label key={flag.label} className="flex items-center justify-between p-3 bg-parchment/50 rounded-lg">
                <span className="text-sm text-ink">{flag.label}</span>
                <input type="checkbox" defaultChecked={flag.enabled} className="w-4 h-4 rounded border-border text-oxblood focus:ring-oxblood" />
              </label>
            ))}
          </div>
        </Card>

        <Card className="p-6">
          <h3 className="font-medium text-ink mb-4">Integrations</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-parchment/50 rounded-lg">
              <div>
                <p className="text-sm font-medium text-ink">Telegram Bot</p>
                <p className="text-xs text-ink-muted">Connected · @sagesarchivebot</p>
              </div>
              <Badge variant="success">Active</Badge>
            </div>
            <div className="flex items-center justify-between p-3 bg-parchment/50 rounded-lg">
              <div>
                <p className="text-sm font-medium text-ink">Payment Provider</p>
                <p className="text-xs text-ink-muted">Paystack (test mode)</p>
              </div>
              <Badge variant="warning">Test Mode</Badge>
            </div>
            <div className="flex items-center justify-between p-3 bg-parchment/50 rounded-lg">
              <div>
                <p className="text-sm font-medium text-ink">Storage</p>
                <p className="text-xs text-ink-muted">Local adapter (dev)</p>
              </div>
              <Badge variant="outline">Local</Badge>
            </div>
          </div>
        </Card>

        <Button>Save Settings</Button>
      </div>
    </div>
  );
}
