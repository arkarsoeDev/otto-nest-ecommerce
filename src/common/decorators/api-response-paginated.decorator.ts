import { PaginatedResponseDto } from '@/core/models';
import { Type, applyDecorators } from '@nestjs/common';
import { ApiExtraModels, ApiOkResponse, getSchemaPath } from '@nestjs/swagger';

export const ApiOkResponsePaginated = <ContentType extends Type<unknown>>(
  contentType: ContentType,
) =>
  applyDecorators(
    ApiExtraModels(PaginatedResponseDto, contentType),
    ApiOkResponse({
      schema: {
        allOf: [
          { $ref: getSchemaPath(PaginatedResponseDto) },
          {
            properties: {
              content: {
                type: 'array',
                items: { $ref: getSchemaPath(contentType) },
              },
            },
          },
        ],
      },
    }),
  );
