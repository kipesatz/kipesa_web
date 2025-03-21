export function convertCamelCaseToTitleCase(camelCaseText: string): string {
  // Split the camelCase text into words
  const words = camelCaseText.split(/(?=[A-Z])/);

  // Capitalize the first letter of the first word and lowercase the rest
  const titleCaseWords = words.map((word, index) => {
    if (index === 0) {
      return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
    }
    return word.toLowerCase();
  });

  // Join the words back together with spaces
  return titleCaseWords.join(' ');
}
