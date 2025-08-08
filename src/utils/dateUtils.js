export function formatDateToVerbose(dateString) {
  // Create a Date object from the string (assuming it's in "YYYY-MM-DD" format)
  const date = new Date(dateString);

  // Options for verbose date format
  const options = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };

  // Use toLocaleDateString to format the date
  return date.toLocaleDateString("en-US", options);
}
