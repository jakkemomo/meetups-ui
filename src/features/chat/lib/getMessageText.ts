export function getMessageText(count: number): string {
  const lastDigit = count % 10;
  const lastTwoDigits = count % 100;

  if (lastTwoDigits >= 11 && lastTwoDigits <= 19) {
    return `${count} сообщений`;
  }

  if (lastDigit === 1) {
    return `${count} сообщение`;
  }

  if (lastDigit >= 2 && lastDigit <= 4) {
    return `${count} сообщения`;
  }

  return `${count} сообщений`;
}
