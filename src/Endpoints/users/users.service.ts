import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserDto } from './dto/user.dto';
import { UserEntity } from '../../TypeOrm/Entities/user.entity';
import { CreateUserDto } from './dto/user.create.dto';
import { LoginUserDto } from './dto/user-login.dto';
import { comparePasswords } from '../../Utils/utils';
import { userRepository } from '../../TypeOrm/Repositories/user.repository';

@Injectable()
export class UsersService {
  constructor(

  ) {
  }

  async findOne(options?: object) {
    const user = await userRepository.findOne(options);

    delete user.password
    return user as UserDto;
  }


  async create(userDto: CreateUserDto) {
    const userInDb = await userRepository.findOne({ where: { username: userDto.username } });
    if (userInDb) {
      throw new HttpException('User already exists', HttpStatus.FORBIDDEN);
    }

    const user: UserEntity = await userRepository.create({
      username: userDto.username,
      password: userDto.password,
      email: userDto.email,
    });

    await userRepository.save(user);

    delete user.password
    return user as UserDto;
  }


  async findByLogin(userDto: LoginUserDto) {
    const user = await userRepository.findOne({ where: { email: userDto.email } });

    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    const checkPassword = await comparePasswords(user.password, userDto.password);

    if (!checkPassword) {
      throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
    }

    delete user.password
    return user as UserDto;
  }


}