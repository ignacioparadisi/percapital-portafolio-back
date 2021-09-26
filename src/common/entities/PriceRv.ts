import { StockExchangeTitle } from '@Common/Entities/StockExchangeTitle';
import { ExchangeRate } from '@Common/Entities/ExchangeRate';
import { Operation } from '@Common/Entities/Operation';
import { Entity } from '@Common/Entities/Entity';
import { Decodable } from '@Common/Utils/decodable';

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
    stockExchangeTitle?: StockExchangeTitle;

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
