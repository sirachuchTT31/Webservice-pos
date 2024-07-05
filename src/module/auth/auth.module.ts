import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { BaseResultCommonService } from 'src/utils/base-result-common.service';
import { PrismaService } from 'src/common/prisma/prisma.service';
import { PrismaModule } from 'src/common/prisma/prisma.module';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { GoogleStrategy } from 'src/strategy/google-strategy/google-strategy';
import { EncryptService } from 'src/common/encrypt/encrypt.service';

@Module({
  imports: [
    PrismaModule,
    JwtModule.register(
      {
        global: true,
        secret: process.env.ACCESS_TOKEN_SECRET,
        signOptions: {
          expiresIn: process.env.ACCESS_TOKEN_EXPIRATION,
          algorithm: 'HS256',
        }
      }
    )
  ],
  controllers: [AuthController],
  providers: [AuthService, BaseResultCommonService, GoogleStrategy, EncryptService],
})
export class AuthModule { }
