import { BadRequestException, Injectable } from '@nestjs/common';
import { ResourcesFactory } from '../../resources/services/resources-factory.service';
import { Resource } from '../../resources/models/resource.model';
import { BlackHoles } from '../models/black-holes.model';
import { Coins } from '../models/coins.model';
import { ResourcesNames } from '../../resources/models/resources-names.enum';

@Injectable()
export class RingsQuestResourcesFactory extends ResourcesFactory {
  create(name: ResourcesNames): Resource {
    console.log(ResourcesNames.COINS);
    console.log(name);
    console.log(ResourcesNames.COINS == name);
    switch (name) {
      case ResourcesNames.COINS:
        return new Coins();
      case ResourcesNames.BLACK_HOLES:
        return new BlackHoles();
    }
    throw new BadRequestException(`Not supported resource name ${name}`);
  }
}
