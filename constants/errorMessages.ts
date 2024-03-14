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
  nonEmptyString(fieldName: string) {
    return `${fieldName} cannot be empty`;
  },
  invalidUrl: "Invalid URL",
};
