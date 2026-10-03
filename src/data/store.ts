// Sage's Archive — Data Layer
// This module provides the mock data store simulating the backend API

export type WorkType = 'story' | 'poem' | 'article' | 'collection' | 'series';
export type WorkStatus = 'draft' | 'pending_review' | 'scheduled' | 'published' | 'unpublished' | 'archived' | 'rejected';
export type Visibility = 'public' | 'unlisted' | 'private';
export type ContentRating = 'general' | 'teen' | 'mature';

export interface Author {
  id: string;
  username: string;
  displayName: string;
  bio: string;
  avatar: string;
  website?: string;
  telegramLink?: string;
  whatsappChannel?: string;
  socialLinks: { platform: string; url: string }[];
  followersCount: number;
  worksCount: number;
  verified: boolean;
  joinedAt: string;
}

export interface Work {
  id: string;
  title: string;
  subtitle?: string;
  slug: string;
  type: WorkType;
  authorId: string;
  author: Author;
  excerpt: string;
  body: string;
  coverImage?: string;
  genres: string[];
  tags: string[];
  contentWarnings: string[];
  contentRating: ContentRating;
  status: WorkStatus;
  visibility: Visibility;
  publishedAt?: string;
  readingTime: number;
  wordCount: number;
  viewsCount: number;
  reactionsCount: number;
  bookmarksCount: number;
  commentsCount: number;
  seriesId?: string;
  collectionId?: string;
  featured: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Series {
  id: string;
  title: string;
  slug: string;
  description: string;
  authorId: string;
  author: Author;
  coverImage?: string;
  workCount: number;
  genres: string[];
  createdAt: string;
}

export interface Collection {
  id: string;
  title: string;
  slug: string;
  description: string;
  curatorId: string;
  curator: Author;
  coverImage?: string;
  workCount: number;
  workIds: string[];
  createdAt: string;
}

export interface Community {
  id: string;
  name: string;
  slug: string;
  description: string;
  logo?: string;
  banner?: string;
  memberCount: number;
  representatives: Author[];
  verified: boolean;
  externalLinks: { label: string; url: string }[];
  createdAt: string;
}

export interface Event {
  id: string;
  title: string;
  slug: string;
  description: string;
  organizerId: string;
  organizer: Author;
  communityId?: string;
  poster?: string;
  venue?: string;
  onlineUrl?: string;
  startAt: string;
  endAt: string;
  timezone: string;
  capacity?: number;
  rsvpCount: number;
  visibility: Visibility;
  createdAt: string;
}

export interface Product {
  id: string;
  title: string;
  slug: string;
  description: string;
  authorId: string;
  author: Author;
  coverImage?: string;
  price: number;
  currency: string;
  type: 'ebook' | 'poetry_collection' | 'story_collection' | 'digital_book';
  preview?: string;
  free: boolean;
  salesCount: number;
  createdAt: string;
}

export interface Comment {
  id: string;
  workId: string;
  authorId: string;
  author: Author;
  body: string;
  parentId?: string;
  createdAt: string;
  likesCount: number;
}

// --- AUTHORS ---
export const authors: Author[] = [
  {
    id: 'auth-001',
    username: 'amara-osei',
    displayName: 'Amara Osei',
    bio: 'Poet and essayist from Lagos. Her work explores memory, migration, and the architecture of belonging. Published in Granta, AGNI, and The Paris Review.',
    avatar: '',
    website: 'https://amaraosei.example.com',
    telegramLink: 'https://t.me/amaraosei',
    whatsappChannel: 'https://whatsapp.com/channel/amaraosei',
    socialLinks: [{ platform: 'twitter', url: 'https://twitter.com/amaraosei' }],
    followersCount: 2847,
    worksCount: 23,
    verified: true,
    joinedAt: '2024-01-15',
  },
  {
    id: 'auth-002',
    username: 'kenji-tanaka',
    displayName: 'Kenji Tanaka',
    bio: 'Short fiction writer and translator. His stories move between Tokyo and São Paulo, examining displacement and the quiet violence of assimilation.',
    avatar: '',
    website: '',
    telegramLink: '',
    socialLinks: [],
    followersCount: 1523,
    worksCount: 18,
    verified: true,
    joinedAt: '2024-02-20',
  },
  {
    id: 'auth-003',
    username: 'fatima-al-rashid',
    displayName: 'Fatima Al-Rashid',
    bio: 'Cultural critic and essayist. Writes about art, technology, and the politics of visibility. Author of "Screens and Shadows" (forthcoming).',
    avatar: '',
    website: 'https://fatimaalrashid.example.com',
    socialLinks: [{ platform: 'instagram', url: 'https://instagram.com/fatimaalrashid' }],
    followersCount: 3201,
    worksCount: 31,
    verified: true,
    joinedAt: '2023-11-08',
  },
  {
    id: 'auth-004',
    username: 'david-mensah',
    displayName: 'David Mensah',
    bio: 'Novelist and short story writer. His debut collection "The Weight of Water" was longlisted for the Commonwealth Writers Prize. Based in Accra.',
    avatar: '',
    telegramLink: 'https://t.me/davidmensah',
    socialLinks: [],
    followersCount: 4102,
    worksCount: 15,
    verified: true,
    joinedAt: '2024-03-01',
  },
  {
    id: 'auth-005',
    username: 'lena-volkov',
    displayName: 'Lena Volkov',
    bio: 'Poet and visual artist. Her poems have been translated into twelve languages. She lives between Berlin and Tbilisi.',
    avatar: '',
    website: 'https://lenavolkov.example.com',
    socialLinks: [{ platform: 'instagram', url: 'https://instagram.com/lenavolkov' }],
    followersCount: 1876,
    worksCount: 42,
    verified: false,
    joinedAt: '2024-04-12',
  },
  {
    id: 'auth-006',
    username: 'chioma-ndi',
    displayName: 'Chioma Ndi',
    bio: 'Writer and community organizer. Her fiction centers Black queer life in diaspora. Founder of the Moonlight Writers Collective.',
    avatar: '',
    telegramLink: 'https://t.me/chiomandi',
    whatsappChannel: 'https://whatsapp.com/channel/moonlightwriters',
    socialLinks: [],
    followersCount: 987,
    worksCount: 8,
    verified: false,
    joinedAt: '2024-06-01',
  },
];

// --- WORKS ---
export const works: Work[] = [
  {
    id: 'work-001',
    title: 'The Cartography of Return',
    subtitle: 'A poem cycle',
    slug: 'the-cartography-of-return',
    type: 'poem',
    authorId: 'auth-001',
    author: authors[0],
    excerpt: 'We mapped the distance between here and there in the spaces between syllables, in the pause before a name is spoken...',
    body: `I.

We mapped the distance between here and there
in the spaces between syllables,
in the pause before a name is spoken
and the breath that follows.

The cartographer drew coastlines
from memory — each inlet a grandmother's saying,
each peninsula a year spent learning
which words survive translation.

II.

There is a country made of returns:
the way light returns to a room
after the curtains are drawn,
the way a river returns to its bed
after the rains.

But we do not return the way rivers do.
We return carrying everything —
the accent that thickens in winter,
the recipe rewritten in new measurements,
the lullaby hummed in a key
that no longer exists.

III.

My mother says home is where the soil
recognizes your footsteps.
But what of those of us who walk
on concrete and carpet and airport floors?

We have become cartographers of the in-between,
mapping not places but passages —
the threshold between languages,
the doorway between versions of ourselves,
the long corridor between
the person who left
and the person who arrives.

IV.

I am learning that return is not a line
but a spiral.
Each revolution brings us closer
to a center we cannot quite reach,
a place that exists
only in the turning.

So I draw my maps in margins,
in the white space between stanzas,
in the breath between
here
and
there.`,
    genres: ['Poetry', 'Diaspora', 'Identity'],
    tags: ['migration', 'memory', 'belonging', 'home', 'language'],
    contentWarnings: [],
    contentRating: 'general',
    status: 'published',
    visibility: 'public',
    publishedAt: '2025-01-15',
    readingTime: 4,
    wordCount: 312,
    viewsCount: 4521,
    reactionsCount: 287,
    bookmarksCount: 156,
    commentsCount: 23,
    featured: true,
    createdAt: '2025-01-10',
    updatedAt: '2025-01-15',
  },
  {
    id: 'work-002',
    title: 'The Last Train to Shibuya',
    slug: 'the-last-train-to-shibuya',
    type: 'story',
    authorId: 'auth-002',
    author: authors[1],
    excerpt: 'The platform was empty except for a salaryman sleeping against a pillar and a woman who kept checking her phone as if expecting a message that would change everything...',
    body: `The platform was empty except for a salaryman sleeping against a pillar and a woman who kept checking her phone as if expecting a message that would change everything.

Hiro checked his watch. 11:47 PM. The last train would arrive in three minutes, and then the station would close, and then he would have to walk the twenty-two minutes home through streets that smelled of rain and closed restaurants.

He had lived in São Paulo for seven years now. Seven years of Portuguese verbs and feijoada Sundays and the particular way light falls through tropical rain. But tonight, standing on this platform in Tokyo, he felt the old gravity — the pull of a city that had shaped him before he knew what shaping meant.

"You're going the wrong way," the woman said. She hadn't looked up from her phone.

"The train goes to Shibuya. I live in Shibuya."

"Not anymore, you don't." She finally looked at him. Her eyes were tired but precise. "You have the look of someone who left. The city can tell."

The salaryman snorted awake, adjusted his tie as if the gesture mattered at midnight, and stumbled toward the exit. Hiro watched him go — another ghost returning from the office to the apartment that waited like a question.

The train arrived without sound, sliding into the station like a thought completing itself. The doors opened. The woman stepped on.

Hiro did not move.

"Are you coming?" she asked.

"I don't know," he said. And meant it in a way that had nothing to do with trains.

She nodded as if she understood — as if the not-knowing was itself a kind of destination. The doors closed. The train departed. And Hiro stood on the empty platform, listening to the silence that follows departure, which is not the same as the silence that precedes arrival, though they sound identical to those who have forgotten the difference.

He walked home. Twenty-two minutes through streets that smelled of rain and closed restaurants. But tonight, for the first time in seven years, the walk felt like a homecoming.

Not because anything had changed. But because he had finally stopped expecting it to.`,
    genres: ['Fiction', 'Literary', 'Diaspora'],
    tags: ['tokyo', 'identity', 'belonging', 'return', 'urban'],
    contentWarnings: [],
    contentRating: 'general',
    status: 'published',
    visibility: 'public',
    publishedAt: '2025-02-03',
    readingTime: 5,
    wordCount: 428,
    viewsCount: 6234,
    reactionsCount: 412,
    bookmarksCount: 289,
    commentsCount: 45,
    featured: true,
    createdAt: '2025-01-28',
    updatedAt: '2025-02-03',
  },
  {
    id: 'work-003',
    title: 'On Digital Monuments',
    subtitle: 'What we preserve and what we lose',
    slug: 'on-digital-monuments',
    type: 'article',
    authorId: 'auth-003',
    author: authors[2],
    excerpt: 'Every archive is an argument about what matters. When we digitize a culture, we don\'t merely copy it — we make decisions about which parts deserve immortality...',
    body: `Every archive is an argument about what matters. When we digitize a culture, we don't merely copy it — we make decisions about which parts deserve immortality.

Consider the Great Zimbabwe ruins. For decades, colonial archaeologists refused to believe that Africans had built them. The ruins were attributed to Phoenicians, to Arabs, to anyone but the people who actually lived there. When we digitize such sites — when we create 3D models and virtual tours — do we correct the record, or do we merely create more sophisticated platforms for the old erasures?

I ask this not as a rhetorical gesture but as a practical concern. I work in digital preservation. I build archives. And I have come to believe that the technical question — how do we preserve this? — is always secondary to the political question — what are we choosing to remember, and what are we choosing to forget?

**The Bias of the Medium**

Every medium carries its own biases. Photography privileges the visual. Audio privileges the audible. Text privileges the literate. When we choose a format, we choose what can be expressed — and what will be lost in translation.

Oral traditions are a case in point. How do you archive a story that exists only in performance? The words on a page are not the story. The story lives in the pauses, in the audience's laughter, in the way the teller's voice changes when they reach the part about the trickster. Digitize the words and you have preserved the skeleton while losing the breath.

**Platforms as Gatekeepers**

The platforms we use to store digital culture are not neutral. They have terms of service, content policies, algorithmic biases. A poem posted on a social media platform exists at the pleasure of that platform's moderation policies. An archive hosted on a corporate cloud exists at the pleasure of that corporation's business decisions.

This is not paranoia. We have already seen platforms disappear — taking with them the communities, conversations, and creative works that lived there. We have seen cloud providers raise prices until the archives they host become unsustainable. We have seen formats become obsolete, leaving files that no software can read.

**Toward Resilient Archives**

What would a truly resilient digital archive look like? It would be:

- Distributed, so no single point of failure can destroy it
- Format-agnostic, so it survives technological change
- Community-governed, so decisions about preservation reflect the communities whose culture is being preserved
- Transparent, so the choices about what to include and exclude are visible and contestable

These are not just technical requirements. They are political commitments.

**The Question We Cannot Avoid**

Here is what I keep returning to: who decides what is worth preserving?

In the physical world, this question was answered (imperfectly, problematically) by institutions — libraries, museums, universities. In the digital world, the answer is increasingly being provided by corporations and algorithms.

I don't believe this is an improvement.

The work of digital preservation is not merely technical. It is cultural, political, and deeply human. It requires us to ask not just "can we save this?" but "should we save this?" and "who gets to decide?"

These are the questions I carry into every archive I build. They do not have clean answers. But they are the questions that separate preservation from mere storage — and memory from mere data.`,
    genres: ['Essay', 'Culture', 'Technology'],
    tags: ['digital preservation', 'archives', 'culture', 'technology', 'memory'],
    contentWarnings: [],
    contentRating: 'general',
    status: 'published',
    visibility: 'public',
    publishedAt: '2025-02-18',
    readingTime: 8,
    wordCount: 612,
    viewsCount: 3876,
    reactionsCount: 198,
    bookmarksCount: 234,
    commentsCount: 31,
    featured: true,
    createdAt: '2025-02-15',
    updatedAt: '2025-02-18',
  },
  {
    id: 'work-004',
    title: 'The Weight of Water',
    subtitle: 'Stories from the coast',
    slug: 'the-weight-of-water',
    type: 'story',
    authorId: 'auth-004',
    author: authors[3],
    excerpt: 'The fishermen said the sea had changed. Not in the way seas change with seasons and tides, but in a deeper way — as if the water itself had developed a memory...',
    body: `The fishermen said the sea had changed. Not in the way seas change with seasons and tides, but in a deeper way — as if the water itself had developed a memory, and was now refusing to forget.

Kofi's grandfather had been a fisherman. His father had been a fisherman. He himself had fished these waters since he was twelve, when his father placed a net in his hands and said: "The sea provides. But you must know how to ask."

Now, at forty-three, Kofi stood on the same beach where he had learned to read the water, and the water read differently. The fish had moved deeper, or further north, or perhaps had simply decided that this stretch of coast was no longer worth the risk of the net.

"They remember," old Mensah said, mending a net that caught nothing. "The fish remember what we did to the water. The chemicals from the factories. The oil from the ships. They remember, and they have gone to places where the water is still innocent."

Kofi did not believe the fish remembered. But he believed something had changed. The catches were smaller. The prices were higher. The young men were leaving for the cities, for mines, for anywhere that promised a wage that didn't depend on the mood of the ocean.

His daughter, Ama, was twelve now. The same age he had been when his father placed the net in his hands. But when he tried to teach her, she looked at the water with an expression he couldn't name — not fear exactly, but a kind of recognition. As if she could see what the water had become, and was already mourning it.

" Papa," she said one evening, watching him repair nets that would catch nothing, "what if the sea doesn't want us to fish anymore?"

"Then what?" he asked.

"Then maybe we should listen."

He wanted to argue. He wanted to say that the sea had always provided, that his father's father's father had fished these waters, that to stop would be to abandon everything they were. But he looked at his daughter's face — that expression that was not fear but recognition — and he understood something he had been refusing to understand.

The sea was not punishing them. The sea was telling them the truth.

That night, Kofi sat on the beach and listened to the waves. Not for the patterns that would tell him where to cast his net, but for something else — some message he had been too busy surviving to hear.

The waves said nothing he could translate into words. But they said something. And for the first time in his life, Kofi was willing to listen without demanding an answer.

Ama found him there at dawn, still sitting, still listening. She sat beside him. They watched the sun rise over a sea that was changing, that had already changed, that would never again be the sea his grandfather had known.

"What did it say?" she asked.

"I don't know," he said. "But I think it's still talking. I think we just need to learn a new language."

She took his hand. And together they watched the water — no longer fishermen and the sea, but something else. Something that was still being named.`,
    genres: ['Fiction', 'Literary', 'Environmental'],
    tags: ['ocean', 'climate', 'family', 'tradition', 'change'],
    contentWarnings: [],
    contentRating: 'general',
    status: 'published',
    visibility: 'public',
    publishedAt: '2025-03-01',
    readingTime: 6,
    wordCount: 567,
    viewsCount: 5432,
    reactionsCount: 356,
    bookmarksCount: 201,
    commentsCount: 38,
    featured: false,
    createdAt: '2025-02-25',
    updatedAt: '2025-03-01',
  },
  {
    id: 'work-005',
    title: 'Letters to No One',
    slug: 'letters-to-no-one',
    type: 'poem',
    authorId: 'auth-005',
    author: authors[4],
    excerpt: 'I write these letters to no one — to the space where a reader might be, to the silence that follows a question no one asked...',
    body: `I.

I write these letters to no one —
to the space where a reader might be,
to the silence that follows a question
no one asked.

Dear absence,
the window is open.
The city hums its particular frequency —
not music, not noise, but the sound
of ten million lives happening
simultaneously and separately.

II.

Dear distance,
I have learned your language.
It is the language of airports,
of goodbyes that are really hellos
wearing different clothes,
of photographs that age
more gracefully than the people in them.

III.

Dear language,
you have failed me again.
I tried to describe the color of light
at 4 PM in Tbilisi in November —
that particular amber,
that particular tenderness —
and all I could produce was
the word "beautiful,"
which means nothing
and everything
and is therefore
the worst word
for the job.

IV.

Dear reader,
if you are reading this,
you are the no one
I have been writing to.
You are the silence
that gives these words
their shape.

Thank you
for being
the space
I needed.`,
    genres: ['Poetry', 'Epistolary', 'Language'],
    tags: ['letters', 'absence', 'language', 'connection', 'solitude'],
    contentWarnings: [],
    contentRating: 'general',
    status: 'published',
    visibility: 'public',
    publishedAt: '2025-03-10',
    readingTime: 3,
    wordCount: 215,
    viewsCount: 2987,
    reactionsCount: 234,
    bookmarksCount: 178,
    commentsCount: 19,
    featured: true,
    createdAt: '2025-03-08',
    updatedAt: '2025-03-10',
  },
  {
    id: 'work-006',
    title: 'Moonlight and Other Frequencies',
    subtitle: 'A collection',
    slug: 'moonlight-and-other-frequencies',
    type: 'poem',
    authorId: 'auth-006',
    author: authors[5],
    excerpt: 'we gather at the frequency of moonlight — not the light itself but the way it rearranges everything it touches, making the familiar strange enough to love again...',
    body: `we gather at the frequency of moonlight —
not the light itself
but the way it rearranges
everything it touches,
making the familiar
strange enough
to love again.

sister,
you asked me what i meant
by "safe space"
and i meant this:
a room where your laughter
doesn't have to apologize
for its volume.

a page where your grief
doesn't have to be productive.

a night where the moon
belongs to no one
and therefore
to all of us
who needed it
at exactly this angle.

we are not asking for much.
just this:
to be held
by the frequency
of our own becoming.

to write ourselves
into existence
without permission.

to love
loudly
in a world
that asked us
to whisper.

this is what moonlight means
when it's not trying
to be poetry:

*stay.*
*you are needed here.*
*the page is warm.*
*come closer.*`,
    genres: ['Poetry', 'Queer', 'Community'],
    tags: ['moonlight', 'community', 'safety', 'belonging', 'queer'],
    contentWarnings: [],
    contentRating: 'general',
    status: 'published',
    visibility: 'public',
    publishedAt: '2025-03-15',
    readingTime: 2,
    wordCount: 178,
    viewsCount: 1876,
    reactionsCount: 189,
    bookmarksCount: 134,
    commentsCount: 12,
    featured: false,
    createdAt: '2025-03-14',
    updatedAt: '2025-03-15',
  },
  {
    id: 'work-007',
    title: 'The Architecture of Solitude',
    slug: 'the-architecture-of-solitude',
    type: 'story',
    authorId: 'auth-001',
    author: authors[0],
    excerpt: 'She had designed the house herself — not because she wanted to live in it, but because she wanted to understand what it means to build a space that holds exactly one person...',
    body: `She had designed the house herself — not because she wanted to live in it, but because she wanted to understand what it means to build a space that holds exactly one person.

The architect had asked: "How many bedrooms?"
"One."
"Bathrooms?"
"One."
"Living space?"
"Enough for one chair, one table, one window."

He had looked at her as if she were speaking a language he almost understood. "You're describing a cell."

"No," she said. "A cell is designed to keep someone in. I'm designing a space that lets someone be."

The house took fourteen months to build. She visited the construction site every week, watching walls rise where she had drawn lines, watching rooms become real in the way that drawings never quite manage. Each room was a sentence in an argument she was having with herself about the nature of aloneness.

The kitchen was small — efficient. One burner, one sink, one shelf for the single plate and single cup she would use. She had thought carefully about this. Not deprivation but precision. The way a poet chooses the exact word, not because other words are bad, but because this word is right.

The study faced east. Morning light. A desk positioned so that when she looked up from her work, she would see the garden — if she ever planted one. The window was tall enough to stand at. She had measured her own height and added six inches, because she wanted to be able to stretch.

The bedroom was simple. A bed. A window that opened to the sky. No mirror — she had decided this early. Not from any philosophical position about vanity, but because she wanted to encounter herself only in the moments when she wasn't looking. In the way she moved through a room. In the sound of her breathing. In the particular rhythm of her life when no one was watching.

When the house was finished, she did not move in immediately. She waited three weeks. She wanted the house to settle, to become itself, to lose the newness that would make it feel like a performance of solitude rather than solitude itself.

She moved in on a Tuesday. She cooked a simple meal in the efficient kitchen. She sat in the single chair. She looked through the tall window at the garden she had not yet planted.

And she understood, finally, what she had been trying to build.

Not a monument to being alone. Not a rejection of company. Not an argument about independence or self-sufficiency or any of the grand narratives people construct around solitude.

Just this: a space where she could hear her own thoughts without interference. Where the silence was not empty but full — full of the particular frequency of a life lived at its own pace, in its own time, without apology.

She picked up her pen. She began to write.

The house held her gently, the way good architecture holds its inhabitants — not tightly, not possessively, but with the quiet competence of walls that know exactly what they are for.`,
    genres: ['Fiction', 'Literary', 'Architecture'],
    tags: ['solitude', 'architecture', 'self', 'space', 'design'],
    contentWarnings: [],
    contentRating: 'general',
    status: 'published',
    visibility: 'public',
    publishedAt: '2025-03-20',
    readingTime: 5,
    wordCount: 534,
    viewsCount: 3210,
    reactionsCount: 267,
    bookmarksCount: 189,
    commentsCount: 27,
    featured: true,
    createdAt: '2025-03-18',
    updatedAt: '2025-03-20',
  },
  {
    id: 'work-008',
    title: 'Algorithms of Belonging',
    subtitle: 'How platforms shape identity',
    slug: 'algorithms-of-belonging',
    type: 'article',
    authorId: 'auth-003',
    author: authors[2],
    excerpt: 'When a recommendation algorithm suggests you might enjoy content from people "like you," it is making an argument about who you are — and, more importantly, who you might become...',
    body: `When a recommendation algorithm suggests you might enjoy content from people "like you," it is making an argument about who you are — and, more importantly, who you might become.

This is not a neutral act. Every algorithmic suggestion is a small act of identity construction. The algorithm says: you are this kind of person. You like these things. You belong with these other people. And in saying so, it shapes the very identity it claims merely to observe.

**The Feedback Loop**

Consider what happens when a young writer publishes their first poem on a platform with recommendation algorithms. The algorithm analyzes the poem, identifies its themes, and suggests it to readers who have engaged with similar content. So far, so good.

But then the algorithm notices which of the writer's subsequent poems receive the most engagement, and begins to surface those more prominently. The writer, consciously or not, begins to write more poems in the style that the algorithm favors. The readers who engage with those poems generate more data, which further refines the algorithm's model.

Within a year, the writer has not simply found their audience. They have been shaped by the algorithm into someone who produces what the algorithm can most easily categorize and distribute.

This is not necessarily bad. But it is not neutral. And it is certainly not the same as the organic process of artistic development — the slow, strange, often inefficient journey toward a voice that is genuinely your own.

**The Cost of Optimization**

What do we lose when we optimize for engagement? We lose the work that doesn't fit neatly into categories. We lose the poem that is half-prayer, half-argument, half-something-else-entirely. We lose the story that refuses to resolve, the essay that asks questions without providing answers, the art that makes people uncomfortable in ways that algorithms cannot quantify.

We lose, in other words, the work that matters most.

**Toward Humane Algorithms**

I am not arguing against algorithms. I am arguing against algorithms that pretend to be neutral while performing acts of identity construction. I am arguing for algorithms that are transparent about their values, that can be questioned and contested, that serve human flourishing rather than merely maximizing engagement.

What would a humane recommendation algorithm look like? It would:

- Prioritize discovery over comfort — suggesting work that challenges as well as work that confirms
- Make its logic visible and contestable
- Resist the feedback loop that narrows artistic expression
- Value depth of engagement over breadth of reach
- Serve the long-term development of both creators and audiences

These are not technical requirements alone. They are ethical commitments. And they require us to think carefully about what we want our digital platforms to be — not just what we want them to do.

The question is not whether algorithms will shape our cultural landscape. They already do. The question is whether we will be conscious participants in that shaping — or whether we will allow it to happen to us, invisibly, in the name of optimization.`,
    genres: ['Essay', 'Technology', 'Culture'],
    tags: ['algorithms', 'identity', 'platforms', 'culture', 'technology'],
    contentWarnings: [],
    contentRating: 'general',
    status: 'published',
    visibility: 'public',
    publishedAt: '2025-03-25',
    readingTime: 7,
    wordCount: 523,
    viewsCount: 4120,
    reactionsCount: 287,
    bookmarksCount: 312,
    commentsCount: 42,
    featured: false,
    createdAt: '2025-03-22',
    updatedAt: '2025-03-25',
  },
];

// --- SERIES ---
export const series: Series[] = [
  {
    id: 'series-001',
    title: 'Cartographies',
    slug: 'cartographies',
    description: 'A poem cycle exploring maps, migration, and the geography of belonging.',
    authorId: 'auth-001',
    author: authors[0],
    workCount: 4,
    genres: ['Poetry', 'Diaspora'],
    createdAt: '2025-01-01',
  },
  {
    id: 'series-002',
    title: 'Coastal Frequencies',
    slug: 'coastal-frequencies',
    description: 'Stories set along the West African coast, where land meets sea and tradition meets change.',
    authorId: 'auth-004',
    author: authors[3],
    workCount: 3,
    genres: ['Fiction', 'Literary'],
    createdAt: '2025-02-01',
  },
];

// --- COLLECTIONS ---
export const collections: Collection[] = [
  {
    id: 'coll-001',
    title: "Editor's Picks: Spring 2025",
    slug: 'editors-picks-spring-2025',
    description: 'Our editors\' selection of the most compelling works published this season.',
    curatorId: 'auth-003',
    curator: authors[2],
    workCount: 5,
    workIds: ['work-001', 'work-002', 'work-003', 'work-005', 'work-007'],
    createdAt: '2025-03-01',
  },
  {
    id: 'coll-002',
    title: 'New Voices in Poetry',
    slug: 'new-voices-in-poetry',
    description: 'Emerging poets pushing the boundaries of form and voice.',
    curatorId: 'auth-005',
    curator: authors[4],
    workCount: 3,
    workIds: ['work-001', 'work-005', 'work-006'],
    createdAt: '2025-03-10',
  },
];

// --- COMMUNITIES ---
export const communities: Community[] = [
  {
    id: 'comm-001',
    name: 'Moonlight Writers Collective',
    slug: 'moonlight-writers',
    description: 'A community for Black queer writers and allies. Monthly workshops, critique circles, and celebration of voices that refuse to be silenced.',
    memberCount: 234,
    representatives: [authors[5]],
    verified: true,
    externalLinks: [
      { label: 'WhatsApp Channel', url: 'https://whatsapp.com/channel/moonlightwriters' },
      { label: 'Telegram Group', url: 'https://t.me/moonlightwriters' },
    ],
    createdAt: '2024-06-15',
  },
  {
    id: 'comm-002',
    name: 'The Coastal Review',
    slug: 'coastal-review',
    description: 'West African literary community. Stories, poetry, and criticism from the coast and its diaspora.',
    memberCount: 567,
    representatives: [authors[3], authors[0]],
    verified: true,
    externalLinks: [
      { label: 'Telegram Channel', url: 'https://t.me/coastalreview' },
    ],
    createdAt: '2024-03-01',
  },
  {
    id: 'comm-003',
    name: 'Digital Archives Lab',
    slug: 'digital-archives-lab',
    description: 'Exploring the intersection of technology, preservation, and cultural memory. For archivists, developers, writers, and anyone who cares about what we choose to remember.',
    memberCount: 189,
    representatives: [authors[2]],
    verified: false,
    externalLinks: [],
    createdAt: '2024-09-01',
  },
];

// --- EVENTS ---
export const events: Event[] = [
  {
    id: 'evt-001',
    title: 'Moonlight Reading Circle',
    slug: 'moonlight-reading-circle-may',
    description: 'Join the Moonlight Writers Collective for our monthly reading circle. This month we\'re reading and discussing works from our members\' latest publications. All welcome — bring a poem, a story, or just yourself.',
    organizerId: 'auth-006',
    organizer: authors[5],
    communityId: 'comm-001',
    venue: 'Online (Zoom link shared upon RSVP)',
    onlineUrl: 'https://zoom.example.com/moonlight',
    startAt: '2025-05-15T19:00:00',
    endAt: '2025-05-15T21:00:00',
    timezone: 'Africa/Lagos',
    capacity: 30,
    rsvpCount: 18,
    visibility: 'public',
    createdAt: '2025-04-01',
  },
  {
    id: 'evt-002',
    title: 'Poetry & The Sea: A Coastal Evening',
    slug: 'poetry-and-the-sea',
    description: 'An evening of poetry readings and conversation about the sea as metaphor, memory, and material reality. Featuring readings by Amara Osei, David Mensah, and Lena Volkov.',
    organizerId: 'auth-004',
    organizer: authors[3],
    communityId: 'comm-002',
    venue: 'The Alliance Française, Lagos',
    startAt: '2025-06-01T18:00:00',
    endAt: '2025-06-01T21:00:00',
    timezone: 'Africa/Lagos',
    capacity: 80,
    rsvpCount: 47,
    visibility: 'public',
    createdAt: '2025-04-15',
  },
  {
    id: 'evt-003',
    title: 'Digital Preservation Workshop',
    slug: 'digital-preservation-workshop',
    description: 'A hands-on workshop on preserving digital literary archives. Topics include format selection, metadata standards, community governance, and building resilient archives. Suitable for writers, archivists, and cultural workers.',
    organizerId: 'auth-003',
    organizer: authors[2],
    communityId: 'comm-003',
    onlineUrl: 'https://meet.example.com/digital-archives',
    startAt: '2025-05-22T15:00:00',
    endAt: '2025-05-22T17:30:00',
    timezone: 'UTC',
    capacity: 50,
    rsvpCount: 23,
    visibility: 'public',
    createdAt: '2025-04-20',
  },
];

// --- PRODUCTS ---
export const products: Product[] = [
  {
    id: 'prod-001',
    title: 'The Cartography of Return: Collected Poems',
    slug: 'cartography-of-return-collection',
    description: 'The complete poem cycle by Amara Osei, with three unpublished poems and an essay on the poetics of migration. Digital edition with responsive typography optimized for all devices.',
    authorId: 'auth-001',
    author: authors[0],
    price: 4500,
    currency: 'NGN',
    type: 'poetry_collection',
    free: false,
    salesCount: 89,
    createdAt: '2025-02-01',
  },
  {
    id: 'prod-002',
    title: 'Coastal Frequencies: Stories',
    slug: 'coastal-frequencies-stories',
    description: 'David Mensah\'s acclaimed story collection. Seven stories set along the West African coast, exploring tradition, change, and the voices of the sea.',
    authorId: 'auth-004',
    author: authors[3],
    price: 5000,
    currency: 'NGN',
    type: 'story_collection',
    free: false,
    salesCount: 156,
    createdAt: '2025-03-01',
  },
  {
    id: 'prod-003',
    title: 'Letters to No One: A Chapbook',
    slug: 'letters-to-no-one-chapbook',
    description: 'Lena Volkov\'s intimate chapbook of epistolary poems. A meditation on absence, language, and the spaces between us.',
    authorId: 'auth-005',
    author: authors[4],
    price: 0,
    currency: 'NGN',
    type: 'poetry_collection',
    free: true,
    salesCount: 432,
    createdAt: '2025-03-15',
  },
];

// --- GENRES ---
export const genres = [
  { name: 'Poetry', slug: 'poetry', count: 127 },
  { name: 'Fiction', slug: 'fiction', count: 89 },
  { name: 'Essay', slug: 'essay', count: 64 },
  { name: 'Literary', slug: 'literary', count: 95 },
  { name: 'Diaspora', slug: 'diaspora', count: 43 },
  { name: 'Culture', slug: 'culture', count: 56 },
  { name: 'Technology', slug: 'technology', count: 28 },
  { name: 'Environmental', slug: 'environmental', count: 19 },
  { name: 'Identity', slug: 'identity', count: 67 },
  { name: 'Queer', slug: 'queer', count: 31 },
  { name: 'Experimental', slug: 'experimental', count: 22 },
  { name: 'Memoir', slug: 'memoir', count: 38 },
];

// --- COMMENTS ---
export const comments: Comment[] = [
  {
    id: 'cmt-001',
    workId: 'work-001',
    authorId: 'auth-002',
    author: authors[1],
    body: 'The fourth section — "I am learning that return is not a line / but a spiral" — this is exactly what I\'ve been trying to articulate about my own experience. Beautiful work, Amara.',
    createdAt: '2025-01-16',
    likesCount: 24,
  },
  {
    id: 'cmt-002',
    workId: 'work-001',
    authorId: 'auth-005',
    author: authors[4],
    body: 'The way you use cartography as metaphor for the poetic act itself — mapping not places but passages — is extraordinary. This will stay with me.',
    createdAt: '2025-01-17',
    likesCount: 18,
  },
  {
    id: 'cmt-003',
    workId: 'work-002',
    authorId: 'auth-001',
    author: authors[0],
    body: 'That final paragraph — "Not because anything had changed. But because he had finally stopped expecting it to." — devastating in its precision. Kenji, this is your finest story yet.',
    createdAt: '2025-02-04',
    likesCount: 31,
  },
  {
    id: 'cmt-004',
    workId: 'work-003',
    authorId: 'auth-004',
    author: authors[3],
    body: 'Fatima, your point about oral traditions and the bias of the medium is crucial. I\'ve been struggling with exactly this in my own work — how do you preserve the breath of a story when you pin it to a page?',
    createdAt: '2025-02-19',
    likesCount: 15,
  },
];

// --- Helper functions ---
export function getWorkBySlug(slug: string): Work | undefined {
  return works.find(w => w.slug === slug);
}

export function getAuthorByUsername(username: string): Author | undefined {
  return authors.find(a => a.username === username);
}

export function getWorksByAuthor(authorId: string): Work[] {
  return works.filter(w => w.authorId === authorId);
}

export function getWorksByGenre(genre: string): Work[] {
  return works.filter(w => w.genres.some(g => g.toLowerCase() === genre.toLowerCase()));
}

export function getWorksByType(type: WorkType): Work[] {
  return works.filter(w => w.type === type);
}

export function getFeaturedWorks(): Work[] {
  return works.filter(w => w.featured);
}

export function getLatestWorks(): Work[] {
  return [...works].sort((a, b) => new Date(b.publishedAt || b.createdAt).getTime() - new Date(a.publishedAt || a.createdAt).getTime());
}

export function getCommentsByWork(workId: string): Comment[] {
  return comments.filter(c => c.workId === workId);
}

export function searchWorks(query: string): Work[] {
  const q = query.toLowerCase();
  return works.filter(w =>
    w.title.toLowerCase().includes(q) ||
    w.excerpt.toLowerCase().includes(q) ||
    w.author.displayName.toLowerCase().includes(q) ||
    w.genres.some(g => g.toLowerCase().includes(q)) ||
    w.tags.some(t => t.toLowerCase().includes(q))
  );
}

export function getSeriesBySlug(slug: string): Series | undefined {
  return series.find(s => s.slug === slug);
}

export function getCollectionBySlug(slug: string): Collection | undefined {
  return collections.find(c => c.slug === slug);
}

export function getCommunityBySlug(slug: string): Community | undefined {
  return communities.find(c => c.slug === slug);
}

export function getEventBySlug(slug: string): Event | undefined {
  return events.find(e => e.slug === slug);
}

export function getProductBySlug(slug: string): Product | undefined {
  return products.find(p => p.slug === slug);
}
