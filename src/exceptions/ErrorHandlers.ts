import { Request, Response } from 'express';
import { IError } from '../interfaces';
import { ErrorCode } from './ErrorCodes';

interface ErrorParam {
  data?: unknown;
  message?: string;
}

/**
 * Handles unknown route errors
 */
export async function unknownRouteError(
  req: Request,
  res: Response
): Promise<Response> {
  return res.status(404).json({
    errors: {
      message: 'Route not found.',
      error: {
        status: 404,
      },
    },
  });
}

abstract class BaseError extends Error implements IError {
  code: string;
  message: string;
  data?: unknown;
  metaData: any;
  subCode?: string;

  protected constructor(message: string, config) {
    super(message);
    this.metaData = config.metaData || {};
    this.message = message;
    this.subCode = config.subCode;
    Object.setPrototypeOf(this, new.target.prototype);
    this.name = this.constructor.name;
  }
}

export class UnauthorizedAccess extends BaseError {
  constructor(message: string = ErrorCode.BAD_REQUEST, config = {}) {
    super(message, config);
  }
}

export class ForbiddenAccess extends BaseError {
  constructor(message: string = ErrorCode.BAD_REQUEST, config = {}) {
    super(message, config);
  }
}

export class ServerError extends BaseError {
  constructor(message: string = ErrorCode.BAD_REQUEST, config = {}) {
    super(message, config);
  }
}

export class BadRequest extends BaseError {
  constructor(message: string = ErrorCode.BAD_REQUEST, config = {}) {
    super(message, config);
  }
}

export class ResourceNotFoundError extends BaseError {
  constructor(message: string = ErrorCode.RESOURCE_NOT_FOUND, config = {}) {
    super(message, config);
  }
}

export class Conflict extends BaseError {
  constructor(message: string = ErrorCode.CONFLICT, config = {}) {
    super(message, config);
  }
}

export const HandleErrorResponse = (err: any, res: Response) => {
  return res.status(500).json({
    code: err.code || err.name,
    message: err.message,
  });
};
