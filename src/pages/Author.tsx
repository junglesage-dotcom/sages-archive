import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Container, PageHeader, WorkCard, Badge, Button, EditorialDivider } from '../components/ui';
import { getAuthorByUsername, getWorksByAuthor } from '../data/store';
import { useApp } from '../context/AppContext';

export default function AuthorProfile() {
  const { username } = useParams();
  const author = getAuthorByUsername(username || '');
  const { isAuthenticated, addNotification } = useApp();
  const [activeTab, setActiveTab] = useState<'works' | 'about'>('works');

  if (!author) {
    return (
      <Container className="py-20 text-center">
        <h1 className="font-display text-3xl font-semibold text-ink mb-4">Author not found</h1>
        <Link to="/authors" className="text-oxblood hover:text-oxblood-dark font-medium">← Browse authors</Link>
      </Container>
    );
  }

  const authorWorks = getWorksByAuthor(author.id);

  return (
    <div>
      {/* Author Header */}
      <div className="border-b border-border-light py-12">
        <Container>
          <div className="flex flex-col md:flex-row items-start gap-8">
            {/* Avatar */}
            <div className="w-24 h-24 rounded-full bg-cream-dark flex items-center justify-center flex-shrink-0">
              <span className="font-display text-4xl font-semibold text-oxblood">{author.displayName.charAt(0)}</span>
            </div>

            {/* Info */}
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <h1 className="font-display text-3xl md:text-4xl font-semibold text-ink">{author.displayName}</h1>
                {author.verified && <Badge variant="success">Verified Author</Badge>}
              </div>
              <p className="text-ink-muted mb-1">@{author.username}</p>
              <p className="text-ink-light leading-relaxed max-w-2xl mt-4">{author.bio}</p>

              {/* Stats */}
              <div className="flex items-center gap-6 mt-6">
                <div>
                  <span className="text-2xl font-semibold text-ink">{authorWorks.length}</span>
                  <span className="text-sm text-ink-muted ml-1">works</span>
                </div>
                <div>
                  <span className="text-2xl font-semibold text-ink">{author.followersCount.toLocaleString()}</span>
                  <span className="text-sm text-ink-muted ml-1">followers</span>
                </div>
                <div>
                  <span className="text-sm text-ink-muted">Joined {new Date(author.joinedAt).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}</span>
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-3 mt-6">
                {isAuthenticated ? (
                  <Button onClick={() => addNotification({ type: 'success', message: `You are now following ${author.displayName}`, dismissible: true })}>
                    Follow
                  </Button>
                ) : (
                  <Link to="/login"><Button>Follow</Button></Link>
                )}
                {author.telegramLink && (
                  <a href={author.telegramLink} target="_blank" rel="noopener noreferrer" className="px-4 py-2 border border-border rounded-lg text-sm text-ink-light hover:text-oxblood transition-colors">
                    Telegram
                  </a>
                )}
                {author.whatsappChannel && (
                  <a href={author.whatsappChannel} target="_blank" rel="noopener noreferrer" className="px-4 py-2 border border-border rounded-lg text-sm text-ink-light hover:text-oxblood transition-colors">
                    WhatsApp
                  </a>
                )}
                {author.website && (
                  <a href={author.website} target="_blank" rel="noopener noreferrer" className="px-4 py-2 border border-border rounded-lg text-sm text-ink-light hover:text-oxblood transition-colors">
                    Website
                  </a>
                )}
              </div>
            </div>
          </div>
        </Container>
      </div>

      {/* Content */}
      <Container className="py-8">
        {/* Tabs */}
        <div className="flex items-center gap-6 border-b border-border-light mb-8">
          <button
            onClick={() => setActiveTab('works')}
            className={`pb-3 text-sm font-medium border-b-2 transition-colors ${activeTab === 'works' ? 'border-oxblood text-oxblood' : 'border-transparent text-ink-muted hover:text-ink'}`}
          >
            Works ({authorWorks.length})
          </button>
          <button
            onClick={() => setActiveTab('about')}
            className={`pb-3 text-sm font-medium border-b-2 transition-colors ${activeTab === 'about' ? 'border-oxblood text-oxblood' : 'border-transparent text-ink-muted hover:text-ink'}`}
          >
            About
          </button>
        </div>

        {activeTab === 'works' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {authorWorks.map(work => <WorkCard key={work.id} work={work} />)}
          </div>
        )}

        {activeTab === 'about' && (
          <div className="max-w-2xl">
            <h2 className="font-display text-2xl font-semibold text-ink mb-4">About</h2>
            <p className="text-ink-light leading-relaxed mb-6">{author.bio}</p>

            <h3 className="font-medium text-ink mb-3">Links</h3>
            <ul className="space-y-2">
              {author.website && (
                <li><a href={author.website} target="_blank" rel="noopener noreferrer" className="text-oxblood hover:text-oxblood-dark text-sm">Website →</a></li>
              )}
              {author.telegramLink && (
                <li><a href={author.telegramLink} target="_blank" rel="noopener noreferrer" className="text-oxblood hover:text-oxblood-dark text-sm">Telegram →</a></li>
              )}
              {author.whatsappChannel && (
                <li><a href={author.whatsappChannel} target="_blank" rel="noopener noreferrer" className="text-oxblood hover:text-oxblood-dark text-sm">WhatsApp Channel →</a></li>
              )}
              {author.socialLinks.map((link, i) => (
                <li key={i}>
                  <a href={link.url} target="_blank" rel="noopener noreferrer" className="text-oxblood hover:text-oxblood-dark text-sm capitalize">{link.platform} →</a>
                </li>
              ))}
            </ul>
          </div>
        )}
      </Container>
    </div>
  );
}
