export class GraphDataDto {
  name: string
  total: number

  constructor(partial: Partial<GraphDataDto> = {}) {
    Object.assign(this, partial);
  }
}
