import { Module } from '@nestjs/common';
import { AppleAuthService } from './apple-auth.service';

@Module({
  providers: [AppleAuthService],
  exports: [AppleAuthService],
})
export class AppleModule {}