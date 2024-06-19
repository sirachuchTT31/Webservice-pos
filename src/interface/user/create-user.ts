import { ApiProperty } from "@nestjs/swagger";

export class createUserInterfacce {

    @ApiProperty()
    email: string

    @ApiProperty()
    password: string

    @ApiProperty()
    first_name: string

    @ApiProperty()
    last_name: string
}