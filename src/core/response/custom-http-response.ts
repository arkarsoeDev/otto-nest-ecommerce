import { BadRequestException, NotFoundException } from "@nestjs/common";
import { CustomResponse, Payload } from "./custom-response.interface";

export class CustomHttpResponse implements CustomResponse {
  NotFoundException(payload: Payload): void {
    throw new NotFoundException(payload.message ?? 'Not Found');
  }

  BadRequestException(payload: Payload): void {
    throw new BadRequestException(payload.message ?? 'Bad Request')
  }
}
