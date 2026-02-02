import { SetMetadata } from '@nestjs/common';
import { RESPONSE_SUMMARY_REFLECTOR_KEY as summary_key } from '@shared/constants';

export const Summary = (message: string, description?: string) =>
  SetMetadata(summary_key, { message, description });
