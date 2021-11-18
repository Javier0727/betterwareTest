export const formatCurrency = (number: string | number) => {
  const format = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });
  return format.format(+number);
};
