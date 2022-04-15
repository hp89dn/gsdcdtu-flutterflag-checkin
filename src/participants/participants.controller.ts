import { Roles } from 'src/common/decorators/role.decorator';
import { Role } from 'src/common/enums/role.enum';
import { RolesGuard } from 'src/common/guards/role.guard';

import {
    BadRequestException, Body, Controller, Delete, Get, Param, Post, Put, UseGuards
} from '@nestjs/common';

import { ParticipantService } from './participants.service';

const validateEmail = (email) => {
  return String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    );
};

@Controller('/participants')
export class ParticipantController {
  constructor(private readonly participantService: ParticipantService) {}

  @Post()
  async create(@Body('email') email: string, @Body('name') name: string) {
    if (!email || !name)
      throw new BadRequestException('Email and name must be provided');
    const participant = await this.participantService.findByEmail(email.trim());

    if (participant) return participant;

    return await this.participantService.create({
      name: name,
      email: email,
      status: 'not participate',
    });
  }

  @Get()
  findAll() {
    return this.participantService.findAll();
  }

  @Put()
  async update(@Body('email') email: string) {
    if (!validateEmail(email)?.input)
      throw new BadRequestException('Invalid email');

    const participant = await this.participantService.findByEmail(email.trim());

    if (!participant) throw new BadRequestException('Participant not found');

    return await this.participantService.update(participant.id, {
      name: participant.name,
      email: participant.email,
      status: 'participated',
    });
  }

  @Put('/:id')
  async updateById(@Param('id') id: string, @Body('status') status: string) {
    if (status !== 'participated') status = 'not participate';
    const participant = await this.participantService.findOne(id);

    if (!participant) throw new BadRequestException('Participant not found');

    return await this.participantService.update(id, {
      name: participant.name,
      email: participant.email,
      status,
    });
  }

  @Delete('/:id')
  async delete(@Param('id') id: string) {
    if (!id) throw new BadRequestException('Id is required');
    const participant = await this.participantService.findOne(id);
    if (!participant) throw new BadRequestException('Participant not found');
    return await this.participantService.remove(id);
  }
}
