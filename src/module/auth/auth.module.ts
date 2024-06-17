import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { BaseResultCommonService } from 'src/utils/base-result-common.service';
import { PrismaService } from 'src/common/prisma/prisma.service';
import { PrismaModule } from 'src/common/prisma/prisma.module';
import { AuthController } from './auth.controller';

@Module({
  imports: [PrismaModule],
  controllers: [AuthController],
  providers: [AuthService, BaseResultCommonService,],
})
export class AuthModule { }
