import {ConstantType} from '@Common/Entities/ConstantType';
import {Entity} from '@Common/Entities/Entity';
export class TypeValue extends Entity {
    id?: number;
    cotId?: number;
    value?: number;
    createdAt?: Date;
    constantType?: ConstantType;

   constructor(entity?: TypeValue) {
        super(entity);
        this.id = entity ? entity.id : undefined;
        this.cotId = entity ? entity.cotId : undefined;
        this.value = entity ? entity.value : undefined;
        this.createdAt = entity ? entity.createdAt : undefined;
   }
}