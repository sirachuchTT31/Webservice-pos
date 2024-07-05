import { Injectable } from '@nestjs/common';
import * as Crypto from 'crypto-js'
@Injectable()
export class EncryptService {

    public encrypt(original: string): string {
        const cipler = Crypto.AES.encrypt(original, process.env.SECRET_KEY);
        return cipler.toString();
    }

    public decrypt(cipler: string): string {
        const bytes = Crypto.AES.decrypt(cipler, process.env.SECRET_KEY).toString(Crypto.enc.Utf8);
        return bytes
    }
}
