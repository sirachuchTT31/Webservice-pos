import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { BaseResultCommonService } from 'src/utils/base-result-common.service';

@Module({
  providers: [AuthService, BaseResultCommonService],
})
export class AuthModule { }
