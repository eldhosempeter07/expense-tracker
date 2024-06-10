export const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  // Get the year, month, and day components
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  // Return the formatted date string
  return `${year}-${month}-${day}`;
};
