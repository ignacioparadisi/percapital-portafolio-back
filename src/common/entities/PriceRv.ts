import {StockExchangeTitle} from '@Common/Entities/StockExchangeTitle';
import {ExchangeRate} from '@Common/Entities/ExchangeRate';
import {Operation} from '@Common/Entities/Operation';
import {Entity} from '@Common/Entities/Entity';
export class PriceRv extends Entity {
    id?: number;
    setId?: number;
    exrId?: number;
    bolivaresPrice?: number;
    createdAt?: Date;
    closeDate?: Date;
    operations?: Operation[];
    exchangeRate?: ExchangeRate;
    stockExchangeTitle?: StockExchangeTitle;

   constructor(entity?: PriceRv) {
        super(entity);
        this.id = entity ? entity.id : undefined;
        this.setId = entity ? entity.setId : undefined;
        this.exrId = entity ? entity.exrId : undefined;
        this.bolivaresPrice = entity ? entity.bolivaresPrice : undefined;
        this.createdAt = entity ? entity.createdAt : undefined;
        this.closeDate = entity ? entity.closeDate : undefined;
   }
}
