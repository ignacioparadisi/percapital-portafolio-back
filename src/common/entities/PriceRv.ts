import {StockExchangeTitle} from '@Common/Entities/StockExchangeTitle';
import {ExchangeRate} from '@Common/Entities/ExchangeRate';
import {Operation} from '@Common/Entities/Operation';
import {Entity} from '@Common/Entities/Entity';
export class PriceRv extends Entity {
    id?: number;
    titleId?: number;
    exchangeRateId?: number;
    bolivaresPrice?: number;
    createdAt?: Date;
    closeDate?: Date;
    operations?: Operation[];
    exchangeRate?: ExchangeRate;
    stockExchangeTitle?: StockExchangeTitle;

   constructor(entity?: PriceRv) {
        super(entity);
        this.id = entity ? entity.id : undefined;
        this.titleId = entity ? entity.titleId : undefined;
        this.exchangeRateId = entity ? entity.exchangeRateId : undefined;
        this.bolivaresPrice = entity ? entity.bolivaresPrice : undefined;
        this.createdAt = entity ? entity.createdAt : undefined;
        this.closeDate = entity ? entity.closeDate : undefined;
   }
}
