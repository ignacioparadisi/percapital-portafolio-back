import { PriceRV } from '@Common/Entities/PriceRV';
import { OperationType } from '@Common/Entities/OperationType';
import { Entity } from '@Common/Entities/Entity';
import { Decodable } from '@Common/Utils/decodable';
export class Operation extends Entity implements Decodable {
    id?: number;
    userId?: number;
    priceRvId?: number;
    createdAt?: Date;
    stockAmount?: number;
    stockPrice?: number;
    typeId?: number;
    operationType?: OperationType;
    priceRv?: PriceRV;

   constructor(entity?: Operation) {
        super(entity);
        this.id = entity ? entity.id : undefined;
        this.userId = entity ? entity.userId : undefined;
        this.priceRvId = entity ? entity.priceRvId : undefined;
        this.createdAt = entity ? entity.createdAt : undefined;
        this.stockAmount = entity ? entity.stockAmount : undefined;
        this.stockPrice = entity ? entity.stockPrice : undefined;
        this.typeId = entity ? entity.typeId : undefined;
   }

   codingKeys = {
        id: 'op_id',
        userId: 'op_user_id',
        priceRvId: 'op_price_rv_id',
        createdAt: 'op_created_at',
        stockAmount: 'op_stock_amount',
        stockPrice: 'op_stock_price',
        typeId: 'op_type_id'
   }
}
