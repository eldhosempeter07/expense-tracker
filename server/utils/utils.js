export const generateUniqueId = () => {
  const timestamp = new Date().getTime();
  const uniqueId = timestamp % 100000;
  return uniqueId;
};
