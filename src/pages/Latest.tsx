import React from 'react';
import { Link } from 'react-router-dom';
import { Container, PageHeader, WorkCard, EditorialDivider, Badge } from '../components/ui';
import { getLatestWorks, works } from '../data/store';

export default function Latest() {
  const latest = getLatestWorks();

  return (
    <div>
      <PageHeader
        title="Latest"
        subtitle="The most recently published works from the archive"
        breadcrumb={[{ label: 'Home', to: '/' }, { label: 'Latest' }]}
      />
      <Container>
        {/* Featured latest */}
        {latest[0] && (
          <div className="mb-12">
            <Link to={`/works/${latest[0].slug}`} className="block group">
              <div className="bg-surface border border-border-light rounded-lg p-8 md:p-12 hover:border-border transition-all">
                <div className="max-w-3xl">
                  <div className="flex items-center gap-2 mb-4">
                    <Badge variant="primary">Latest</Badge>
                    <Badge variant="outline">{latest[0].type}</Badge>
                  </div>
                  <h2 className="font-display text-3xl md:text-4xl font-semibold text-ink group-hover:text-oxblood transition-colors mb-3">
                    {latest[0].title}
                  </h2>
                  {latest[0].subtitle && (
                    <p className="text-lg text-ink-muted italic mb-4">{latest[0].subtitle}</p>
                  )}
                  <p className="text-ink-light leading-relaxed mb-6">{latest[0].excerpt}</p>
                  <div className="flex items-center gap-4">
                    <div className="w-8 h-8 rounded-full bg-cream-dark flex items-center justify-center text-sm font-medium text-ink-muted">
                      {latest[0].author.displayName.charAt(0)}
                    </div>
                    <div>
                      <p className="text-sm font-medium text-ink">{latest[0].author.displayName}</p>
                      <p className="text-xs text-ink-muted">
                        {latest[0].publishedAt ? new Date(latest[0].publishedAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }) : ''}
                        {' · '}{latest[0].readingTime} min read
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          </div>
        )}

        <EditorialDivider />

        {/* Rest of latest */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {latest.slice(1).map(work => (
            <WorkCard key={work.id} work={work} />
          ))}
        </div>
      </Container>
    </div>
  );
}
