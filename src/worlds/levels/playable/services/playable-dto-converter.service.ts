import { Injectable } from '@nestjs/common';
import { Playable } from '../models/playable.model';
import { PlayableRequestDto } from '../dtos/playable-request.dto';
import { PlayableResponseDto } from '../dtos/playable-response.dto';

@Injectable()
export class PlayableDtoConverter {
  public convertFrom(playableRequestDto: PlayableRequestDto): Playable {
    const { type, subType, name, duration, cooldown, vertices, score } =
      playableRequestDto;
    return new Playable({
      type,
      subType,
      name,
      duration,
      cooldown,
      vertices,
      score,
    });
  }

  public convertTo(goal: Playable): PlayableResponseDto {
    const { type, subType, name, duration, cooldown, vertices, score } = goal;
    return new PlayableResponseDto({
      type,
      subType,
      name,
      duration,
      cooldown,
      vertices,
      score,
    });
  }
}
