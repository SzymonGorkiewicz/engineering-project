import { PartialType } from '@nestjs/mapped-types';
import { CreateBodyStatDto } from './create-body-stat.dto';

export class UpdateBodyStatDto extends PartialType(CreateBodyStatDto) {}
