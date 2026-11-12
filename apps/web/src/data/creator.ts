/** Theme attribution, separate from the publication's author and social links. */
const portfolio = 'https://potion.sh/';

export const CREATOR = {
  name: 'Potion',
  creditPrefix: 'Made with',
  creditBy: 'by',
  bio: 'I’m Pankaj Sanam, an engineer who builds products and tools for the web. I write about engineering, the tools I use, and what I learn along the way.',
  portfolio,
  links: [
    { label: 'Potion blog', href: portfolio },
    { label: 'GitHub', href: 'https://github.com/antick' }
  ]
} as const;
