import { Injectable } from '@nestjs/common';
import { ComboRequestDto } from '../dtos/combo-request.dto';
import { Combo } from '../models/combo.model';
import { ComboResponseDto } from '../dtos/combo-response.dto';
import { BarDtoConverter } from '../bar/services/bar-dto.converter';

@Injectable()
export class ComboDtoConverter {
  constructor(private readonly barDtoConverter: BarDtoConverter) {}

  public convertFrom(comboRequestDto: ComboRequestDto): Combo {
    const { bars } = comboRequestDto;
    return new Combo({
      bars: bars.map((bar) => this.barDtoConverter.convertFrom(bar)),
    });
  }

  public convertTo(combo: Combo): ComboResponseDto {
    const { bars } = combo;
    return new ComboResponseDto({ bars });
  }
}
