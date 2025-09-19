export const getCurrentCustomDate = (): string => {
  const now = new Date();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  const year = now.getFullYear();
  return `${month}-${day}-${year}`;
};

export const validateDateFormat = (dateString: string): boolean => {
  if (!dateString || typeof dateString !== 'string') {
    return false;
  }

  // Check MM-DD-YYYY format
  const datePattern = /^(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])-(\d{4})$/;
  if (!datePattern.test(dateString.trim())) {
    return false;
  }

  // Validate if it's a real date
  const [month, day, year] = dateString.split('-').map(Number);
  const date = new Date(year, month - 1, day);

  // Check if the date is valid (handles leap years, correct days per month)
  if (
    date.getFullYear() !== year ||
    date.getMonth() !== month - 1 ||
    date.getDate() !== day
  ) {
    return false;
  }

  return true;
};