import { Operation } from '@Common/Entities/Operation';
import { Entity } from '@Common/Entities/Entity';
export class OperationType extends Entity {

     static BUY = 1
     static SELL = 2

    id?: number;
    name?: string;
    operations?: Operation[];

   constructor(entity?: OperationType) {
        super(entity);
        this.id = entity ? entity.id : undefined;
        this.name = entity ? entity.name : undefined;
   }
}
