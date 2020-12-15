export const COMPONENT_TYPES = {
  PlainParagraph: 'PlainParagraph',
  MarkedParagraph: 'MarkedParagraph',
  QuestionLink: 'QuestionLink',
  QuestionLinkList: 'QuestionLinkList',
};

const FREQUENT_QUESTIONS_TEXT = [
  {
    title: 'Why should I use Squadhelp?',
    description: [
      {
        type: COMPONENT_TYPES.PlainParagraph,
        info: [
          {
            text: 'You always have an option of hiring a consultant or coming up with the name yourself. However, Squadhelp builds great brands that succeed faster by connecting you with the most creative people across the globe. Most importantly, Squadhelp provides you with choice: you get to see ideas from dozens (in some cases, hundreds) of contestants before you select a winner. Typically, you would spend far less money with Squadhelp (our contests start at $199) than hiring an agency. Also, you will receive immediate results - most contests begin receiving submissions within minutes of starting.',
          }],
      },
    ],
  },
  {
    title: 'How is Squadhelp Different?',
    description: [
      {
        type: COMPONENT_TYPES.PlainParagraph,
        info: [
          {
            text: 'Since 2011, we have been committed to disrupting the traditional agency model. Our platform offers much more than a typical crowdsourcing experience. From Machine Learning to Audience Testing to Comprehensive Trademark Validation, you receive best-in-class support for your branding projects.',
          }],
      },
      {
        type: COMPONENT_TYPES.MarkedParagraph,
        info: [
          {
            title: 'Breadth: ',
          },
          {
            text: 'Our Contest-Based Crowdsourcing approach allows you to receive an unmatched breadth of name ideas from dozens of unique, creative minds while working with the world\'s largest branding community.',
          },
        ],
      },
      {
        type: COMPONENT_TYPES.MarkedParagraph,
        info: [
          {
            title: 'Quality and Collaboration: ',
          },
          {
            text: 'Using an advanced Quality Scoring Algorithm, we ensure that you receive more ideas from our top-quality creatives, and we use Gamification best practices to encourage high-quality brainstorming and two-way communication throughout your contest.',
          }],
      },
      {
        type: COMPONENT_TYPES.MarkedParagraph,
        info: [
          {
            title: 'We don’t stop at ideation: ',
          },
          {
            text: 'Choose your name with confidence through our high-end validation services. Poll your target demographics to get unbiased feedback on your favorite names, and receive Trademark Risk and Linguistics Analysis Reports developed by a Licensed Trademark Attorney.',
          }],
      }],
  },
  {
    title: 'Will you help me validate my name?',
    description: [
      {
        type: COMPONENT_TYPES.PlainParagraph,
        info: [
          {
            text: 'Yes! We believe that validating and securing your name is a critical part of your branding process. Squadhelp offers domain checks, ',
          },
          {
            type: COMPONENT_TYPES.QuestionLink,
            href: 'https://www.google.com/',
            text: 'Trademark support',
          },
          {
            text: ' , linguistics analysis, and ',
          },
          {
            type: COMPONENT_TYPES.QuestionLink,
            href: 'https://www.google.com/',
            text: 'professional audience testing ',
          },
          {
            text: 'to help you choose your name with confidence. We even have special prices for Trademark filing for our customers.',
          }],
      },
    ],
  },
  {
    title: 'I’ve never used Squadhelp before. What should I expect?',
    description: [
      {
        type: COMPONENT_TYPES.PlainParagraph,
        info: [
          {
            text: 'Most customers tell us that Squadhelp’s process is effective, easy, fast, and even fun. We constantly hear ',
          },
          {
            type: 'QuestionLink',
            href: 'https://www.google.com/',
            text: 'extremely positive feedback ',
          },
          {
            text: 'with respect to the breadth of ideas submitted to each contest, and many customers are surprised at how insightful working with dozens of creative individuals from across the globe can be.',
          },
        ],
      }],
  },
  {
    title: 'What kind of work can I crowdsource?',
    description: [
      {
        type: COMPONENT_TYPES.PlainParagraph,
        info: [
          {
            text: 'You can host competitions for Naming, Taglines, Logos, Business cards, Package design, other design projects, and even Product feedback and research.',
          },
        ],
      }],
  },
  {
    title: 'What if I don\'t like anyone\'s work?',
    description: [
      {
        type: COMPONENT_TYPES.PlainParagraph,
        info: [
          {
            text: 'Our creatives work extremely hard to ensure a successful outcome for all projects. If you do not like any of the submissions, we can add more days to your contest at no extra cost. In addition, our Gold and Platinum Packages come with a partial refund option. If you do not like the quality of submissions, you can request a refund for the contest award fees (if you keep your contest award as "Not Guaranteed"). We also offer complimentary branding consultation to ensure you get the best outcome from your contest. Read more about our ',
          },
          {
            type: 'QuestionLink',
            href: 'https://www.google.com/',
            text: 'Refund policy.',
          }],
      }],
  },
  {
    title: 'Can I see any examples?',
    description: [
      {
        type: COMPONENT_TYPES.PlainParagraph,
        info: [
          {
            text: 'Our creatives have submitted more than 5 Million names and thousands of logos on our platform. Here are some examples of Names, Taglines, and Logos that were submitted in recent contests.',
          },
        ],
      },
      {
        type: COMPONENT_TYPES.QuestionLinkList,
        info: [
          {
            href: 'https://www.google.com/',
            text: 'Name Examples',
          },
          {
            href: 'https://www.google.com/',
            text: 'Tagline Examples',
          },
          {
            href: 'https://www.google.com/',
            text: 'Logo Examples',
          },
        ],
      }],
  },
  {
    title: 'Where can I read about feedback from other customers?',
    description: [
      {
        type: COMPONENT_TYPES.PlainParagraph,
        info: [
          {
            text: 'Thousands of customers have used Squadhelp to find great Names, Taglines and Logos for their businesses. Here are some of the ',
          },
          {
            type: 'QuestionLink',
            href: 'https://www.google.com/',
            text: 'recent customer testimonials.',
          }],
      }],
  },
  {
    title: 'Who should use Squadhelp?',
    description: [
      {
        type: COMPONENT_TYPES.PlainParagraph,
        info: [
          {
            text: 'Our disruptive approach to naming and branding has been used successfully by just about every type of venture imaginable. Startups and small businesses love our affordable pricing, SM&B gravitate towards our end-to-end service, and large international businesses are particularly excited by the breadth of ideas and the rapid results. We have also worked with nonprofits, municipalities, associations, event planners, agencies, and more.',
          }],
      }],
  },
  {
    title: 'Who will be working on my contest?',
    description: [
      {
        type: COMPONENT_TYPES.PlainParagraph,
        info: [
          {
            text: 'We are an open platform built on the core belief that anyone can have a great idea. However, we’ve invested heavily to ensure that the best Creatives on our site participate the most in your contest. Our Quality Scoring algorithm and Gamification best practices ensure high-quality submission and superior collaboration.',
          }],
      }],
  },
  {
    title: 'How much does it cost?',
    description: [
      {
        type: COMPONENT_TYPES.PlainParagraph,
        info: [
          {
            text: 'Our naming competitions start at $199, and our logo design competitions start at $299. Also, there are three additional contest level that each offer more features and benefits. See our ',
          },
          {
            type: 'QuestionLink',
            href: 'https://www.google.com/',
            text: 'Pricing Page',
          },
          {
            text: ' for details.',
          }],
      }],
  },
  {
    title: 'Do you offer any discount for multiple contests?',
    description: [
      {
        type: COMPONENT_TYPES.PlainParagraph,
        info: [
          {
            text: 'Yes! We have many contest bundles - our most popular being our Name, Tagline, and Logo bundle. Bundles allow you to purchase multiple contests at one time and save as much as from $75 - $400. You can learn more about our bundle options on our ',
          },
          {
            type: 'QuestionLink',
            href: 'https://www.google.com/',
            text: 'Pricing Page',
          }],
      }],
  },
  {
    title: 'What if I want to keep my business idea private?',
    description: [
      {
        type: COMPONENT_TYPES.PlainParagraph,
        info: [
          {
            text: 'You can select a Non Disclosure Agreement (NDA) option at the time of launching your competition. This will ensure that only those contestants who agree to the NDA will be able to read your project brief and participate in the contest. The contest details will be kept private from other users, as well as search engines.',
          }],
      }],
  },
  {
    title: 'Can you serve customers outside the US?',
    description: [
      {
        type: COMPONENT_TYPES.PlainParagraph,
        info: [
          {
            text: 'Absolutely. Squadhelp services organizations across the globe. Our customer come from many countries, such as the United States, Australia, Canada, Europe, India, and MENA. We’ve helped more than 25,000 customer around the world.',
          }],
      }],
  },
];

export default FREQUENT_QUESTIONS_TEXT;