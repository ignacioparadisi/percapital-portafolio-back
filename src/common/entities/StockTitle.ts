import { PriceRV } from '@Common/entities/PriceRV';
import { Entity } from '@Common/entities/Entity';
import { Decodable } from '@Common/utils/Decodable';
import { Pageable } from '@Common/utils/Page';

export class StockTitle extends Entity implements Decodable, Pageable {
    id?: number;
    name?: string;
    symbol?: string;
    createdAt?: Date;
    priceRvs?: PriceRV[];
    total?: number;

   constructor(entity?: StockTitle) {
        super(entity);
        this.id = entity ? entity.id : undefined;
        this.name = entity ? entity.name : undefined;
        this.symbol = entity ? entity.symbol : undefined;
        this.createdAt = entity ? entity.createdAt : undefined;
        this.total = entity ? entity.total : undefined;
   }

   codingKeys = {
        id: 'st_id',
        name: 'st_name',
        symbol: 'st_symbol',
        createdAt: 'st_created_at',
        total: 'st_count'
   }
}
