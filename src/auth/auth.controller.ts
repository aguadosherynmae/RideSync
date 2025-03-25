import { Controller, Post, Body, Param, Put, ParseIntPipe} from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { UpdateDto } from './dto/update.dto';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

  @Post('register')
  register(@Body() dto: RegisterDto) {
    return this.authService.register(dto);
  }
  @Post('login')
  login(@Body() dto: LoginDto) {
    return this.authService.login(dto);
  }
  @Put('update/:id')
  async updateCredentials(
      @Param('id', ParseIntPipe) id: number,
      @Body() updateDto: UpdateDto
  ) {
      return this.authService.updateCredentials(id, updateDto);
  }
}
