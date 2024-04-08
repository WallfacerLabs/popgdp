export class UnauthenticatedError extends Error {
  constructor() {
    super("Unauthenticated");
  }
}

export class UnauthorizedError extends Error {
  constructor() {
    super("Unauthorized");
  }
}
