import { ApiProperty } from "@nestjs/swagger";

export class signInInterface {
    @ApiProperty()
    email: string

    @ApiProperty()
    password: string
}