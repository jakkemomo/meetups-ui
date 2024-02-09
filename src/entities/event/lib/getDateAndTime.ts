interface IGetDateAndTime {
  eventDate: string;
  eventTime: string;
}

export function getDateAndTime(date: string): IGetDateAndTime {
  const formattedDate = new Date(date);

  const eventDate = formattedDate.toLocaleString('ru-RU', {
    month: 'long',
    day: 'numeric'
  });

  const eventTime = `${formattedDate.getHours() || "00"}:${formattedDate.getMinutes() || "00"}`;

  return { eventDate, eventTime };
}
