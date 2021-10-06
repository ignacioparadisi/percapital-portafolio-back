import { PriceRV } from '@Common/entities/PriceRV';
import { Entity } from '@Common/entities/Entity';
import { Decodable } from '@Common/utils/Decodable';

export class StockTitle extends Entity implements Decodable {
    id?: number;
    name?: string;
    symbol?: string;
    createdAt?: Date;
    priceRvs?: PriceRV[];

   constructor(entity?: StockTitle) {
        super(entity);
        this.id = entity ? entity.id : undefined;
        this.name = entity ? entity.name : undefined;
        this.symbol = entity ? entity.symbol : undefined;
        this.createdAt = entity ? entity.createdAt : undefined;
   }

   codingKeys = {
        id: 'st_id',
        description: 'st_name',
        value: 'st_symbol',
        createdAt: 'st_created_at'
   }
}
