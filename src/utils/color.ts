const colors = [
  "linear-gradient(to bottom, #495aff 0%, #0acffe 75%, #0acffe 100%)",
  "linear-gradient(to top, #0acffe 0%, #0acffe 30%, #495aff 100%)",
];

const getColorByIndex = (index: number) => colors[index % colors.length];

export { getColorByIndex };
