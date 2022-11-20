export const getNumber: any = (number: string) => {
  if (
    /\d/.test(number) &&
    number !== "" &&
    number !== undefined &&
    typeof number === "string"
  ) {
    if (number.includes("%")) {
      return Number(number && number.split("%")[0]);
    } else {
      return Number(number && number.split("$")[1]);
    }
  }

  return number;
};
