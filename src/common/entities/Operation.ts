import {PriceRv} from '@Common/Entities/PriceRv';
import {PriceRv} from '@Common/Entities/PriceRv';
import {PriceRv} from '@Common/Entities/PriceRv';
import {Entity} from '@Common/Entities/Entity';
export class Operation extends Entity {
    opId?: undefined;
    opPId?: undefined;
    opStId?: undefined;
    opErId?: undefined;
    opCreationdate?: undefined;
    opNumberofactions?: undefined;
    opPrice?: undefined;
    opType?: string;
    priceRv?: PriceRv;
    priceRv?: PriceRv;
    priceRv?: PriceRv;

   constructor(entity?: Operation) {
        super(entity);
        this.opId = entity ? entity.opId : undefined;
        this.opPId = entity ? entity.opPId : undefined;
        this.opStId = entity ? entity.opStId : undefined;
        this.opErId = entity ? entity.opErId : undefined;
        this.opCreationdate = entity ? entity.opCreationdate : undefined;
        this.opNumberofactions = entity ? entity.opNumberofactions : undefined;
        this.opPrice = entity ? entity.opPrice : undefined;
        this.opType = entity ? entity.opType : undefined;
   }
}
