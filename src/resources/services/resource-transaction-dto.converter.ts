import { Injectable } from '@nestjs/common';
import { ResourceTransaction } from '../models/resource-transaction.model';
import { ResourceTransactionDto } from '../../api/build';

@Injectable()
export class ResourceTransactionDtoConverter {
  public toModel(dto: ResourceTransactionDto): ResourceTransaction {
    return {
      id: dto.id,
      amount: dto.amount,
    };
  }

  public toDto(model: ResourceTransaction): ResourceTransaction {
    const dto = new ResourceTransaction();
    dto.id = model.id;
    dto.amount = model.amount;
    return dto;
  }
}
