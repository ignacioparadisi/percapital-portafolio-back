import { Operation } from '@Common/entities/Operation';
import { Entity } from '@Common/entities/Entity';
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

   codingKeys = {
     id: 'ot_id',
     name: 'ot_name'
   }  
}
