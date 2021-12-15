export const todayFormat = () => {
  const today = new Date();
  const format = num => (num < 10 ? `0${num}` : `${num}`);
  return `${today.getFullYear()}/${format(today.getMonth() + 1)}/${format(today.getDate())}`;
};
