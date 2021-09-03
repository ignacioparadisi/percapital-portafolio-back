import {IDAO} from '../IDAO';
import {StockExchangeTitle} from '@Common/Entities/StockExchangeTitle';
import {BatchQueryData} from '@Persistence/Database/QueryBuilder';
export interface IStockExchangeTitleDAO extends IDAO {
    create(entity: StockExchangeTitle): Promise<StockExchangeTitle>;
    get(where: StockExchangeTitle, limit?: number, skip?: number, batch?: BatchQueryData): Promise<StockExchangeTitle[]>;
    update(where: StockExchangeTitle, entity: StockExchangeTitle): Promise<StockExchangeTitle[]>;
    delete(entity: StockExchangeTitle): Promise<number>;
}