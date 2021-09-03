import {DAO} from '../DAO';
import {ITypeValueDAO} from './ITypeValueDAO';
import {TypeValue} from '@Common/Entities/TypeValue';
import {DatabaseError} from '@Common/Errors/DatabaseError';
import {BatchQueryData} from '@Persistence/Database/QueryBuilder';
export class TypeValueDAO extends DAO<TypeValue> implements ITypeValueDAO {
    constructor() {
        super(new TypeValue());
    }
    async create(entity: TypeValue): Promise<TypeValue> {
        return this.database.create(entity);
    }
    async get(where: TypeValue, limit?: number, skip?: number, batch?: BatchQueryData): Promise<TypeValue[]> {
        return this.database.get(where, limit, skip, batch);
    }
    async update(where: TypeValue, entity: TypeValue): Promise<TypeValue[]> {
        return this.database.update(where, entity);
    }
    async delete(entity: TypeValue): Promise<number> {
        return this.database.delete(entity);
    }
}
