export default abstract class TSJSError {
  /**
   * Gets a unique pseudo error code.
   */
  public abstract getCode(): string;
  /**
   * Gets a user-friendly message describing the error.
   */
  public abstract getMessage(): string;
}
