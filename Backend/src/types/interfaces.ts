
export interface ResponseItem<T> {
  message?: string;
  status?: boolean;
  data?: T;
}

export class ErrorWithStatus extends Error {
  status?: number;
  constructor(message: string, statusCode: number) {
    super(message);
    this.status = statusCode;
  }
}

export interface TokenPayload {
  _id: string;
  fullname: string;
  email: string;
}

export interface AuthRequestBody {
  email: string;
  password: string;
}