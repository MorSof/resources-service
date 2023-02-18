import { Module } from '@nestjs/common';
import { PlayableDtoConverter } from './services/playable-dto-converter.service';

@Module({
  providers: [PlayableDtoConverter],
  exports: [PlayableDtoConverter],
})
export class PlayableModule {}
