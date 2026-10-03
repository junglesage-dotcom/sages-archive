import React from 'react';
import { Link } from 'react-router-dom';
import { Container, PageHeader, Card, Badge } from '../components/ui';
import { useApp } from '../context/AppContext';
import { works } from '../data/store';

function LegalContent({ title, sections }: { title: string; sections: { heading: string; content: string }[] }) {
  return (
    <div>
      <PageHeader title={title} />
      <Container size="narrow" className="pb-16">
        <div className="prose-sage text-base">
          <p className="text-sm text-ink-muted mb-8">
            <em>Last updated: March 2025. This document is provided for informational purposes and does not constitute legal advice. Consult a qualified legal professional for specific guidance.</em>
          </p>
          {sections.map((section, i) => (
            <div key={i} className="mb-8">
              <h2 className="font-display text-xl font-semibold text-ink mb-3">{section.heading}</h2>
              {section.content.split('\n\n').map((p, j) => (
                <p key={j} className="text-ink-light leading-relaxed mb-3">{p}</p>
              ))}
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
}

export function Terms() {
  return (
    <LegalContent title="Terms of Service" sections={[
      { heading: '1. Acceptance of Terms', content: 'By accessing or using Sage\'s Archive ("the Platform"), you agree to be bound by these Terms of Service. If you do not agree to these terms, do not use the Platform.\n\nThese terms govern your use of all features including publishing, reading, purchasing, community participation, and event attendance.' },
      { heading: '2. Eligibility', content: 'You must be at least 16 years of age to create an account. Users under 18 must have parental or guardian consent. We do not knowingly collect information from children under 13 without verifiable parental consent as required by applicable law.' },
      { heading: '3. Account Responsibilities', content: 'You are responsible for maintaining the security of your account credentials. You must not share your account or allow unauthorized access. You must provide accurate registration information and keep it updated.\n\nWe reserve the right to suspend or terminate accounts that violate these terms or applicable law.' },
      { heading: '4. Content Ownership & License', content: 'You retain ownership of all content you publish on the Platform. By publishing, you grant Sage\'s Archive a non-exclusive, worldwide license to host, store, display, distribute, and create technical derivatives of your content solely for the purpose of operating the Platform.\n\nThis license terminates when you remove your content or delete your account, subject to reasonable retention for backup and legal purposes.' },
      { heading: '5. Content Standards', content: 'You represent that you have the right to publish all content you submit. Content must not violate applicable law, infringe third-party rights, or contain malicious code.\n\nProhibited content includes but is not limited to: content that promotes violence or hatred, child exploitation material, content that violates privacy rights, spam, and content designed to manipulate platform systems.' },
      { heading: '6. Commerce & Payments', content: 'Purchases are processed through our payment providers. All prices are displayed in the applicable currency. Digital products are delivered upon successful payment verification.\n\nRefunds are governed by our Refund Policy. We do not store payment card details. All transactions are subject to fraud review.' },
      { heading: '7. Termination', content: 'You may delete your account at any time through account settings. We may suspend or terminate accounts for violations of these terms, extended inactivity, or legal requirements.\n\nUpon termination, your license to use the Platform ceases. Content ownership provisions survive termination.' },
      { heading: '8. Dispute Resolution', content: 'These terms are governed by the laws of the Federal Republic of Nigeria. Disputes shall first be addressed through good-faith negotiation, then mediation, before any legal proceedings.\n\nThis section does not limit your rights under applicable consumer protection law.' },
      { heading: '9. Changes to Terms', content: 'We may update these terms from time to time. Material changes will be communicated via email or platform notification at least 30 days before taking effect. Continued use after the effective date constitutes acceptance.' },
    ]} />
  );
}

export function Privacy() {
  return (
    <LegalContent title="Privacy Policy" sections={[
      { heading: '1. Information We Collect', content: 'We collect information you provide directly (account details, content you publish, communications) and information collected automatically (usage data, device information, cookies).\n\nWe do not collect more information than necessary for the purposes described in this policy. We apply data minimization principles throughout our systems.' },
      { heading: '2. How We Use Your Information', content: 'We use your information to: provide and improve the Platform, process transactions, send notifications you\'ve opted into, ensure security, comply with legal obligations, and communicate important updates.\n\nWe do not sell your personal information to third parties. We do not use your content for training AI models without explicit consent.' },
      { heading: '3. Data Sharing', content: 'We share information only with: service providers who process data on our behalf (payment processors, hosting providers), when required by law, to protect safety or rights, and with your explicit consent.\n\nAll service providers are contractually bound to protect your data and use it only for specified purposes.' },
      { heading: '4. Data Retention', content: 'We retain account data for as long as your account is active. Published content may be retained in backups for up to 90 days after deletion. Transaction records are retained as required by applicable financial regulations.\n\nYou may request deletion of your data through account settings or by contacting us.' },
      { heading: '5. Your Rights', content: 'Depending on your jurisdiction, you may have rights to: access your data, correct inaccurate data, delete your data, export your data, restrict processing, and object to processing.\n\nTo exercise these rights, use the tools in your account settings or contact us at privacy@sagesarchive.com. We will respond within 30 days.' },
      { heading: '6. Cookies & Tracking', content: 'We use essential cookies for authentication and security. We use analytics cookies only with your consent. You can manage cookie preferences through your browser settings and our cookie controls.\n\nWe do not use third-party advertising trackers. Any analytics we use is privacy-conscious and aggregated.' },
      { heading: '7. Security', content: 'We implement industry-standard security measures including encryption in transit and at rest, access controls, regular security audits, and incident response procedures.\n\nNo system is completely secure. We cannot guarantee absolute security but are committed to protecting your data and responding promptly to any incidents.' },
      { heading: '8. International Transfers', content: 'Your data may be processed in countries outside your residence. When we transfer data internationally, we ensure appropriate safeguards are in place including standard contractual clauses where required.' },
      { heading: '9. Contact', content: 'For privacy inquiries or to exercise your rights, contact our Data Protection team at privacy@sagesarchive.com.\n\nFor the Nigerian Data Protection Commission: NDPC, Plot 191, Aguda Shopping Complex, Lagos, Nigeria.' },
    ]} />
  );
}

export function Guidelines() {
  return (
    <LegalContent title="Community Guidelines" sections={[
      { heading: 'Our Principles', content: 'Sage\'s Archive exists to serve literature and creative expression. These guidelines ensure our community remains a space where diverse voices can share, discover, and discuss creative work with mutual respect.' },
      { heading: 'Respect & Dignity', content: 'Treat all community members with dignity. Critique work, not people. Disagreement is welcome; harassment, discrimination, and personal attacks are not.\n\nWe welcome diverse perspectives and experiences. Content that demeans people based on race, ethnicity, gender, sexuality, religion, disability, or nationality will be removed.' },
      { heading: 'Creative Freedom & Responsibility', content: 'We support creative freedom including difficult, challenging, and uncomfortable art. However, creative freedom does not extend to content that causes real harm — including content that promotes violence, exploits minors, or violates others\' rights.\n\nWhen in doubt, use content warnings to help readers make informed choices.' },
      { heading: 'Content Warnings', content: 'Use content warnings for material that may be distressing including: graphic violence, sexual content, self-harm, hate speech (in context), and other sensitive themes.\n\nContent warnings should be specific and honest. They help readers engage with challenging material on their own terms.' },
      { heading: 'Copyright & Originality', content: 'Only publish work you have the right to share. Do not plagiarize or reproduce others\' work without permission.\n\nFan fiction and transformative works are welcome when they respect the spirit of fair use and clearly acknowledge source material.' },
      { heading: 'Comments & Discussion', content: 'Engage thoughtfully. Add to the conversation. Do not spam, troll, or attempt to manipulate discussions.\n\nReports of harassment or abuse are taken seriously. Repeat offenders will be suspended or removed.' },
      { heading: 'Reporting', content: 'If you encounter content or behavior that violates these guidelines, use the report function. Reports are reviewed by our moderation team.\n\nFalse reports made in bad faith may result in account action.' },
      { heading: 'Enforcement', content: 'Violations may result in: content removal, temporary suspension, permanent removal, or referral to law enforcement where appropriate.\n\nEnforcement decisions can be appealed. We aim for transparency and consistency in moderation.' },
    ]} />
  );
}

export function Copyright() {
  return (
    <LegalContent title="Copyright & Takedown Policy" sections={[
      { heading: 'Respect for Copyright', content: 'Sage\'s Archive respects the intellectual property rights of others and expects our users to do the same. We respond to clear notices of alleged copyright infringement.' },
      { heading: 'Creator Rights', content: 'Creators retain full ownership of their original works published on the Platform. By publishing, you grant us only the limited license necessary to operate the Platform (hosting, display, distribution through requested features).\n\nYou represent that you have the right to publish all content you submit and that it does not infringe third-party rights.' },
      { heading: 'Filing a Takedown Notice', content: 'If you believe content on the Platform infringes your copyright, submit a notice including: your contact information, identification of the copyrighted work, identification of the allegedly infringing content with sufficient detail to locate it, a statement of good faith belief, and a statement under penalty of perjury that you are authorized to act.\n\nSend notices to: copyright@sagesarchive.com' },
      { heading: 'Counter-Notice', content: 'If you believe your content was removed by mistake or misidentification, you may file a counter-notice including: your contact information, identification of the removed content, a statement under penalty of perjury that removal was mistaken, and consent to jurisdiction.\n\nWe will restore content within 10-14 business days of receiving a valid counter-notice unless the original complainant files a court action.' },
      { heading: 'Repeat Infringers', content: 'Accounts that are the subject of repeated valid copyright complaints will be terminated. We maintain records of complaints for this purpose.' },
      { heading: 'Good Faith', content: 'We may consider the good faith of takedown notices. Knowingly false claims of infringement may result in liability for damages including legal costs.' },
    ]} />
  );
}

export function AccessibilityStatement() {
  return (
    <LegalContent title="Accessibility Statement" sections={[
      { heading: 'Our Commitment', content: 'Sage\'s Archive is committed to ensuring digital accessibility for people of all abilities. We strive to meet WCAG 2.2 Level AA standards and continuously improve the accessibility of our platform.' },
      { heading: 'Standards', content: 'We aim to conform to the Web Content Accessibility Guidelines (WCAG) 2.2 at Level AA. These guidelines explain how to make web content more accessible to people with a wide range of disabilities.' },
      { heading: 'Features', content: 'Our platform includes: keyboard navigation support, screen reader compatibility, sufficient color contrast, resizable text, clear focus indicators, skip navigation links, ARIA labels and landmarks, reduced motion support, and responsive design for all screen sizes.' },
      { heading: 'Reading Experience', content: 'The reading experience supports: adjustable font size, comfortable reading widths, high contrast options, and print-friendly formatting. Poetry and literary formatting is preserved across all display modes.' },
      { heading: 'Known Limitations', content: 'We are aware of certain areas where accessibility can be improved and are actively working on them. Some third-party integrations may have accessibility limitations beyond our control.' },
      { heading: 'Feedback', content: 'We welcome your feedback on the accessibility of Sage\'s Archive. If you encounter an accessibility barrier, please contact us at accessibility@sagesarchive.com. We take all reports seriously and aim to respond within 5 business days.' },
    ]} />
  );
}

export function About() {
  return (
    <div>
      <PageHeader title="About Sage's Archive" subtitle="A digital literary archive and contemporary creative publishing platform" />
      <Container size="narrow" className="pb-16">
        <div className="prose-sage text-base">
          <p>Sage's Archive is a digital literary archive and contemporary creative publishing platform built for writers, poets, essayists, and readers who believe in the power of the written word.</p>
          <p>We exist because we believe that literature deserves better infrastructure. Better tools for publishing. Better systems for discovery. Better ways for readers to find and connect with the work that matters to them.</p>
          <h2 className="font-display text-xl font-semibold text-ink mt-8 mb-3">What We Are</h2>
          <p>A publishing platform where creators can publish stories, poetry, essays, and collections. A discovery engine where readers can find work across genres, voices, and traditions. A community space where literary culture can flourish.</p>
          <h2 className="font-display text-xl font-semibold text-ink mt-8 mb-3">What We Believe</h2>
          <p>We believe that writers should own their work. That readers deserve platforms free from manipulative algorithms. That literary culture is enriched by diversity of voice, form, and tradition. That technology should serve literature, not the other way around.</p>
          <h2 className="font-display text-xl font-semibold text-ink mt-8 mb-3">Our Approach</h2>
          <p>We build with care. Every feature is designed with the question: does this serve the literature and the people who create and read it? We prioritize accessibility, privacy, and creative freedom. We resist the impulse to optimize for engagement at the cost of depth.</p>
          <h2 className="font-display text-xl font-semibold text-ink mt-8 mb-3">Contact</h2>
          <p>For general inquiries: hello@sagesarchive.com</p>
          <p>For support: support@sagesarchive.com</p>
          <p>For press: press@sagesarchive.com</p>
        </div>
      </Container>
    </div>
  );
}

export function Contact() {
  return (
    <div>
      <PageHeader title="Contact & Support" subtitle="We're here to help" />
      <Container size="narrow" className="pb-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h2 className="font-display text-2xl font-semibold text-ink mb-4">Get in Touch</h2>
            <div className="space-y-4">
              <div className="p-4 border border-border-light rounded-lg">
                <h3 className="font-medium text-ink">General Inquiries</h3>
                <p className="text-sm text-oxblood mt-1">hello@sagesarchive.com</p>
              </div>
              <div className="p-4 border border-border-light rounded-lg">
                <h3 className="font-medium text-ink">Technical Support</h3>
                <p className="text-sm text-oxblood mt-1">support@sagesarchive.com</p>
              </div>
              <div className="p-4 border border-border-light rounded-lg">
                <h3 className="font-medium text-ink">Copyright & Legal</h3>
                <p className="text-sm text-oxblood mt-1">copyright@sagesarchive.com</p>
              </div>
              <div className="p-4 border border-border-light rounded-lg">
                <h3 className="font-medium text-ink">Privacy</h3>
                <p className="text-sm text-oxblood mt-1">privacy@sagesarchive.com</p>
              </div>
            </div>
          </div>
          <div>
            <h2 className="font-display text-2xl font-semibold text-ink mb-4">Send a Message</h2>
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-ink-light mb-1">Name</label>
                <input type="text" className="w-full px-3 py-2 border border-border rounded bg-surface text-ink outline-none focus:border-oxblood" placeholder="Your name" />
              </div>
              <div>
                <label className="block text-sm font-medium text-ink-light mb-1">Email</label>
                <input type="email" className="w-full px-3 py-2 border border-border rounded bg-surface text-ink outline-none focus:border-oxblood" placeholder="you@example.com" />
              </div>
              <div>
                <label className="block text-sm font-medium text-ink-light mb-1">Subject</label>
                <select className="w-full px-3 py-2 border border-border rounded bg-surface text-ink outline-none focus:border-oxblood">
                  <option>General inquiry</option>
                  <option>Technical support</option>
                  <option>Copyright concern</option>
                  <option>Partnership</option>
                  <option>Other</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-ink-light mb-1">Message</label>
                <textarea className="w-full px-3 py-2 border border-border rounded bg-surface text-ink outline-none focus:border-oxblood min-h-[120px] resize-y" placeholder="How can we help?" />
              </div>
              <button type="submit" className="px-6 py-2.5 bg-oxblood text-white font-medium rounded-lg hover:bg-oxblood-dark transition-colors">
                Send Message
              </button>
            </form>
          </div>
        </div>
      </Container>
    </div>
  );
}

export function Library() {
  const { bookmarks, isAuthenticated } = useApp();

  if (!isAuthenticated) {
    return (
      <Container className="py-20 text-center">
        <h1 className="font-display text-3xl font-semibold text-ink mb-4">Your Library</h1>
        <p className="text-ink-muted mb-6">Sign in to access your reading library.</p>
        <Link to="/login" className="px-6 py-2.5 bg-oxblood text-white font-medium rounded-lg hover:bg-oxblood-dark transition-colors inline-block">Sign In</Link>
      </Container>
    );
  }

  const savedWorks = works.filter((w) => bookmarks.includes(w.id));

  return (
    <div>
      <PageHeader title="Your Library" subtitle="Your bookmarked works and reading list" breadcrumb={[{ label: 'Home', to: '/' }, { label: 'Library' }]} />
      <Container>
        {savedWorks.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {savedWorks.map((work) => (
              <Link key={work.id} to={`/works/${work.slug}`} className="block group">
                <Card className="p-6 hover:border-border transition-all">
                  <Badge variant="primary" className="mb-2">{work.type}</Badge>
                  <h3 className="font-display text-lg font-semibold text-ink group-hover:text-oxblood transition-colors">{work.title}</h3>
                  <p className="text-sm text-ink-muted mt-1">by {work.author.displayName}</p>
                  <p className="text-sm text-ink-light mt-2 line-clamp-2">{work.excerpt}</p>
                </Card>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <p className="text-ink-muted mb-4">Your library is empty. Bookmark works while reading to save them here.</p>
            <Link to="/discover" className="text-oxblood hover:text-oxblood-dark font-medium">Explore the archive →</Link>
          </div>
        )}
      </Container>
    </div>
  );
}
