import {PriceRv} from '@Common/Entities/PriceRv';
import {Entity} from '@Common/Entities/Entity';
export class StockExchangeTitle extends Entity {
    stId?: undefined;
    stDescription?: undefined;
    stValue?: string;
    stCreationdate?: undefined;
    priceRvs?: PriceRv[];

   constructor(entity?: StockExchangeTitle) {
        super(entity);
        this.stId = entity ? entity.stId : undefined;
        this.stDescription = entity ? entity.stDescription : undefined;
        this.stValue = entity ? entity.stValue : undefined;
        this.stCreationdate = entity ? entity.stCreationdate : undefined;
   }
}
