import dayjs from "dayjs";

export const getTodayDate = () => {
  return dayjs().format("YYYY-MM-DD");
};

export const getTodayTime = () => {
  return dayjs().format("HH:mm:ss");
};

export const getTodayDateTime = () => {
  return dayjs().format("YYYY-MM-DDTHH:mm:ss");
};
