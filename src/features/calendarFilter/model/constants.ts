export const settings = {
  slidesToShow: 22,
  slidesToScroll: 5,
  speed: 500,
  className: "mt-3",
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
