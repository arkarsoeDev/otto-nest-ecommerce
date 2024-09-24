import { SingleResponseDto } from '@/core/models/general/single-response.dto';
import { Type, applyDecorators } from '@nestjs/common';
import { ApiExtraModels, ApiOkResponse, getSchemaPath } from '@nestjs/swagger';

export const ApiOkResponseSingle = <ContentType extends Type<unknown>>(
  contentType: ContentType,
) =>
  applyDecorators(
    ApiExtraModels(SingleResponseDto, contentType),
    ApiOkResponse({
      schema: {
        allOf: [
          { $ref: getSchemaPath(SingleResponseDto) },
          {
            properties: {
              content: { $ref: getSchemaPath(contentType) }
            },
          },
        ],
      },
    }),
  );
