export type ServiceProcessStep = {
  title: string;
  description: string;
  clientRole: string;
  outcome: string;
  image: string;
  imageAlt: string;
};

export const serviceProcessSteps: ServiceProcessStep[] = [
  {
    title: 'We discover your story',
    description: 'We start with a conversation about your business, your customers, and what the website needs to help them do. We look at what is working, what feels unclear, and what success would mean for you.',
    clientRole: 'Share your goals, current site, brand materials, and the questions customers ask most.',
    outcome: 'A clear brief and an agreed direction for the project.',
    image: '/assets/shop-studio.jpg',
    imageAlt: 'Website references and visual ideas arranged across a studio desk'
  },
  {
    title: 'We plan the path',
    description: 'We decide which pages and messages matter most, then map how visitors will move from first impression to enquiry. You can see the structure before we invest time in visual design.',
    clientRole: 'Confirm the priorities and provide the copy, images, and other content you have.',
    outcome: 'An approved page plan and content priorities.',
    image: '/assets/service-ux.jpg',
    imageAlt: 'Hands sketching website page layouts and user journeys'
  },
  {
    title: 'We shape the design',
    description: 'We turn the plan into a visual experience that feels like your business and works across screen sizes. We review the key pages together and refine the details at agreed checkpoints.',
    clientRole: 'Give one clear, consolidated round of feedback at each checkpoint.',
    outcome: 'An approved design ready to build.',
    image: '/assets/service-nocode.jpg',
    imageAlt: 'Designer refining a website composition on a desktop screen'
  },
  {
    title: 'We build and test',
    description: 'We develop the approved design, connect the features in your agreed scope, and test the site on real screen sizes. You get a preview to check the content and key actions before launch.',
    clientRole: 'Review the preview, check factual details, and provide any required account access.',
    outcome: 'A tested website approved for launch.',
    image: '/assets/service-code.jpg',
    imageAlt: 'Website development and testing on a laptop'
  },
  {
    title: 'We launch with you',
    description: 'We make the final checks, connect the domain, and help you understand how to use your new site. After launch, we address issues within the agreed bug-fix window and discuss care if you need it.',
    clientRole: 'Give final approval and keep your domain and platform details to hand.',
    outcome: 'A live website, handover guidance, and a clear next step.',
    image: '/assets/service-web.jpg',
    imageAlt: 'Finished website displayed on a laptop'
  }
];
