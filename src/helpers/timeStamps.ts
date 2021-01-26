import dayjs from "dayjs";

dayjs.extend(require("dayjs/plugin/relativeTime"));

export const convertTimeToFrom = (dateStr: string) => {
  // @ts-ignore
  return dayjs(dateStr).fromNow();
};
