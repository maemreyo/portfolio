const colors = [
  "linear-gradient(to right, #495aff 0%,  #0acffe 100%)",
  "linear-gradient(to right, #0acffe 0%, #495aff 100%)",
];

const getColorByIndex = (index: number) => colors[index % colors.length];

export { getColorByIndex };
