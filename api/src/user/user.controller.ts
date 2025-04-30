import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';

@Controller('users')
export class UserController {
  @Get()
  getAllUsers() {
    // Logic to get all users
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  createUser() {
    // Logic to create a new user
  }

  @Get(':id')
  getUserById() {
    // Logic to get a user by ID
  }

  @Put(':id')
  updateUser() {
    // Logic to update a user by ID
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  deleteUser() {
    // Logic to delete a user by ID
  }
}
