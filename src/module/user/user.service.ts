import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/common/prisma/prisma.service';
import { createUserInterfacce } from 'src/interface/user/create-user';
import * as bcrypt from 'bcrypt'

@Injectable()
export class UserService {
    private saltRound: number = 10
    constructor(private prismaService: PrismaService) {

    }

    // async createUser(createUser: createUserInterfacce) {
    //     const salt = await bcrypt.genSalt(this.saltRound)
    //     const hash = await bcrypt.hash(createUser.password, salt);
    //     const response = await this.prismaService.user.create({
    //         data: {
    //             username: createUser.username,
    //             email: createUser.email,
    //             password: hash,
    //             first_name: createUser.first_name,
    //             last_name: createUser.last_name
    //         }
    //     });
    //     return response ? true : false
    // }
}
