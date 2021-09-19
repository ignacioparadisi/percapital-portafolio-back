import {ConstantType} from '@Common/Entities/ConstantType';
import {Entity} from '@Common/Entities/Entity';
import { CodingKey, Decodable } from '@Common/Utils/decodable';
export class ConstantValue extends Entity implements Decodable {
    id?: number;
    constantTypeId?: number;
    value?: number;
    createdAt?: Date;
    constantType?: ConstantType;

    codingKeys: CodingKey<ConstantValue> = {
         id: 'cv_id',
         value: 'cv_value',
         createdAt: 'cv_created_at'
    }

   constructor(entity?: ConstantValue) {
        super(entity);
        this.id = entity ? entity.id : undefined;
        this.constantTypeId = entity ? entity.constantTypeId : undefined;
        this.value = entity ? entity.value : undefined;
        this.createdAt = entity ? entity.createdAt : undefined;
   }
}
