const generateImagePath = (source: string): string => {
  return `${process.env.PUBLIC_URL}/assets/${source}`;
};

export { generateImagePath };
