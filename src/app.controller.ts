import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  handleHome(): string {
    return this.appService.handleHome();
  }

  @Get('/profile')
  handleProfile(): string {
    return this.appService.handleProfile();
  }

  @Get('/user')
  handleUser(): string {
    return this.appService.handleUser();
  }
}
