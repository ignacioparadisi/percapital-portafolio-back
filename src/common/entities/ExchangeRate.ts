import {PriceRv} from '@Common/Entities/PriceRv';
import {Entity} from '@Common/Entities/Entity';
export class ExchangeRate extends Entity {
    id?: number;
    value?: number;
    createdAt?: Date;
    priceRvs?: PriceRv[];

   constructor(entity?: ExchangeRate) {
        super(entity);
        this.id = entity ? entity.id : undefined;
        this.value = entity ? entity.value : undefined;
        this.createdAt = entity ? entity.createdAt : undefined;
   }
}
