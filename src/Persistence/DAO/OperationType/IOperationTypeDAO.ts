import {IDAO} from '../IDAO';
import {OperationType} from '@Common/Entities/OperationType';
import {BatchQueryData} from '@Persistence/Database/QueryBuilder';
export interface IOperationTypeDAO extends IDAO {
    create(entity: OperationType): Promise<OperationType>;
    get(where: OperationType, limit?: number, skip?: number, batch?: BatchQueryData): Promise<OperationType[]>;
    update(where: OperationType, entity: OperationType): Promise<OperationType[]>;
    delete(entity: OperationType): Promise<number>;
}