export class OpenNodeError extends Error {
  constructor(
    message: string | undefined,
    public name: string = "unknown",
    public status?: number
  ) {
    super(message);
  }
}
