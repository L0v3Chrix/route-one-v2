export interface QuizQuestion {
  id: string;
  question: string;
  subtext?: string;
  answers: {
    value: string;
    label: string;
    tag: string;
    microCopy?: string;
  }[];
}

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 'industry',
    question: 'What best describes your business?',
    answers: [
      { value: 'entertainment', label: 'Entertainment / Media / Production', tag: 'industry:entertainment' },
      { value: 'professional', label: 'Professional Services', tag: 'industry:professional' },
      { value: 'ecommerce', label: 'E-commerce / DTC', tag: 'industry:ecommerce' },
      { value: 'multi', label: 'Multi-business Operator', tag: 'industry:multi' },
      { value: 'other', label: 'Other', tag: 'industry:other' },
    ],
  },
  {
    id: 'entityCount',
    question: 'How many entities do you manage financially?',
    subtext: 'LLCs, corporations, partnerships — all count.',
    answers: [
      { value: '1', label: 'Just one', tag: 'entities:single' },
      { value: '2-3', label: '2–3 entities', tag: 'entities:few' },
      { value: '4-6', label: '4–6 entities', tag: 'entities:several', microCopy: "That's a lot to keep straight." },
      { value: '7+', label: '7 or more', tag: 'entities:many', microCopy: "Consolidation is probably a nightmare." },
    ],
  },
  {
    id: 'booksStatus',
    question: 'When were your books last fully closed and current?',
    answers: [
      { value: 'current', label: 'This month', tag: 'books:current' },
      { value: 'quarter', label: 'Last quarter', tag: 'books:behind', microCopy: "That's more common than you'd think." },
      { value: '6months', label: 'Over 6 months ago', tag: 'books:far-behind', microCopy: "You're flying blind." },
      { value: 'never', label: 'Never fully current', tag: 'books:never', microCopy: "At least you're honest." },
      { value: 'unsure', label: 'Not sure', tag: 'books:unsure', microCopy: 'That answer tells us something too.' },
    ],
  },
  {
    id: 'frustration',
    question: 'What frustrates you most about how your finances are managed?',
    answers: [
      { value: 'reports', label: "Can't get clear reports when I need them", tag: 'pain:visibility' },
      { value: 'cost', label: "Spending too much for what I'm getting", tag: 'pain:cost' },
      { value: 'trust', label: "Don't fully trust the numbers", tag: 'pain:trust', microCopy: "That's a dangerous place to be." },
      { value: 'systems', label: 'Too many disconnected systems', tag: 'pain:systems' },
      { value: 'myself', label: "I'm doing too much of it myself", tag: 'pain:founder-time', microCopy: "You shouldn't be doing that." },
      { value: 'start', label: "Don't know where to start", tag: 'pain:overwhelm' },
    ],
  },
  {
    id: 'opportunity',
    question: 'Has your financial situation ever cost you an opportunity?',
    subtext: 'A loan denied. A deal delayed. An investor who walked.',
    answers: [
      { value: 'yes', label: 'Yes, directly', tag: 'consequence:direct', microCopy: "That's money you'll never get back." },
      { value: 'maybe', label: 'Possibly — hard to say', tag: 'consequence:indirect' },
      { value: 'worried', label: 'Not yet, but I worry about it', tag: 'consequence:worried' },
      { value: 'no', label: 'No', tag: 'consequence:none' },
    ],
  },
  {
    id: 'personalTime',
    question: 'How much of YOUR time goes to managing finances each week?',
    subtext: "Be honest. Nobody's judging.",
    answers: [
      { value: 'none', label: "Almost none — it's handled", tag: 'time:delegated' },
      { value: 'few', label: 'A few hours', tag: 'time:some' },
      { value: 'half-day', label: 'Half a day or more', tag: 'time:significant', microCopy: "That's expensive time." },
      { value: 'second-job', label: 'Basically a second job', tag: 'time:excessive', microCopy: "You're paying yourself bookkeeper wages." },
    ],
  },
];

export const INDUSTRY_LABELS: Record<string, string> = {
  entertainment: 'entertainment & media',
  professional: 'professional services',
  ecommerce: 'e-commerce',
  multi: 'multi-entity operations',
  other: 'your industry',
};

export interface QuizState {
  currentStep: number;
  answers: Record<string, string>;
  tags: string[];
  contact: {
    firstName: string;
    email: string;
    company: string;
  };
}

export function createInitialState(): QuizState {
  return {
    currentStep: 0,
    answers: {},
    tags: [],
    contact: {
      firstName: '',
      email: '',
      company: '',
    },
  };
}
