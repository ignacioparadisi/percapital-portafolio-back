import {IDAO} from '../IDAO';
import {Operation} from '@Common/Entities/Operation';
import {BatchQueryData} from '@Persistence/Database/QueryBuilder';
export interface IOperationDAO extends IDAO {
    create(entity: Operation): Promise<Operation>;
    get(where: Operation, limit?: number, skip?: number, batch?: BatchQueryData): Promise<Operation[]>;
    update(where: Operation, entity: Operation): Promise<Operation[]>;
    delete(entity: Operation): Promise<number>;
}