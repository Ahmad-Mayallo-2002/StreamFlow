import { Injectable, Req } from '@nestjs/common';
import { type Request } from 'express';

@Injectable()
export class AppService {
  getHello(): object {
    return { msg: 'Hello World!' };
  }

  googleLogin(@Req() req: Request) {
    if (!req.user) return 'No user from google';

    return {
      message: 'User information from google',
      user: req.user,
    };
  }
}
