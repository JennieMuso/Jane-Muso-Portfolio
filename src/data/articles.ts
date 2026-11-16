// Content-first article records. A future Sanity adapter can map its documents
// to this shape while the list cards and article template stay unchanged.
export type ArticleSection = { id: string; heading: string; paragraphs: string[] };
export type Article = {
  slug: string;
  title: string;
  topic: string;
  excerpt: string;
  hero: string;
  heroAlt: string;
  inlineImage: string;
  inlineAlt: string;
  inlineCaption: string;
  readTime: string;
  references?: { label: string; url: string }[];
  sections: ArticleSection[];
};

export const articles: Article[] = [
  {
    slug: 'better-questions',
    title: 'Why a good website starts with better questions',
    topic: 'User Experience', readTime: '5 min read',
    excerpt: 'Before choosing a font or a platform, get clear on the people and decisions the site needs to serve.',
    hero: '/assets/service-ux.jpg', heroAlt: 'Interface sketches being arranged on a desk',
    inlineImage: '/assets/service-web.jpg', inlineAlt: 'Design materials and screen ideas laid out for review',
    inlineCaption: 'The shape of a site begins with what people need to understand.',
    sections: [
      { id: 'start-with-people', heading: 'Start with the person, not the page', paragraphs: [
        'A new website often begins with a collection of references: a typeface, a colour, a transition that felt good on someone else’s site. Those references can be useful, but they cannot tell you what your visitor came to do.',
        'Ask who is arriving, what they already know, what they are uncertain about, and what would help them take a sensible next step. A first-time visitor and a returning client may need very different things from the same page.'
      ] },
      { id: 'find-the-real-job', heading: 'Find the real job of the website', paragraphs: [
        '“We need a modern site” is a starting point, not a brief. Is the real job to explain a service that people struggle to understand? To give a small business the confidence to look established? To make enquiries more useful before a conversation begins?',
        'Once that job is clear, decisions become easier. You can choose which story belongs on the first screen, which proof deserves space, and which details can wait. The visual direction has something specific to support.'
      ] },
      { id: 'turn-answers-into-design', heading: 'Turn the answers into design', paragraphs: [
        'A useful structure is a form of hospitality. It anticipates the next question and gives the answer at the moment it is needed. Navigation, page order, headings and calls to action should all work together to make that journey feel natural.',
        'Then comes the expression: imagery, typography, motion and tone. These choices can make a site memorable, but their strongest form is connected to the business underneath. Good design gives a clear idea a distinct voice.'
      ] }
    ]
  },
  {
    slug: 'designing-trust',
    title: 'Designing trust before the first hello',
    topic: 'Strategy', readTime: '4 min read',
    excerpt: 'Clear language, useful details, and thoughtful pacing help people feel ready to reach out.',
    hero: '/assets/case-studies/bayline-hero.webp', heroAlt: 'Legal professionals talking beside a window overlooking Dubai',
    inlineImage: '/assets/case-studies/bayline-interior.webp', inlineAlt: 'Bayline Legal practice areas page shown in a browser view',
    inlineCaption: 'Bayline Legal: making expertise and the path to counsel easy to find.',
    sections: [
      { id: 'first-impression', heading: 'An impression forms before an enquiry', paragraphs: [
        'Someone can decide whether to trust a business long before speaking to a person there. They notice whether the language sounds specific, whether they can find the service they need, and whether the next step feels clear.',
        'A beautiful page helps, but polish alone cannot answer a practical question. Trust grows when the experience respects the visitor’s time and treats their uncertainty seriously.'
      ] },
      { id: 'show-your-work', heading: 'Show what people need to know', paragraphs: [
        'Give a clear account of what you do, who you help, and how the process works. Name the questions people usually bring to a first conversation. If there is an important limitation or condition, make it easy to find.',
        'For Bayline Legal, that meant giving practice areas, lawyer profiles and the consultation journey their own space. The goal was to let a prospective client understand the kind of help available before deciding to make contact.'
      ] },
      { id: 'details-add-up', heading: 'The details add up', paragraphs: [
        'Trust also lives in the small things: readable type, an understandable form, mobile navigation that behaves, and an answer that does not hide behind a vague button. None of these choices needs to shout.',
        'When content, visual tone and interaction agree with each other, the site feels considered. That is often what gives someone the confidence to begin the conversation.'
      ] }
    ]
  },
  {
    slug: 'right-way-to-build',
    title: 'Choosing the right way to build',
    topic: 'Tool', readTime: '5 min read',
    excerpt: 'No-code and custom code are both useful. The right choice starts with what the project must become.',
    hero: '/assets/service-code.jpg', heroAlt: 'A developer working at a laptop',
    inlineImage: '/assets/case-studies/veyra-desktop.webp', inlineAlt: 'Veyra Cargo homepage viewed on a desktop screen',
    inlineCaption: 'A build should support the experience and the people who maintain it.',
    references: [
      { label: 'Astro documentation — Why Astro?', url: 'https://docs.astro.build/en/concepts/why-astro/' },
      { label: 'Cloudflare Pages documentation', url: 'https://developers.cloudflare.com/pages/' }
    ],
    sections: [
      { id: 'brief-before-tool', heading: 'Let the brief lead', paragraphs: [
        'It is easy to start with a favourite tool. The better first question is what the website must do now and how it may need to change later. A focused brochure site, a growing publication and a highly interactive product do not ask the same thing of a build.',
        'I look at content ownership, the frequency of updates, performance, accessibility, integrations and the time available to launch. The right answer is the one that gives the idea enough room without creating work the client does not need.'
      ] },
      { id: 'different-paths', heading: 'Different paths, different strengths', paragraphs: [
        'A visual builder can be a strong choice when speed and direct editing matter. Astro is useful for content-led sites that need a fast foundation and flexible components. React can make sense when the experience has more complex, stateful behaviour.',
        'Motion tools such as GSAP can add a deliberate rhythm, but the page still needs to make sense without animation. Hosting, forms and a future content system belong in the conversation early, because they affect what happens after launch.'
      ] },
      { id: 'build-to-evolve', heading: 'Build for what comes next', paragraphs: [
        'A good handover is more than a working link. It means clear content patterns, reusable parts and a sensible way to change things when the business grows. Versioned code and documented decisions make that evolution easier.',
        'The tool is a means to an end. The end is a website that feels right for its audience, works reliably, and can keep doing its job after the first reveal.'
      ] }
    ]
  }
];
