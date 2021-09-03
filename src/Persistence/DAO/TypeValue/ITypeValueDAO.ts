import {IDAO} from '../IDAO';
import {TypeValue} from '@Common/Entities/TypeValue';
import {BatchQueryData} from '@Persistence/Database/QueryBuilder';
export interface ITypeValueDAO extends IDAO {
    create(entity: TypeValue): Promise<TypeValue>;
    get(where: TypeValue, limit?: number, skip?: number, batch?: BatchQueryData): Promise<TypeValue[]>;
    update(where: TypeValue, entity: TypeValue): Promise<TypeValue[]>;
    delete(entity: TypeValue): Promise<number>;
}