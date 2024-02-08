interface IGetDateAndTime {
  eventDate: string;
  eventTime: string;
}

export function getDateAndTime(date: string): IGetDateAndTime {
  const formattedDate = new Date(date);

  const eventDate = formattedDate.toLocaleString('default', {
    month: 'long',
    day: 'numeric'
  });

  const eventTime = `${formattedDate.getHours()}:${formattedDate.getMinutes() || "00"}`;

  return { eventDate, eventTime };
}
