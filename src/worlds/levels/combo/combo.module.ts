import { Module } from '@nestjs/common';
import { BarModule } from './bar/bar.module';
import { ComboDtoConverter } from './services/combo-dto.converter';

@Module({
  imports: [BarModule],
  providers: [ComboDtoConverter],
  exports: [ComboDtoConverter],
})
export class ComboModule {}
