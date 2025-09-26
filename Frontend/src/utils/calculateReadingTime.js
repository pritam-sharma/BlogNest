const calculateReadingTime = (content) => {
  const wordsPerMin = 200;
  const totalWords = content ? content.split(/\s+/) : [];
  const minutes = totalWords.length / wordsPerMin;
  const readTime = Math.ceil(minutes);
  return readTime;
};
export default calculateReadingTime;
