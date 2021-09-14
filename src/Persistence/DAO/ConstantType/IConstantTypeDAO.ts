import { ConstantType } from '@Common/Entities/ConstantType';
import { BatchQueryData } from '@Persistence/Database/QueryBuilder';
import { IDAO } from '../IDAO';

export interface IConstantTypeDAO extends IDAO<ConstantType> {
  create(entity: ConstantType): Promise<ConstantType>;

  get(
    where?: ConstantType,
    limit?: number,
    skip?: number,
    batch?: BatchQueryData,
    block?: string,
  ): Promise<ConstantType[]>;

  update(where: ConstantType, entity: ConstantType): Promise<ConstantType>;

  delete(entity: ConstantType): Promise<number>;
}