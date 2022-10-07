import { format } from "date-fns";

export const formatDate = (date: Date | undefined | number) => {
  if (date === undefined) return;
  return date ? format(date, "dd MMM yyyy hh:mmaaa") : "undefined";
};
