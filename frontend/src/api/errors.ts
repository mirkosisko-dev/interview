export class ApiError extends Error {
  statusCode: number;
  code?: string;

  constructor(message: string, statusCode: number, code?: string) {
    super(message);
    this.statusCode = statusCode;
    this.code = code;
    this.name = "ApiError";
  }
}

export class ValidationError extends ApiError {
  constructor(message: string = "Invalid request data") {
    super(message, 400, "VALIDATION_ERROR");
    this.name = "ValidationError";
  }
}

export class ServerError extends ApiError {
  constructor(message: string = "Server error. Please try again later.") {
    super(message, 500, "INTERNAL_ERROR");
    this.name = "ServerError";
  }
}

export class NotFoundError extends ApiError {
  constructor(message: string = "Resource not found") {
    super(message, 404, "NOT_FOUND");
    this.name = "NotFoundError";
  }
}
