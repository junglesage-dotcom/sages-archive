import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Container, PageHeader, Card, Button, Input, Badge } from '../components/ui';
import { useApp } from '../context/AppContext';

export default function Account() {
  const { user, isAuthenticated, logout, addNotification, theme, toggleTheme } = useApp();
  const [activeTab, setActiveTab] = useState('profile');

  if (!isAuthenticated) {
    return (
      <Container className="py-20 text-center">
        <h1 className="font-display text-3xl font-semibold text-ink mb-4">Account Settings</h1>
        <p className="text-ink-muted mb-6">Sign in to manage your account.</p>
        <Link to="/login"><Button>Sign In</Button></Link>
      </Container>
    );
  }

  const tabs = [
    { id: 'profile', label: 'Profile' },
    { id: 'security', label: 'Security' },
    { id: 'notifications', label: 'Notifications' },
    { id: 'privacy', label: 'Privacy' },
    { id: 'connections', label: 'Connections' },
    { id: 'data', label: 'Data & Export' },
  ];

  return (
    <div>
      <PageHeader
        title="Account Settings"
        subtitle="Manage your account, preferences, and data"
        breadcrumb={[{ label: 'Home', to: '/' }, { label: 'Account' }]}
      />
      <Container>
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Tabs */}
          <aside className="lg:w-56 flex-shrink-0">
            <nav className="flex lg:flex-col gap-1 overflow-x-auto lg:overflow-visible pb-2 lg:pb-0">
              {tabs.map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-3 py-2 text-sm font-medium rounded whitespace-nowrap transition-colors ${
                    activeTab === tab.id
                      ? 'bg-oxblood/5 text-oxblood'
                      : 'text-ink-light hover:text-ink hover:bg-cream-dark'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </nav>
          </aside>

          {/* Content */}
          <main className="flex-1 max-w-2xl">
            {activeTab === 'profile' && (
              <div className="space-y-6">
                <Card className="p-6">
                  <h3 className="font-medium text-ink mb-4">Personal Information</h3>
                  <div className="space-y-4">
                    <Input label="Display Name" defaultValue={user?.displayName} />
                    <Input label="Username" defaultValue={user?.username} />
                    <Input label="Email" defaultValue={user?.email} type="email" />
                    <div>
                      <label className="block text-sm font-medium text-ink-light mb-1">Bio</label>
                      <textarea className="w-full px-3 py-2 border border-border rounded bg-surface text-ink placeholder:text-ink-muted focus:border-oxblood outline-none resize-y min-h-[100px]" placeholder="Tell readers about yourself..." />
                    </div>
                    <Input label="Website" placeholder="https://..." />
                    <Button onClick={() => addNotification({ type: 'success', message: 'Profile updated.', dismissible: true })}>
                      Save Changes
                    </Button>
                  </div>
                </Card>

                <Card className="p-6">
                  <h3 className="font-medium text-ink mb-4">Display Preferences</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-ink">Dark Mode</p>
                        <p className="text-xs text-ink-muted">Use dark theme across the platform</p>
                      </div>
                      <button
                        onClick={toggleTheme}
                        className={`w-12 h-6 rounded-full transition-colors ${theme === 'dark' ? 'bg-oxblood' : 'bg-border'}`}
                        role="switch"
                        aria-checked={theme === 'dark'}
                      >
                        <span className={`block w-5 h-5 rounded-full bg-white shadow transform transition-transform ${theme === 'dark' ? 'translate-x-6' : 'translate-x-0.5'}`} />
                      </button>
                    </div>
                  </div>
                </Card>
              </div>
            )}

            {activeTab === 'security' && (
              <div className="space-y-6">
                <Card className="p-6">
                  <h3 className="font-medium text-ink mb-4">Change Password</h3>
                  <div className="space-y-4">
                    <Input label="Current Password" type="password" placeholder="••••••••" />
                    <Input label="New Password" type="password" placeholder="At least 8 characters" />
                    <Input label="Confirm New Password" type="password" placeholder="Repeat new password" />
                    <Button>Update Password</Button>
                  </div>
                </Card>

                <Card className="p-6">
                  <h3 className="font-medium text-ink mb-4">Active Sessions</h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 bg-parchment/50 rounded-lg">
                      <div>
                        <p className="text-sm font-medium text-ink">Current Session</p>
                        <p className="text-xs text-ink-muted">Web · Last active now</p>
                      </div>
                      <Badge variant="success">Active</Badge>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-parchment/50 rounded-lg">
                      <div>
                        <p className="text-sm font-medium text-ink">Mobile Browser</p>
                        <p className="text-xs text-ink-muted">Last active 2 days ago</p>
                      </div>
                      <button className="text-xs text-error hover:text-red-800">Revoke</button>
                    </div>
                  </div>
                  <Button variant="outline" className="mt-4">Sign Out All Sessions</Button>
                </Card>

                <Card className="p-6 border-error/20">
                  <h3 className="font-medium text-error mb-2">Danger Zone</h3>
                  <p className="text-sm text-ink-muted mb-4">Permanently delete your account and all associated data. This action cannot be undone.</p>
                  <Button variant="danger">Delete Account</Button>
                </Card>
              </div>
            )}

            {activeTab === 'notifications' && (
              <Card className="p-6">
                <h3 className="font-medium text-ink mb-4">Notification Preferences</h3>
                <p className="text-sm text-ink-muted mb-6">Choose how you want to be notified about activity on Sage's Archive.</p>
                <div className="space-y-4">
                  {[
                    { label: 'New followers', description: 'When someone follows you' },
                    { label: 'Comments on your works', description: 'When readers comment on your publications' },
                    { label: 'Reactions', description: 'When readers react to your works' },
                    { label: 'Event reminders', description: 'Upcoming events you\'ve RSVP\'d to' },
                    { label: 'Publication updates', description: 'New works from authors you follow' },
                    { label: 'Community updates', description: 'Activity in your communities' },
                    { label: 'Sales notifications', description: 'When your products are purchased' },
                    { label: 'Security alerts', description: 'Login attempts and account changes' },
                  ].map(pref => (
                    <label key={pref.label} className="flex items-center justify-between p-3 bg-parchment/50 rounded-lg">
                      <div>
                        <p className="text-sm font-medium text-ink">{pref.label}</p>
                        <p className="text-xs text-ink-muted">{pref.description}</p>
                      </div>
                      <input type="checkbox" defaultChecked className="w-4 h-4 rounded border-border text-oxblood focus:ring-oxblood" />
                    </label>
                  ))}
                </div>
                <Button className="mt-6" onClick={() => addNotification({ type: 'success', message: 'Preferences saved.', dismissible: true })}>
                  Save Preferences
                </Button>
              </Card>
            )}

            {activeTab === 'privacy' && (
              <Card className="p-6">
                <h3 className="font-medium text-ink mb-4">Privacy Settings</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 bg-parchment/50 rounded-lg">
                    <div>
                      <p className="text-sm font-medium text-ink">Profile Visibility</p>
                      <p className="text-xs text-ink-muted">Allow others to find your profile</p>
                    </div>
                    <input type="checkbox" defaultChecked className="w-4 h-4 rounded border-border text-oxblood focus:ring-oxblood" />
                  </div>
                  <div className="flex items-center justify-between p-3 bg-parchment/50 rounded-lg">
                    <div>
                      <p className="text-sm font-medium text-ink">Show reading activity</p>
                      <p className="text-xs text-ink-muted">Let others see what you're reading</p>
                    </div>
                    <input type="checkbox" className="w-4 h-4 rounded border-border text-oxblood focus:ring-oxblood" />
                  </div>
                  <div className="flex items-center justify-between p-3 bg-parchment/50 rounded-lg">
                    <div>
                      <p className="text-sm font-medium text-ink">Allow comments</p>
                      <p className="text-xs text-ink-muted">Let readers comment on your works</p>
                    </div>
                    <input type="checkbox" defaultChecked className="w-4 h-4 rounded border-border text-oxblood focus:ring-oxblood" />
                  </div>
                  <div className="flex items-center justify-between p-3 bg-parchment/50 rounded-lg">
                    <div>
                      <p className="text-sm font-medium text-ink">Analytics consent</p>
                      <p className="text-xs text-ink-muted">Help improve the platform with anonymous usage data</p>
                    </div>
                    <input type="checkbox" defaultChecked className="w-4 h-4 rounded border-border text-oxblood focus:ring-oxblood" />
                  </div>
                </div>
                <Button className="mt-6" onClick={() => addNotification({ type: 'success', message: 'Privacy settings saved.', dismissible: true })}>
                  Save Settings
                </Button>
              </Card>
            )}

            {activeTab === 'connections' && (
              <div className="space-y-6">
                <Card className="p-6">
                  <h3 className="font-medium text-ink mb-4">Telegram</h3>
                  <p className="text-sm text-ink-muted mb-4">
                    Link your Telegram account to receive notifications and interact with the Sage's Archive bot.
                  </p>
                  {user?.telegramLinked ? (
                    <div className="flex items-center gap-3 p-3 bg-sage/10 rounded-lg">
                      <Badge variant="success">Linked</Badge>
                      <span className="text-sm text-ink">Connected to Telegram</span>
                      <button className="ml-auto text-xs text-error hover:text-red-800">Unlink</button>
                    </div>
                  ) : (
                    <Button variant="outline" onClick={() => addNotification({ type: 'info', message: 'Opening Telegram linking flow...', dismissible: true })}>
                      Link Telegram Account
                    </Button>
                  )}
                </Card>

                <Card className="p-6">
                  <h3 className="font-medium text-ink mb-4">Social Links</h3>
                  <div className="space-y-4">
                    <Input label="WhatsApp Channel" placeholder="https://whatsapp.com/channel/..." />
                    <Input label="Twitter/X" placeholder="https://twitter.com/..." />
                    <Input label="Instagram" placeholder="https://instagram.com/..." />
                    <Input label="Mastodon" placeholder="https://..." />
                    <Button onClick={() => addNotification({ type: 'success', message: 'Links saved.', dismissible: true })}>Save Links</Button>
                  </div>
                </Card>

                <Card className="p-6">
                  <h3 className="font-medium text-ink mb-4">Blocked Users</h3>
                  <p className="text-sm text-ink-muted">You haven't blocked any users.</p>
                </Card>
              </div>
            )}

            {activeTab === 'data' && (
              <div className="space-y-6">
                <Card className="p-6">
                  <h3 className="font-medium text-ink mb-4">Export Your Data</h3>
                  <p className="text-sm text-ink-muted mb-4">
                    Download a copy of your data including your works, profile information, and activity history.
                  </p>
                  <div className="space-y-3">
                    <Button variant="outline" onClick={() => addNotification({ type: 'info', message: 'Export started. You\'ll receive a download link via email.', dismissible: true })}>
                      Export All Data (JSON)
                    </Button>
                    <Button variant="outline" onClick={() => addNotification({ type: 'info', message: 'Exporting works as Markdown...', dismissible: true })}>
                      Export Works (Markdown)
                    </Button>
                  </div>
                </Card>

                <Card className="p-6">
                  <h3 className="font-medium text-ink mb-4">Data Retention</h3>
                  <p className="text-sm text-ink-muted leading-relaxed">
                    We retain your account data for as long as your account is active. Published works may be retained in backups for up to 90 days after deletion. 
                    Transaction records are retained as required by financial regulations. You can request deletion of specific data at any time.
                  </p>
                  <Link to="/privacy" className="text-sm text-oxblood hover:text-oxblood-dark mt-3 inline-block">
                    Read our Privacy Policy →
                  </Link>
                </Card>
              </div>
            )}
          </main>
        </div>
      </Container>
    </div>
  );
}
