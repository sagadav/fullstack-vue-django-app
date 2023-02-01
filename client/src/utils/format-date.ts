export function formatDate(date1: Date, date2: Date = new Date()) {
  const datesDiff = date2.getTime() - date1.getTime();
  const minutesDiff = Math.round(datesDiff / (1000 * 60));
  if (minutesDiff < 60) {
    if (minutesDiff < 1) {
      return "just now";
    }
    if (minutesDiff === 1) {
      return "minute ago";
    }
    return `${minutesDiff} minutes ago`;
  }
  const hoursDiff = Math.round(minutesDiff / 60);
  if (hoursDiff < 24) {
    if (hoursDiff === 1) {
      return "hour ago";
    }
    return `${hoursDiff} hours ago`;
  }
  const dateISOstring = date1.toISOString();
  return dateISOstring.substring(0, 10) + " " + dateISOstring.substring(11, 16);
}
