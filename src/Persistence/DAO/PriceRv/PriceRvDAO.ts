import {DAO} from '../DAO';
import {IPriceRvDAO} from './IPriceRvDAO';
import {PriceRv} from '@Common/Entities/PriceRv';
import {DatabaseError} from '@Common/Errors/DatabaseError';
import {BatchQueryData} from '@Persistence/Database/QueryBuilder';
export class PriceRvDAO extends DAO<PriceRv> implements IPriceRvDAO {
    constructor() {
        super(new PriceRv());
    }
    async create(entity: PriceRv): Promise<PriceRv> {
        return this.database.create(entity);
    }
    async get(where: PriceRv, limit?: number, skip?: number, batch?: BatchQueryData): Promise<PriceRv[]> {
        return this.database.get(where, limit, skip, batch);
    }
    async update(where: PriceRv, entity: PriceRv): Promise<PriceRv[]> {
        return this.database.update(where, entity);
    }
    async delete(entity: PriceRv): Promise<number> {
        return this.database.delete(entity);
    }
}
