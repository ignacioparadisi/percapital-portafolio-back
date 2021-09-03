import {PriceRv} from '@Common/Entities/PriceRv';
import {Entity} from '@Common/Entities/Entity';
export class ExchangeRate extends Entity {
    erId?: undefined;
    erValue?: undefined;
    erCreationdate?: undefined;
    priceRvs?: PriceRv[];

   constructor(entity?: ExchangeRate) {
        super(entity);
        this.erId = entity ? entity.erId : undefined;
        this.erValue = entity ? entity.erValue : undefined;
        this.erCreationdate = entity ? entity.erCreationdate : undefined;
   }
}
