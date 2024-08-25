export const settings = {
  slidesToShow: 21,
  slidesToScroll: 5,
  speed: 500,
  className: "mt-1.5 ml-[-8px]",
};

export const currentMonth = new Date().toLocaleString("default", {
  month: "long",
});

export const formatedWeekDays = {
  "0": 'ПН',
  "1": 'ВТ',
  "2": 'СР',
  "3": 'ЧТ',
  "4": 'ПТ',
  "5": 'СБ',
  "6": 'ВС'
}
