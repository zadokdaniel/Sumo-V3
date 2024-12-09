import { formatDistanceToNow } from 'date-fns';

export function getRelativeTimeText(date: Date) {
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
  const diffWeeks = Math.floor(diffDays / 7);
  const diffMonths = Math.floor(diffDays / 30);
  const diffYears = Math.floor(diffDays / 365);
  
  // Today/Yesterday
  if (diffDays === 0) return 'Today';
  if (diffDays === 1) return 'Yesterday';
  
  // Days (up to a week)
  if (diffDays < 7) return `${diffDays} days ago`;
  
  // Weeks (up to a month)
  if (diffWeeks === 1) return 'Last week';
  if (diffWeeks < 4) return `${diffWeeks} weeks ago`;
  
  // Months (up to a year)
  if (diffMonths === 1) return 'Last month';
  if (diffMonths < 12) return `${diffMonths} months ago`;
  
  // Years
  if (diffYears === 1) return 'Last year';
  return `${diffYears} years ago`;
}

export function getCurrentDate() {
  const now = new Date();
  // If it's before 5 AM, consider it as the previous day
  if (now.getHours() < 5) {
    return new Date(now.setDate(now.getDate() - 1));
  }
  return now;
}