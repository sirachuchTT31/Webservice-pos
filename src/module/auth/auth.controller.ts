import { Body, Controller, Post } from '@nestjs/common';
import { BaseResultCommonService } from 'src/utils/base-result-common.service';
import { IBaseSingleResult } from 'src/interface/base-result/base-result';
import { AuthService } from './auth.service';
import { signInInterface } from 'src/interface/auth/sign-in';
import { signUpInterface } from 'src/interface/auth/sign-up';
import { ApiTags } from "@nestjs/swagger";
import _ from 'underscore';
import { refreshTokenInterface } from 'src/interface/auth/refresh-token';
@Controller('auth')
@ApiTags('Auth')
export class AuthController {

    constructor(
        private readonly BaseResultCommonService: BaseResultCommonService,
        private authService: AuthService) {

    }

    @Post('signin')
    async signIn(@Body() payload: signInInterface) {
        return await this.authService.signIn(payload)
    }

    @Post('refresh')
    async refreshToken(@Body() payload: refreshTokenInterface) {
        return await this.authService.refreshToken(payload)
    }

    @Post('register')
    async register(@Body() payload: signUpInterface) {
        return this.authService.signUp(payload)
    }
}
