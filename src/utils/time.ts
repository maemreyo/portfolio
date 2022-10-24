import moment from "moment";
import { NOW } from "../constants/time";

const formatTime = (time: string, format: string, currentFormat = "DDMMYYYY") =>
  moment(time, currentFormat).format(format);

const getTime = (fromDate: string, toDate: string): string => {
  if (toDate === NOW) {
    return `${formatTime(fromDate, "MM/YYYY")} - now`;
  } else {
    return `${formatTime(fromDate, "MM/YYYY")} - ${formatTime(
      toDate,
      "MM/YYYY"
    )}`;
  }
};

export { formatTime, getTime };
