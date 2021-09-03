import {IDAO} from '../IDAO';
import {ExchangeRate} from '@Common/Entities/ExchangeRate';
import {BatchQueryData} from '@Persistence/Database/QueryBuilder';
export interface IExchangeRateDAO extends IDAO {
    create(entity: ExchangeRate): Promise<ExchangeRate>;
    get(where: ExchangeRate, limit?: number, skip?: number, batch?: BatchQueryData): Promise<ExchangeRate[]>;
    update(where: ExchangeRate, entity: ExchangeRate): Promise<ExchangeRate[]>;
    delete(entity: ExchangeRate): Promise<number>;
}