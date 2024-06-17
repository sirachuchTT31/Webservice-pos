import { ApiProperty } from "@nestjs/swagger";

export class refreshTokenInterface {
    @ApiProperty()
    refresh_token: string
}