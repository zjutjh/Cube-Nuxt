import type { AxiosError } from "axios";

export const SERVICE_RESP_CODE = {
  OK: 200
} as const;

type RequestErrorCodeType = string | number;

export class RequestError extends Error {
  public override message: string;
  public code: RequestErrorCodeType;
  public originError: unknown = null;

  constructor(message: string, code: RequestErrorCodeType) {
    super();
    this.message = message;
    this.code = code;
  }

  static fromAxiosError(err: AxiosError) {
    const requestError = new RequestError("网络异常", String(err.code ?? ""));
    requestError.originError = err;

    return requestError;
  }
}
