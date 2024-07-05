import { EncryptService } from './../../common/encrypt/encrypt.service';
import { Body, Controller, Get, Post, UseGuards, Request, Res } from '@nestjs/common';
import { Response } from 'express';
import { BaseResultCommonService } from 'src/utils/base-result-common.service';
import { IBaseSingleResult } from 'src/interface/base-result/base-result';
import { AuthService } from './auth.service';
import { signInInterface } from 'src/interface/auth/sign-in';
import { signUpInterface } from 'src/interface/auth/sign-up';
import { ApiTags } from "@nestjs/swagger";
import _ from 'underscore';
import { refreshTokenInterface } from 'src/interface/auth/refresh-token';
import { GoogleOauthGuardGuard } from '../guard/google-oauth-guard/google-oauth-guard.guard';
@Controller('auth')
@ApiTags('Auth')
export class AuthController {

    constructor(
        private readonly BaseResultCommonService: BaseResultCommonService,
        private authService: AuthService,
        private encryptService: EncryptService) {

    }

    @Post('signin')
    async signIn(@Body() payload: signInInterface) {
        return await this.authService.signIn(payload)
    }

    @Get('google')
    @UseGuards(GoogleOauthGuardGuard)
    async googleSignIn(@Request() req) {
        console.log('dsadsa', req)
    }

    @Get('google/callback')
    @UseGuards(GoogleOauthGuardGuard)
    async googleAuthRedirect(@Request() req, @Res() res: Response) {
        // const response = await this.authService.googleSignIn(req)
        // const formatJSON = JSON.stringify(response)
        // const ciplerResponse = this.encryptService.encrypt(formatJSON)
        // res.cookie(
        //     'credentialsGoogle', ciplerResponse,
        //     {
        //         httpOnly : false,
        //         secure: true,
        //         sameSite: 'strict',
        //         path: '/'
        //     })
        // res.redirect(process.env.CLIENT_BASE);
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
