import {IDAO} from '../IDAO';
import {PriceRv} from '@Common/Entities/PriceRv';
import {BatchQueryData} from '@Persistence/Database/QueryBuilder';
export interface IPriceRvDAO extends IDAO {
    create(entity: PriceRv): Promise<PriceRv>;
    get(where: PriceRv, limit?: number, skip?: number, batch?: BatchQueryData): Promise<PriceRv[]>;
    update(where: PriceRv, entity: PriceRv): Promise<PriceRv[]>;
    delete(entity: PriceRv): Promise<number>;
}