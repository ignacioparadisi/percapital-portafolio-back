import {DAO} from '../DAO';
import {IConstantTypeDAO} from './IConstantTypeDAO';
import {ConstantType} from '@Common/Entities/ConstantType';
import {DatabaseError} from '@Common/Errors/DatabaseError';
import {BatchQueryData} from '@Persistence/Database/QueryBuilder';
export class ConstantTypeDAO extends DAO<ConstantType> implements IConstantTypeDAO {
    constructor() {
        super(new ConstantType());
    }
    async create(entity: ConstantType): Promise<ConstantType> {
        return this.database.create(entity);
    }
    async get(where: ConstantType, limit?: number, skip?: number, batch?: BatchQueryData): Promise<ConstantType[]> {
        return this.database.get(where, limit, skip, batch);
    }
    async update(where: ConstantType, entity: ConstantType): Promise<ConstantType[]> {
        return this.database.update(where, entity);
    }
    async delete(entity: ConstantType): Promise<number> {
        return this.database.delete(entity);
    }
}
