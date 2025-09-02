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

/**
 * Converts an ISO date string (e.g., "2025-07-10") to a JavaScript Date object.
 * Supports format: YYYY-MM-DD
 */
export function parseISO(dateString) {
  if (typeof dateString !== "string") {
    throw new Error("Invalid date string");
  }

  const [year, month, day] = dateString.split("-").map(Number);

  // JavaScript Date: months are 0-based (Jan = 0)
  return new Date(year, month - 1, day);
}
