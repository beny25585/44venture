/** Daily topics by day of week (0=Sunday, 6=Saturday) */
export const DAILY_TOPICS: Record<number, { label: string; query: string }> = {
  0: { label: 'יום ראשון – חתולים', query: 'cats trending viral content' },
  1: { label: 'יום שני – דברים שחמים היום', query: 'trending today viral hot topics' },
  2: { label: 'יום שלישי – טכנולוגיה', query: 'technology news latest' },
  3: { label: 'יום רביעי – בריאות וכושר', query: 'health fitness wellness tips' },
  4: { label: 'יום חמישי – בידור', query: 'entertainment viral trending' },
  5: { label: 'יום שישי – טיפים לסוף שבוע', query: 'weekend tips ideas' },
  6: { label: 'יום שבת – פנאי ותחביבים', query: 'hobbies relaxation leisure' },
};

export function getTodayTopic() {
  return DAILY_TOPICS[new Date().getDay()];
}
