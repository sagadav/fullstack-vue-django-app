/**
 * X dates ago
 */
export function getDiffDates(date1: Date, date2: Date = new Date()) {
  const datesDiff = date2.getTime() - date1.getTime();
  const minutesDiff = Math.round(datesDiff / (1000 * 60));
  if (minutesDiff < 60) {
    if (minutesDiff < 1) {
      return "just now";
    }
    if (minutesDiff === 1) {
      return "a minute ago";
    }
    return `${minutesDiff} minutes ago`;
  }
  const hoursDiff = Math.round(minutesDiff / 60);
  if (hoursDiff < 24) {
    if (hoursDiff === 1) {
      return `${hoursDiff} hour ago`;
    }
    return `${hoursDiff} hours ago`;
  }
  const daysDiff = Math.round(hoursDiff / 24);
  if (daysDiff < 30) {
    if (daysDiff === 1) {
      return `${daysDiff} day ago`;
    }
    return `${daysDiff} days ago`;
  }
  const monthsDiff = Math.round(daysDiff / 30);
  if (monthsDiff < 12) {
    if (monthsDiff === 1) {
      return `${monthsDiff} month ago`;
    }
    return `${monthsDiff} months ago`;
  }
  const yearsDiff = Math.round(monthsDiff / 12);
  if (yearsDiff < 30) {
    if (yearsDiff === 1) {
      return `${yearsDiff} year ago`;
    }
    return `${yearsDiff} years ago`;
  }
  return `long time ago`;
}
