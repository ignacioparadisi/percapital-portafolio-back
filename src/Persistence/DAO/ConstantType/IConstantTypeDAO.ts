import {IDAO} from '../IDAO';
import {ConstantType} from '@Common/Entities/ConstantType';
import {BatchQueryData} from '@Persistence/Database/QueryBuilder';
export interface IConstantTypeDAO extends IDAO {
    create(entity: ConstantType): Promise<ConstantType>;
    get(where: ConstantType, limit?: number, skip?: number, batch?: BatchQueryData): Promise<ConstantType[]>;
    update(where: ConstantType, entity: ConstantType): Promise<ConstantType[]>;
    delete(entity: ConstantType): Promise<number>;
}