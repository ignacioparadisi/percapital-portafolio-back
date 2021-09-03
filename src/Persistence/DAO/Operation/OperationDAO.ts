import {DAO} from '../DAO';
import {IOperationDAO} from './IOperationDAO';
import {Operation} from '@Common/Entities/Operation';
import {DatabaseError} from '@Common/Errors/DatabaseError';
import {BatchQueryData} from '@Persistence/Database/QueryBuilder';
export class OperationDAO extends DAO<Operation> implements IOperationDAO {
    constructor() {
        super(new Operation());
    }
    async create(entity: Operation): Promise<Operation> {
        return this.database.create(entity);
    }
    async get(where: Operation, limit?: number, skip?: number, batch?: BatchQueryData): Promise<Operation[]> {
        return this.database.get(where, limit, skip, batch);
    }
    async update(where: Operation, entity: Operation): Promise<Operation[]> {
        return this.database.update(where, entity);
    }
    async delete(entity: Operation): Promise<number> {
        return this.database.delete(entity);
    }
}
