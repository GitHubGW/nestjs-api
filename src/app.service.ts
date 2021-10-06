import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  handleHome(): string {
    return 'Home';
  }

  handleProfile(): string {
    return 'Profile';
  }

  handleUser(): string {
    return 'User';
  }
}
