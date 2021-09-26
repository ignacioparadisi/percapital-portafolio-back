import { PriceRV } from '@Common/Entities/PriceRV';
import { Entity } from '@Common/Entities/Entity';
export class ExchangeRate extends Entity {
    id?: number;
    value?: number;
    createdAt?: Date;
    priceRvs?: PriceRV[];

   constructor(entity?: ExchangeRate) {
        super(entity);
        this.id = entity ? entity.id : undefined;
        this.value = entity ? entity.value : undefined;
        this.createdAt = entity ? entity.createdAt : undefined;
   }
}
