import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/common/prisma/prisma.service';
import { signUpInterface } from 'src/interface/auth/sign-up';
import _ from 'underscore';
import * as bcrypt from 'bcrypt'
import { IBaseResultService, IBaseSingleResult } from 'src/interface/base-result/base-result';
import { BaseResultCommonService } from 'src/utils/base-result-common.service';
@Injectable()
export class AuthService {
    private saltRound: number = 10
    constructor(
        private readonly prismaService: PrismaService,
        private baseResultCommonService: BaseResultCommonService,
    ) { }

    async signIn() {

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
