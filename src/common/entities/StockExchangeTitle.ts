import { PriceRV } from '@Common/Entities/PriceRV';
import { Entity } from '@Common/Entities/Entity';
export class StockExchangeTitle extends Entity {
    id?: number;
    description?: string;
    value?: string;
    createdAt?: Date;
    priceRvs?: PriceRV[];

   constructor(entity?: StockExchangeTitle) {
        super(entity);
        this.id = entity ? entity.id : undefined;
        this.description = entity ? entity.description : undefined;
        this.value = entity ? entity.value : undefined;
        this.createdAt = entity ? entity.createdAt : undefined;
   }
}
