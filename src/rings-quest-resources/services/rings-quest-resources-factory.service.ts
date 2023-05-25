import { BadRequestException, Injectable } from '@nestjs/common';
import { ResourcesFactory } from '../../resources/services/resources-factory.service';
import { Resource } from '../../resources/models/resource.model';
import { BlackHoles } from '../models/black-holes.model';
import { Coins } from '../models/coins.model';
import { ResourceType } from '../models/resource-type.enum';
import { ResourcesNames } from '../models/resources-names.enum';
import { GenericWrapper } from '../models/generic-wrapper.model';

@Injectable()
export class RingsQuestResourcesFactory extends ResourcesFactory {
  create(name: string, type: string): Resource {
    switch (type) {
      case ResourceType.CURRENCY:
        switch (name) {
          case ResourcesNames.COINS:
            return new Coins();
        }
      case ResourceType.CURRENCY:
        switch (name) {
          case ResourcesNames.BLACK_HOLES:
            return new BlackHoles();
        }
      case ResourceType.WRAPPER:
        switch (name) {
          case ResourcesNames.CHEST:
            return new GenericWrapper();
          case ResourcesNames.STAR:
            return new GenericWrapper();
        }
    }
    throw new BadRequestException(
      `Not supported resource: { type: ${type}, name: ${name} }`,
    );
  }
}
