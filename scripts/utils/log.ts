enum LogColor {
  RED = '\u001b[1;31m',
  GREEN = '\u001b[1;32m',
  YELLOW = '\u001b[1;33m',
  BLUE = '\u001b[1;34m',
  PURPLE = '\u001b[1;35m',
  CYAN = '\u001b[1;36m',
}

const error = (message: any) => console.log(`${LogColor.RED} ${message}`);
const info = (message: any) => console.log(`${LogColor.GREEN} ${message}`);
const warning = (message: any) => console.log(`${LogColor.YELLOW} ${message}`);
const processing = (message: any) => console.log(`${LogColor.CYAN} ${message}`);

export {
  error,
  info,
  warning,
  processing
}