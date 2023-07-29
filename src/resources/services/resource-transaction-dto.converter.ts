import { Injectable } from '@nestjs/common';
import { ResourceTransactionDto } from '../dtos/resource-transaction.dto';
import { ResourceTransaction } from '../models/resource-transaction.model';

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
