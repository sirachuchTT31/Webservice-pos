import { Body, Controller, Post } from '@nestjs/common';
import { BaseResultCommonService } from 'src/utils/base-result-common.service';
import { IBaseSingleResult } from 'src/interface/base-result/base-result';
import { AuthService } from './auth.service';
import { signInInterface } from 'src/interface/auth/sign-in';
import { signUpInterface } from 'src/interface/auth/sign-up';
import { ApiTags } from "@nestjs/swagger";
import _ from 'underscore';
@Controller('auth')
@ApiTags('Auth')
export class AuthController {

    constructor(
        private readonly BaseResultCommonService: BaseResultCommonService,
        private authService: AuthService) {

    }

    // @Post('signin')
    // async signIn(@Body() createUser: signInInterface): Promise<IBaseSingleResult> {
    //     try {
    //         const response = await this.authService.signIn()
    //         this.BaseResultCommonService.successSingleResult({ result: {}, status: true, message: 'Signing in successfully' });
    //         return
    //     }
    //     catch (e) {
    //         this.BaseResultCommonService.internalServerError(e.message)
    //         console.log(e)
    //     }
    // }

    @Post('register')
    async register(@Body() payload: signUpInterface) {
        return this.authService.signUp(payload)
    }
}
