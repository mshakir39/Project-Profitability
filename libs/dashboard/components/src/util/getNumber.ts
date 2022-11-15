export const getNumber = (number: string) => {
  return Number(number && number.split("%")[0]);
};
