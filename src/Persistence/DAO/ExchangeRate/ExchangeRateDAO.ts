import {DAO} from '../DAO';
import {IExchangeRateDAO} from './IExchangeRateDAO';
import {ExchangeRate} from '@Common/Entities/ExchangeRate';
import {DatabaseError} from '@Common/Errors/DatabaseError';
import {BatchQueryData} from '@Persistence/Database/QueryBuilder';
export class ExchangeRateDAO extends DAO<ExchangeRate> implements IExchangeRateDAO {
    constructor() {
        super(new ExchangeRate());
    }
    async create(entity: ExchangeRate): Promise<ExchangeRate> {
        return this.database.create(entity);
    }
    async get(where: ExchangeRate, limit?: number, skip?: number, batch?: BatchQueryData): Promise<ExchangeRate[]> {
        return this.database.get(where, limit, skip, batch);
    }
    async update(where: ExchangeRate, entity: ExchangeRate): Promise<ExchangeRate[]> {
        return this.database.update(where, entity);
    }
    async delete(entity: ExchangeRate): Promise<number> {
        return this.database.delete(entity);
    }
}
