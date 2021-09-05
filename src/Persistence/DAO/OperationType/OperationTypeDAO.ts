import {DAO} from '../DAO';
import {IOperationTypeDAO} from './IOperationTypeDAO';
import {OperationType} from '@Common/Entities/OperationType';
import {DatabaseError} from '@Common/Errors/DatabaseError';
import {BatchQueryData} from '@Persistence/Database/QueryBuilder';
export class OperationTypeDAO extends DAO<OperationType> implements IOperationTypeDAO {
    constructor() {
        super(new OperationType());
    }
    async create(entity: OperationType): Promise<OperationType> {
        return this.database.create(entity);
    }
    async get(where: OperationType, limit?: number, skip?: number, batch?: BatchQueryData): Promise<OperationType[]> {
        return this.database.get(where, limit, skip, batch);
    }
    async update(where: OperationType, entity: OperationType): Promise<OperationType[]> {
        return this.database.update(where, entity);
    }
    async delete(entity: OperationType): Promise<number> {
        return this.database.delete(entity);
    }
}
