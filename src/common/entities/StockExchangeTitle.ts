import { PriceRV } from '@Common/entities/PriceRV';
import { Entity } from '@Common/entities/Entity';
import { Decodable } from '@Common/utils/Decodable';

export class StockExchangeTitle extends Entity implements Decodable {
    id?: number;
    description?: string;
    value?: string;
    createdAt?: Date;
    priceRvs?: PriceRV[];

   constructor(entity?: StockExchangeTitle) {
        super(entity);
        this.id = entity ? entity.id : undefined;
        this.description = entity ? entity.description : undefined;
        this.value = entity ? entity.value : undefined;
        this.createdAt = entity ? entity.createdAt : undefined;
   }

   codingKeys = {
        id: 'st_id',
        description: 'st_description',
        value: 'st_value',
        createdAt: 'st_created_at'
   }
}
