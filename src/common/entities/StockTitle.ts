import { PriceRV } from '@Common/entities/PriceRV';
import { Entity } from '@Common/entities/Entity';
import { Decodable } from '@Common/utils/Decodable';
import { Pageable } from '@Common/utils/Page';

export class StockTitle extends Entity implements Decodable, Pageable {
    id?: number;
    name?: string;
    symbol?: string;
    createdAt?: Date;
    isinCode?: string;
    priceRvs?: PriceRV[];
    total?: number;
    stockAmount?: number;

   constructor(entity?: StockTitle) {
        super(entity);
        this.id = entity ? entity.id : undefined;
        this.name = entity ? entity.name : undefined;
        this.symbol = entity ? entity.symbol : undefined;
        this.isinCode = entity ? entity.isinCode : undefined;
        this.createdAt = entity ? entity.createdAt : undefined;
        this.total = entity ? entity.total : undefined;
   }

   codingKeys = {
        id: 'st_id',
        name: 'st_name',
        symbol: 'st_symbol',
        isinCode: 'st_isin_code',
        createdAt: 'st_created_at',
        total: 'st_count',
        stockAmount: 'st_stock_amount'
   }
}
