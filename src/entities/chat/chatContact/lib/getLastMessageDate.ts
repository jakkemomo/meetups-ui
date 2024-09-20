export function getLastMessageDate(dateStr: string): string {
  const date = new Date(dateStr);

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const givenDate = new Date(date);
  givenDate.setHours(0, 0, 0, 0);

  if (today.getTime() === givenDate.getTime()) {
      return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  } else {
      return date.toLocaleDateString([], { day: '2-digit', month: 'short' });
  }
}
