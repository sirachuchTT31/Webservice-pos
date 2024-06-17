import { BaseResultCommonService } from './../../utils/base-result-common.service';
import { Body, Controller, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { createUserInterfacce } from 'src/interface/user/create-user';
import { IBaseSingleResult } from 'src/interface/base-result/base-result';
import { resolve } from 'dns/promises';
import { reject } from 'underscore';

@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly BaseResultCommonService: BaseResultCommonService
  ) {

  }
  // @Post('create')
  // async create(@Body() createUser: createUserInterfacce): Promise<IBaseSingleResult> {
  //   try {
  //     const response = await this.userService.createUser(createUser);
  //     return response === true ? this.BaseResultCommonService.createSuccess({ status: true }) : this.BaseResultCommonService.createSuccess({ status: false, message: 'Duplicate user' })
  //   }
  //   catch (e) {
  //     this.BaseResultCommonService.internalServerError(e.message)
  //     console.log(e)
  //   }
  // }
}