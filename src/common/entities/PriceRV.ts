import { StockTitle } from '@Common/entities/StockTitle';
import { ExchangeRate } from '@Common/entities/ExchangeRate';
import { Operation } from '@Common/entities/Operation';
import { Entity } from '@Common/entities/Entity';
import { Decodable } from '@Common/utils/Decodable';

export class PriceRV extends Entity implements Decodable {
    id?: number;
    titleId?: number;
    exchangeRateId?: number;
    bolivaresPrice?: number;
    closePrice?: number;
    createdAt?: Date;
    closeDate?: Date;
    operations?: Operation[];
    exchangeRate?: ExchangeRate;
    stockTitle?: StockTitle;

   constructor(entity?: PriceRV) {
        super(entity);
        this.id = entity ? entity.id : undefined;
        this.titleId = entity ? entity.titleId : undefined;
        this.exchangeRateId = entity ? entity.exchangeRateId : undefined;
        this.bolivaresPrice = entity ? entity.bolivaresPrice : undefined;
        this.closePrice = entity ? entity?.closePrice : undefined;
        this.createdAt = entity ? entity.createdAt : undefined;
        this.closeDate = entity ? entity.closeDate : undefined;
   }

   codingKeys = {
        id: 'pr_id',
        titleId: 'pr_title_id',
        exchangeRateId: 'pr_exchange_rate_id',
        bolivaresPrice: 'pr_bolivares_price',
        closePrice: 'pr_close_price',
        createdAt: 'pr_created_at',
        closeDate: 'pr_close_date'
   }
}
