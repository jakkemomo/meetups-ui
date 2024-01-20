import {IEvent} from "./types";

export const mockEventList: IEvent[] = [
  { id: 1,
    name: 'Волейбол',
    rating: 'Отлично',
    image_url: 'https://imageup.ru/img157/4673341/vince-fleming-azvpxrydijk-unsplash.jpg',
    description: 'Очень крутые перцы играют в очень крутой компании в очень крутой волейбол',
    start_date: '2023-11-06T20:07:21.498000Z',
    end_date: '2023-11-06T20:07:21.498000Z',
    tags: [{id: 1, name: 'Спорт'}, {id: 2, name: 'Большая команда'}],
    address: 'пр-т Победителей, 100',
    category: null,
    participants_number: 15,
  },
  { id: 2,
    name: 'Волейбол для начинающих в центре Минска',
    rating: 'Хорошо',
    image_url: 'https://imageup.ru/img157/4673341/vince-fleming-azvpxrydijk-unsplash.jpg',
    description: 'Приглашаем всех играть с нами в компании малоопытных игроков, с нами будет спортивный тренер',
    start_date: '2023-11-06T20:07:21.498000Z',
    end_date: '2023-11-06T20:07:21.498000Z',
    tags: [{id: 1, name: 'Спорт'}, {id: 2, name: 'Большая команда'}],
    address: 'пр-т Дзержинского, 50',
    category: null,
    participants_number: 15,
  },
  { id: 3,
    name: 'Волейбол',
    rating: null,
    image_url: 'https://imageup.ru/img157/4673341/vince-fleming-azvpxrydijk-unsplash.jpg',
    description: 'Приглашаем игроков',
    start_date: '2023-11-06T20:07:21.498000Z',
    end_date: '2023-11-06T20:07:21.498000Z',
    tags: [{id: 1, name: 'Спорт'}, {id: 2, name: 'Большая команда'}],
    address: 'ул, Немига, 5',
    category: null,
    participants_number: 15,
  },
  { id: 4,
    name: 'Еще один волейбол',
    rating: null,
    image_url: 'https://imageup.ru/img157/4673341/vince-fleming-azvpxrydijk-unsplash.jpg',
    description: 'Приглашаем игроков',
    start_date: '2023-11-06T20:07:21.498000Z',
    end_date: '2023-11-06T20:07:21.498000Z',
    tags: [{id: 1, name: 'Спорт'}, {id: 2, name: 'Большая команда'}],
    address: 'пр-т Победителей, 100',
    category: null,
    participants_number: 15,
  },
]

export function getLocaleMonth(idx: number, locale: string) {
  const objDate = new Date();
  objDate.setDate(1);
  objDate.setMonth(idx-1);
  const month = objDate.toLocaleString(locale, { month: "long" });
  if (locale.includes('ru')) {
    return month.slice(0, -1) + 'я';
  } else {
    return month;
  }
}

