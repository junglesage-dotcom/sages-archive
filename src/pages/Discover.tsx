import React, { useState } from 'react';
import { Link, useParams, useSearchParams } from 'react-router-dom';
import { Container, PageHeader, WorkCard, Badge, EditorialDivider, Pagination, SectionHeader, AuthorCard } from '../components/ui';
import { works, authors, genres, getWorksByType, getWorksByGenre, searchWorks, getLatestWorks, getFeaturedWorks, collections, series } from '../data/store';
import { useApp } from '../context/AppContext';

// Discover Page
export function Discover() {
  const [filter, setFilter] = useState<string>('all');
  const [sortBy, setSortBy] = useState<string>('latest');

  let filteredWorks = [...works];
  if (filter !== 'all') {
    filteredWorks = filteredWorks.filter(w => w.type === filter);
  }
  if (sortBy === 'latest') {
    filteredWorks.sort((a, b) => new Date(b.publishedAt || b.createdAt).getTime() - new Date(a.publishedAt || a.createdAt).getTime());
  } else if (sortBy === 'popular') {
    filteredWorks.sort((a, b) => b.viewsCount - a.viewsCount);
  } else if (sortBy === 'reactions') {
    filteredWorks.sort((a, b) => b.reactionsCount - a.reactionsCount);
  }

  return (
    <div>
      <PageHeader
        title="Discover"
        subtitle="Explore the archive — stories, poetry, essays, and more"
        breadcrumb={[{ label: 'Home', to: '/' }, { label: 'Discover' }]}
      />
      <Container>
        {/* Filters */}
        <div className="flex flex-wrap items-center gap-4 mb-8 pb-6 border-b border-border-light">
          <div className="flex items-center gap-2">
            <span className="text-sm text-ink-muted">Type:</span>
            {['all', 'story', 'poem', 'article'].map(type => (
              <button
                key={type}
                onClick={() => setFilter(type)}
                className={`px-3 py-1 text-sm rounded-full transition-colors ${
                  filter === type ? 'bg-oxblood text-white' : 'bg-cream-dark text-ink-light hover:bg-border-light'
                }`}
              >
                {type === 'all' ? 'All' : type.charAt(0).toUpperCase() + type.slice(1) + 's'}
              </button>
            ))}
          </div>
          <div className="flex items-center gap-2 ml-auto">
            <span className="text-sm text-ink-muted">Sort:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="text-sm border border-border rounded px-2 py-1 bg-surface"
            >
              <option value="latest">Latest</option>
              <option value="popular">Most Read</option>
              <option value="reactions">Most Reacted</option>
            </select>
          </div>
        </div>

        {/* Results */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredWorks.map(work => (
            <WorkCard key={work.id} work={work} />
          ))}
        </div>

        {filteredWorks.length === 0 && (
          <div className="text-center py-16">
            <p className="text-ink-muted">No works found matching your filters.</p>
          </div>
        )}
      </Container>
    </div>
  );
}

// Stories Page
export function Stories() {
  const stories = getWorksByType('story');
  return (
    <div>
      <PageHeader
        title="Stories"
        subtitle="Fiction from the archive — short stories, novellas, and narrative works"
        breadcrumb={[{ label: 'Home', to: '/' }, { label: 'Stories' }]}
      />
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {stories.map(work => <WorkCard key={work.id} work={work} />)}
        </div>
      </Container>
    </div>
  );
}

