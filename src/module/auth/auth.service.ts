import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/common/prisma/prisma.service';
import { signUpInterface } from 'src/interface/auth/sign-up';
import _ from 'underscore';
import * as bcrypt from 'bcrypt'
import { IBaseResultService, IBaseSingleResult } from 'src/interface/base-result/base-result';
import { BaseResultCommonService } from 'src/utils/base-result-common.service';
import { signInInterface } from 'src/interface/auth/sign-in';
import { JwtService } from '@nestjs/jwt';
import { refreshTokenInterface } from 'src/interface/auth/refresh-token';
@Injectable()
export class AuthService {
    private saltRound: number = 10
    constructor(
        private readonly prismaService: PrismaService,
        private baseResultCommonService: BaseResultCommonService,
        private readonly jwtService: JwtService
    ) { }

    async signIn(payload: signInInterface): Promise<IBaseSingleResult> {
        try {
            const findUser = await this.prismaService.user.findFirst({
                where: {
                    email: payload.email
                }
            });
            if (!_.isEmpty(findUser)) {
                const isCompare = await bcrypt.compare(payload.password, findUser.password);
                if (isCompare === true) {
                    const payload = {
                        email: findUser.email,
                        first_name: findUser.first_name,
                        last_name: findUser.last_name,
                    }
                    const accessToken = this.jwtService.sign(payload, { algorithm: 'HS256', expiresIn: process.env.ACCESS_TOKEN_EXPIRATION });
                    const refreshToken = this.jwtService.sign(payload, { algorithm: 'HS256', expiresIn: process.env.REFRESH_TOKEN_EXPIRATION, secret: process.env.REFRESH_TOKEN_SECRET })
                    const expiresIn = this.jwtService.decode(accessToken);
                    return this.baseResultCommonService.successSingleResult({
                        status: true,
                        result: {
                            access_token: accessToken,
                            refresh_token: refreshToken,
                            exp: expiresIn.exp
                        },
                        message: 'Sign in successfully'
                    })
                }
                return this.baseResultCommonService.successSingleResult({
                    status: false,
                    result: {},
                    message: 'Invalid username or password'
                })
            }
            return this.baseResultCommonService.successSingleResult({
                status: false,
                result: {},
                message: 'Invalid username or password'
            })
        }
        catch (e) {
            console.log(e)
            return this.baseResultCommonService.internalServerError(e.message)
        }
    }

    async refreshToken(payload: refreshTokenInterface): Promise<IBaseSingleResult> {
        try {
            const verifyRefreshToken = await this.jwtService.verify(payload.refresh_token, { algorithms: ['HS256'], secret: process.env.REFRESH_TOKEN_SECRET });
            if (!_.isEmpty(verifyRefreshToken)) {
                // const payload = {
                //     email : ,
                //     first_name : ,
                //     last_name : ,
                //     iat : ,
                //     exp: : 
                // }
            }
        }
        catch (e) {
            console.log(e)
            return this.baseResultCommonService.internalServerError(e.message)
        }
    }

    async signUp(payload: signUpInterface): Promise<IBaseSingleResult> {
        try {

            const findUser = await this.prismaService.user.findFirst({
                where: {
                    OR: [
                        {
                            username: payload.username
                        },
                        {
                            email: payload.email
                        }
                    ]
                }
            });
            if (_.isEmpty(findUser)) {
                const salt = await bcrypt.genSalt(this.saltRound)
                const hash = await bcrypt.hash(payload.password, salt);
                await this.prismaService.user.create({
                    data: {
                        username: payload.username,
                        password: hash,
                        email: payload.email,
                        first_name: payload.first_name,
                        last_name: payload.last_name,
                    }
                });
                return this.baseResultCommonService.successSingleResult({
                    status: true,
                    result: {},
                })
            }
            return this.baseResultCommonService.successSingleResult({
                status: false,
                result: {},
                message: 'User already exists'
            })
        }
        catch (e) {
            console.log(e)
            return this.baseResultCommonService.internalServerError(e.message)
        }
    }
}
