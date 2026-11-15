// Keep the visible answers and FAQ structured data in the same records.
// This shape can later be mapped from Sanity documents.
export type Faq = { question: string; answer: string };

export const homeFaqs: Faq[] = [
  {
    question: 'What can you design and build?',
    answer: 'I design and build websites and digital experiences, from content-led business sites to more interactive projects. My work covers visual direction, UX, responsive design, and development.'
  },
  {
    question: 'Can you handle both the design and the development?',
    answer: 'Yes. I can take a project from its first questions and visual direction through to a working site. You can see that process in the Veyra Cargo, Bayline Legal, JIN Restaurant, and Nacre Dental projects.'
  },
  {
    question: 'Do you use a website builder or custom code?',
    answer: 'It depends on what the project needs. A visual builder can be a good fit for a site that needs direct editing and a quick launch. For more tailored experiences, I work with tools such as Astro, React, and GSAP.'
  },
  {
    question: 'How do we start a project together?',
    answer: 'Send me a short note about your business, your audience, and what you want the website to help people do. The contact page has a guided project brief, and you do not need to have every detail figured out.'
  }
];

export const contactFaqs: Faq[] = [
  {
    question: 'Do I need a finished brief before getting in touch?',
    answer: 'No. An early idea is enough. Tell me what your business does, who the project is for, and what you hope will change when it goes live.'
  },
  {
    question: 'What should I include in my enquiry?',
    answer: 'Share the kind of help you need, your goals, any useful links, your preferred timeline, and a budget range if you have one. That gives us a useful starting point for a conversation.'
  },
  {
    question: 'What if I do not know my budget yet?',
    answer: 'An estimate is helpful, but it is optional. You can leave the budget field open or write “let’s discuss” and explain the scope in your message.'
  },
  {
    question: 'What happens when I submit the form?',
    answer: 'The form prepares an email with your answers in your mail app. Review it and press send there to deliver your enquiry. You can also email me directly at hello@jenniemuso.com.'
  }
];
