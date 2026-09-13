export const numberFormat = (num) => {
  if (!num) return "0";
  return num.toLocaleString();
};
