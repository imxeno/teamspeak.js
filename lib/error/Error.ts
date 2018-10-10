/**
 * @abstract
 */
export default class TSJSError {
    /**
     * Constructs an instance of TSJSError
     * @constructor
     * @param {TSJSResponse} response response of error-type
     */
    constructor() {
    }
    /**
     * Gets a unique pseudo error code.
     * @abstract
     * @returns {string} pseudo error code (error code prefixed with
     *                   an identificator of the component which errored)
     */
    public getCode() {
        throw new Error("Unimplemented");
    }
    /**
     * Gets a user-friendly message describing the error.
     * @abstract
     * @returns {string} user-friendly message describing the error
     */
    public getMessage() {
        throw new Error("Unimplemented");
    }
  }
