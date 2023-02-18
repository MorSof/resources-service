import { Injectable } from '@nestjs/common';
import { Bar } from '../models/bar.model';
import { BarRequestDto } from '../dtos/bar-request.dto';
import { BarResponseDto } from '../dtos/bar-response.dto';
import { ResourcesDtoConverter } from '../../../../../core/resources/convertes/resources-dto.converter';

@Injectable()
export class BarDtoConverter {
  constructor(private readonly resourcesDtoConverter: ResourcesDtoConverter) {}

  public convertFrom(barRequestDto: BarRequestDto): Bar {
    const { goal, rewards } = barRequestDto;
    return new Bar({
      goal,
      rewards: rewards.map((reward) =>
        this.resourcesDtoConverter.convertFrom(reward),
      ),
    });
  }

  public convertTo(bar: Bar): BarResponseDto {
    const { goal, rewards } = bar;
    return new BarResponseDto({ goal, rewards });
  }
}
