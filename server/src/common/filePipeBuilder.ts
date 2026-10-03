import { HttpStatus, ParseFilePipeBuilder } from '@nestjs/common';

export const ParseFile = new ParseFilePipeBuilder()
  .addMaxSizeValidator({
    maxSize: 500 * 1024 * 1024,
  })
  .build({
    errorHttpStatusCode: HttpStatus.PAYLOAD_TOO_LARGE,
  });
