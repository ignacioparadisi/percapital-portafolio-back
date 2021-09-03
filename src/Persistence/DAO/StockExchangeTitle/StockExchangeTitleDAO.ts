import {DAO} from '../DAO';
import {IStockExchangeTitleDAO} from './IStockExchangeTitleDAO';
import {StockExchangeTitle} from '@Common/Entities/StockExchangeTitle';
import {DatabaseError} from '@Common/Errors/DatabaseError';
import {BatchQueryData} from '@Persistence/Database/QueryBuilder';
export class StockExchangeTitleDAO extends DAO<StockExchangeTitle> implements IStockExchangeTitleDAO {
    constructor() {
        super(new StockExchangeTitle());
    }
    async create(entity: StockExchangeTitle): Promise<StockExchangeTitle> {
        return this.database.create(entity);
    }
    async get(where: StockExchangeTitle, limit?: number, skip?: number, batch?: BatchQueryData): Promise<StockExchangeTitle[]> {
        return this.database.get(where, limit, skip, batch);
    }
    async update(where: StockExchangeTitle, entity: StockExchangeTitle): Promise<StockExchangeTitle[]> {
        return this.database.update(where, entity);
    }
    async delete(entity: StockExchangeTitle): Promise<number> {
        return this.database.delete(entity);
    }
}
