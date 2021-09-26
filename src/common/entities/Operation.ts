import {PriceRv} from '@Common/Entities/PriceRv';
import {OperationType} from '@Common/Entities/OperationType';
import {Entity} from '@Common/Entities/Entity';
import { Decodable } from '@Common/Utils/decodable';
export class Operation extends Entity implements Decodable {
    id?: number;
    priceRvId?: number;
    createdAt?: Date;
    stockAmount?: number;
    stockPrice?: number;
    typeId?: number;
    operationType?: OperationType;
    priceRv?: PriceRv;

   constructor(entity?: Operation) {
        super(entity);
        this.id = entity ? entity.id : undefined;
        this.priceRvId = entity ? entity.priceRvId : undefined;
        this.createdAt = entity ? entity.createdAt : undefined;
        this.stockAmount = entity ? entity.stockAmount : undefined;
        this.stockPrice = entity ? entity.stockPrice : undefined;
        this.typeId = entity ? entity.typeId : undefined;
   }
}
