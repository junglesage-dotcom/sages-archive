import React from 'react';
import { Link } from 'react-router-dom';
import { Container, SectionHeader, EditorialDivider, WorkCard, AuthorCard, EventCard, Badge } from '../components/ui';
import { getFeaturedWorks, getLatestWorks, getWorksByType, authors, events, communities, genres } from '../data/store';

export default function Home() {
  const featured = getFeaturedWorks();
  const latest = getLatestWorks().slice(0, 6);
  const poems = getWorksByType('poem').slice(0, 3);
  const stories = getWorksByType('story').slice(0, 3);
  const articles = getWorksByType('article').slice(0, 3);
  const upcomingEvents = events.slice(0, 3);

  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-border-light">
        <div className="absolute inset-0 bg-gradient-to-b from-parchment to-cream opacity-60" />
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23000000\' fill-opacity=\'1\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")' }} />
        <Container className="relative py-20 md:py-32">
          <div className="max-w-3xl">
            <div className="flex items-center gap-2 mb-6">
              <Badge variant="primary">Digital Literary Archive</Badge>
              <Badge variant="outline">Est. 2025</Badge>
            </div>
            <h1 className="font-display text-5xl md:text-7xl font-semibold text-ink leading-[1.1] mb-6">
              Where words find
              <br />
              <span className="text-oxblood italic">their archive</span>
            </h1>
            <p className="text-lg md:text-xl text-ink-light leading-relaxed max-w-2xl mb-8">
              A publishing platform for stories, poetry, and essays. Discover voices from across the world, 
              build your library, and join a community that believes in the power of the written word.
            </p>
            <div className="flex flex-wrap items-center gap-4">
              <Link
                to="/discover"
                className="inline-flex items-center px-6 py-3 bg-oxblood text-white font-medium rounded-lg hover:bg-oxblood-dark transition-colors"
              >
                Explore the Archive
              </Link>
              <Link
                to="/register"
                className="inline-flex items-center px-6 py-3 border border-border text-ink font-medium rounded-lg hover:bg-cream-dark transition-colors"
              >
                Start Writing
              </Link>
            </div>
          </div>
        </Container>
      </section>

      {/* Featured Works */}
      <section className="py-16">
        <Container>
          <SectionHeader
            title="Featured"
            subtitle="Editor's selection from the archive"
            action={<Link to="/discover" className="text-sm font-medium text-oxblood hover:text-oxblood-dark transition-colors">View all →</Link>}
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featured.slice(0, 3).map(work => (
              <WorkCard key={work.id} work={work} />
            ))}
          </div>
        </Container>
      </section>

      <EditorialDivider />

      {/* Latest Poetry */}
      <section className="py-16 bg-parchment/50">
        <Container>
          <SectionHeader
            title="Latest Poetry"
            subtitle="Fresh verse from the archive"
            action={<Link to="/poetry" className="text-sm font-medium text-oxblood hover:text-oxblood-dark transition-colors">All poetry →</Link>}
          />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {poems.map(work => (
              <Link key={work.id} to={`/works/${work.slug}`} className="group block">
                <div className="border-l-2 border-oxblood/30 pl-6 py-2 group-hover:border-oxblood transition-colors">
                  <h3 className="font-display text-xl font-semibold text-ink group-hover:text-oxblood transition-colors mb-2">
                    {work.title}
                  </h3>
                  <p className="text-sm text-ink-muted mb-3">by {work.author.displayName}</p>
                  <p className="text-ink-light text-sm leading-relaxed line-clamp-4 font-serif italic">
                    {work.excerpt}
                  </p>
                  <span className="inline-block mt-4 text-xs text-oxblood font-medium">{work.readingTime} min read →</span>
                </div>
              </Link>
            ))}
          </div>
        </Container>
      </section>

      {/* Latest Stories */}
      <section className="py-16">
        <Container>
          <SectionHeader
            title="Latest Stories"
            subtitle="Fiction from the archive"
            action={<Link to="/stories" className="text-sm font-medium text-oxblood hover:text-oxblood-dark transition-colors">All stories →</Link>}
          />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {stories.map(work => (
              <WorkCard key={work.id} work={work} />
            ))}
          </div>
        </Container>
      </section>

      <EditorialDivider />

      {/* Latest Articles */}
      <section className="py-16">
        <Container>
          <SectionHeader
            title="Essays & Articles"
            subtitle="Ideas, criticism, and cultural commentary"
            action={<Link to="/articles" className="text-sm font-medium text-oxblood hover:text-oxblood-dark transition-colors">All articles →</Link>}
          />
          <div className="space-y-6">
            {articles.map(work => (
              <Link key={work.id} to={`/works/${work.slug}`} className="block group border-b border-border-light pb-6 last:border-0">
                <div className="flex flex-col md:flex-row md:items-start gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <Badge variant="outline">{work.genres[0]}</Badge>
                      <span className="text-xs text-ink-muted">{work.readingTime} min read</span>
                    </div>
                    <h3 className="font-display text-2xl font-semibold text-ink group-hover:text-oxblood transition-colors mb-2">
                      {work.title}
                    </h3>
                    {work.subtitle && <p className="text-sm text-ink-muted italic mb-2">{work.subtitle}</p>}
                    <p className="text-ink-light text-sm line-clamp-2 mb-3">{work.excerpt}</p>
                    <p className="text-sm text-ink-muted">by {work.author.displayName}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </Container>
      </section>

      {/* Authors Spotlight */}
      <section className="py-16 bg-parchment/50">
        <Container>
          <SectionHeader
            title="Voices in the Archive"
            subtitle="Authors publishing on Sage's Archive"
            action={<Link to="/authors" className="text-sm font-medium text-oxblood hover:text-oxblood-dark transition-colors">All authors →</Link>}
          />
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {authors.slice(0, 6).map(author => (
              <AuthorCard key={author.id} author={author} />
            ))}
          </div>
        </Container>
      </section>

      {/* Events */}
      <section className="py-16">
        <Container>
          <SectionHeader
            title="Upcoming Events"
            subtitle="Readings, workshops, and literary gatherings"
            action={<Link to="/events" className="text-sm font-medium text-oxblood hover:text-oxblood-dark transition-colors">All events →</Link>}
          />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {upcomingEvents.map(event => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        </Container>
      </section>

      <EditorialDivider />

      {/* Communities & Telegram */}
      <section className="py-16">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Communities */}
            <div>
              <h2 className="font-display text-2xl font-semibold text-ink mb-6">Communities</h2>
              <div className="space-y-4">
                {communities.map(community => (
                  <Link key={community.id} to={`/communities/${community.slug}`} className="block group">
                    <div className="bg-surface border border-border-light rounded-lg p-5 hover:border-border transition-all">
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="font-medium text-ink group-hover:text-oxblood transition-colors">{community.name}</h3>
                          <p className="text-sm text-ink-muted mt-1 line-clamp-2">{community.description}</p>
                        </div>
                        <span className="text-xs text-ink-muted whitespace-nowrap ml-4">{community.memberCount} members</span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            {/* Telegram CTA */}
            <div className="bg-ink text-cream rounded-lg p-8 flex flex-col justify-center">
              <h2 className="font-display text-2xl font-semibold mb-4">Join us on Telegram</h2>
              <p className="text-cream/80 mb-6 leading-relaxed">
                Get notified about new publications, upcoming events, and community discussions. 
                Our Telegram channel is the heartbeat of Sage's Archive.
              </p>
              <div className="flex flex-wrap gap-3">
                <a
                  href="https://t.me/sagesarchive"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-5 py-2.5 bg-cream text-ink font-medium rounded-lg hover:bg-cream-dark transition-colors text-sm"
                >
                  Join Channel
                </a>
                <a
                  href="https://t.me/sagesarchivebot"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-5 py-2.5 border border-cream/30 text-cream font-medium rounded-lg hover:bg-cream/10 transition-colors text-sm"
                >
                  Talk to Bot
                </a>
              </div>
              <div className="mt-6 pt-6 border-t border-cream/10">
                <p className="text-xs text-cream/60">Also available on WhatsApp</p>
                <a href="https://whatsapp.com/channel/sagesarchive" target="_blank" rel="noopener noreferrer" className="text-sm text-cream/80 hover:text-cream transition-colors mt-1 inline-block">
                  WhatsApp Channel →
                </a>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Genres */}
      <section className="py-16 bg-parchment/50">
        <Container>
          <SectionHeader title="Browse by Genre" />
          <div className="flex flex-wrap gap-3">
            {genres.map(genre => (
              <Link
                key={genre.slug}
                to={`/genres/${genre.slug}`}
                className="inline-flex items-center gap-2 px-4 py-2 bg-surface border border-border-light rounded-full text-sm text-ink-light hover:border-oxblood hover:text-oxblood transition-colors"
              >
                {genre.name}
                <span className="text-xs text-ink-muted">{genre.count}</span>
              </Link>
            ))}
          </div>
        </Container>
      </section>

      {/* CTA */}
      <section className="py-20">
        <Container>
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="font-display text-4xl font-semibold text-ink mb-4">Your words deserve an archive</h2>
            <p className="text-lg text-ink-muted mb-8">
              Join Sage's Archive and publish your stories, poetry, and essays to a community of readers who care about literature.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link to="/register" className="px-8 py-3 bg-oxblood text-white font-medium rounded-lg hover:bg-oxblood-dark transition-colors">
                Create Your Account
              </Link>
              <Link to="/about" className="px-8 py-3 border border-border text-ink font-medium rounded-lg hover:bg-cream-dark transition-colors">
                Learn More
              </Link>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}
