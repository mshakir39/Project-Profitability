export const getNumber: any = (number: string) => {
  if (
    /\d/.test(number) &&
    number !== "" &&
    number !== undefined &&
    typeof number === "string" &&
    number.includes("%")
  ) {
    return Number(number && number.split("%")[0]);
  }
  return number;
};
