import { PriceRV } from '@Common/entities/PriceRV';
import { Entity } from '@Common/entities/Entity';
import { Pageable } from '@Common/utils/Page';
import { Decodable } from '@Common/utils/Decodable';

export class ExchangeRate extends Entity implements Decodable, Pageable {
    id?: number;
    value?: number;
    createdAt?: Date;
    priceRvs?: PriceRV[];
    total?: number;

   constructor(entity?: ExchangeRate) {
        super(entity);
        this.id = entity ? entity.id : undefined;
        this.value = entity ? entity.value : undefined;
        this.createdAt = entity ? entity.createdAt : undefined;
        this.total = entity ? entity.total : undefined;
   }

   codingKeys = {
     id: 'er_id',
     value: 'er_value',
     createdAt: 'er_created_at',
     total: 'er_count'
   }    
}
