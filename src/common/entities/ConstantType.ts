import {TypeValue} from '@Common/Entities/TypeValue';
import {Entity} from '@Common/Entities/Entity';
export class ConstantType extends Entity {
    ctId?: undefined;
    ctName?: string;
    typeValues?: TypeValue[];

   constructor(entity?: ConstantType) {
        super(entity);
        this.ctId = entity ? entity.ctId : undefined;
        this.ctName = entity ? entity.ctName : undefined;
   }
}
