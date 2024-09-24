import { ApiProperty } from "@nestjs/swagger";

export class SingleResponseDto<T> {
  @ApiProperty()
  content: T;

  constructor(partial: Partial<SingleResponseDto<T>> = {}) {
    Object.assign(this, partial);
  }

  static from<T>({
    data
  }: {
    data: T;
  }): SingleResponseDto<T> {
    return new SingleResponseDto({
      content: data
    });
  }
}
