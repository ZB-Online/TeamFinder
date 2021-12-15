export const todayFormat = () => {
  const format = num => (num < 10 ? `0${num}` : `${num}`);

  const today = new Date();
  // Todo: Time
  return `${today.getFullYear()}-${format(today.getMonth() + 1)}-${format(today.getDate())}`;
};