// Poetry Page
export function Poetry() {
  const poems = getWorksByType('poem');
  return (
    <div>
      <PageHeader
        title="Poetry"
        subtitle="Verse from the archive — poems, collections, and poetic works"
        breadcrumb={[{ label: 'Home', to: '/' }, { label: 'Poetry' }]}
      />
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {poems.map(work => (
            <Link key={work.id} to={`/works/${work.slug}`} className="group block">
              <div className="bg-surface border border-border-light rounded-lg p-8 hover:border-border transition-all">
                <div className="border-l-2 border-oxblood/30 pl-6 group-hover:border-oxblood transition-colors">
                  <h3 className="font-display text-2xl font-semibold text-ink group-hover:text-oxblood transition-colors mb-2">
                    {work.title}
                  </h3>
                  {work.subtitle && <p className="text-sm text-ink-muted italic mb-2">{work.subtitle}</p>}
                  <p className="text-sm text-ink-muted mb-4">by {work.author.displayName}</p>
                  <p className="text-ink-light text-sm leading-relaxed line-clamp-6 font-serif italic">
                    {work.excerpt}
                  </p>
                  <div className="flex items-center gap-4 mt-4 text-xs text-ink-muted">
                    <span>{work.readingTime} min read</span>
                    <span>{work.reactionsCount} reactions</span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </Container>
    </div>
  );
}

// Articles Page
export function Articles() {
  const articles = getWorksByType('article');
  return (
    <div>
      <PageHeader
        title="Articles & Essays"
        subtitle="Ideas, criticism, and cultural commentary from the archive"
        breadcrumb={[{ label: 'Home', to: '/' }, { label: 'Articles' }]}
      />
      <Container>
        <div className="space-y-8">
          {articles.map(work => (
            <Link key={work.id} to={`/works/${work.slug}`} className="block group border-b border-border-light pb-8 last:border-0">
              <div className="flex items-center gap-2 mb-3">
                {work.genres.map(g => <Badge key={g} variant="outline">{g}</Badge>)}
                <span className="text-xs text-ink-muted">{work.readingTime} min read</span>
              </div>
              <h2 className="font-display text-3xl font-semibold text-ink group-hover:text-oxblood transition-colors mb-2">
                {work.title}
              </h2>
              {work.subtitle && <p className="text-ink-muted italic mb-3">{work.subtitle}</p>}
              <p className="text-ink-light leading-relaxed mb-4">{work.excerpt}</p>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-cream-dark flex items-center justify-center text-sm font-medium text-ink-muted">
                  {work.author.displayName.charAt(0)}
                </div>
                <div>
                  <p className="text-sm font-medium text-ink">{work.author.displayName}</p>
                  <p className="text-xs text-ink-muted">{work.publishedAt ? new Date(work.publishedAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }) : ''}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </Container>
    </div>
  );
}

// Genre Page
export function GenrePage() {
  const { slug } = useParams();
  const genreWorks = getWorksByGenre(slug || '');
  const genreInfo = genres.find(g => g.slug === slug);

  return (
    <div>
      <PageHeader
        title={genreInfo?.name || slug || 'Genre'}
        subtitle={`${genreWorks.length} works in this genre`}
        breadcrumb={[{ label: 'Home', to: '/' }, { label: 'Genres', to: '/genres' }, { label: genreInfo?.name || slug || '' }]}
      />
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {genreWorks.map(work => <WorkCard key={work.id} work={work} />)}
        </div>
        {genreWorks.length === 0 && (
          <div className="text-center py-16">
            <p className="text-ink-muted">No works found in this genre yet.</p>
          </div>
        )}
      </Container>
    </div>
  );
}

// Authors Page
export function AuthorsPage() {
  return (
    <div>
      <PageHeader
        title="Authors"
        subtitle="Voices in the archive"
        breadcrumb={[{ label: 'Home', to: '/' }, { label: 'Authors' }]}
      />
      <Container>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {authors.map(author => <AuthorCard key={author.id} author={author} />)}
        </div>
      </Container>
    </div>
  );
}

// Collections Page
export function CollectionsPage() {
  return (
    <div>
      <PageHeader
        title="Collections"
        subtitle="Curated selections from the archive"
        breadcrumb={[{ label: 'Home', to: '/' }, { label: 'Collections' }]}
      />
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {collections.map(collection => (
            <Link key={collection.id} to={`/collections/${collection.slug}`} className="block group">
              <div className="bg-surface border border-border-light rounded-lg p-6 hover:border-border transition-all">
                <h3 className="font-display text-xl font-semibold text-ink group-hover:text-oxblood transition-colors mb-2">
                  {collection.title}
                </h3>
                <p className="text-sm text-ink-muted mb-3">{collection.description}</p>
                <div className="flex items-center justify-between text-xs text-ink-muted">
                  <span>Curated by {collection.curator.displayName}</span>
                  <span>{collection.workCount} works</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </Container>
    </div>
  );
}

// Search Page
export function SearchPage() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
  const results = query ? searchWorks(query) : [];

  return (
    <div>
      <PageHeader
        title="Search"
        subtitle={query ? `Results for "${query}"` : 'Search the archive'}
        breadcrumb={[{ label: 'Home', to: '/' }, { label: 'Search' }]}
      />
      <Container>
        <form className="mb-8">
          <input
            type="search"
            name="q"
            defaultValue={query}
            placeholder="Search works, authors, genres..."
            className="w-full px-4 py-3 border border-border rounded-lg bg-surface text-ink placeholder:text-ink-muted focus:border-oxblood focus:ring-1 focus:ring-oxblood outline-none text-lg"
            aria-label="Search"
          />
        </form>
        {query && (
          <>
            <p className="text-sm text-ink-muted mb-6">{results.length} result{results.length !== 1 ? 's' : ''} found</p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {results.map(work => <WorkCard key={work.id} work={work} />)}
            </div>
            {results.length === 0 && (
              <div className="text-center py-16">
                <p className="text-ink-muted">No results found for "{query}". Try different keywords.</p>
              </div>
            )}
          </>
        )}
      </Container>
    </div>
  );
}
