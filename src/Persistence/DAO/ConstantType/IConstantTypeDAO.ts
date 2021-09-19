import { ConstantType } from '@Common/Entities/ConstantType';
import { IDAO } from '../IDAO';

export interface IConstantTypeDAO extends IDAO<ConstantType> {
  create(entity: ConstantType): Promise<ConstantType>;

  get(
    where?: ConstantType,
    limit?: number,
    skip?: number
  ): Promise<ConstantType[]>;

  update(where: ConstantType, entity: ConstantType): Promise<ConstantType>;

  delete(entity: ConstantType): Promise<number>;
}