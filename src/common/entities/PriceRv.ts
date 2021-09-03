import {StockExchangeTitle} from '@Common/Entities/StockExchangeTitle';
import {ExchangeRate} from '@Common/Entities/ExchangeRate';
import {Operation} from '@Common/Entities/Operation';
import {Operation} from '@Common/Entities/Operation';
import {Operation} from '@Common/Entities/Operation';
import {Entity} from '@Common/Entities/Entity';
export class PriceRv extends Entity {
    prId?: undefined;
    prStId?: undefined;
    prErId?: undefined;
    prBolivaresprice?: undefined;
    prCreationdate?: undefined;
    prClosedate?: undefined;
    operations?: Operation[];
    operations?: Operation[];
    operations?: Operation[];
    exchangeRate?: ExchangeRate;
    stockExchangeTitle?: StockExchangeTitle;

   constructor(entity?: PriceRv) {
        super(entity);
        this.prId = entity ? entity.prId : undefined;
        this.prStId = entity ? entity.prStId : undefined;
        this.prErId = entity ? entity.prErId : undefined;
        this.prBolivaresprice = entity ? entity.prBolivaresprice : undefined;
        this.prCreationdate = entity ? entity.prCreationdate : undefined;
        this.prClosedate = entity ? entity.prClosedate : undefined;
   }
}
