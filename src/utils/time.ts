import moment from "moment";

const formatTime = (time: string, currentFormat: string, format: string) =>
  moment(time, currentFormat).format(format);
export { formatTime };
