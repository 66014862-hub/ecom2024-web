export const dateFormat = (dateStr) => {
  if (!dateStr) return "";
  return new Date(dateStr).toLocaleString("th-TH", {
    dateStyle: "medium",
    timeStyle: "short",
  });
};