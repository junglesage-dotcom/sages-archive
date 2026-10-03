import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Container, Badge, EditorialDivider, Button } from '../components/ui';
import { getWorkBySlug, getCommentsByWork, getWorksByAuthor, works } from '../data/store';
import { useApp } from '../context/AppContext';

export default function ReadWork() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const work = getWorkBySlug(slug || '');
  const { user, isAuthenticated, bookmarks, toggleBookmark, readingFontSize, setReadingFontSize, readingWidth, setReadingWidth, addNotification } = useApp();
  const [showControls, setShowControls] = useState(false);
  const [showComments, setShowComments] = useState(false);
  const [commentText, setCommentText] = useState('');
  const [reaction, setReaction] = useState<string | null>(null);

  if (!work) {
    return (
      <Container className="py-20 text-center">
        <h1 className="font-display text-3xl font-semibold text-ink mb-4">Work not found</h1>
        <p className="text-ink-muted mb-6">The work you're looking for doesn't exist or has been removed.</p>
        <Link to="/discover" className="text-oxblood hover:text-oxblood-dark font-medium">← Back to Discover</Link>
      </Container>
    );
  }

  const comments = getCommentsByWork(work.id);
  const relatedWorks = getWorksByAuthor(work.authorId).filter(w => w.id !== work.id).slice(0, 3);
  const isBookmarked = bookmarks.includes(work.id);

  // Content warning check
  const hasWarnings = work.contentWarnings.length > 0;

  // Render body with proper formatting
  const renderBody = (body: string) => {
    if (work.type === 'poem') {
      // Poetry: preserve line breaks and stanzas
      const stanzas = body.split('\n\n');
      return (
        <div className="poem-content">
          {stanzas.map((stanza, i) => (
            <div key={i} className="poem-stanza">
              {stanza.split('\n').map((line, j) => (
                <div key={j} className="poem-line font-serif text-lg leading-relaxed">
                  {line || '\u00A0'}
                </div>
              ))}
            </div>
          ))}
        </div>
      );
    }

    // Prose: paragraphs
    const paragraphs = body.split('\n\n');
    return (
      <div className="prose-sage">
        {paragraphs.map((para, i) => {
          if (para.startsWith('**') && para.endsWith('**')) {
            return <h2 key={i} className="font-display text-2xl font-semibold mt-8 mb-4">{para.replace(/\*\*/g, '')}</h2>;
          }
          if (para.startsWith('- ')) {
            const items = para.split('\n').map(item => item.replace(/^- /, ''));
            return (
              <ul key={i} className="list-disc list-inside space-y-1 my-4">
                {items.map((item, j) => <li key={j}>{item}</li>)}
              </ul>
            );
          }
          if (para.startsWith('*') && para.endsWith('*')) {
            return <p key={i} className="italic text-center my-6 text-ink-light">{para.replace(/\*/g, '')}</p>;
          }
          return <p key={i}>{para}</p>;
        })}
      </div>
    );
  };

  return (
    <article className="min-h-screen">
      {/* Content Warning */}
      {hasWarnings && (
        <div className="bg-warning/10 border-b border-warning/20 py-4">
          <Container size="narrow">
            <p className="text-sm text-warning font-medium">
              Content Warning: {work.contentWarnings.join(', ')}
            </p>
          </Container>
        </div>
      )}

      {/* Article Header */}
      <header className="border-b border-border-light py-12 md:py-16">
        <Container size="narrow">
          {/* Breadcrumb */}
          <nav className="mb-6 text-sm text-ink-muted">
            <Link to="/" className="hover:text-oxblood transition-colors">Home</Link>
            <span className="mx-2">/</span>
            <Link to={`/${work.type === 'poem' ? 'poetry' : work.type === 'story' ? 'stories' : 'articles'}`} className="hover:text-oxblood transition-colors">
              {work.type === 'poem' ? 'Poetry' : work.type === 'story' ? 'Stories' : 'Articles'}
            </Link>
          </nav>

          {/* Type badge */}
          <div className="flex items-center gap-2 mb-4">
            <Badge variant="primary">
              {work.type === 'poem' ? 'Poem' : work.type === 'story' ? 'Story' : 'Essay'}
            </Badge>
            {work.contentRating !== 'general' && (
              <Badge variant="warning">{work.contentRating}</Badge>
            )}
          </div>

          {/* Title */}
          <h1 className="font-display text-4xl md:text-5xl font-semibold text-ink leading-tight mb-3">
            {work.title}
          </h1>
          {work.subtitle && (
            <p className="text-xl text-ink-muted italic mb-6">{work.subtitle}</p>
          )}

          {/* Author & Meta */}
          <div className="flex flex-wrap items-center gap-4 mb-6">
            <Link to={`/authors/${work.author.username}`} className="flex items-center gap-3 group">
              <div className="w-10 h-10 rounded-full bg-cream-dark flex items-center justify-center font-display text-lg font-semibold text-oxblood">
                {work.author.displayName.charAt(0)}
              </div>
              <div>
                <p className="font-medium text-ink group-hover:text-oxblood transition-colors">{work.author.displayName}</p>
                <p className="text-xs text-ink-muted">
                  {work.publishedAt ? new Date(work.publishedAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }) : ''}
                </p>
              </div>
            </Link>
          </div>

          {/* Reading meta */}
          <div className="flex items-center gap-4 text-sm text-ink-muted">
            <span>{work.readingTime} min read</span>
            <span>{work.wordCount} words</span>
            <span>{work.viewsCount.toLocaleString()} views</span>
          </div>

          {/* Genres */}
          <div className="flex flex-wrap gap-2 mt-4">
            {work.genres.map(g => (
              <Link key={g} to={`/genres/${g.toLowerCase()}`} className="text-xs text-ink-muted hover:text-oxblood transition-colors border border-border-light px-2 py-0.5 rounded-full">
                {g}
              </Link>
            ))}
          </div>
        </Container>
      </header>

      {/* Reading Controls */}
      <div className="sticky top-16 z-40 bg-cream/95 backdrop-blur-sm border-b border-border-light no-print">
        <Container size="narrow">
          <div className="flex items-center justify-between py-2">
            <div className="flex items-center gap-2">
              <button
                onClick={() => setShowControls(!showControls)}
                className="p-2 text-ink-muted hover:text-ink rounded transition-colors text-sm"
                aria-label="Reading settings"
              >
                Aa
              </button>
              <button
                onClick={() => toggleBookmark(work.id)}
                className={`p-2 rounded transition-colors text-sm ${isBookmarked ? 'text-oxblood' : 'text-ink-muted hover:text-ink'}`}
                aria-label={isBookmarked ? 'Remove bookmark' : 'Add bookmark'}
              >
                {isBookmarked ? '★' : '☆'}
              </button>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => {
                  if (navigator.share) {
                    navigator.share({ title: work.title, url: window.location.href });
                  } else {
                    navigator.clipboard.writeText(window.location.href);
                    addNotification({ type: 'success', message: 'Link copied to clipboard', dismissible: true });
                  }
                }}
                className="p-2 text-ink-muted hover:text-ink rounded transition-colors text-sm"
                aria-label="Share"
              >
                Share
              </button>
              <button
                onClick={() => window.print()}
                className="p-2 text-ink-muted hover:text-ink rounded transition-colors text-sm"
                aria-label="Print"
              >
                Print
              </button>
            </div>
          </div>

          {/* Controls panel */}
          {showControls && (
            <div className="pb-4 border-t border-border-light pt-4 animate-fade-in">
              <div className="flex flex-wrap items-center gap-6">
                <div className="flex items-center gap-2">
                  <span className="text-xs text-ink-muted">Size:</span>
                  <button onClick={() => setReadingFontSize(Math.max(14, readingFontSize - 2))} className="w-7 h-7 border border-border rounded text-xs">A-</button>
                  <span className="text-xs text-ink-muted w-8 text-center">{readingFontSize}</span>
                  <button onClick={() => setReadingFontSize(Math.min(28, readingFontSize + 2))} className="w-7 h-7 border border-border rounded text-xs">A+</button>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-ink-muted">Width:</span>
                  {(['compact', 'comfortable', 'wide'] as const).map(w => (
                    <button
                      key={w}
                      onClick={() => setReadingWidth(w)}
                      className={`px-2 py-1 text-xs rounded ${readingWidth === w ? 'bg-oxblood text-white' : 'border border-border text-ink-muted'}`}
                    >
                      {w}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}
        </Container>
      </div>

      {/* Content */}
      <div className={`py-12 reading-mode-${readingWidth}`}>
        <Container size="narrow">
          <div style={{ fontSize: `${readingFontSize}px` }}>
            {renderBody(work.body)}
          </div>
        </Container>
      </div>

      <Container size="narrow">
        <EditorialDivider />

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-8">
          {work.tags.map(tag => (
            <Link key={tag} to={`/tags/${tag}`} className="text-xs text-ink-muted hover:text-oxblood transition-colors border border-border-light px-3 py-1 rounded-full">
              #{tag}
            </Link>
          ))}
        </div>

        {/* Reactions */}
        <div className="flex items-center gap-4 py-6 border-t border-border-light">
          <span className="text-sm text-ink-muted">React:</span>
          {['♥', '✦', '◇', '○'].map(r => (
            <button
              key={r}
              onClick={() => setReaction(reaction === r ? null : r)}
              className={`w-10 h-10 rounded-full border flex items-center justify-center text-lg transition-all ${
                reaction === r ? 'border-oxblood bg-oxblood/10 scale-110' : 'border-border hover:border-oxblood/50'
              }`}
              aria-label={`React with ${r}`}
            >
              {r}
            </button>
          ))}
          <span className="text-sm text-ink-muted ml-2">{work.reactionsCount} reactions</span>
        </div>

        {/* Author Card */}
        <div className="bg-parchment rounded-lg p-6 my-8 border border-border-light">
          <div className="flex items-start gap-4">
            <div className="w-14 h-14 rounded-full bg-cream-dark flex items-center justify-center font-display text-2xl font-semibold text-oxblood flex-shrink-0">
              {work.author.displayName.charAt(0)}
            </div>
            <div className="flex-1">
              <Link to={`/authors/${work.author.username}`} className="font-display text-lg font-semibold text-ink hover:text-oxblood transition-colors">
                {work.author.displayName}
              </Link>
              {work.author.verified && <Badge variant="success" className="ml-2">Verified</Badge>}
              <p className="text-sm text-ink-muted mt-1">{work.author.bio}</p>
              <div className="flex items-center gap-4 mt-3">
                <Link to={`/authors/${work.author.username}`} className="text-sm text-oxblood hover:text-oxblood-dark font-medium">
                  View profile →
                </Link>
                {isAuthenticated && (
                  <button className="text-sm text-ink-muted hover:text-ink font-medium">
                    Follow
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Comments */}
        <div className="border-t border-border-light pt-8">
          <button
            onClick={() => setShowComments(!showComments)}
            className="flex items-center gap-2 font-display text-xl font-semibold text-ink mb-6"
          >
            Comments ({comments.length})
            <span className="text-sm text-ink-muted font-sans font-normal">{showComments ? '−' : '+'}</span>
          </button>

          {showComments && (
            <div className="space-y-6 animate-fade-in">
              {/* Comment form */}
              {isAuthenticated ? (
                <div className="bg-parchment rounded-lg p-4 border border-border-light">
                  <textarea
                    value={commentText}
                    onChange={(e) => setCommentText(e.target.value)}
                    placeholder="Share your thoughts..."
                    className="w-full px-3 py-2 border border-border rounded bg-surface text-ink placeholder:text-ink-muted focus:border-oxblood outline-none resize-y min-h-[80px]"
                    maxLength={2000}
                  />
                  <div className="flex items-center justify-between mt-2">
                    <span className="text-xs text-ink-muted">{commentText.length}/2000</span>
                    <Button size="sm" disabled={!commentText.trim()}>Post Comment</Button>
                  </div>
                </div>
              ) : (
                <p className="text-sm text-ink-muted bg-parchment rounded-lg p-4 border border-border-light">
                  <Link to="/login" className="text-oxblood font-medium hover:text-oxblood-dark">Sign in</Link> to leave a comment.
                </p>
              )}

              {/* Comments list */}
              {comments.map(comment => (
                <div key={comment.id} className="border-b border-border-light pb-6 last:border-0">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-8 h-8 rounded-full bg-cream-dark flex items-center justify-center text-xs font-medium text-ink-muted">
                      {comment.author.displayName.charAt(0)}
                    </div>
                    <Link to={`/authors/${comment.author.username}`} className="text-sm font-medium text-ink hover:text-oxblood transition-colors">
                      {comment.author.displayName}
                    </Link>
                    <span className="text-xs text-ink-muted">
                      {new Date(comment.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                    </span>
                  </div>
                  <p className="text-ink-light text-sm leading-relaxed pl-11">{comment.body}</p>
                  <div className="flex items-center gap-4 pl-11 mt-2">
                    <button className="text-xs text-ink-muted hover:text-oxblood transition-colors">
                      ♥ {comment.likesCount}
                    </button>
                    <button className="text-xs text-ink-muted hover:text-oxblood transition-colors">
                      Reply
                    </button>
                    <button className="text-xs text-ink-muted hover:text-oxblood transition-colors">
                      Report
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Related Works */}
        {relatedWorks.length > 0 && (
          <div className="border-t border-border-light pt-8 mt-8">
            <h3 className="font-display text-xl font-semibold text-ink mb-6">More by {work.author.displayName}</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {relatedWorks.map(rw => (
                <Link key={rw.id} to={`/works/${rw.slug}`} className="block group">
                  <div className="bg-parchment rounded-lg p-4 border border-border-light hover:border-border transition-all">
                    <Badge variant="outline" className="mb-2">
                      {rw.type === 'poem' ? 'Poem' : rw.type === 'story' ? 'Story' : 'Essay'}
                    </Badge>
                    <h4 className="font-display text-lg font-semibold text-ink group-hover:text-oxblood transition-colors">
                      {rw.title}
                    </h4>
                    <p className="text-xs text-ink-muted mt-2">{rw.readingTime} min read</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </Container>
    </article>
  );
}
