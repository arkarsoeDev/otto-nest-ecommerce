import { CallHandler, ExecutionContext, NestInterceptor, UseInterceptors } from "@nestjs/common";
import { plainToClass } from "class-transformer";
import { map, Observable } from "rxjs";

interface ClassConstructor {
  new(...args: any[]): NonNullable<unknown>
}

export function Serialize(dto: ClassConstructor) {
  return UseInterceptors(new SerializeInterCeptor(dto))
}

export class SerializeInterCeptor implements NestInterceptor {
  constructor(private dto: ClassConstructor) { }

  intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any> | Promise<Observable<any>> {
    return next.handle().pipe(
      map((data: any) => {
        if (!data) {
          return data;
        }

        if (data.content) {
          const { content, ...rest } = data;
          const transformedContent = Array.isArray(content)
            ? content.map(item => plainToClass(this.dto, item, { excludeExtraneousValues: false }))
            : plainToClass(this.dto, content, { excludeExtraneousValues: false });

          return {
            content: transformedContent,
            ...rest,
          };
        } else {
          console.log(data)
          const transformedData = plainToClass(this.dto, data, { excludeExtraneousValues: false });
          return transformedData;
        }
      })
    )
  }
}
