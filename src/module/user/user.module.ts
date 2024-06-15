import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { PrismaModule } from 'src/common/prisma/prisma.module';
import { BaseResultCommonService } from 'src/utils/base-result-common.service';

@Module({
  imports: [PrismaModule],
  controllers: [UserController],
  providers: [UserService, BaseResultCommonService],
})
export class UserModule { }
