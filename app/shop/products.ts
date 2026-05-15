export type ShopProduct = {
  id: string
  title: string
  description: string
  priceLabel: string
  format: string
  highlights: string[]
}

export const shopProducts: ShopProduct[] = [
  {
    id: 'assessment-guide',
    title: 'Strength Assessment Guide',
    description:
      'Step-by-step instructions for running your assessment with consistent form, plus how to record reps, time, and distance so your results stay comparable over time.',
    priceLabel: '$12.99',
    format: 'PDF download',
    highlights: [
      'Movement standards for each test',
      'Setup and form cues',
      'Logging checklist for your next session',
    ],
  },
  {
    id: 'functional-training',
    title: 'Functional Training Foundations',
    description:
      'A practical guide to building push, pull, carry, and hinge patterns with balance across sides—designed for real-life strength, not gym-only isolation.',
    priceLabel: '$19.99',
    format: 'PDF download',
    highlights: [
      'Pattern-based exercise progressions',
      'Sample weekly structure',
      'Symmetry and weak-link focus',
    ],
  },
  {
    id: 'symmetry-playbook',
    title: 'Symmetry & Injury-Resilience Playbook',
    description:
      'Learn how to spot left-right and pattern gaps, prioritize what to train next, and reduce compensation habits before they turn into strain.',
    priceLabel: '$14.99',
    format: 'PDF download',
    highlights: [
      'Self-check prompts for asymmetry',
      'Prioritization framework',
      'Re-test cadence recommendations',
    ],
  },
]
