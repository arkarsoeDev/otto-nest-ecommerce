export interface Payload {
  message: string
}

export interface CustomResponse {
  NotFoundException(payload: Payload): void;

  BadRequestException(payload: Payload): void;
}
