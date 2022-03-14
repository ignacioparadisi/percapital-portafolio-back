import { ConstantValue } from '@Common/entities/ConstantValue';
import { Entity } from '@Common/entities/Entity';
import { Decodable, CodingKey } from '@Common/utils/Decodable';


export class ConstantType  extends Entity implements Decodable {
    id?: number;
    name?: string;
    createdAt?: Date;
    values?: ConstantValue[];

    codingKeys: CodingKey<ConstantType> = {
         id: 'ct_id',
         name: 'ct_name',
         createdAt: 'ct_created_at'
    }

   constructor(entity?: ConstantType) {
        super(entity);
        this.id = entity ? entity.id : undefined;
        this.name = entity ? entity.name : undefined;
        this.createdAt = entity ? entity.createdAt : undefined;
   }
}