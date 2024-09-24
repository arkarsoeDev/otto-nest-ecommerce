import { CustomHttpResponse } from "./custom-http-response";
import { CustomResponse, Payload } from "./custom-response.interface";

export class CustomResponseService {
  constructor(private response: CustomResponse) { }

  NotFoundException(payload: Payload) {
    this.response.NotFoundException(payload)
  }

  BadRequestException(payload: Payload) {
    this.response.BadRequestException(payload)
  }
}

export const customHttpResponse = new CustomResponseService(new CustomHttpResponse())
