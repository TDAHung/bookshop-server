import { PassportSerializer } from '@nestjs/passport';
import { Inject, Injectable } from '@nestjs/common';
import { AdminAuthService } from '../auth.service';
@Injectable()
export class SessionSerializer extends PassportSerializer {
    serializeUser(user: any, done: (err: Error, user: any) => void): any {
        done(null, user);
    }
    deserializeUser(payload: any, done: Function) {
        done(null, payload)
    }
}
