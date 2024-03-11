export const errorMessages = {
  required(fieldName: string) {
    return `${fieldName} is required`;
  },
  minLength(fieldName: string, length: number) {
    return `${fieldName} must be at least ${length} characters long`;
  },
  maxLength(fieldName: string, length: number) {
    return `${fieldName} must be at most ${length} characters long`;
  },
  invalidUrl: "Invalid URL",
};
