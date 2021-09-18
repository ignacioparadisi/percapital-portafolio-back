import { ConstantValue } from '@Common/Entities/ConstantValue';
import { Entity } from '@Common/Entities/Entity';
export class ConstantType extends Entity {
    id?: number;
    name?: string;
    createdAt?: Date;
    typeValues?: ConstantValue[];

   constructor(entity?: ConstantType) {
        super(entity);
        this.id = entity ? entity.id : undefined;
        this.name = entity ? entity.name : undefined;
        this.createdAt = entity ? entity.createdAt : undefined;
   }
}
