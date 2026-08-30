export type Question = {
  id: number;
  module: string;
  question: string;
  options: {
    A: string;
    B: string;
    C: string;
    D: string;
  };
  correct: "A" | "B" | "C" | "D";
};

export const studentQuestions: Question[] = [
  // MODULE 1
  {
    id: 1,
    module: "MODULE 1: EXCELLING ACADEMICALLY WITH AI",
    question:
      "According to Module 1, what is the main difference between Student A (traditional studying) and Student B (AI-assisted studying)?",
    options: {
      A: "Student B works harder and longer hours",
      B: "Student B spends cognitive energy on mastery rather than management",
      C: "Student B avoids reading textbooks altogether",
      D: "Student B relies entirely on AI to write their essays",
    },
    correct: "B",
  },
  {
    id: 2,
    module: "MODULE 1: EXCELLING ACADEMICALLY WITH AI",
    question:
      'Which of the following is NOT one of the four rules in "The Unbreakable Code of the AI-First Student"?',
    options: {
      A: "Your Mind is the Masterpiece; AI is the Brush",
      B: "Verification is Your Superpower",
      C: "Always use the most expensive AI tool available",
      D: "Acceleration, Not Evasion",
    },
    correct: "C",
  },
  {
    id: 3,
    module: "MODULE 1: EXCELLING ACADEMICALLY WITH AI",
    question: 'What does "Verification is Your Superpower" mean in the context of using AI?',
    options: {
      A: "Always trust whatever the AI tells you",
      B: "Never fact-check AI outputs because it wastes time",
      C: "Treat every AI output with skepticism and verify all claims",
      D: "Only verify information from free AI tools",
    },
    correct: "C",
  },
  {
    id: 4,
    module: "MODULE 1: EXCELLING ACADEMICALLY WITH AI",
    question: "According to Module 1, what question should you ask yourself before every AI prompt?",
    options: {
      A: '"Will this save me the most time?"',
      B: '"Am I using this to learn faster or to skip learning?"',
      C: '"Is this the most popular AI tool?"',
      D: '"Will my professor know I used AI?"',
    },
    correct: "B",
  },
  {
    id: 5,
    module: "MODULE 1: EXCELLING ACADEMICALLY WITH AI",
    question: "The document states that AI models are:",
    options: {
      A: "Truth-tellers that never make mistakes",
      B: "Prediction engines, not truth-tellers",
      C: "Always reliable for academic citations",
      D: "Unable to generate false information",
    },
    correct: "B",
  },
  {
    id: 6,
    module: "MODULE 1: EXCELLING ACADEMICALLY WITH AI",
    question: 'What does "Cite Like a Scholar, Not a Ghost" encourage students to do?',
    options: {
      A: "Hide AI usage from professors",
      B: "Acknowledge AI assistance transparently",
      C: "Never mention AI in academic work",
      D: "Only cite traditional print sources",
    },
    correct: "B",
  },

  // MODULE 2
  {
    id: 7,
    module: "MODULE 2: MASTERING YOUR AI TOOLKIT",
    question: "What was Kofi's main problem when he first started using AI tools?",
    options: {
      A: "He couldn't afford any AI tools",
      B: "He was using too many tools without a clear strategy",
      C: "His university banned AI usage",
      D: "He only used one tool for everything",
    },
    correct: "B",
  },
  {
    id: 8,
    module: "MODULE 2: MASTERING YOUR AI TOOLKIT",
    question: "Which AI tool is recommended for discovering sources and understanding the academic landscape?",
    options: {
      A: "Microsoft Copilot",
      B: "Perplexity",
      C: "ChatGPT",
      D: "NotebookLM",
    },
    correct: "B",
  },
  {
    id: 9,
    module: "MODULE 2: MASTERING YOUR AI TOOLKIT",
    question: "When should you use Document & PDF Analysis tools like NotebookLM?",
    options: {
      A: "When you need to draft emails to professors",
      B: "When you want to upload and interrogate entire documents, textbooks, and research papers",
      C: "When you need real-time web search capabilities",
      D: "When you want to create presentations",
    },
    correct: "B",
  },
  {
    id: 10,
    module: "MODULE 2: MASTERING YOUR AI TOOLKIT",
    question: "What is the wrong approach when you have a 300-page textbook chapter to understand?",
    options: {
      A: "Upload it to ChatGPT and ask for a summary",
      B: "Open ChatGPT and paste the entire chapter without strategy",
      C: "Generate a quiz to test your understanding",
      D: "Export the summary into your notes",
    },
    correct: "B",
  },
  {
    id: 11,
    module: "MODULE 2: MASTERING YOUR AI TOOLKIT",
    question: "According to Module 2, what should you do with Perplexity's output?",
    options: {
      A: "Accept it as final and use it directly",
      B: "Use it as a starting point, not an ending point",
      C: "Ignore all citations it provides",
      D: "Never verify the sources it suggests",
    },
    correct: "B",
  },
  {
    id: 12,
    module: "MODULE 2: MASTERING YOUR AI TOOLKIT",
    question: "What is the recommended pipeline order for using AI tools in research?",
    options: {
      A: "Write → Discover → Verify → Upload",
      B: "Discover → Upload → Develop → Write → Fact-check → Polish",
      C: "Fact-check → Write → Discover → Upload",
      D: "Upload → Write → Develop → Discover",
    },
    correct: "B",
  },

  // MODULE 3
  {
    id: 13,
    module: "MODULE 3: AI-POWERED STUDYING",
    question: "What did Aisha do differently to understand oxidative phosphorylation?",
    options: {
      A: "She read the textbook five more times",
      B: "She asked AI to explain it at multiple levels of complexity",
      C: "She memorized the paragraph word-for-word",
      D: "She gave up and went to sleep",
    },
    correct: "B",
  },
  {
    id: 14,
    module: "MODULE 3: AI-POWERED STUDYING",
    question: "According to Module 3, why is re-reading considered ineffective?",
    options: {
      A: "It takes too much time",
      B: "It feels productive but creates an illusion of mastery without substance",
      C: "It's too difficult for most students",
      D: "It requires too much cognitive effort",
    },
    correct: "B",
  },
  {
    id: 15,
    module: "MODULE 3: AI-POWERED STUDYING",
    question: "What is the Socratic method in the context of AI study partners?",
    options: {
      A: "Having AI provide all the answers immediately",
      B: "AI asking probing questions that force you to examine your own understanding",
      C: "AI memorizing information for you",
      D: "AI reading textbooks aloud to you",
    },
    correct: "B",
  },
  {
    id: 16,
    module: "MODULE 3: AI-POWERED STUDYING",
    question: 'The "Progressive Challenges" approach involves:',
    options: {
      A: "Only practicing questions you already know",
      B: "Generating questions that escalate in difficulty",
      C: "Avoiding difficult questions entirely",
      D: "Using only multiple-choice questions",
    },
    correct: "B",
  },
  {
    id: 17,
    module: "MODULE 3: AI-POWERED STUDYING",
    question: "In the six-step AI-powered study session, what should you do after testing yourself?",
    options: {
      A: "Move on to a completely new topic",
      B: "Identify gaps in your understanding based on your answers",
      C: "Stop studying for the day",
      D: "Delete all your notes",
    },
    correct: "B",
  },
  {
    id: 18,
    module: "MODULE 3: AI-POWERED STUDYING",
    question: 'What does "interleaving" refer to in studying?',
    options: {
      A: "Studying only one topic at a time",
      B: "Combining and connecting different topics",
      C: "Reading the same material repeatedly",
      D: "Using only one study method",
    },
    correct: "B",
  },

  // MODULE 4
  {
    id: 19,
    module: "MODULE 4: AI FOR RESEARCH & ACADEMIC WRITING",
    question: "What was Michael's breakthrough in his research process?",
    options: {
      A: "Finding a secret AI tool no one else knew about",
      B: "Stopping treating AI as a writing shortcut and treating it as a research partner",
      C: "Using only Google Scholar without AI",
      D: "Hiring a professional researcher",
    },
    correct: "B",
  },
  {
    id: 20,
    module: "MODULE 4: AI FOR RESEARCH & ACADEMIC WRITING",
    question: "According to Module 4, what is the hardest part of research?",
    options: {
      A: "Writing the conclusion",
      B: "Formatting citations correctly",
      C: "Asking the right questions",
      D: "Finding sources",
    },
    correct: "C",
  },
  {
    id: 21,
    module: "MODULE 4: AI FOR RESEARCH & ACADEMIC WRITING",
    question: "What does the document say about AI and source generation?",
    options: {
      A: "AI is always accurate with sources",
      B: "AI can invent sources with complete confidence",
      C: "AI never makes mistakes with citations",
      D: "AI sources are always better than human sources",
    },
    correct: "B",
  },
  {
    id: 22,
    module: "MODULE 4: AI FOR RESEARCH & ACADEMIC WRITING",
    question: "A literature review should be:",
    options: {
      A: "A series of summaries of different sources",
      B: "An argument about the state of knowledge in your field",
      C: "A list of everything you've read",
      D: "Only theoretical sources",
    },
    correct: "B",
  },
  {
    id: 23,
    module: "MODULE 4: AI FOR RESEARCH & ACADEMIC WRITING",
    question: "What should you do if AI generates a claim you want to use?",
    options: {
      A: "Use it immediately without checking",
      B: "Verify every claim against an actual source you have read",
      C: "Assume it's correct because AI is advanced",
      D: "Only use it if it sounds convincing",
    },
    correct: "B",
  },
  {
    id: 24,
    module: "MODULE 4: AI FOR RESEARCH & ACADEMIC WRITING",
    question: "How should you use AI for academic writing?",
    options: {
      A: "Let AI write everything and submit it",
      B: "Use AI as an editor and assistant, not the author",
      C: "Copy-paste AI text directly into your paper",
      D: "Never use AI for writing at all",
    },
    correct: "B",
  },

  // MODULE 5
  {
    id: 25,
    module: "MODULE 5: AI, CAREER & THE FUTURE OF WORK",
    question: "According to Module 5, what gives the biggest advantage to graduates?",
    options: {
      A: "Only having excellent grades",
      B: "Having excellent grades AND a demonstrable AI-assisted skillset",
      C: "Attending the most prestigious university",
      D: "Having connections in the industry",
    },
    correct: "B",
  },
  {
    id: 26,
    module: "MODULE 5: AI, CAREER & THE FUTURE OF WORK",
    question: "What does the document say AI is doing to routine intellectual tasks?",
    options: {
      A: "Making them more difficult",
      B: "Automating them",
      C: "Making them obsolete",
      D: "Making them more expensive",
    },
    correct: "B",
  },
  {
    id: 27,
    module: "MODULE 5: AI, CAREER & THE FUTURE OF WORK",
    question: "Which skill is NOT listed as one that employers value more than ever?",
    options: {
      A: "Critical thinking",
      B: "Memorization of facts",
      C: "Adaptability",
      D: "Ethical judgment",
    },
    correct: "B",
  },
  {
    id: 28,
    module: "MODULE 5: AI, CAREER & THE FUTURE OF WORK",
    question: 'Why are "soft skills" called the hardest skills to develop?',
    options: {
      A: "Because they are easy to learn",
      B: "Because they are the hardest to develop and hardest to automate",
      C: "Because they don't matter in the workplace",
      D: "Because AI can easily replace them",
    },
    correct: "B",
  },
  {
    id: 29,
    module: "MODULE 5: AI, CAREER & THE FUTURE OF WORK",
    question: "The adaptability mindset requires students to:",
    options: {
      A: "Master only current AI tools",
      B: "Learn how to keep learning and stay curious",
      C: "Never change their approach",
      D: "Avoid new technologies",
    },
    correct: "B",
  },
  {
    id: 30,
    module: "MODULE 5: AI, CAREER & THE FUTURE OF WORK",
    question: 'According to Module 5, saying "I know how to use ChatGPT" is:',
    options: {
      A: "A major differentiator from other candidates",
      B: 'Like saying "I know how to use Google"—it\'s a baseline, not a differentiator',
      C: "Impressive to all employers",
      D: "Not worth mentioning at all",
    },
    correct: "B",
  },
];